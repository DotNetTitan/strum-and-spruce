import { cn } from '../../lib/utils';

interface ChordSelectorProps {
  chords: { name: string }[];
  currentChord: string;
  onSelect: (chord: string) => void;
}

export const ChordSelector = ({ chords, currentChord, onSelect }: ChordSelectorProps) => (
  <div className="flex flex-wrap gap-3">
    {chords.map((chord) => (
      <button
        key={chord.name}
        onClick={() => onSelect(chord.name)}
        className={cn(
          "px-6 py-3 rounded-2xl font-headline font-bold text-sm transition-all border-2",
          currentChord === chord.name
            ? "border-primary bg-primary/5 text-primary scale-105 shadow-md"
            : "border-transparent bg-surface-container-highest text-outline hover:border-outline-variant"
        )}
      >
        {chord.name}
      </button>
    ))}
  </div>
);