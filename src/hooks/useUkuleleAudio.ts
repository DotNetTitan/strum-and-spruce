import { useCallback } from 'react';

const TUNING = {
  G: 392.00,
  C: 261.63,
  E: 329.63,
  A: 440.00
};

const CHORD_FINGERINGS: Record<string, number[]> = {
  'C': [0, 0, 0, 3],
  'G': [0, 2, 3, 2],
  'F': [2, 0, 1, 0],
  'Am': [2, 0, 0, 0],
  'Dm': [2, 2, 1, 0],
  'G7': [0, 2, 1, 2],
  'D': [2, 2, 2, 0],
  'Em': [0, 4, 3, 2],
  'A': [2, 1, 0, 0],
  'E7': [1, 2, 0, 2],
};

const BASE_FREQS = [TUNING.G, TUNING.C, TUNING.E, TUNING.A];

export const useUkuleleAudio = () => {
  const playChord = useCallback((chordName: string) => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const fingerings = CHORD_FINGERINGS[chordName] || [0, 0, 0, 0];
    const now = ctx.currentTime;

    fingerings.forEach((fret, i) => {
      const freq = BASE_FREQS[i] * Math.pow(2, fret / 12);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now + (i * 0.05));
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + (i * 0.05));
      osc.stop(now + 1.5);
    });
  }, []);

  const playStrum = useCallback((chordName: string, pattern: string) => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const fingerings = CHORD_FINGERINGS[chordName] || [0, 0, 0, 0];

    const playStroke = (time: number, isDown: boolean) => {
      fingerings.forEach((fret, i) => {
        const freq = BASE_FREQS[i] * Math.pow(2, fret / 12);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        const delay = isDown ? i * 0.015 : (3 - i) * 0.015;
        gain.gain.setValueAtTime(0, time + delay);
        gain.gain.linearRampToValueAtTime(0.2, time + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + delay);
        osc.stop(time + delay + 0.5);
      });
    };

    const now = ctx.currentTime;
    if (pattern === 'island') {
      playStroke(now, true);
      playStroke(now + 0.4, true);
      playStroke(now + 0.6, false);
      playStroke(now + 1.0, false);
      playStroke(now + 1.2, true);
      playStroke(now + 1.4, false);
    } else if (pattern === 'down') {
      playStroke(now, true);
      playStroke(now + 0.4, true);
      playStroke(now + 0.8, true);
      playStroke(now + 1.2, true);
    } else {
      playStroke(now, true);
    }
  }, []);

  return { playChord, playStrum };
};