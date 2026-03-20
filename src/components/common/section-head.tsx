export function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
        {index}
      </span>
      <div className="h-px flex-1 bg-border" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
        {label}
      </span>
    </div>
  );
}
