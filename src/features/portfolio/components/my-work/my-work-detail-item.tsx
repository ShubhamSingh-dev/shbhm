"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { MyWorkDetail } from "../../types/my-work";

export function MyWorkDetailItem({ detail }: { detail: MyWorkDetail }) {
  const [open, setOpen] = useState(detail.isExpanded ?? false);

  const bullets = detail.description
    .split("\n")
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* ── Trigger ── */}
      <CollapsibleTrigger
        className={cn(
          "group block w-full rounded-md px-2 py-1.5 text-left",
          "transition-colors hover:bg-muted/60 dark:hover:bg-white/5",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        )}
      >
        <div className="flex items-center gap-2">
          {/* Timeline dot */}
          <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />

          <span className="flex-1 text-sm font-normal text-foreground/80">
            {detail.title}
          </span>

          {/* Animated chevron */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0 text-muted-foreground"
          >
            <ChevronDown className="size-3.5" />
          </motion.span>
        </div>
      </CollapsibleTrigger>

      {/* ── Animated content ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Bullet list */}
            <motion.ul
              className="mt-2 flex flex-col gap-1.5 pl-4 pb-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.04 },
                },
              }}
            >
              {bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -4 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Skill tags */}
            {Array.isArray(detail.skills) && detail.skills.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-1.5 pb-2 pl-4 pt-2"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                  delay: bullets.length * 0.04 + 0.04,
                }}
              >
                {detail.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  );
}