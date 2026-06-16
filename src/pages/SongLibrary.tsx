import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { SONGS } from '../data/songs';
import { SongCard } from '../components/songs/SongCard';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';

export const SongLibrary = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Ukulele Song Library | Strum & Spruce')}</title>
        <meta name="description" content={t('Play along with real songs using ukulele chord sheets and video tutorials.')} />
        <link rel="canonical" href="https://strumandspruce.com/lessons/songs" />
      </Helmet>
      <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <LessonHeader
        moduleLabel={t('Module 04: Songs')}
        moduleVariant="rhythm"
        title={t('Song')}
        subtitle={t('Library')}
        description={t("Real songs, real chords. Practice what you've learned.")}
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
        backLabel={t('Strumming Patterns')}
        nextPath="/reference-hub"
        nextLabel={t('Reference Hub')}
        nextIcon={LayoutDashboard}
      />
    </div>
    </>
  );
};