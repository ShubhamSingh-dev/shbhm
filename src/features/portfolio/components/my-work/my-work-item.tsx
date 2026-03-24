import { Github, Paperclip } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { MyWork } from "../../types/my-work"
import { MyWorkDetailIcon } from "./my-work-detail-icon"
import { MyWorkDetailItem } from "./my-work-detail-item"

export function MyWorkItem({ work }: { work: MyWork }) {
  return (
    <div
      id={`my-work-${work.id}`}
      className="relative scroll-mt-14 border-b border-border/60 py-5 last:border-b-0"
    >
      {/* Corner decoration — top-left */}
      <span className="pointer-events-none absolute -top-[5px] -left-[5px] size-[9px] text-[9px] leading-none text-border/80 select-none">
        +
      </span>
      {/* Corner decoration — top-right */}
      <span className="pointer-events-none absolute -top-[5px] -right-[5px] size-[9px] text-[9px] leading-none text-border/80 select-none">
        +
      </span>

      {/* ── Project header ── */}
      <div className="flex items-start gap-3 px-1">
        {/* Icon badge */}
        <div
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-lg mt-0.5",
            "bg-muted text-muted-foreground",
            "border border-muted-foreground/15 ring-1 ring-border ring-offset-1 ring-offset-background"
          )}
        >
          <MyWorkDetailIcon className="size-4" icon={work.icon} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name row — name left, icon links right */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base leading-snug font-semibold">
              {work.name}
            </h3>

            {(work.githubUrl || work.websiteUrl) && (
              <div className="flex items-center gap-2 shrink-0">
                {work.githubUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${work.name} on GitHub`}
                        className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="size-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View on GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {work.websiteUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={work.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${work.name} live demo`}
                        className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Paperclip className="size-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Demo</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>

          {/* Tagline */}
          <p className="mt-0.5 text-sm text-muted-foreground leading-snug">
            {work.tagline}
          </p>
        </div>
      </div>

      {/* ── Detail items (collapsible) ── */}
      <div className="mt-4 space-y-2 px-1">
        {work.details.map((detail) => (
          <MyWorkDetailItem key={detail.id} detail={detail} />
        ))}
      </div>
    </div>
  )
}