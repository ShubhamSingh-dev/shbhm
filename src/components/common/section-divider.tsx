/**
 * SectionDivider
 *
 * Horizontal rule between sections. Uses border-line (left+right borders)
 * matching the GridOverlay rails, and screen-line-top so the horizontal
 * rule extends across the full viewport via the ::before pseudo-element.
 */
export default function SectionDivider({
  index,
  label,
}: {
  index?: string;
  label?: string;
}) {
  return (
    <div
      className="border-line screen-line-top relative flex items-center py-2 px-4"
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-border/40" />

      {(index || label) && (
        <span className="mx-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/40 select-none">
          {index && <span>{index}</span>}
          {index && label && <span className="opacity-30">·</span>}
          {label && <span>{label}</span>}
        </span>
      )}

      <div className="h-px flex-1 bg-border/40" />
    </div>
  );
}
