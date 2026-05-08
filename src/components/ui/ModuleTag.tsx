import { cn } from '../../lib/utils';

interface ModuleTagProps {
  label: string;
  variant?: 'basics' | 'technique' | 'rhythm';
}

const THEMES = {
  basics: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  technique: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  rhythm: 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
};

export const ModuleTag = ({
  label,
  variant = 'basics'
}: ModuleTagProps) => {
  return (
    <span className={cn(
      "inline-block px-3 py-1 rounded-full font-label text-[10px] font-bold tracking-[0.1em] uppercase mb-4",
      THEMES[variant]
    )}>
      {label}
    </span>
  );
};