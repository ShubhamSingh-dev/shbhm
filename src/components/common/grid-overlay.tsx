/**
 * GridOverlay
 *
 * Renders two fixed vertical rails at the left and right edges of the
 * max-w-3xl content column — exactly matching the container's padded boundary.
 *
 * Corner tick-dots are placed at the very top of each rail.
 * The rails extend the full viewport height so every section's horizontal
 * border lines connect to them seamlessly.
 */
export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
      aria-hidden="true"
    >
      {/*
        Inner wrapper constrains to the same max-w-3xl as page content.
        px-4 mirrors the Container's base padding so rails sit at content edges.
      */}
      <div className="relative h-full w-full max-w-3xl">
        {/* Top-left corner dot — now aligned with the section's outside border */}
        <div className="absolute top-0 left-0 h-[5px] w-[5px] -translate-x-[3px] -translate-y-[2px] rounded-full bg-border" />
        {/* Top-right corner dot — now aligned with the section's outside border */}
        <div className="absolute top-0 right-0 h-[5px] w-[5px] translate-x-[3px] -translate-y-[2px] rounded-full bg-border" />
      </div>
    </div>
  );
}