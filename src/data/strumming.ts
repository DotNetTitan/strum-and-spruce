export type StrummingCategoryId = 'beginner' | 'island' | 'pop' | 'advanced';

/** Single strumming exercise with metadata for cards and audio. */
export interface StrummingPattern {
  id: string;
  category: StrummingCategoryId;
  name: string;
  difficulty: string;
  /** Compact notation; spaces separate beats (e.g. `D DU UDU`). */
  notation: string;
  desc: string;
  tips: string[];
}

/** Section order on the strumming lesson page. */
export const STRUMMING_CATEGORY_ORDER: StrummingCategoryId[] = ['beginner', 'island', 'pop', 'advanced'];

/** Display labels for category headings. */
export const STRUMMING_CATEGORY_LABELS: Record<StrummingCategoryId, string> = {
  beginner: 'Beginner',
  island: 'Island',
  pop: 'Pop',
  advanced: 'Advanced',
};

/** One-line description shown under each category heading. */
export const STRUMMING_CATEGORY_SUBTITLES: Record<StrummingCategoryId, string> = {
  beginner: 'Build steady timing before adding rhythm flavour.',
  island: 'The bounce and syncopation behind the ukulele\'s signature Hawaiian and reggae sound.',
  pop: 'Versatile grooves used in contemporary acoustic and singer-songwriter styles.',
  advanced: 'Complex subdivisions and percussive techniques for players with solid fundamentals.',
};

export const STRUMMING_PATTERNS: StrummingPattern[] = [
  {
    id: 'beginner-four-down',
    category: 'beginner',
    name: 'Four on the floor',
    difficulty: 'Beginner',
    notation: 'D D D D',
    desc: 'Four steady downstrokes. Build even timing before adding ups.',
    tips: ['Keep the elbow relaxed; drive from the wrist.', 'Aim for identical volume on each beat.'],
  },
  {
    id: 'beginner-alternate',
    category: 'beginner',
    name: 'Straight alternate',
    difficulty: 'Beginner',
    notation: 'D U D U',
    desc: 'The simplest down-up engine behind countless patterns.',
    tips: ['Keep strokes small and economical.', 'Accent beat one slightly if it helps your groove.'],
  },
  {
    id: 'island-classic',
    category: 'island',
    name: 'Classic island',
    difficulty: 'Island',
    notation: 'D DU UDU',
    desc: 'Iconic ukulele bounce: down, then down-up, then up-down-up.',
    tips: ['Treat “DU” as one rebound off the strings.', 'Let the downstroke on beat two stay short and light.'],
  },
  {
    id: 'island-double',
    category: 'island',
    name: 'Island double bounce',
    difficulty: 'Island',
    notation: 'D DUDU',
    desc: 'Driving variation with a doubled pulse before the syncopated tail.',
    tips: ['Keep the second downstroke compact so the hand can flip up quickly.', 'Practice slowly with a metronome first.'],
  },
  {
    id: 'pop-ddu-udu',
    category: 'pop',
    name: 'Pop groove',
    difficulty: 'Pop',
    notation: 'DDU UDU',
    desc: 'Radio-friendly feel used in countless acoustic covers.',
    tips: ['First two downs can share one tiny wrist impulse.', 'Lean into the “UDU” pocket after the rest.'],
  },
  {
    id: 'pop-chunk',
    category: 'pop',
    name: 'Chunk accent',
    difficulty: 'Pop',
    notation: 'D U X U',
    desc: 'Adds percussive ghost notes. X is a muted “chuck”.',
    tips: ['Relax the fretting hand to damp strings on X.', 'Keep your down-up motions level so chunks stay consistent.'],
  },
  {
    id: 'advanced-syncopated-chunk',
    category: 'advanced',
    name: 'Syncopated chunk',
    difficulty: 'Advanced',
    notation: 'D DUX UDU',
    desc: 'Combines driving downs with a chunked subdivision and island tail.',
    tips: ['Isolate “DUX” until the percussive hit lands clean.', 'Slow loops beat stopping: repeat two-bar cycles.'],
  },
  {
    id: 'island-offbeat-skank',
    category: 'island',
    name: 'Offbeat skank',
    difficulty: 'Island',
    notation: 'X D X D',
    desc: 'Percussive misses on alternating beats, foundation for reggae and island pocket.',
    tips: ['Relax the fretting hand on X so the chunk is short and dry.', 'Keep downs light so the backbeat pops.'],
  },
  {
    id: 'island-triple-subdivision',
    category: 'island',
    name: 'Triple subdivision bounce',
    difficulty: 'Island',
    notation: 'D DU DU DU',
    desc: 'Dense subdivision before resolving, builds timing inside each beat group.',
    tips: ['Practice one beat group at a time before chaining the bar.', 'Accent only the first downstroke until the inner pulses feel even.'],
  },
  {
    id: 'pop-straight-eighths',
    category: 'pop',
    name: 'Straight eighth motor',
    difficulty: 'Pop',
    notation: 'DUDU DUDU',
    desc: 'Continuous down-up eighths across two bars, “motor” strumming for uptempo songs.',
    tips: ['Keep motion tiny; metronome on eighth notes.', 'Relax the grip so the pick or nail returns evenly.'],
  },
  {
    id: 'advanced-swing-subdivisions',
    category: 'advanced',
    name: 'Heavy swing subdivisions',
    difficulty: 'Advanced',
    notation: 'D D UDU D D UDU',
    desc: 'Long–short grouping inspired by shuffle feel (approximation in straight notation).',
    tips: ['Lean into beat one and four slightly.', 'Loop slowly until the second “D D UDU” mirrors the first.'],
  },
];

export const PRO_TIPS = [
  { text: 'Use the back of your index fingernail for downstrokes and the pad for upstrokes.' },
  { text: "Keep your wrist loose, like you're shaking water off your hand." },
];
