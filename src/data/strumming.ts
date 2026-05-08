export interface StrummingPattern {
  id: string;
  name: string;
  desc: string;
  rhythm: string;
}

export const STRUMMING_PATTERNS: StrummingPattern[] = [
  { id: 'down', name: 'Straight Down', desc: 'The simplest stroke. Focus on a relaxed wrist.', rhythm: 'D - D - D - D' },
  { id: 'island', name: 'Island Bounce', desc: 'The classic ukulele rhythm: Down, Down-Up, Up-Down-Up.', rhythm: 'D - D U - U D U' },
];

export const PRO_TIPS = [
  { text: 'Use the back of your index fingernail for downstrokes and the pad for upstrokes.' },
  { text: 'Keep your wrist loose, like you\'re shaking water off your hand.' },
];