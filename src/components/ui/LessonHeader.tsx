import { ModuleTag } from '../ui/ModuleTag';
import { cn } from '../../lib/utils';

interface LessonHeaderProps {
  moduleLabel: string;
  moduleVariant?: 'basics' | 'technique' | 'rhythm';
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  stacked?: boolean;
}

export const LessonHeader = ({
  moduleLabel,
  moduleVariant = 'basics',
  title,
  subtitle,
  description,
  accentColor = 'text-tertiary',
  stacked = true
}: LessonHeaderProps) => (
  <header className="mb-10 sm:mb-14 md:mb-16 max-w-2xl w-full min-w-0">
    <ModuleTag label={moduleLabel} variant={moduleVariant} />
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1] mb-4 sm:mb-6 break-words">
      {title} {stacked && <br />}
      <span className={cn("italic font-body font-medium", accentColor)}>
        {subtitle}
      </span>
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-body leading-relaxed">
      {description}
    </p>
  </header>
);