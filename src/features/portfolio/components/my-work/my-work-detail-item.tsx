"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

import type { MyWorkDetail } from "../../types/my-work"

export function MyWorkDetailItem({ detail }: { detail: MyWorkDetail }) {
  const [open, setOpen] = useState(detail.isExpanded ?? false)

  const bullets = detail.description
    .split("\n")
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background"
    >
      {/* ── Trigger ── */}
      <CollapsibleTrigger
        className={cn(
          "group block w-full text-left",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7",
          "before:-z-10 before:rounded-lg before:transition-[background-color] before:ease-out",
          "hover:before:bg-muted/60 dark:hover:before:bg-white/3",
          "outline-none focus-visible:before:ring-2 focus-visible:before:ring-ring/50 focus-visible:before:ring-inset"
        )}
      >
        <div className="relative z-10 mb-1 flex items-center gap-3">
          {/* Dot */}
          <div className="flex size-6 shrink-0 items-center justify-center select-none">
            <span className="flex size-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          </div>

          <h4 className="flex-1 font-light text-sm">{detail.title}</h4>

          {/* Animated chevron */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0 text-muted-foreground [&_svg]:size-4 inline-flex"
          >
            <ChevronDown />
          </motion.span>
        </div>
      </CollapsibleTrigger>

      {/* ── Animated body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Bullet list — staggered */}
            <motion.ul
              className="mt-2 pl-9 flex flex-col gap-1.5 pb-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
            >
              {bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -6 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Skills tags — fade in as a group */}
            {Array.isArray(detail.skills) && detail.skills.length > 0 && (
              <motion.ul
                className="flex flex-wrap gap-1.5 pt-3 pl-9 pb-1"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: bullets.length * 0.05 + 0.05 }}
              >
                {detail.skills.map((skill, idx) => (
                  <li key={idx} className="flex">
                    <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/60 px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted">
                      {skill}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  )
}
