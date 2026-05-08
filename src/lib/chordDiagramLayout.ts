/** Layout helpers for ukulele chord diagrams (G–C–E–A, index 0 = G). */

/** @returns Horizontal center of string column as CSS percentage (four columns). */
export function stringCenterLeftPercent(stringIndex: number): string {
  const pct = ((stringIndex + 0.5) / 4) * 100;
  return `${pct}%`;
}

/** @returns Vertical center of fret band inside the diagram grid (five fret spaces below nut). */
export function fretCenterTopPercent(relativeFret: number): string {
  const clamped = Math.min(Math.max(relativeFret, 1), 5);
  const pct = ((clamped - 0.5) / 5) * 100;
  return `${pct}%`;
}

/** @returns First fret shown at the top of the diagram grid (1 = nut). */
export function computeDiagramStartFret(absoluteFrets: number[]): number {
  const pressed = absoluteFrets.filter((f) => f > 0);
  if (pressed.length === 0) return 1;
  const maxF = Math.max(...pressed);
  if (maxF <= 5) return 1;
  return Math.max(1, maxF - 4);
}
