import { Activity, Fingerprint, Gauge, Hand, type LucideIcon, Music2, Waves, Wind, Zap } from 'lucide-react';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { TECHNIQUE_TOPICS, type TechniqueTopic } from '../data/technique';
import { cn } from '../lib/utils';

interface TopicMeta {
  icon: LucideIcon;
  /** Tailwind classes for the icon badge background + foreground. */
  badge: string;
  /** Tailwind class for the top border accent. */
  accent: string;
  /** Tailwind class for the numbered marker background. */
  marker: string;
}

const TOPIC_META: Record<string, TopicMeta> = {
  'clean-frets':      { icon: Zap,         badge: 'bg-primary/10 text-primary',             accent: 'border-primary/40',     marker: 'bg-primary/10 text-primary' },
  'thumb-placement':  { icon: Hand,         badge: 'bg-tertiary/10 text-tertiary',            accent: 'border-tertiary/40',    marker: 'bg-tertiary/10 text-tertiary' },
  'tension':          { icon: Wind,         badge: 'bg-secondary/10 text-secondary',          accent: 'border-secondary/40',   marker: 'bg-secondary/10 text-secondary' },
  'strumming-motion': { icon: Waves,        badge: 'bg-primary/10 text-primary',             accent: 'border-primary/40',     marker: 'bg-primary/10 text-primary' },
  'nail-vs-pad':      { icon: Fingerprint,  badge: 'bg-tertiary/10 text-tertiary',            accent: 'border-tertiary/40',    marker: 'bg-tertiary/10 text-tertiary' },
  'intonation-pitch': { icon: Gauge,        badge: 'bg-secondary/10 text-secondary',          accent: 'border-secondary/40',   marker: 'bg-secondary/10 text-secondary' },
  'finger-soreness':  { icon: Activity,     badge: 'bg-primary/10 text-primary',             accent: 'border-primary/40',     marker: 'bg-primary/10 text-primary' },
  'muted-chuck':      { icon: Music2,       badge: 'bg-tertiary/10 text-tertiary',            accent: 'border-tertiary/40',    marker: 'bg-tertiary/10 text-tertiary' },
};

function TopicCard({ topic }: { topic: TechniqueTopic }) {
  const meta = TOPIC_META[topic.id];
  const Icon = meta.icon;

  return (
    <article className={cn(
      'rounded-3xl border-t-2 border border-outline-variant/20 bg-surface-container-low overflow-hidden shadow-sm',
      meta.accent
    )}>
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-4">
          <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', meta.badge)}>
            <Icon size={22} aria-hidden />
          </div>
          <h2 className="font-headline text-xl font-bold text-primary sm:text-2xl leading-tight">{topic.title}</h2>
        </div>

        <p className="mb-5 font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
          {topic.summary}
        </p>

        <ol className="space-y-3">
          {topic.tips.map((tip, i) => (
            <li key={tip} className="flex gap-3 items-start">
              <span className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-label text-[10px] font-bold mt-0.5',
                meta.marker
              )}>
                {i + 1}
              </span>
              <span className="font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">{tip}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export const Technique = () => (
  <div className="flex-1 px-4 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
    <LessonHeader
      moduleLabel="Module 02: Technique"
      moduleVariant="technique"
      title="Technique"
      subtitle="& troubleshooting"
      description="Fix common friction points early: clean frets, relaxed hands, and repeatable strumming mechanics, so chords and rhythm lessons feel easier."
      accentColor="text-tertiary"
      stacked={true}
    />

    <section className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 mb-12">
      {TECHNIQUE_TOPICS.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </section>

    <LessonFooter
      backPath="/lessons/anatomy"
      backLabel="Anatomy Guide"
      nextPath="/lessons/chord"
      nextLabel="Explore Chords & Fingers"
      nextIcon={Hand}
    />
  </div>
);
