import { cn } from '../../lib/utils';
import type { StrummingPattern } from '../../data/strumming';

interface PatternCardProps {
  pattern: StrummingPattern;
  isActive: boolean;
  onSelect: () => void;
}

export const PatternCard = ({ pattern, isActive, onSelect }: PatternCardProps) => (
  <div
    onClick={onSelect}
    className={cn(
      "p-5 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer group",
      isActive ? "border-primary bg-primary/5 shadow-lg" : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant"
    )}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
      <div className="min-w-0">
        <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">{pattern.name}</h3>
        <p className="font-body text-sm sm:text-base text-on-surface-variant">{pattern.desc}</p>
      </div>
    </div>
    <div className="bg-background/50 p-3 sm:p-4 rounded-xl border border-outline-variant/10 overflow-x-auto">
      <p className="font-mono text-sm sm:text-lg md:text-xl tracking-[0.35em] sm:tracking-[0.5em] text-primary font-bold whitespace-nowrap">{pattern.rhythm}</p>
    </div>
  </div>
);