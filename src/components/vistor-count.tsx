"use client";

import React from "react";

export function VisitorCounter() {
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(console.error);
  }, []);

  return (
    <span className="font-mono text-[11px] font-bold tabular-nums text-foreground/90">
      {count !== null ? count.toLocaleString() : "---"}
    </span>
  );
}