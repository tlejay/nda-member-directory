// Small square-grid mark for the header. A nod to the NDA logo's pixel
// squares — deliberately NOT a copy of the official logo.
const CELLS = [
  "nda", "nda", "ink",
  "nda", "ink", "nda",
  "ink", "nda", "nda",
] as const;

export function PixelMark() {
  return (
    <div className="grid w-fit grid-cols-3 gap-1" aria-hidden="true">
      {CELLS.map((tone, index) => (
        <span key={index} className={`size-3 ${tone === "nda" ? "bg-nda" : "bg-ink"}`} />
      ))}
    </div>
  );
}
