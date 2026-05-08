import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ChordDiagramProps {
  chordName: string;
  openStrings: boolean[];
  fingerPositions: React.ReactNode;
  isPlaying: boolean;
  onPlay: () => void;
}

export const ChordDiagram = ({ chordName, openStrings, fingerPositions, isPlaying, onPlay }: ChordDiagramProps) => (
  <div className="w-full max-w-[300px] sm:max-w-[320px] bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 shadow-sm border border-outline-variant/10 mx-auto md:mx-0 shrink-0">
    <div className="flex px-3">
      {['G', 'C', 'E', 'A'].map((s) => (
        <div key={s} className="flex-1 flex justify-center min-w-0">
          <span className="font-label text-xs text-outline font-bold">{s}</span>
        </div>
      ))}
    </div>
    <div className="flex px-3 mt-1 min-h-[28px] items-center">
      {openStrings.map((isOpen, i) => (
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
      {fingerPositions}
    </div>

    <div className="text-center pt-1">
      <span className="font-headline font-extrabold text-3xl text-primary">{chordName}</span>
    </div>
  </div>
);

interface FingerDotProps {
  left: string;
  top: string;
  finger: string;
}

export const FingerDot = ({ left, top, finger }: FingerDotProps) => (
  <div className={cn(
    "absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20"
  )} style={{ left, top }}>
    {finger}
  </div>
);

interface PlayableFingerDotProps extends FingerDotProps {
  onClick: () => void;
  isPlaying: boolean;
}

export const PlayableFingerDot = ({ left, top, finger, onClick, isPlaying }: PlayableFingerDotProps) => (
  <motion.div
    animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
    className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg cursor-pointer z-20"
    style={{ left, top }}
    onClick={onClick}
  >
    {finger}
  </motion.div>
);