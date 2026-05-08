import type { ChordDefinition, ChordLibraryFilterCategory } from '../../data/chords';
import { cn } from '../../lib/utils';

const FILTERS: { id: ChordLibraryFilterCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'seventh', label: 'Seventh' },
];

export interface ChordLibraryPanelProps {
  /** Chords visible for the active category + search (same list used for “next chord”). */
  filteredChords: ChordDefinition[];
  /** Current search box text (controlled). */
  filterQuery: string;
  /** Updates search text. */
  onFilterQueryChange: (query: string) => void;
  /** Active category pill (`all` or a lesson tier). */
  filterCategory: ChordLibraryFilterCategory;
  /** Updates category filter. */
  onFilterCategoryChange: (category: ChordLibraryFilterCategory) => void;
  /** Currently selected chord symbol. */
  currentChord: string;
  /** Called when the user picks a chord symbol. */
  onSelect: (name: string) => void;
  /** Optional layout classes on the root wrapper. */
  className?: string;
}

/**
 * Search, category filters, chord chips, and empty state for the chord lesson.
 */
export function ChordLibraryPanel({
  filteredChords,
  filterQuery,
  onFilterQueryChange,
  filterCategory,
  onFilterCategoryChange,
  currentChord,
  onSelect,
  className,
}: ChordLibraryPanelProps) {
  const resetFilters = () => {
    onFilterQueryChange('');
    onFilterCategoryChange('beginner');
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <label className="block shrink-0">
        <span className="sr-only">Search chords</span>
        <input
          type="search"
          value={filterQuery}
          onChange={(e) => onFilterQueryChange(e.target.value)}
          placeholder="Search chords…"
          className={cn(
            'w-full rounded-2xl border-2 border-outline-variant/20 bg-surface-container-highest px-3 py-2.5 font-body text-sm text-on-surface placeholder:text-outline',
            'outline-none transition-colors focus:border-primary focus:ring-0'
          )}
          autoComplete="off"
        />
      </label>

      <div className="flex shrink-0 flex-wrap gap-1.5" role="group" aria-label="Chord categories">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterCategoryChange(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg font-label text-[10px] font-bold uppercase tracking-wider transition-all border-2 sm:px-4 sm:py-2 sm:rounded-xl sm:text-xs',
              filterCategory === f.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-transparent bg-surface-container-highest text-outline hover:border-outline-variant'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filterCategory === 'seventh' && (
        <p className="text-[11px] font-body text-on-surface-variant leading-snug rounded-xl bg-surface-container-highest/60 px-3 py-2">
          Seventh chords add a fourth note that creates colour and mild tension, giving a bluesier or jazzier feel.
        </p>
      )}

      {filteredChords.length === 0 ? (
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low px-4 py-8 text-center editorial-shadow">
          <p className="font-body text-sm text-on-surface-variant mb-4">
            No chords match your search or filter. Try a different term or reset filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl font-label text-xs font-bold border border-outline-variant/30 text-outline hover:bg-surface-container hover:border-primary hover:text-primary transition-all"
          >
            Reset search & filters
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 rounded-2xl border border-outline-variant/10 bg-surface-container-highest/35 p-2.5 sm:p-3">
          {filteredChords.map((chord) => (
            <button
              key={chord.name}
              type="button"
              onClick={() => onSelect(chord.name)}
              className={cn(
                'px-3 py-2 rounded-xl font-headline font-bold text-xs transition-all border-2 sm:px-4 sm:text-sm',
                currentChord === chord.name
                  ? 'border-primary bg-primary/5 text-primary scale-[1.03] shadow-md'
                  : 'border-transparent bg-surface-container-highest text-outline hover:border-outline-variant'
              )}
            >
              {chord.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
