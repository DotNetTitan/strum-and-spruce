/** Parses compact strumming notation into atomic strokes (spaces separate beats/groups). */
export function parseStrummingNotation(notation: string): ('D' | 'U' | 'X')[] {
  const tokens = notation.trim().split(/\s+/).filter(Boolean);
  const out: ('D' | 'U' | 'X')[] = [];
  for (const token of tokens) {
    for (const ch of token.toUpperCase()) {
      if (ch === 'D' || ch === 'U' || ch === 'X') {
        out.push(ch);
      }
    }
  }
  return out;
}

/**
 * Estimates playback duration in milliseconds for a strumming pattern, matching
 * the timing used by `playStrum` in `useUkuleleAudio`.
 *
 * Each stroke is one eighth note at `bpm`; each space between groups is an
 * additional rest slot of the same duration — matching the rest-slot logic in the hook.
 *
 * @param notation - Compact pattern such as `D DU UDU`.
 * @param bpm - Tempo in BPM (default 80), must match `playStrum`'s default.
 * @returns Rough playback length in ms for UI feedback timeouts.
 */
export function estimateStrumDurationMs(notation: string, bpm = 80): number {
  const groups = notation.trim().split(/\s+/).filter(Boolean);
  const strokeCount = groups.reduce((sum, g) => sum + parseStrummingNotation(g).length, 0);
  const restCount = Math.max(0, groups.length - 1);
  const msPerSlot = (60 / (bpm * 2)) * 1000;
  return Math.max(900, (strokeCount + restCount) * msPerSlot + 200);
}
