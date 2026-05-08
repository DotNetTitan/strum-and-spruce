import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LessonFooterProps {
  backPath: string;
  backLabel: string;
  nextPath?: string;
  nextLabel?: string;
  nextIcon?: LucideIcon;
}

export const LessonFooter = ({
  backPath,
  backLabel,
  nextPath,
  nextLabel,
  nextIcon: NextIcon = ArrowLeft
}: LessonFooterProps) => (
  <footer className="mt-12 sm:mt-20 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 md:gap-8 py-8 sm:py-12 border-t-2 border-surface-container-highest w-full min-w-0">
    <Link
      to={backPath}
      className="flex items-center gap-4 group hover:bg-surface-container-low px-4 sm:px-6 py-3 rounded-2xl transition-all min-w-0"
    >
      <div className="w-12 h-12 rounded-full border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors">
        <ArrowLeft size={20} className="text-outline group-hover:text-primary transition-colors" />
      </div>
      <div>
        <p className="font-label text-[10px] text-outline uppercase tracking-widest font-bold group-hover:text-primary/70 transition-colors">
          Previous
        </p>
        <p className="font-headline font-bold text-primary text-sm">
          {backLabel}
        </p>
      </div>
    </Link>

    {nextPath && nextLabel && (
      <Link
        to={nextPath}
        className="w-full md:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-headline font-extrabold text-base sm:text-lg text-center shadow-xl hover:scale-[1.02] sm:hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 group shrink-0"
      >
        <span className="leading-snug">{nextLabel}</span>
        <NextIcon size={22} className="shrink-0 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
      </Link>
    )}
  </footer>
);