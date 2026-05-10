import { Fragment, useCallback, useState } from 'react';
import { ChevronDown, Library } from 'lucide-react';
import { cn } from '../lib/utils';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { PatternCard, ProTips } from '../components/strumming';
import {
  PRO_TIPS,
  STRUMMING_CATEGORY_LABELS,
  STRUMMING_CATEGORY_ORDER,
  STRUMMING_CATEGORY_SUBTITLES,
  STRUMMING_PATTERNS,
  type StrummingCategoryId,
  type StrummingPattern,
} from '../data/strumming';
import { useUkuleleAudio } from '../hooks/useUkuleleAudio';
import { estimateStrumDurationMs } from '../lib/strummingNotation';

const PLAY_CHORD = 'C';

export const Strumming = () => {
  const [activePattern, setActivePattern] = useState(STRUMMING_PATTERNS[0]?.id ?? '');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<StrummingCategoryId>>(new Set());
  const { playStrum } = useUkuleleAudio();

  const patternsByCategory = STRUMMING_CATEGORY_ORDER.reduce<Record<StrummingCategoryId, StrummingPattern[]>>(
    (acc, cat) => {
      acc[cat] = STRUMMING_PATTERNS.filter((p) => p.category === cat);
      return acc;
    },
    { beginner: [], island: [], pop: [], advanced: [] }
  );

  const toggleCategory = (category: StrummingCategoryId) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handlePlay = useCallback((pattern: StrummingPattern, bpm: number) => {
    if (playingId === pattern.id) return;
    setPlayingId(pattern.id);
    playStrum(PLAY_CHORD, pattern.notation, bpm);
    const duration = estimateStrumDurationMs(pattern.notation, bpm) + 500;
    setTimeout(() => setPlayingId(null), duration);
  }, [playingId, playStrum]);

  return (
    <div className="pt-20 sm:pt-24 pb-6 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <LessonHeader
        moduleLabel="Module 03: Rhythm"
        moduleVariant="rhythm"
        title="Strumming"
        subtitle="Patterns"
        description="Rhythm is the heartbeat of the ukulele. Master these patterns to bring your chords to life."
        accentColor="text-tertiary"
        stacked={true}
      />

      {/* Notation legend, explains D / U / X before users see any pattern */}
      <div className="mb-10 flex flex-wrap gap-3 rounded-2xl border border-outline-variant/20 bg-surface-container-low px-5 py-4">
        {[
          { symbol: 'D', label: 'Downstroke', desc: 'brush strings toward the floor' },
          { symbol: 'U', label: 'Upstroke', desc: 'brush strings toward the ceiling' },
          { symbol: 'X', label: 'Muted chuck', desc: 'damp strings, strum for a percussive click' },
        ].map(({ symbol, label, desc }) => (
          <div key={symbol} className="flex items-center gap-3 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
              {symbol}
            </span>
            <span className="font-body text-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">{label}</span>, {desc}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 space-y-10 sm:space-y-12">
          {STRUMMING_CATEGORY_ORDER.map((category) => {
            const isExpanded = expandedCategories.has(category);
            return (
              <section key={category} className="space-y-4 sm:space-y-6">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between border-b border-outline-variant/20 pb-3 hover:opacity-80 transition-opacity"
                >
                  <div className="text-left">
                    <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
                      {STRUMMING_CATEGORY_LABELS[category]}
                    </h2>
                    <p className="mt-1 font-body text-sm text-on-surface-variant">
                      {STRUMMING_CATEGORY_SUBTITLES[category]}
                    </p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={cn(
                      'shrink-0 text-primary transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="space-y-4 sm:space-y-6">
                    {patternsByCategory[category].map((p) => (
                      <Fragment key={p.id}>
                        <PatternCard
                          pattern={p}
                          isActive={activePattern === p.id}
                          onSelect={() => setActivePattern(p.id)}
                          onPlay={(bpm) => handlePlay(p, bpm)}
                          isPlaying={playingId === p.id}
                        />
                      </Fragment>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="lg:col-span-4">
          <ProTips tips={PRO_TIPS} />
        </div>
      </div>
      <LessonFooter
        backPath="/lessons/chords"
        backLabel="Chords & Fingers"
        nextPath="/lessons/songs"
        nextLabel="Song Library"
        nextIcon={Library}
      />
    </div>
  );
};
