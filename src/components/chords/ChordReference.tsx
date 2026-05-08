import { Hash, UserCircle, CircleDot } from 'lucide-react';
import { STRING_NAMES, FINGER_NUMBERS } from '../../data/chords';
import { cn } from '../../lib/utils';

/** Presentation density for sidebar vs full-width reference blocks. */
export type ReferenceCardVariant = 'default' | 'compact';

export interface StringNamesProps {
  variant?: ReferenceCardVariant;
}

export const StringNames = ({ variant = 'default' }: StringNamesProps) => (
  <section
    className={cn(
      'w-full text-left border border-outline-variant/30 editorial-shadow shrink-0 bg-surface-container-low',
      variant === 'compact'
        ? 'rounded-2xl p-4'
        : 'rounded-[32px] p-5 sm:p-8'
    )}
  >
    <h3
      className={cn(
        'font-headline font-bold flex text-primary',
        variant === 'compact' ? 'mb-3 items-start justify-start gap-2 text-lg' : 'items-center mb-4 gap-2 text-xl sm:mb-6 sm:gap-3 sm:text-2xl'
      )}
    >
      <Hash size={variant === 'compact' ? 18 : 22} className={cn('shrink-0', variant !== 'compact' && 'sm:h-6 sm:w-6')} />
      String Names
    </h3>
    <div className={variant === 'compact' ? 'space-y-2' : 'space-y-4'}>
      {STRING_NAMES.map((s) => (
        <div
          key={s.name}
          className={cn(
            'flex rounded-2xl transition-colors hover:bg-surface-container',
            variant === 'compact' ? 'items-start gap-3 p-2' : 'items-center gap-4 p-3'
          )}
        >
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-xl font-headline font-black',
              variant === 'compact' ? 'h-8 w-8 text-sm' : 'h-10 w-10',
              s.color
            )}
          >
            {s.name}
          </div>
          <span
            className={cn(
              'font-body font-medium text-on-surface-variant',
              variant === 'compact' && 'text-xs leading-snug'
            )}
          >
            {s.desc}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export interface FingerNumbersProps {
  variant?: ReferenceCardVariant;
}

export const FingerNumbers = ({ variant = 'default' }: FingerNumbersProps) => (
  <section
    className={cn(
      'flex w-full flex-col border border-outline-variant/30 editorial-shadow bg-surface-container-low text-left min-h-0',
      variant === 'compact'
        ? 'rounded-2xl p-4'
        : 'flex-1 rounded-[32px] p-5 sm:min-h-[240px] sm:p-8'
    )}
  >
    <h3
      className={cn(
        'flex shrink-0 font-headline font-bold text-secondary',
        variant === 'compact'
          ? 'mb-2 items-start justify-start gap-2 text-lg'
          : 'items-center mb-3 gap-2 text-xl sm:mb-4 sm:gap-3 sm:text-2xl'
      )}
    >
      <UserCircle size={variant === 'compact' ? 18 : 22} className={cn('shrink-0', variant !== 'compact' && 'sm:h-6 sm:w-6')} />
      Finger numbers
    </h3>
    <div
      className={cn(
        'grid grid-cols-2',
        variant === 'compact' ? 'justify-items-stretch gap-2' : 'content-center flex-1 gap-3 sm:gap-4'
      )}
    >
      {FINGER_NUMBERS.map((f) => (
        <div
          key={f.n}
          className={cn(
            'flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container',
            variant === 'compact'
              ? 'items-start justify-start p-2.5 text-left'
              : 'items-center justify-center p-4'
          )}
        >
          <span
            className={cn(
              'mb-0.5 font-headline font-black text-secondary',
              variant === 'compact' ? 'text-xl' : 'mb-1 text-3xl'
            )}
          >
            {f.n}
          </span>
          <span
            className={cn(
              'font-label font-bold uppercase tracking-widest text-outline text-[10px] sm:text-xs',
              variant === 'compact' && 'text-left'
            )}
          >
            {f.name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

/** Visual treatment for {@link ChordInfo}: standalone card vs denser sidebar card. */
export type ChordInfoVariant = 'default' | 'compact';

/** Props for the chord-diagram reading guide. */
export interface ChordInfoProps {
  variant?: ChordInfoVariant;
  /** Extra classes for the root section (for example flex layout when filling column height). */
  className?: string;
}

export const ChordInfo = ({ variant = 'default', className }: ChordInfoProps) => (
  <section
    className={cn(
      'flex min-h-0 w-full min-w-0 flex-col text-left',
      variant === 'compact' &&
        'shrink-0 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 editorial-shadow',
      variant === 'default' &&
        'rounded-[32px] border border-outline-variant/30 bg-surface-container-low p-5 sm:p-8 editorial-shadow',
      className
    )}
  >
    <h3
      className={cn(
        'flex flex-wrap items-start justify-start gap-2 font-headline font-bold text-tertiary',
        variant === 'default'
          ? 'mb-4 text-xl sm:mb-6 sm:gap-3 sm:text-2xl'
          : 'mb-3 text-lg'
      )}
    >
      <CircleDot
        size={variant === 'default' ? 22 : 18}
        className={cn('shrink-0', variant === 'default' && 'sm:h-6 sm:w-6')}
      />
      Reading chord diagrams
    </h3>
    <div
      className={cn(
        'font-body leading-relaxed break-words text-left text-on-surface-variant',
        variant === 'compact'
          ? 'space-y-3 text-xs sm:text-sm'
          : 'space-y-4 text-sm md:columns-2 md:gap-10'
      )}
    >
      <div className="break-inside-avoid space-y-3">
        <p>
          The numbers on the chord diagrams represent which finger to use when pressing the strings:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-on-surface-variant">
          <li><span className="font-semibold text-on-surface">1</span> = Index finger</li>
          <li><span className="font-semibold text-on-surface">2</span> = Middle finger</li>
          <li><span className="font-semibold text-on-surface">3</span> = Ring finger</li>
          <li><span className="font-semibold text-on-surface">4</span> = Pinky finger</li>
        </ul>
      </div>
      <div className="break-inside-avoid space-y-3">
        <p>
          So for example, in the <span className="font-semibold text-primary">G</span> chord, you&apos;d place your index finger (1) and middle finger (2) on the second fret, then your ring finger (3) on the third fret.
        </p>
        <p>
          The circles at the top (without numbers) mean that string is played open, no finger needed, just strum it freely.
        </p>
      </div>
      <div className="break-inside-avoid space-y-3">
        <p>
          The <span className="font-semibold text-on-surface">thick horizontal line</span> at the very top of the diagram represents the nut, the small ridge where the fretboard meets the headstock. Fret 1 is the first space below it, fret 2 is the next, and so on.
        </p>
        <p>
          The <span className="font-semibold text-on-surface">numbers along the left rail</span> (1, 2, 3 …) label each fret row so you always know how far up the neck to place your hand.
        </p>
      </div>
      <div className="break-inside-avoid space-y-3">
        <p>
          When a diagram shows fingers placed higher up the neck, the <span className="font-semibold text-on-surface">fret number on the left rail</span> tells you exactly where to position your hand. A "3" means your index finger starts at fret 3, not fret 1.
        </p>
        <p>
          The four columns in the diagram represent the four strings, labelled <span className="font-semibold text-on-surface">G – C – E – A</span> from left to right, matching standard ukulele tuning.
        </p>
      </div>
    </div>
  </section>
);
