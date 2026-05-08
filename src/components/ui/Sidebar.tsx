import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ruler, Hand, Music } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Reference Hub', path: '/dashboard' },
  { icon: Ruler, label: 'Anatomy Guide', path: '/lessons/anatomy' },
  { icon: Hand, label: 'Chords & Fingers', path: '/lessons/chord' },
  { icon: Music, label: 'Strumming Patterns', path: '/lessons/strumming' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-4rem-env(safe-area-inset-top,0px))] sticky top-[calc(4rem+env(safe-area-inset-top,0px))] w-64 shrink-0 bg-background border-r border-outline-variant/10 overflow-y-auto no-scrollbar">
      <div className="p-6">
        <nav className="space-y-1">
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
      </div>
    </aside>
  );
};