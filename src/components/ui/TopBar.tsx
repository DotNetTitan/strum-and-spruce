import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logoUrl from '/logo.png?url';

interface TopBarProps {
  showBack?: boolean;
}

export const TopBar = ({ showBack = false }: TopBarProps) => (
  <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 editorial-shadow pt-[env(safe-area-inset-top,0px)]">
    <div className="flex justify-between items-center gap-2 px-4 sm:px-6 h-16 w-full max-w-screen-2xl mx-auto min-w-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        {showBack && (
          <Link to="/dashboard" className="p-2 shrink-0 hover:bg-surface-container rounded-full transition-colors text-primary" aria-label="Back to hub">
            <ArrowLeft size={22} />
          </Link>
        )}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img src={logoUrl} alt="Strum & Spruce" className="h-20 w-20 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
          <span className="font-headline font-black tracking-tight text-lg sm:text-2xl text-primary truncate">
            Strum & Spruce
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
      </div>
    </div>
  </header>
);