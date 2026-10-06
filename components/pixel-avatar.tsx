// Deterministic 5x5 pixel avatar built from the username, so every member
// gets a distinct mark without loading any external image.

const SIZE = 5;

/** FNV-1a hash — small, stable, good enough to spread usernames apart. */
function hash(text: string): number {
  let value = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 0x01000193);
  }
  return value >>> 0;
}

/** Mirrored left-to-right so the pattern reads as a designed mark. */
function buildCells(seed: string): boolean[] {
  const bits = hash(seed.toLowerCase());
  const cells: boolean[] = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const mirrored = col < 3 ? col : SIZE - 1 - col;
      cells.push(((bits >> (row * 3 + mirrored)) & 1) === 1);
    }
  }
  // Never render an empty tile.
  if (!cells.some(Boolean)) cells[12] = true;
  return cells;
}

export function PixelAvatar({ seed }: { seed: string }) {
  const cells = buildCells(seed);
  return (
    <svg
      viewBox="0 0 5 5"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className="size-14 shrink-0 bg-paper p-1.5 ring-1 ring-ink/10"
    >
      {cells.map((filled, index) =>
        filled ? (
          <rect
            key={index}
            x={index % SIZE}
            y={Math.floor(index / SIZE)}
            width={1}
            height={1}
            className="fill-nda"
          />
        ) : null,
      )}
    </svg>
  );
}
