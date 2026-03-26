import { Github, Paperclip } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { MyWork } from "../../types/my-work";
import { MyWorkDetailIcon } from "./my-work-detail-icon";
import { MyWorkDetailItem } from "./my-work-detail-item";

export function MyWorkItem({ work }: { work: MyWork }) {
  return (
    <div
      id={`my-work-${work.id}`}
      className="scroll-mt-16 py-4"
    >
      {/* ── Project header ── */}
      <div className="flex items-start gap-3">
        {/* Category icon badge */}
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <MyWorkDetailIcon className="size-3.5" icon={work.icon} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Name + external link icons */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-md font-semibold text-foreground">
              {work.name}
            </h3>

            {(work.githubUrl || work.websiteUrl) && (
              <div className="flex shrink-0 items-center gap-2">
                {work.githubUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${work.name} on GitHub`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="size-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>View on GitHub</TooltipContent>
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
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Paperclip className="size-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Live Demo</TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>

          {/* Tagline */}
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
            {work.tagline}
          </p>
        </div>
      </div>

      {/* ── Detail items (collapsible) ── */}
      <div className="mt-3 space-y-1 pl-10">
        {work.details.map((detail) => (
          <MyWorkDetailItem key={detail.id} detail={detail} />
        ))}
      </div>
    </div>
  );
}