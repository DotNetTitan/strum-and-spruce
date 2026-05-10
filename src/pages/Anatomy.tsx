import { useCallback, useState } from 'react';
import { Hand } from 'lucide-react';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { UkuleleSVG } from '../components/anatomy/UkuleleSVG';
import { useUkuleleAudio } from '../hooks/useUkuleleAudio';
import { cn } from '../lib/utils';

/** Open-string frequencies (G4, C4, E4, A4) mapped to SVG string index 0–3. */
const OPEN_STRINGS = [
  { label: 'G', freq: 392.00 },
  { label: 'C', freq: 261.63 },
  { label: 'E', freq: 329.63 },
  { label: 'A', freq: 440.00 },
] as const;

interface Part {
  id: string;
  title: string;
  desc: string;
  side: 'left' | 'right';
}

const PARTS: Part[] = [
  { id: 'headstock', title: 'Headstock', desc: 'The top piece where strings are anchored and tuned.', side: 'left' },
  { id: 'nut', title: 'Nut', desc: 'The grooved strip that supports the strings at the headstock.', side: 'left' },
  { id: 'frets', title: 'Frets', desc: 'Metal strips along the neck that define different notes.', side: 'left' },
  { id: 'strings', title: 'Strings', desc: 'Typically nylon, tuned to G-C-E-A for a standard ukulele.', side: 'left' },
  { id: 'pegs', title: 'Tuning Pegs', desc: 'Geared mechanisms used to adjust string tension and pitch.', side: 'right' },
  { id: 'neck', title: 'Neck & Fretboard', desc: 'The long part of the instrument where you press your fingers.', side: 'right' },
  { id: 'body', title: 'Body', desc: 'The hollow chamber that amplifies the vibrating strings.', side: 'right' },
  { id: 'bridge', title: 'Bridge', desc: 'Transfers string vibration to the top of the body\'s wood.', side: 'right' },
];

export const Anatomy = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [vibratingString, setVibratingString] = useState<number | null>(null);
  const { playNote } = useUkuleleAudio();

  const partsLeft = PARTS.filter((p) => p.side === 'left');
  const partsRight = PARTS.filter((p) => p.side === 'right');

  const pluckString = useCallback((index: number, freq: number) => {
    playNote(freq);
    setVibratingString(index);
    setTimeout(() => setVibratingString(null), 500);
  }, [playNote]);

  return (
    <div className="flex-1 px-4 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <LessonHeader 
        moduleLabel="Module 01: The Basics"
        moduleVariant="basics"
        title="Instrument"
        subtitle="Anatomy"
        description="Before we strum our first chord, let's understand the resonance of each part. Click the labels below to explore how wood and string create the ukulele's signature warmth."
        accentColor="text-tertiary"
      />

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)_minmax(0,1fr)] gap-10 lg:gap-12 items-start lg:items-center mb-24">
        <div className="flex flex-col gap-6 text-right order-1 lg:order-1">
          {partsLeft.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPart(prev => prev === item.id ? null : item.id)}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                selectedPart === item.id ? "scale-105" : "hover:translate-x-[-4px]"
              )}
            >
              <h4 className={cn(
                "font-headline font-bold text-lg transition-colors",
                selectedPart === item.id ? "text-tertiary" : "text-primary group-hover:text-tertiary"
              )}>{item.title}</h4>
              <p className="text-sm font-body text-outline mt-1 opacity-80 leading-snug">{item.desc}</p>

              {item.id === 'strings' && selectedPart === 'strings' && (
                <div
                  className="flex justify-end gap-2 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {OPEN_STRINGS.map(({ label, freq }, index) => (
                    <button
                      key={label}
                      onClick={() => pluckString(index, freq)}
                      className={cn(
                        "w-10 h-10 rounded-full text-sm font-headline font-bold transition-all duration-200 border-2",
                        vibratingString === index
                          ? "bg-amber-300 border-amber-400 text-amber-900 scale-110 shadow-md"
                          : "bg-surface-container border-tertiary/40 text-tertiary hover:bg-tertiary/10 hover:scale-105"
                      )}
                      aria-label={`Play ${label} string`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <div className={cn(
                "h-0.5 ml-auto mt-3 transition-all duration-500",
                selectedPart === item.id ? "w-full bg-tertiary" : "w-8 bg-surface-container-highest group-hover:w-full group-hover:bg-tertiary"
              )} />
            </div>
          ))}
        </div>

        <div className="relative order-2 lg:order-2 flex justify-center min-h-[min(420px,72vh)] sm:min-h-[480px] lg:min-h-[560px] w-full max-w-[320px] mx-auto pt-8 lg:pt-12 lg:justify-self-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-full blur-3xl -z-10 scale-75" />
          <UkuleleSVG selectedId={selectedPart} vibratingString={vibratingString} onClick={() => setSelectedPart(null)} />
        </div>

        <div className="flex flex-col gap-6 text-left order-3">
          {partsRight.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPart(prev => prev === item.id ? null : item.id)}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                selectedPart === item.id ? "scale-105" : "hover:translate-x-1"
              )}
            >
              <h4 className={cn(
                "font-headline font-bold text-lg transition-colors",
                selectedPart === item.id ? "text-tertiary" : "text-primary group-hover:text-tertiary"
              )}>{item.title}</h4>
              <p className="text-sm font-body text-outline mt-1 opacity-80 leading-snug">{item.desc}</p>
              <div className={cn(
                "h-0.5 mr-auto mt-3 transition-all duration-500",
                selectedPart === item.id ? "w-full bg-tertiary" : "w-8 bg-surface-container-highest group-hover:w-full group-hover:bg-tertiary"
              )} />
            </div>
          ))}
        </div>
      </section>

      <LessonFooter
        backPath="/reference-hub"
        backLabel="Reference Hub"
        nextPath="/lessons/chords"
        nextLabel="Chords & Fingers"
        nextIcon={Hand}
      />
    </div>
  );
};