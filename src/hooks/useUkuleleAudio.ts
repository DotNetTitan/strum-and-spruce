import { useCallback } from 'react';
import { CHORD_AUDIO_FRETS } from '../data/chords';

/** Re-entrant tuning: G4, C4, E4, A4 */
const OPEN_MIDI: [number, number, number, number] = [67, 60, 64, 69];

// Shared AudioContext
let _ctx: AudioContext | null = null;
let _master: GainNode | null = null;

function getCtx(): AudioContext {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new Ctor();

    _master = _ctx.createGain();
    _master.gain.value = 0.8;
    _master.connect(_ctx.destination);
  }

  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }

  return _ctx;
}

function warmUp(): void {
  getCtx();
}

function midiHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * EXACT same Karplus-Strong implementation as HTML file
 */
function pluck(
  ctx: AudioContext,
  freq: number,
  delayMs = 0
): void {
  if (!_master) return;

  const sr = ctx.sampleRate;
  const N = Math.max(2, Math.round(sr / freq));
  const dur = 4.0;
  const len = Math.ceil(sr * dur);

  // 1. Hann-windowed noise seed
  const ring = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const w = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (N - 1)));
    ring[i] = (Math.random() * 2 - 1) * w;
  }

  // 2. Karplus-Strong loop
  const pcm = new Float32Array(len);

  const damping = 0.998;
  let rp = 0;

  for (let n = 0; n < len; n++) {
    const cur = ring[rp];
    const next = ring[(rp + 1) % N];

    pcm[n] = cur;

    ring[rp] = damping * 0.5 * (cur + next);

    rp = (rp + 1) % N;
  }

  // 3. Normalize
  let peak = 0;

  for (let i = 0; i < len; i++) {
    const abs = Math.abs(pcm[i]);
    if (abs > peak) peak = abs;
  }

  if (peak < 1e-8) return;

  const scale = 0.85 / peak;

  for (let i = 0; i < len; i++) {
    pcm[i] *= scale;
  }

  // 4. AudioBuffer
  const ab = ctx.createBuffer(1, len, sr);
  ab.copyToChannel(pcm, 0);

  const src = ctx.createBufferSource();
  src.buffer = ab;

  // 5. Exact EQ chain
  const lo = ctx.createBiquadFilter();
  lo.type = 'lowshelf';
  lo.frequency.value = 280;
  lo.gain.value = 4;

  const mid = ctx.createBiquadFilter();
  mid.type = 'peaking';
  mid.frequency.value = 900;
  mid.Q.value = 1.2;
  mid.gain.value = 3;

  const hi = ctx.createBiquadFilter();
  hi.type = 'highshelf';
  hi.frequency.value = 4500;
  hi.gain.value = -7;

  // 6. Envelope
  const env = ctx.createGain();

  const t0 = ctx.currentTime + Math.max(0, delayMs) / 1000;

  env.gain.setValueAtTime(1.0, t0);
  env.gain.setValueAtTime(1.0, t0 + 0.3);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.88);

  src.connect(lo);
  lo.connect(mid);
  mid.connect(hi);
  hi.connect(env);
  env.connect(_master);

  src.start(t0);
  src.stop(t0 + dur + 0.1);
}

function playString(
  ctx: AudioContext,
  stringIndex: number,
  fret: number,
  delayMs: number
): void {
  const freq = midiHz(OPEN_MIDI[stringIndex] + fret);
  pluck(ctx, freq, delayMs);
}

export const useUkuleleAudio = () => {
  /**
   * EXACT same strum timing as HTML
   */
  const playChord = useCallback(
    (chordName: string, strumGap = 45) => {
      const ctx = getCtx();

      const frets =
        CHORD_AUDIO_FRETS[chordName] ??
        ([0, 0, 0, 0] as [number, number, number, number]);

      [0, 1, 2, 3].forEach((s, i) => {
        playString(ctx, s, frets[s], i * strumGap);
      });
    },
    []
  );

  /**
   * EXACT same arpeggio as HTML
   */
  const playArpeggio = useCallback((chordName: string) => {
    const ctx = getCtx();

    const frets =
      CHORD_AUDIO_FRETS[chordName] ??
      ([0, 0, 0, 0] as [number, number, number, number]);

    [0, 1, 2, 3, 2, 1, 0].forEach((s, i) => {
      playString(ctx, s, frets[s], i * 90);
    });
  }, []);

  /**
   * Pattern playback
   */
  const playStrum = useCallback(
    (chordName: string, notation: string, bpm = 80) => {
      const ctx = getCtx();

      const frets =
        CHORD_AUDIO_FRETS[chordName] ??
        ([0, 0, 0, 0] as [number, number, number, number]);

      const strokeInterval = 60 / (bpm * 2);

      type Slot = 'D' | 'U' | 'REST';

      const strokes: Slot[] = notation
        .trim()
        .toUpperCase()
        .split(/\s+/)
        .flatMap((group, gi, arr) => {
          const chars = group.split('') as Slot[];
          return gi < arr.length - 1 ? [...chars, 'REST'] : chars;
        });

      const startMs = ctx.currentTime * 1000;

      strokes.forEach((stroke, i) => {
        if (stroke === 'REST') return;

        const baseMs =
          startMs + i * strokeInterval * 1000;

        const order =
          stroke === 'D'
            ? [0, 1, 2, 3]
            : [3, 2, 1, 0];

        order.forEach((s, j) => {
          playString(
            ctx,
            s,
            frets[s],
            baseMs - ctx.currentTime * 1000 + j * 45
          );
        });
      });
    },
    []
  );

  const playNote = useCallback((freq: number) => {
    const ctx = getCtx();
    pluck(ctx, freq, 0);
  }, []);

  return {
    warmUp,
    playChord,
    playArpeggio,
    playStrum,
    playNote,
  };
};