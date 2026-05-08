export interface ChordData {
  name: string;
  label: string;
  desc: string;
}

export const CHORDS_LIST: ChordData[] = [
  { name: 'C', label: 'C Major', desc: 'The brightest and most versatile chord in your arsenal.' },
  { name: 'G', label: 'G Major', desc: 'A warm, resonant chord that pairs perfectly with C.' },
  { name: 'F', label: 'F Major', desc: 'A fundamental chord for thousands of popular songs.' },
  { name: 'Am', label: 'A Minor', desc: 'Adds a touch of melancholy and depth to your playing.' },
  { name: 'Dm', label: 'D Minor', desc: 'A soulful chord that creates a beautiful contrast.' },
  { name: 'G7', label: 'G7 Dominant', desc: 'The perfect tension-builder for transitions.' },
];

export const CHORD_OPEN_STRINGS: Record<string, boolean[]> = {
  C: [true, true, true, false],
  G: [true, false, false, false],
  F: [false, true, false, true],
  Am: [false, true, true, true],
  Dm: [false, false, false, true],
  G7: [true, false, false, false],
};

export const STRING_NAMES = [
  { name: 'G', desc: '4th String (Top)', color: 'bg-primary/10 text-primary' },
  { name: 'C', desc: '3rd String', color: 'bg-secondary/10 text-secondary' },
  { name: 'E', desc: '2nd String', color: 'bg-tertiary/10 text-tertiary' },
  { name: 'A', desc: '1st String (Bottom)', color: 'bg-error/10 text-error' },
];

export const FINGER_NUMBERS = [
  { n: '1', name: 'Index' },
  { n: '2', name: 'Middle' },
  { n: '3', name: 'Ring' },
  { n: '4', name: 'Pinky' },
];