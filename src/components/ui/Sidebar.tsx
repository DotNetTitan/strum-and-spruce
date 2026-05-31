import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ruler, Hand, Music, Library, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Reference Hub', path: '/reference-hub' },
  { icon: Ruler, label: 'Anatomy Guide', path: '/lessons/anatomy' },
  { icon: Hand, label: 'Chords & Fingers', path: '/lessons/chords' },
  { icon: Music, label: 'Strumming Patterns', path: '/lessons/strumming' },
  { icon: Library, label: 'Song Library', path: '/lessons/songs' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-4rem-env(safe-area-inset-top,0px))] sticky top-[calc(4rem+env(safe-area-inset-top,0px))] w-64 shrink-0 bg-background border-r border-outline-variant/10 overflow-y-auto no-scrollbar">
      <div className="p-6 flex flex-col h-full">
        <nav className="space-y-1 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-r-full transition-all duration-300 group",
                  isActive
                    ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                    : "text-outline hover:bg-surface-container-low"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-on-secondary-container" : "text-outline group-hover:text-primary")} />
                <span className="font-headline text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <a
          href="https://ko-fi.com/strumandspruce"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-r-full text-outline hover:bg-surface-container-low transition-all duration-300 group"
        >
          <Heart size={20} className="text-outline group-hover:text-[#FF5E5B] transition-colors" />
          <span className="font-headline text-sm group-hover:text-[#FF5E5B] transition-colors">Support on Ko-fi</span>
        </a>
      </div>
    </aside>
  );
};