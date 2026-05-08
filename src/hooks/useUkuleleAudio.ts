import { useCallback } from 'react';
import { CHORD_AUDIO_FRETS } from '../data/chords';

/** Open-string frequencies for G-C-E-A tuning. */
const BASE_FREQS: [number, number, number, number] = [392.0, 261.63, 329.63, 440.0];

// Shared AudioContext — created once, reused across all calls.
let _ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!_ctx || _ctx.state === 'closed') _ctx = new Ctor();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

/**
 * Karplus-Strong plucked string synthesis.
 * Fills a Hann-windowed noise burst into a circular buffer, then averages
 * it through a feedback loop — the physics of a decaying plucked string.
 */
function generateKSBuffer(
  ctx: AudioContext,
  freq: number,
  duration = 2.2,
  decay = 0.4985
): AudioBuffer {
  const sr = ctx.sampleRate;
  const N = Math.max(2, Math.round(sr / freq));
  const numSamples = Math.round(sr * duration);

  const ring = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const w = 0.5 * (1 - Math.cos((2 * Math.PI * i) / N));
    ring[i] = (Math.random() * 2 - 1) * w;
  }

  const output = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const idx = i % N;
    output[i] = ring[idx];
    ring[idx] = (ring[idx] + ring[(idx + 1) % N]) * decay;
  }

  const buf = ctx.createBuffer(1, numSamples, sr);
  buf.getChannelData(0).set(output);
  return buf;
}

/** Schedule a single Karplus-Strong note at an exact AudioContext time. */
function scheduleKSNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  gainVal = 0.65,
  duration = 2.2,
  decay = 0.4985
): void {
  const buf = generateKSBuffer(ctx, freq, duration, decay);
  const src = ctx.createBufferSource();
  src.buffer = buf;

  // Gentle low-pass for body warmth
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 3800;

  const gain = ctx.createGain();
  gain.gain.value = gainVal;

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(startTime);
}

/**
 * Muted percussive chuck (X stroke).
 * A very short, heavily damped KS burst through a bandpass filter.
 */
function scheduleChuck(ctx: AudioContext, startTime: number): void {
  const buf = generateKSBuffer(ctx, 220, 0.1, 0.44);
  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 900;
  bp.Q.value = 0.6;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.45, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

  src.connect(bp);
  bp.connect(gain);
  gain.connect(ctx.destination);
  src.start(startTime);
}

/**
 * Hook exposing two audio primitives built on Karplus-Strong synthesis.
 * All playback is scheduled via Web Audio API — zero dependencies.
 */
export const useUkuleleAudio = () => {
  /**
   * Strum a chord once, with a realistic string-by-string strum sweep.
   * @param chordName - Key matching `CHORD_AUDIO_FRETS`, e.g. "C" or "Am".
   * @param strumGap - Seconds between each string (default 28 ms).
   */
  const playChord = useCallback((chordName: string, strumGap = 0.028) => {
    const ctx = getCtx();
    const frets = CHORD_AUDIO_FRETS[chordName] ?? ([0, 0, 0, 0] as [number, number, number, number]);
    const now = ctx.currentTime;

    frets.forEach((fret, i) => {
      if (fret < 0) return;
      const freq = BASE_FREQS[i] * Math.pow(2, fret / 12);
      scheduleKSNote(ctx, freq, now + i * strumGap);
    });
  }, []);

  /**
   * Play a strumming pattern with each stroke timed as one eighth note at `bpm`.
   * Spaces between groups are treated as rest slots (one eighth-note of silence)
   * so the listener hears the natural grouping pauses, e.g. "D DU UDU" plays
   * D … D-U … U-D-U rather than running all strokes together.
   * @param chordName - Chord to use for the backing strings.
   * @param notation  - Pattern notation, e.g. "D DU UDU".
   * @param bpm       - Tempo in BPM (default 80); each stroke = one eighth note.
   */
  const playStrum = useCallback((chordName: string, notation: string, bpm = 80) => {
    const ctx = getCtx();
    const frets = CHORD_AUDIO_FRETS[chordName] ?? ([0, 0, 0, 0] as [number, number, number, number]);
    const freqs = frets.map((fret, i) =>
      fret < 0 ? -1 : BASE_FREQS[i] * Math.pow(2, fret / 12)
    );

    // Eighth-note interval: at 80 BPM this is 375 ms per stroke.
    const strokeInterval = 60 / (bpm * 2);

    // Each word (space-separated group) is a beat; spaces between groups
    // count as a rest slot so the listener hears the natural grouping pauses.
    type Slot = 'D' | 'U' | 'X' | 'REST';
    const strokes: Slot[] = notation
      .trim()
      .toUpperCase()
      .split(/\s+/)
      .flatMap((group, gi, arr) => {
        const chars = group.split('') as Slot[];
        return gi < arr.length - 1 ? [...chars, 'REST'] : chars;
      });

    const now = ctx.currentTime;

    strokes.forEach((stroke, i) => {
      const strokeTime = now + i * strokeInterval;

      if (stroke === 'REST') return;

      if (stroke === 'X') {
        scheduleChuck(ctx, strokeTime);
        return;
      }

      const isDown = stroke === 'D';
      // Down: G→C→E→A (low→high).  Up: A→E→C→G (high→low).
      const order = isDown ? [0, 1, 2, 3] : [3, 2, 1, 0];
      const strumGap = 0.016;

      order.forEach((si, j) => {
        const freq = freqs[si];
        if (freq < 0) return;
        scheduleKSNote(ctx, freq, strokeTime + j * strumGap, 0.55, 1.1, 0.497);
      });
    });
  }, []);

  /**
   * Play a single note at the given frequency — used for individual string playback.
   * @param freq - Frequency in Hz, e.g. 392.0 for the open G string.
   */
  const playNote = useCallback((freq: number) => {
    const ctx = getCtx();
    scheduleKSNote(ctx, freq, ctx.currentTime);
  }, []);

  return { playChord, playNote, playStrum };
};
