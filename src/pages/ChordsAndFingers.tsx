import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';
import { Music, Volume2, Ruler, Info } from 'lucide-react';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { useApp } from '../context/AppContext';
import {
  ChordLibraryPanel,
  StringNames,
  FingerNumbers,
  ChordInfo,
  UkuleleChordDiagram,
} from '../components/chords';
import {
  CHORD_DEFINITIONS,
  filterChordDefinitions,
  getChordDefinition,
  type ChordLibraryFilterCategory,
} from '../data/chords';
import { useUkuleleAudio } from '../hooks/useUkuleleAudio';

export const ChordsAndFingers = () => {
  const [currentChord, setCurrentChord] = useState('C');
  const [filterQuery, setFilterQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ChordLibraryFilterCategory>('beginner');
  const { playChord } = useUkuleleAudio();
  const { isLeftHanded } = useApp();
  const tuningLabel = isLeftHanded ? 'A-E-C-G' : 'G-C-E-A';

  const filteredChords = useMemo(
    () => filterChordDefinitions(CHORD_DEFINITIONS, filterCategory, filterQuery),
    [filterCategory, filterQuery]
  );

  const selectedChordData = getChordDefinition(currentChord) ?? CHORD_DEFINITIONS[0];

  const nextChord = () => {
    if (filteredChords.length === 0) return;
    const idx = filteredChords.findIndex((c) => c.name === currentChord);
    const nextIdx = idx >= 0 ? (idx + 1) % filteredChords.length : 0;
    setCurrentChord(filteredChords[nextIdx].name);
  };

  const nextChordDisabled = filteredChords.length === 0;

  return (
    <>
      <Helmet>
        <title>Ukulele Chord Library | Strum & Spruce</title>
        <meta name="description" content="Visual guides for essential ukulele chords and finger placements for beginners." />
        <link rel="canonical" href="https://strumandspruce.com/lessons/chords" />
      </Helmet>
      <div className="pt-20 sm:pt-24 pb-6 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <LessonHeader
        moduleLabel="Module 02: Chords"
        moduleVariant="technique"
        title="Chords"
        subtitle="and fingers"
        description="Master the fundamental finger placements and transitions that form the backbone of every great ukulele performance."
        accentColor="text-tertiary"
        stacked={true}
      />

      <div className="mb-12 sm:mb-20">
        <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
          {/* Narrow column: chord picker + quick references */}
          <aside className="order-2 flex w-full shrink-0 flex-col items-stretch gap-5 text-left lg:order-1 lg:w-[min(19rem,100%)] lg:max-w-[19rem]">
            <div className="rounded-[28px] border border-outline-variant/25 bg-surface-container-low p-5 sm:p-6 editorial-shadow">
              <ChordLibraryPanel
                filteredChords={filteredChords}
                filterQuery={filterQuery}
                onFilterQueryChange={setFilterQuery}
                filterCategory={filterCategory}
                onFilterCategoryChange={setFilterCategory}
                currentChord={currentChord}
                onSelect={setCurrentChord}
              />
            </div>
            <StringNames variant="compact" />
            <FingerNumbers variant="compact" />
          </aside>

          {/* Diagram card + reading guide (reading guide is hidden on mobile; a copy renders below the two-column container instead). */}
          <div className="order-1 flex min-h-0 min-w-0 flex-1 flex-col gap-6 text-left lg:order-2">
            <div className="relative shrink-0 overflow-hidden rounded-3xl bg-surface-container p-6 md:p-8 editorial-shadow group">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary-container opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-10 flex min-w-0 flex-col gap-6 md:flex-row md:items-start md:gap-10">
                <UkuleleChordDiagram
                  chord={selectedChordData}
                  className="mx-auto max-w-[min(100%,280px)] sm:max-w-[300px] md:mx-0"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 md:pt-1">
                  <div className="flex flex-col gap-4">
                    <header className="min-w-0">
                      <h2 className="mb-2 font-headline text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                        {selectedChordData.label}
                      </h2>
                      <p className="max-w-prose font-body text-sm text-on-surface-variant opacity-90 sm:text-base">
                        {selectedChordData.desc}
                      </p>
                    </header>

                    <div className="space-y-2">
                      <span className="font-label text-xs uppercase tracking-widest text-outline block font-bold">
                        Tuning
                      </span>
                      <div className="flex gap-2">
                        <div className="rounded-full bg-surface-container-highest px-3 py-1 text-sm font-bold text-primary">
                          {tuningLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-1.5 rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-2 text-xs text-on-surface-variant">
                      <Info size={12} className="mt-0.5 shrink-0 text-tertiary" />
                      <span>Play chord audio is a reference guide only. It will not sound exactly like a real ukulele.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => playChord(currentChord)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-label text-xs font-bold text-on-primary transition-all hover:opacity-90 active:scale-95 whitespace-nowrap shadow-sm"
                    >
                      <Volume2 size={14} className="shrink-0" />
                      Play chord
                    </button>
                    <button
                      type="button"
                      disabled={nextChordDisabled}
                      onClick={nextChord}
                      className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/30 px-6 py-3 text-center font-label text-xs font-bold text-outline transition-all hover:border-primary hover:bg-surface-container hover:text-primary whitespace-nowrap disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Music size={14} className="shrink-0" />
                      Switch to next chord
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading guide: only visible inside the column on desktop */}
            <ChordInfo variant="default" className="min-h-0 flex-1 hidden lg:flex" />
          </div>
        </div>

        {/* Reading guide: only visible on mobile, below both columns so it doesn't interrupt the picker */}
        <ChordInfo variant="default" className="mt-2 lg:hidden" />
      </div>

      <LessonFooter
        backPath="/lessons/anatomy"
        backLabel="Anatomy Guide"
        nextPath="/lessons/strumming"
        nextLabel="Master Strumming Patterns"
        nextIcon={Music}
      />
    </div>
    </>
  );
};
