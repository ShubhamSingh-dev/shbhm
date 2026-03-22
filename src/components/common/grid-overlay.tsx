// ─────────────────────────────────────────────────────────────────────────────
// GRID OVERLAY
// Replaces the raw rail divs in layout.tsx.
// Adds vertical rails + corner tick dots for the full-page grid feel.
// ─────────────────────────────────────────────────────────────────────────────
export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
      aria-hidden="true"
    >
      <div className="relative h-full w-full max-w-3xl">
        {/* Left vertical rail */}
        <div className="absolute inset-y-0 left-0 w-px bg-border/60" />
        {/* Right vertical rail */}
        <div className="absolute inset-y-0 right-0 w-px bg-border/60" />
        {/* Top corner dots */}
        <div className="absolute top-0 left-0 h-[5px] w-[5px] -translate-x-[2px] -translate-y-[2px] rounded-full bg-border" />
        <div className="absolute top-0 right-0 h-[5px] w-[5px] translate-x-[2px] -translate-y-[2px] rounded-full bg-border" />
      </div>
    </div>
  );
}