interface ChordSheetProps {
  content: string;
}

const CHORD_REGEX = /^[A-G][#b]?(?:m|maj|min|aug|dim|sus|add)?(?:7|9|11|13)?(?:\/[A-G][#b]?)?$/;
const CHORD_HIGHLIGHT_REGEX = /([A-G][#b]?(?:m|maj|min|aug|dim|sus|add)?(?:7|9|11|13)?(?:\/[A-G][#b]?)?)/g;

function isChordLine(line: string): boolean {
  const tokens = line.trim().split(/\s+/);
  if (tokens.length === 0) return false;
  const chordCount = tokens.filter(t => CHORD_REGEX.test(t)).length;
  return chordCount > 0 && chordCount >= tokens.length * 0.5;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function ChordSheet({ content }: ChordSheetProps) {
  const lines = content.split('\n');

  return (
    <pre
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        whiteSpace: 'pre',
        overflowX: 'auto',
        lineHeight: '1.8',
        fontSize: '0.95rem'
      }}
      className="hidden md:block bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 sm:p-8 text-sm"
    >
      {lines.map((line, i) => {
        if (line.startsWith('[') && line.endsWith(']')) {
          return (
            <div key={i} className="font-headline text-xs font-bold uppercase tracking-[0.15em] text-primary mt-6 mb-3 first:mt-0">
              {line.slice(1, -1)}
            </div>
          );
        }

        if (isChordLine(line)) {
          return (
            <div key={i} className="text-primary">
              <span dangerouslySetInnerHTML={{ __html: escapeHtml(line).replace(CHORD_HIGHLIGHT_REGEX, '<span class="text-tertiary font-bold">$1</span>') }} />
            </div>
          );
        }

        return (
          <div key={i} className="text-on-surface-variant">
            <span dangerouslySetInnerHTML={{ __html: escapeHtml(line) || '&nbsp;' }} />
          </div>
        );
      })}
    </pre>
  );
}