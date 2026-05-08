import { useState } from 'react';
import { Music } from 'lucide-react';
import { motion } from 'motion/react';
import { LessonHeader } from '../components/ui/LessonHeader';
import { LessonFooter } from '../components/ui/LessonFooter';
import { ChordSelector, FingerDot, PlayableFingerDot } from '../components/chords';
import { StringNames, FingerNumbers, ChordInfo } from '../components/chords';
import { useUkuleleAudio } from '../hooks/useUkuleleAudio';
import { CHORDS_LIST, CHORD_OPEN_STRINGS } from '../data/chords';

export const ChordsAndFingers = () => {
  const { playChord } = useUkuleleAudio();
  const [currentChord, setCurrentChord] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    playChord(currentChord);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const selectedChordData = CHORDS_LIST.find(c => c.name === currentChord) || CHORDS_LIST[0];
  const openForChord = CHORD_OPEN_STRINGS[currentChord] ?? [false, false, false, false];

  const renderFingerPositions = () => {
    const positions: React.ReactNode[] = [];
    
    if (currentChord === 'C') {
      positions.push(<PlayableFingerDot key="C" left="87.5%" top="62.5%" finger="3" onClick={handlePlay} isPlaying={isPlaying} />);
    }
    if (currentChord === 'G') {
      positions.push(<FingerDot key="G1" left="37.5%" top="37.5%" finger="1" />);
      positions.push(<FingerDot key="G2" left="87.5%" top="37.5%" finger="2" />);
      positions.push(<FingerDot key="G3" left="62.5%" top="62.5%" finger="3" />);
    }
    if (currentChord === 'F') {
      positions.push(<FingerDot key="F1" left="62.5%" top="12.5%" finger="1" />);
      positions.push(<FingerDot key="F2" left="12.5%" top="37.5%" finger="2" />);
    }
    if (currentChord === 'Am') {
      positions.push(<FingerDot key="Am" left="12.5%" top="37.5%" finger="2" />);
    }
    if (currentChord === 'Dm') {
      positions.push(<FingerDot key="Dm1" left="62.5%" top="12.5%" finger="1" />);
      positions.push(<FingerDot key="Dm2" left="37.5%" top="37.5%" finger="2" />);
      positions.push(<FingerDot key="Dm3" left="12.5%" top="37.5%" finger="3" />);
    }
    if (currentChord === 'G7') {
      positions.push(<FingerDot key="G71" left="62.5%" top="12.5%" finger="1" />);
      positions.push(<FingerDot key="G72" left="37.5%" top="37.5%" finger="2" />);
      positions.push(<FingerDot key="G73" left="87.5%" top="37.5%" finger="3" />);
    }
    
    return positions;
  };

  return (
    <div className="pt-20 sm:pt-24 pb-6 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <LessonHeader 
        moduleLabel="Module 02: Technique"
        moduleVariant="technique"
        title="Chord"
        subtitle="Technique"
        description="Master the fundamental finger placements and transitions that form the backbone of every great ukulele performance."
        accentColor="text-tertiary"
        stacked={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 sm:gap-x-12 gap-y-8 mb-12 sm:mb-20">
        <div className="lg:col-span-4 flex flex-col gap-8 min-h-0 lg:h-full">
          <StringNames />
          <FingerNumbers />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <ChordSelector chords={CHORDS_LIST} currentChord={currentChord} onSelect={setCurrentChord} />
          <div className="bg-surface-container rounded-3xl p-6 md:p-8 relative overflow-hidden group editorial-shadow">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700" />
            <div className="mb-4 sm:mb-6 md:mb-6">
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-2 line-clamp-2 sm:line-clamp-1">{selectedChordData.label}</h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-body line-clamp-2 sm:line-clamp-1 opacity-80">{selectedChordData.desc}</p>
            </div>
            <div className="flex flex-col md:flex-row md:flex-nowrap items-stretch md:items-start gap-6 md:gap-8 relative z-10">
              <div className="w-full max-w-[300px] sm:max-w-[320px] bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 shadow-sm border border-outline-variant/10 mx-auto md:mx-0 shrink-0">
                <div className="flex px-3">
                  {['G', 'C', 'E', 'A'].map((s) => (
                    <div key={s} className="flex-1 flex justify-center min-w-0">
                      <span className="font-label text-xs text-outline font-bold">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex px-3 mt-1 min-h-[28px] items-center">
                  {openForChord.map((isOpen, i) => (
                    <div key={i} className="flex-1 flex justify-center">
                      {isOpen ? (
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/70 bg-transparent shadow-sm"
                          title="Open string"
                          aria-label="Open string - strum without fretting"
                        />
                      ) : (
                        <span className="block h-7 w-7 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="relative w-full aspect-[5/6] mt-1 mx-3 border-t-4 border-primary/20 shrink-0">
                  <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-center h-full">
                        <div className="w-px h-full bg-outline/40" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-px w-full bg-outline/20" />)}
                  </div>
                  {renderFingerPositions()}
                </div>

                <div className="text-center pt-1">
                  <span className="font-headline font-extrabold text-3xl text-primary">{currentChord}</span>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full md:w-auto md:min-w-[200px] md:pt-1 md:shrink-0">
                <div className="space-y-2">
                  <span className="font-label text-xs uppercase tracking-widest text-outline block font-bold">Tuning</span>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-surface-container-highest rounded-full text-sm font-bold text-primary">G-C-E-A</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const currentIndex = CHORDS_LIST.findIndex(c => c.name === currentChord);
                    const nextIndex = (currentIndex + 1) % CHORDS_LIST.length;
                    setCurrentChord(CHORDS_LIST[nextIndex].name);
                  }}
                  className="w-full px-6 py-3 rounded-xl font-label text-xs font-bold border border-outline-variant/30 text-outline hover:bg-surface-container transition-all flex items-center justify-center gap-2 hover:border-primary hover:text-primary"
                >
                  <Music size={14} />
                  Switch to Next Chord
                </button>
              </div>
            </div>
          </div>
        </div>

        <ChordInfo />
      </div>

      <LessonFooter
        backPath="/lessons/anatomy"
        backLabel="Anatomy Guide"
        nextPath="/lessons/strumming"
        nextLabel="Master Strumming Patterns"
        nextIcon={Music}
      />
    </div>
  );
};