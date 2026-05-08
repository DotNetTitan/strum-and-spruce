import { Hash, UserCircle, Music, CircleDot } from 'lucide-react';
import { STRING_NAMES, FINGER_NUMBERS, CHORDS_LIST } from '../../data/chords';
import { cn } from '../../lib/utils';

export const StringNames = () => (
  <section className="bg-surface-container-low p-5 sm:p-8 rounded-[32px] border border-outline-variant/30 editorial-shadow shrink-0">
    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-primary">
      <Hash size={22} className="shrink-0 sm:w-6 sm:h-6" />
      String Names
    </h3>
    <div className="space-y-4">
      {STRING_NAMES.map((s) => (
        <div key={s.name} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-headline font-black", s.color)}>{s.name}</div>
          <span className="font-body font-medium text-on-surface-variant">{s.desc}</span>
        </div>
      ))}
    </div>
  </section>
);

export const FingerNumbers = () => (
  <section className="bg-surface-container-low p-5 sm:p-8 rounded-[32px] border border-outline-variant/30 editorial-shadow flex-1 flex flex-col min-h-0 sm:min-h-[240px]">
    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 text-secondary shrink-0">
      <UserCircle size={22} className="shrink-0 sm:w-6 sm:h-6" />
      Finger numbers
    </h3>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1 content-center">
      {FINGER_NUMBERS.map((f) => (
        <div key={f.n} className="flex flex-col items-center justify-center p-4 bg-surface-container rounded-2xl border border-outline-variant/10">
          <span className="text-3xl font-headline font-black text-secondary mb-1">{f.n}</span>
          <span className="text-xs font-label uppercase tracking-widest text-outline font-bold">{f.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export const ChordInfo = () => (
  <section className="lg:col-span-12 bg-surface-container-low p-5 sm:p-8 rounded-[32px] border border-outline-variant/30 editorial-shadow">
    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-tertiary">
      <CircleDot size={22} className="shrink-0 sm:w-6 sm:h-6" />
      Reading chord diagrams
    </h3>
    <div className="space-y-4 text-sm font-body text-on-surface-variant leading-relaxed break-words md:columns-2 md:gap-10">
      <div className="break-inside-avoid space-y-4">
        <p>
          The numbers on the chord diagrams represent which finger to use when pressing the strings:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-on-surface-variant">
          <li><span className="font-semibold text-on-surface">1</span> = Index finger</li>
          <li><span className="font-semibold text-on-surface">2</span> = Middle finger</li>
          <li><span className="font-semibold text-on-surface">3</span> = Ring finger</li>
          <li><span className="font-semibold text-on-surface">4</span> = Pinky finger (not shown here, but used in other chords)</li>
        </ul>
      </div>
      <div className="break-inside-avoid space-y-4">
        <p>
          So for example, in the <span className="font-semibold text-primary">G</span> chord, you&apos;d place your index finger (1) and middle finger (2) on the second fret, then your ring finger (3) on the third fret.
        </p>
        <p>
          The circles at the top (without numbers) mean that string is played open, no finger needed, just strum it freely.
        </p>
      </div>
    </div>
  </section>
);