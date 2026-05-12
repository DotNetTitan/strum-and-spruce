import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { SONGS } from '../data/songs';
import { SongCard } from '../components/songs/SongCard';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';

export const SongLibrary = () => {
  return (
    <>
      <Helmet>
        <title>Ukulele Song Library | Strum & Spruce</title>
        <meta name="description" content="Play along with real songs using ukulele chord sheets and video tutorials." />
        <link rel="canonical" href="https://strumandspruce.com/lessons/songs" />
      </Helmet>
      <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <LessonHeader
        moduleLabel="MODULE 04: SONGS"
        moduleVariant="rhythm"
        title="Song"
        subtitle="Library"
        description="Real songs, real chords. Practice what you've learned."
        accentColor="text-tertiary italic font-body font-medium"
        stacked
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
        {[...SONGS].sort((a, b) => a.title.localeCompare(b.title)).map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      <LessonFooter
        backPath="/lessons/strumming"
        backLabel="Strumming Patterns"
        nextPath="/reference-hub"
        nextLabel="Reference Hub"
        nextIcon={LayoutDashboard}
      />
    </div>
    </>
  );
};