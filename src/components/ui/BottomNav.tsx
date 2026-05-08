import { Link, useLocation } from 'react-router-dom';
import { Home, Ruler, Hand, Music, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Ruler, label: 'Anatomy', path: '/lessons/anatomy' },
  { icon: Sparkles, label: 'Tech', path: '/lessons/technique' },
  { icon: Hand, label: 'Chords', path: '/lessons/chord' },
  { icon: Music, label: 'Strum', path: '/lessons/strumming' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-background/80 backdrop-blur-2xl flex justify-around items-center px-4 pb-safe z-50 border-t border-outline-variant/10">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-1 flex-col items-center justify-center h-14 transition-transform active:scale-90",
              isActive ? "text-primary" : "text-outline"
            )}
          >
            <item.icon size={20} />
            <span className="font-headline text-[8px] font-bold tracking-widest uppercase mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};