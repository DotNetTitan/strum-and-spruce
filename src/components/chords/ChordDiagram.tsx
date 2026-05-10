import { Fragment } from 'react';
import type { ChordDefinition } from '../../data/chords';
import {
  computeDiagramStartFret,
  fretCenterTopPercent,
  stringCenterLeftPercent,
} from '../../lib/chordDiagramLayout';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

/** Props for {@link UkuleleChordDiagram}. */
export interface UkuleleChordDiagramProps {
  /** Chord shape to render (nut row, frets, finger dots). */
  chord: ChordDefinition;
  /** Merged onto the diagram shell (e.g. wider max-width on the lesson page). */
  className?: string;
}

const STRING_LABELS = ['G', 'C', 'E', 'A'] as const;
const REVERSED_STRING_LABELS = ['A', 'E', 'C', 'G'] as const;

/**
 * Full fretboard diagram: nut markers (open / mute), fret labels, finger dots.
 * Finger dots are non-interactive (no preview/audio).
 */
export const UkuleleChordDiagram = ({ chord, className }: UkuleleChordDiagramProps) => {
  const { isLeftHanded } = useApp();
  const startFret = computeDiagramStartFret([
    ...chord.frets.filter((f) => f > 0),
    ...chord.placements.map((p) => p.fret),
  ]);
  const fretLabels = Array.from({ length: 5 }, (_, i) => startFret + i);

  const labels = isLeftHanded ? REVERSED_STRING_LABELS : STRING_LABELS;
  const frets = isLeftHanded ? [...chord.frets].reverse() : chord.frets;
  const placements = isLeftHanded
    ? chord.placements.map((p) => ({ ...p, stringIndex: 3 - p.stringIndex }))
    : chord.placements;

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[min(100%,320px)] shrink-0 flex-col gap-2 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-4 shadow-sm sm:max-w-[320px] md:mx-0',
        className
      )}
    >
      <div className="flex px-3">
        {labels.map((s) => (
          <div key={s} className="flex min-w-0 flex-1 justify-center">
            <span className="font-label text-xs font-bold text-outline">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex min-h-[28px] items-center px-3">
        {frets.map((fret, i) => (
          <div key={i} className="flex flex-1 justify-center">
            {fret === -1 ? (
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center font-headline text-lg font-bold leading-none text-outline"
                title="Muted string"
                aria-label="Muted: do not play this string"
              >
                ×
              </span>
            ) : fret === 0 ? (
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/70 bg-transparent shadow-sm"
                title="Open string"
                aria-label="Open string: strum without fretting"
              />
            ) : (
              <span className="block h-7 w-7 shrink-0" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className="relative mt-1 w-full shrink-0 pl-7 pr-3 sm:pl-8">
        <div className="relative aspect-[5/6] w-full border-t-4 border-primary/20">
          {fretLabels.map((n, i) => (
            <span
              key={n}
              className="pointer-events-none absolute -left-6 w-5 -translate-y-1/2 text-right font-label text-[10px] font-bold text-outline sm:-left-7 sm:text-xs"
              style={{ top: fretCenterTopPercent(i + 1) }}
            >
              {n}
            </span>
          ))}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
            {[0, 1, 2, 3].map((col) => (
              <div key={col} className="flex h-full justify-center">
                <div className="h-full w-px bg-outline/40" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {[1, 2, 3, 4, 5].map((line) => (
              <div key={line} className="h-px w-full bg-outline/20" />
            ))}
          </div>
          {placements.map((p) => {
            const rel = p.fret - startFret + 1;
            const left = stringCenterLeftPercent(p.stringIndex);
            const top = fretCenterTopPercent(rel);
            const k = `${p.stringIndex}-${p.fret}-${p.finger}`;
            return (
              <Fragment key={k}>
                <FingerDot left={left} top={top} finger={p.finger} />
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="pt-1 text-center">
        <span className="font-headline text-3xl font-extrabold text-primary">{chord.name}</span>
      </div>
    </div>
  );
};

interface FingerDotProps {
  left: string;
  top: string;
  finger: string;
}

/** Absolute-positioned finger label on the diagram grid (non-interactive). */
export const FingerDot = ({ left, top, finger }: FingerDotProps) => (
  <div
    className={cn(
      'pointer-events-none absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary font-headline font-bold text-on-primary shadow-lg'
    )}
    style={{ left, top }}
  >
    {finger}
  </div>
);
