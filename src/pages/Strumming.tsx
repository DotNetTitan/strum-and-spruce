import { useState } from 'react';
import { LayoutDashboard, Music } from 'lucide-react';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { PatternCard, ProTips } from '../components/strumming';
import { useUkuleleAudio } from '../hooks/useUkuleleAudio';
import { STRUMMING_PATTERNS, PRO_TIPS } from '../data/strumming';

export const Strumming = () => {
  const { playStrum } = useUkuleleAudio();
  const [activePattern, setActivePattern] = useState('down');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    playStrum('C', activePattern);
    const duration = activePattern === 'island' ? 2000 : 1000;
    setTimeout(() => setIsPlaying(false), duration);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-6 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <LessonHeader 
        moduleLabel="Module 03: Rhythm"
        moduleVariant="rhythm"
        title="Strumming"
        subtitle="Patterns"
        description="Rhythm is the heartbeat of the ukulele. Master these patterns to bring your chords to life."
        accentColor="text-tertiary"
        stacked={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {STRUMMING_PATTERNS.map((p) => (
            <PatternCard
              key={p.id}
              pattern={p}
              isActive={activePattern === p.id}
              onSelect={() => setActivePattern(p.id)}
            />
          ))}
        </div>

        <div className="lg:col-span-4">
          <ProTips tips={PRO_TIPS} />
        </div>
      </div>
      <LessonFooter
        backPath="/lessons/chord"
        backLabel="Chords & Fingers"
        nextPath="/dashboard"
        nextLabel="Back to Reference Hub"
        nextIcon={LayoutDashboard}
      />
    </div>
  );
};