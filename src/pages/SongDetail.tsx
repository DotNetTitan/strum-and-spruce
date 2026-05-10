import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { getSongById } from '../data/songs';
import { getChordDefinition } from '../data/chords';
import { UkuleleChordDiagram } from '../components/chords/ChordDiagram';
import { ChordSheet } from '../components/songs/ChordSheet';
import { cn } from '../lib/utils';

const difficultyStyles = {
  Beginner: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  Intermediate: 'bg-secondary-container text-on-secondary-container'
};

type ViewMode = 'chordmap' | 'chordsheet' | 'watch';

const TAB_BUTTON_STYLE = 'px-4 py-2 rounded-xl font-label text-xs font-bold uppercase tracking-wider transition-all border-2';

export const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const song = id ? getSongById(id) : undefined;
  const [viewMode, setViewMode] = useState<ViewMode>('chordmap');

  if (!song) {
    return <Navigate to="/lessons/songs" replace />;
  }

  const chordDefinitions = song.chords
    .map(chord => getChordDefinition(chord))
    .filter((chord): chord is NonNullable<typeof chord> => chord !== undefined);

  const hasChordSheet = !!song.chordSheet;
  const hasYoutube = !!song.youtubeId;

  const showTabs = hasChordSheet || hasYoutube;

  return (
    <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-5xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <Link
        to="/lessons/songs"
        className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-headline text-sm mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Song Library
      </Link>

      <header className="mb-10 sm:mb-14 max-w-2xl w-full min-w-0">
        <span className={cn(
          "inline-block px-3 py-1 rounded-full font-label text-[10px] font-bold tracking-widest uppercase mb-4",
          difficultyStyles[song.difficulty]
        )}>
          {song.difficulty}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold text-primary tracking-tight leading-[1.1] mb-4 sm:mb-6 break-words">
          {song.title}
        </h1>
        <p className="text-lg sm:text-xl text-on-surface-variant font-body leading-relaxed">
          {song.artist}
        </p>
      </header>

      {showTabs && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => setViewMode('chordmap')}
            className={cn(TAB_BUTTON_STYLE, viewMode === 'chordmap'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-transparent bg-surface-container-highest text-outline hover:border-outline-variant'
            )}
          >
            Chord Map
          </button>
          <button
            type="button"
            onClick={() => setViewMode('chordsheet')}
            className={cn('hidden md:block', TAB_BUTTON_STYLE, viewMode === 'chordsheet'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-transparent bg-surface-container-highest text-outline hover:border-outline-variant'
            )}
          >
            Chord Sheet
          </button>
          {hasYoutube && (
            <button
              type="button"
              onClick={() => setViewMode('watch')}
              className={cn(TAB_BUTTON_STYLE, viewMode === 'watch'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-transparent bg-surface-container-highest text-outline hover:border-outline-variant'
              )}
            >
              Watch
            </button>
          )}
        </div>
      )}

      {viewMode === 'watch' && song.youtubeId ? (
        <section className="mb-10 sm:mb-12">
          <iframe
            width="100%"
            style={{ aspectRatio: '16/9', borderRadius: '12px' }}
            src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}`}
            title="Ukulele tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
          />
          <div className="mt-4 px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
            <p className="text-xs text-on-surface-variant font-body text-center leading-relaxed">
              Tutorial videos are curated from <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">YouTube</a>. All content belongs to respective creators.
            </p>
          </div>
        </section>
      ) : viewMode === 'chordsheet' && song.chordSheet ? (
        <section className="mb-10 sm:mb-12">
          <ChordSheet content={song.chordSheet} />
        </section>
      ) : (
        <>
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mb-4">
              Chord Progression
            </h2>
            <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
              {song.progression.split(' → ').map((chord, index) => (
                <span key={index} className="flex items-center gap-3 sm:gap-4">
                  <span className="font-headline font-extrabold text-primary text-xl sm:text-2xl">
                    {chord}
                  </span>
                  {index < song.progression.split(' → ').length - 1 && (
                    <span className="text-outline text-lg sm:text-xl">→</span>
                  )}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mb-6">
              Chord Diagrams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chordDefinitions.map((chord) => (
                <div key={chord.name} className="flex justify-center">
                  <UkuleleChordDiagram chord={chord} className="max-w-[280px] sm:max-w-[320px]" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}


      <footer className="mt-12 sm:mt-20 py-8 sm:py-12 border-t-2 border-surface-container-highest w-full min-w-0">
        <Link
          to="/lessons/songs"
          className="inline-flex items-center gap-4 group hover:bg-surface-container-low px-4 sm:px-6 py-3 rounded-2xl transition-all min-w-0"
        >
          <div className="w-12 h-12 rounded-full border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors">
            <ArrowLeft size={20} className="text-outline group-hover:text-primary transition-colors" />
          </div>
          <div>
            <p className="font-label text-[10px] text-outline uppercase tracking-widest font-bold group-hover:text-primary/70 transition-colors">
              Back
            </p>
            <p className="font-headline font-bold text-primary text-sm">
              Song Library
            </p>
          </div>
        </Link>
      </footer>
    </div>
  );
};