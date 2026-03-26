"use client";

import { GitMerge, GitPullRequest, GitPullRequestClosed, ChevronDown, ExternalLink } from "lucide-react";
import type { GitHubPR } from "../../data/github-prs";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

function ContributionIcon({ pr }: { pr: GitHubPR }) {
  if (pr.merged_at) {
    return <GitMerge className="size-4 text-purple-500" />;
  }
  if (pr.state === "closed") {
    return <GitPullRequestClosed className="size-4 text-red-500" />;
  }
  return <GitPullRequest className="size-4 text-green-500" />;
}

function OpenSourceItem({ pr }: { pr: GitHubPR }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group overflow-hidden rounded-lg border border-transparent transition-all duration-200 hover:border-border/40 hover:bg-muted/30">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <ContributionIcon pr={pr} />
            </div>
            
            <div className="flex flex-col truncate">
              <span className="font-bold text-[14px] text-foreground shrink-0 truncate">
                {pr.repo_name}
              </span>
              <span className="text-[13px] text-muted-foreground truncate font-medium">
                {pr.title}
              </span>
            </div>
          </div>

          <ChevronDown className={cn(
            "size-4 shrink-0 text-muted-foreground/40 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-3 pb-4 pt-1 ml-12">
          <div className="space-y-3">
            {pr.body && (
              <p className="text-[13px] leading-relaxed text-muted-foreground/80 line-clamp-4">
                {pr.body.replace(/<!--[\s\S]*?-->/g, "").trim() || "No description provided."}
              </p>
            )}
            
            <div className="flex items-center gap-4">
              <a 
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                View Pull Request
                <ExternalLink className="size-2.5" />
              </a>
              
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                {new Date(pr.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function OpenSourceList({ prs }: { prs: GitHubPR[] }) {
  return (
    <Panel id="open-source">
      <PanelHeader>
        <div className="flex items-center justify-between font-mono">
          <PanelTitle>Open Source</PanelTitle>
          <a
            href="https://github.com/pulls?q=is%3Apr+author%3AShubhamSingh-dev+-user%3AShubhamSingh-dev+is%3Apublic"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            All PRs
            <ExternalLink className="size-2.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-1">
          {prs.map((pr) => (
            <OpenSourceItem key={pr.id} pr={pr} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
