// ─────────────────────────────────────────────────────────────────────────────
// SECTION DIVIDER
// Use this between every section instead of SectionHead.
// Creates horizontal lines that "connect" to the vertical rails,
// giving the full chanhdai-style grid feel across the whole page.
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionDivider({
  index,
  label,
}: {
  index?: string;
  label?: string;
}) {
  return (
    <div className="relative my-0 flex items-center" aria-hidden="true">
      {/* Left tick — extends out to touch the rail */}
      <div className="absolute -left-6 top-1/2 h-px w-6 -translate-y-1/2 bg-border/60" />
      <div className="h-px flex-1 bg-border/60" />
      {(index || label) && (
        <span className="mx-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40 select-none">
          {index && <span>{index}</span>}
          {index && label && <span className="opacity-30">·</span>}
          {label && <span>{label}</span>}
        </span>
      )}
      <div className="h-px flex-1 bg-border/60" />
      {/* Right tick */}
      <div className="absolute -right-6 top-1/2 h-px w-6 -translate-y-1/2 bg-border/60" />
    </div>
  );
}
