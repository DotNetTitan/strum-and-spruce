import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Song } from '../../data/songs';

interface SongCardProps {
  key?: string;
  song: Song;
}

const difficultyStyles: Record<'Beginner' | 'Intermediate' | 'Advanced', string> = {
  Beginner: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  Intermediate: 'bg-secondary-container text-on-secondary-container',
  Advanced: 'bg-primary text-on-primary'
};

export const SongCard = ({ song }: SongCardProps) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/lessons/songs/${song.id}`}
      className="group bg-surface-container-low p-6 sm:p-8 rounded-[40px] border border-outline-variant/30 hover:border-tertiary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden flex flex-col"
    >
      <span className={cn(
        "inline-block w-fit px-3 py-1 rounded-full font-label text-[10px] font-bold tracking-widest uppercase mb-4",
        difficultyStyles[song.difficulty]
      )}>
        {t(song.difficulty)}
      </span>

      <h3 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mb-1 group-hover:text-tertiary transition-colors">
        {song.title}
      </h3>

      <p className="text-on-surface-variant font-body mb-5">
        {song.artist}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {song.chords.map((chord) => (
          <span
            key={chord}
            className="inline-block px-3 py-1.5 bg-surface-container-highest text-primary rounded-full font-headline text-sm font-bold border border-outline-variant/30"
          >
            {chord}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-tertiary font-headline font-bold text-sm">
        {t('Explore Song')}
        <Play size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};