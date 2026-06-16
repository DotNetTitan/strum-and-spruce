import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Volume2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { StrummingPattern } from '../../data/strumming';

export interface PatternCardProps {
  /** Pattern content to render. */
  pattern: StrummingPattern;
  /** Whether this card represents the currently highlighted pattern (visual emphasis only). */
  isActive: boolean;
  /** Called when the user selects this pattern (card body click / keyboard). */
  onSelect: () => void;
  /** Called when the user taps "Play pattern". */
  onPlay: (bpm: number) => void;
  /** Whether this pattern is currently being played back. */
  isPlaying: boolean;
}

export const PatternCard = ({ pattern, isActive, onSelect, onPlay, isPlaying }: PatternCardProps) => {
  const { t } = useTranslation();
  const [bpm, setBpm] = useState(80);

  return (
    <div
      className={cn(
        'rounded-3xl border-2 transition-all overflow-hidden group',
        isActive ? 'border-primary bg-primary/5 shadow-lg' : 'border-outline-variant/20 bg-surface-container-low hover:border-outline-variant'
      )}
    >
      {/* Clickable region — selects the pattern */}
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        className={cn(
          'cursor-pointer p-5 sm:p-8 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40'
        )}
      >
        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="font-headline text-xl font-bold sm:text-2xl">{t(pattern.name)}</h3>
              <span className="rounded-full border border-outline-variant/15 bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-wider text-outline">
                {t(pattern.difficulty)}
              </span>
            </div>
            <p className="font-body text-sm text-on-surface-variant sm:text-base">{t(pattern.desc)}</p>
          </div>
        </div>

        <div className="mb-4 overflow-x-auto rounded-xl border border-outline-variant/10 bg-background/50 p-3 sm:p-4">
          <p className="whitespace-nowrap font-mono text-sm font-bold tracking-wide text-primary sm:text-lg md:text-xl">
            {pattern.notation
              .trim()
              .split(/\s+/)
              .filter(Boolean)
              .join(' - ')}
          </p>
        </div>

        {pattern.tips.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-on-surface-variant">
            {pattern.tips.map((tip) => (
              <li key={tip}>{t(tip)}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Play button and tempo slider — separate from the select area to avoid double-firing */}
      <div className="px-5 pb-6 sm:px-8 sm:pb-8 md:px-5">
        <div className="mb-5 flex items-start gap-1.5 rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-2 text-xs text-on-surface-variant">
          <Info size={12} className="mt-0.5 shrink-0 text-tertiary" />
          <span>{t('Play pattern audio is a reference guide only. It will not sound exactly like a real ukulele.')}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(bpm);
          }}
          className={cn(
            'mb-5 flex items-center gap-2 rounded-xl px-5 py-2.5 font-label text-xs font-bold transition-all shadow-sm active:scale-95',
            isPlaying
              ? 'bg-primary/80 text-on-primary cursor-not-allowed'
              : 'bg-primary text-on-primary hover:opacity-90'
          )}
        >
          {isPlaying ? (
            <>
              <Volume2 size={14} className="shrink-0 animate-pulse" />
              {t('Playing...')}
            </>
          ) : (
            <>
              <Play size={14} className="shrink-0" />
              {t('Play pattern')}
            </>
          )}
        </button>

        {/* Tempo slider */}
        <div className="mt-4">
          <div className="mb-2 flex justify-end font-body text-sm text-on-surface-variant">{bpm} BPM</div>
          <input
            type="range"
            min="40"
            max="120"
            step="1"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            disabled={isPlaying}
            className="mb-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-outline-variant/30 accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex justify-between font-body text-xs text-on-surface-variant">
            <span>{t('Slow')}</span>
            <span>{t('Medium')}</span>
            <span>{t('Fast')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
