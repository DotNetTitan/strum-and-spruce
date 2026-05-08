/**
 * Chord library types and catalog for G–C–E–A tuning (string index 0 = G).
 */

export type ChordCategoryId = 'beginner' | 'intermediate' | 'seventh';

/** Single finger placement on the fretboard (absolute fret from nut). */
export interface ChordFingerPlacement {
  /** String index 0 = G (4th) through 3 = A (1st). */
  stringIndex: 0 | 1 | 2 | 3;
  /** Absolute fret number (from nut). */
  fret: number;
  /** Finger number shown on the dot. */
  finger: '1' | '2' | '3' | '4';
}

/** Full chord definition for diagrams, filters, and audio. */
export interface ChordDefinition {
  name: string;
  label: string;
  desc: string;
  categories: ChordCategoryId[];
  /** Per string G–C–E–A: -1 = muted, 0 = open, >0 = fret. */
  frets: [number, number, number, number];
  placements: ChordFingerPlacement[];
}

/** Summary row for lists (derived from definitions). */
export interface ChordData {
  name: string;
  label: string;
  desc: string;
}

export const CHORD_DEFINITIONS: ChordDefinition[] = [
  {
    name: 'C',
    label: 'C Major',
    desc: 'The brightest and most versatile chord in your arsenal.',
    categories: ['beginner'],
    frets: [0, 0, 0, 3],
    placements: [{ stringIndex: 3, fret: 3, finger: '3' }],
  },
  {
    name: 'G',
    label: 'G Major',
    desc: 'A warm, resonant chord that pairs perfectly with C.',
    categories: ['beginner'],
    frets: [0, 2, 3, 2],
    placements: [
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 3, finger: '3' },
      { stringIndex: 3, fret: 2, finger: '2' },
    ],
  },
  {
    name: 'F',
    label: 'F Major',
    desc: 'A fundamental chord for thousands of popular songs.',
    categories: ['beginner'],
    frets: [2, 0, 1, 0],
    placements: [
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 0, fret: 2, finger: '2' },
    ],
  },
  {
    name: 'Am',
    label: 'A Minor',
    desc: 'Adds a touch of melancholy and depth to your playing.',
    categories: ['beginner'],
    frets: [2, 0, 0, 0],
    placements: [{ stringIndex: 0, fret: 2, finger: '2' }],
  },
  {
    name: 'Dm',
    label: 'D Minor',
    desc: 'A soulful chord that creates a beautiful contrast.',
    categories: ['beginner'],
    frets: [2, 2, 1, 0],
    placements: [
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '2' },
      { stringIndex: 0, fret: 2, finger: '3' },
    ],
  },
  {
    name: 'Em',
    label: 'E Minor',
    desc: 'Soft and introspective, common in folk and pop progressions.',
    categories: ['beginner'],
    frets: [0, 4, 3, 2],
    placements: [
      { stringIndex: 3, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 3, finger: '2' },
      { stringIndex: 1, fret: 4, finger: '3' },
    ],
  },
  {
    name: 'A',
    label: 'A Major',
    desc: 'Bright and ringing; pairs naturally with D and E7.',
    categories: ['beginner'],
    frets: [2, 1, 0, 0],
    placements: [
      { stringIndex: 1, fret: 1, finger: '1' },
      { stringIndex: 0, fret: 2, finger: '2' },
    ],
  },
  {
    name: 'D',
    label: 'D Major',
    desc: 'A compact shape that anchors many upbeat songs.',
    categories: ['beginner'],
    frets: [2, 2, 2, 0],
    placements: [
      { stringIndex: 0, fret: 2, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 2, finger: '1' },
    ],
  },
  {
    name: 'G7',
    label: 'G7 Dominant',
    desc: 'The perfect tension-builder pulling toward C.',
    categories: ['beginner', 'seventh'],
    frets: [0, 2, 1, 2],
    placements: [
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '2' },
      { stringIndex: 3, fret: 2, finger: '3' },
    ],
  },
  {
    name: 'E7',
    label: 'E7 Dominant',
    desc: 'Adds bluesy pull toward A and swing rhythms.',
    categories: ['beginner'],
    frets: [1, 2, 0, 2],
    placements: [
      { stringIndex: 0, fret: 1, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '2' },
      { stringIndex: 3, fret: 2, finger: '3' },
    ],
  },
  {
    name: 'Dsus4',
    label: 'D Suspended 4th',
    desc: 'Classic sus grip over D (D–G–A voicing; omits the major third).',
    categories: ['beginner'],
    frets: [0, 2, 3, 0],
    placements: [
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 3, finger: '2' },
    ],
  },
  {
    name: 'Cmaj7',
    label: 'C Major 7',
    desc: 'Open C with major seventh on top, dreamy resolution chord.',
    categories: ['intermediate'],
    frets: [0, 0, 0, 2],
    placements: [{ stringIndex: 3, fret: 2, finger: '2' }],
  },
  {
    name: 'Gmaj7',
    label: 'G Major 7',
    desc: 'Major seventh color built from open G with a three-string bar.',
    categories: ['intermediate'],
    frets: [0, 2, 2, 2],
    placements: [
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 2, finger: '1' },
      { stringIndex: 3, fret: 2, finger: '1' },
    ],
  },
  {
    name: 'Fmaj7',
    label: 'F Major 7',
    desc: 'Standard omit-5 voicing: F–A–E plus open A (common chart grip).',
    categories: ['intermediate'],
    frets: [2, 4, 1, 0],
    placements: [
      { stringIndex: 0, fret: 2, finger: '2' },
      { stringIndex: 1, fret: 4, finger: '4' },
      { stringIndex: 2, fret: 1, finger: '1' },
    ],
  },
  {
    name: 'Am7',
    label: 'A Minor 7',
    desc: 'Four-note minor seventh, backbone of jazzier progressions.',
    categories: ['intermediate'],
    frets: [2, 4, 3, 3],
    placements: [
      { stringIndex: 0, fret: 2, finger: '1' },
      { stringIndex: 1, fret: 4, finger: '4' },
      { stringIndex: 2, fret: 3, finger: '3' },
      { stringIndex: 3, fret: 3, finger: '2' },
    ],
  },
  {
    name: 'Dm7',
    label: 'D Minor 7',
    desc: 'Full minor seventh spelling (D–F–A–C) in one compact grip.',
    categories: ['intermediate'],
    frets: [2, 2, 1, 3],
    placements: [
      { stringIndex: 0, fret: 2, finger: '2' },
      { stringIndex: 1, fret: 2, finger: '3' },
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 3, fret: 3, finger: '4' },
    ],
  },
  {
    name: 'Cm7',
    label: 'C Minor 7',
    desc: 'Clean barred minor seventh movable template.',
    categories: ['intermediate'],
    frets: [3, 3, 3, 3],
    placements: [
      { stringIndex: 0, fret: 3, finger: '1' },
      { stringIndex: 1, fret: 3, finger: '1' },
      { stringIndex: 2, fret: 3, finger: '1' },
      { stringIndex: 3, fret: 3, finger: '1' },
    ],
  },
  {
    name: 'Asus2',
    label: 'A Suspended 2nd',
    desc: 'A–E–B voicing; resolves beautifully back to A major.',
    categories: ['intermediate'],
    frets: [2, 4, 0, 2],
    placements: [
      { stringIndex: 0, fret: 2, finger: '1' },
      { stringIndex: 1, fret: 4, finger: '4' },
      { stringIndex: 3, fret: 2, finger: '2' },
    ],
  },
  {
    name: 'F7',
    label: 'F7 Dominant',
    desc: 'Dominant pull toward B♭ or turnaround harmony around F.',
    categories: ['intermediate', 'seventh'],
    frets: [2, 3, 1, 3],
    placements: [
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 0, fret: 2, finger: '2' },
      { stringIndex: 1, fret: 3, finger: '3' },
      { stringIndex: 3, fret: 3, finger: '4' },
    ],
  },
  {
    name: 'B7',
    label: 'B7 Dominant',
    desc: 'Standard dominant resolving to E; omits the fifth on this grip.',
    categories: ['intermediate', 'seventh'],
    frets: [2, 3, 2, 2],
    placements: [
      { stringIndex: 0, fret: 2, finger: '3' },
      { stringIndex: 1, fret: 3, finger: '2' },
      { stringIndex: 2, fret: 2, finger: '1' },
      { stringIndex: 3, fret: 2, finger: '1' },
    ],
  },
  {
    name: 'Bb',
    label: 'B♭ Major',
    desc: 'Essential for jazzier keys and smooth transitions.',
    categories: ['intermediate'],
    frets: [3, 2, 1, 1],
    placements: [
      { stringIndex: 2, fret: 1, finger: '1' },
      { stringIndex: 3, fret: 1, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '2' },
      { stringIndex: 0, fret: 3, finger: '3' },
    ],
  },
  {
    name: 'Bm',
    label: 'B Minor',
    desc: 'A movable minor shape that unlocks many keys.',
    categories: ['intermediate'],
    frets: [4, 2, 2, 2],
    placements: [
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 2, finger: '1' },
      { stringIndex: 3, fret: 2, finger: '1' },
      { stringIndex: 0, fret: 4, finger: '4' },
    ],
  },
  {
    name: 'E',
    label: 'E Major',
    desc: 'Big and bold, great for rock and singalong choruses.',
    categories: ['intermediate'],
    frets: [4, 4, 4, 2],
    placements: [
      { stringIndex: 3, fret: 2, finger: '1' },
      { stringIndex: 0, fret: 4, finger: '2' },
      { stringIndex: 1, fret: 4, finger: '3' },
      { stringIndex: 2, fret: 4, finger: '4' },
    ],
  },
  {
    name: 'Cm',
    label: 'C Minor',
    desc: 'Moody color against its major cousin.',
    categories: ['intermediate'],
    frets: [0, 3, 3, 3],
    placements: [
      { stringIndex: 1, fret: 3, finger: '3' },
      { stringIndex: 2, fret: 3, finger: '3' },
      { stringIndex: 3, fret: 3, finger: '3' },
    ],
  },
  {
    name: 'Fm',
    label: 'F Minor',
    desc: 'Rich minor harmony for intros and bridges.',
    categories: ['intermediate'],
    frets: [1, 3, 3, 3],
    placements: [
      { stringIndex: 0, fret: 1, finger: '1' },
      { stringIndex: 1, fret: 3, finger: '3' },
      { stringIndex: 2, fret: 3, finger: '3' },
      { stringIndex: 3, fret: 3, finger: '3' },
    ],
  },
  {
    name: 'C7',
    label: 'C7 Dominant',
    desc: 'Classic turnaround chord before F or back to Fmaj7 territory.',
    categories: ['seventh'],
    frets: [0, 0, 0, 1],
    placements: [{ stringIndex: 3, fret: 1, finger: '4' }],
  },
  {
    name: 'D7',
    label: 'D7 Dominant',
    desc: 'Pushes strongly toward G, swing and blues staple.',
    categories: ['seventh'],
    frets: [2, 2, 2, 3],
    placements: [
      { stringIndex: 0, fret: 2, finger: '1' },
      { stringIndex: 1, fret: 2, finger: '1' },
      { stringIndex: 2, fret: 2, finger: '1' },
      { stringIndex: 3, fret: 3, finger: '4' },
    ],
  },
  {
    name: 'A7',
    label: 'A7 Dominant',
    desc: 'Country and blues favorite resolving to D.',
    categories: ['seventh'],
    frets: [0, 1, 0, 0],
    placements: [{ stringIndex: 1, fret: 1, finger: '1' }],
  },
];

/** Ordered list for navigation and legacy imports. */
export const CHORDS_LIST: ChordData[] = CHORD_DEFINITIONS.map(({ name, label, desc }) => ({
  name,
  label,
  desc,
}));

/** Frets per chord name for Web Audio (same order as strings G–C–E–A). */
export const CHORD_AUDIO_FRETS: Record<string, [number, number, number, number]> = Object.fromEntries(
  CHORD_DEFINITIONS.map((c) => [c.name, c.frets])
) as Record<string, [number, number, number, number]>;

/** Lookup full definition by symbol. */
export function getChordDefinition(name: string): ChordDefinition | undefined {
  return CHORD_DEFINITIONS.find((c) => c.name === name);
}

/** Category filter for the chord library (`all` = show every category). */
export type ChordLibraryFilterCategory = 'all' | ChordCategoryId;

/**
 * Chords that match the sidebar category filter and optional search (symbol or label substring).
 */
export function filterChordDefinitions(
  chords: ChordDefinition[],
  category: ChordLibraryFilterCategory,
  query: string
): ChordDefinition[] {
  const q = query.trim().toLowerCase();
  return chords.filter((c) => {
    if (category !== 'all' && !c.categories.includes(category)) return false;
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q);
  });
}

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
