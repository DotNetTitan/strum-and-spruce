/**
 * Editorial topic shown on the Technique & troubleshooting lesson page.
 */
export interface TechniqueTopic {
  /** Stable identifier for list keys. */
  id: string;
  /** Short headline for the card. */
  title: string;
  /** One-line context below the title. */
  summary: string;
  /** Actionable bullets for practice and troubleshooting. */
  tips: string[];
}

/**
 * Technique and troubleshooting cards covering posture, fretting mechanics, and common issues.
 * Song charts are intentionally omitted.
 */
export const TECHNIQUE_TOPICS: TechniqueTopic[] = [
  {
    id: 'clean-frets',
    title: 'Clean frets (no buzz)',
    summary: 'Buzz usually means pressure, placement, or finger angle, not bad gear.',
    tips: [
      'Press just behind the fret wire (not on top of it), using your fingertips.',
      'Curve your fingers so neighbouring strings can ring freely.',
      'If a note still buzzes, increase pressure slightly, then relax until it is the minimum needed.',
    ],
  },
  {
    id: 'thumb-placement',
    title: 'Thumb placement',
    summary: 'Your thumb provides the counter-pressure that makes fretting efficient.',
    tips: [
      'Keep the pad of the thumb on the back of the neck, roughly opposite your index or middle finger.',
      'Avoid letting the thumb creep over the top edge of the fretboard on basic chord shapes.',
      'If your wrist aches, reset your posture: elbow slightly away from the body, neck angled upward a little.',
    ],
  },
  {
    id: 'tension',
    title: 'Relax excess tension',
    summary: 'Tension steals endurance and makes chord changes feel sticky.',
    tips: [
      'Shake out your hands between takes; keep shoulders down and jaw unclenched.',
      'After landing a shape, intentionally release 10–20% of pressure while listening for clean notes.',
      'Practice slow switches between two chords until the motion feels boring. That is when it becomes reliable.',
    ],
  },
  {
    id: 'strumming-motion',
    title: 'Strumming motion',
    summary: 'Small motions stay in time; big motions tire you out.',
    tips: [
      'Lead from the wrist with a loose hinge; keep the elbow relatively quiet at moderate tempos.',
      'Imagine brushing across the strings: consistent depth beats hitting hard.',
      'Stay parallel to the soundhole so each string speaks evenly.',
    ],
  },
  {
    id: 'nail-vs-pad',
    title: 'Nail vs. finger pad',
    summary: 'Tone changes with contact point. Pick what matches your genre and volume preference.',
    tips: [
      'Pads often sound warmer and softer; nails or a flesh-nail edge can sound brighter and louder.',
      'Aim for a repeatable contact point on the index finger before worrying about refinement.',
      'Long nails can snag on upstrokes: trim gradually until downstrokes and upstrokes feel even.',
    ],
  },
  {
    id: 'intonation-pitch',
    title: 'Sharp notes & tuning checks',
    summary: 'If chords sound almost right, suspect tuning before blaming your ears.',
    tips: [
      'Tune every session; new strings stretch and drift faster than settled ones.',
      'Pressing too hard (especially near the nut) can sharpen pitches slightly.',
      'A capo placed too far from the fret adds both buzz and pitch instability.',
    ],
  },
  {
    id: 'finger-soreness',
    title: 'Finger soreness',
    summary: 'Some tenderness is normal; sharp pain is a signal to reset.',
    tips: [
      'Short daily sessions beat rare marathon practices for building skin tolerance.',
      'If fingertips sting, lighten pressure and prioritize accuracy over duration.',
      'Stop for joint pain, numbness, or sharp catching. Adjust posture and consult a teacher if it persists.',
    ],
  },
  {
    id: 'muted-chuck',
    title: 'The muted chuck (X stroke)',
    summary: 'A percussive "thwack" with no pitch. Pure rhythm, used to add a backbeat groove.',
    tips: [
      'Lightly rest your fretting-hand fingers flat against all four strings to damp them, then strum normally.',
      'The motion is identical to a downstroke; only the fretting hand changes. Keep the strumming arm relaxed.',
      'Start slow: alternate D and X (D X D X) until the chuck lands clean and dry before adding it to full patterns.',
      'In notation it appears as X, for example in the "Chunk accent" pattern D U X U.',
    ],
  },
];
