"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Paperclip,
  Search,
  Star,
  FolderOpen,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SectionDivider from "@/components/common/section-divider";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel";
import { MyWorkDetailIcon } from "@/features/portfolio/components/my-work/my-work-detail-icon";
import { MYWORK } from "@/features/portfolio/data/my-work";
import type { MyWork } from "@/features/portfolio/types/my-work";
import { cn } from "@/lib/utils";

// ─── Collect all unique skills across all projects ───────────────────────────
const ALL_SKILLS = Array.from(
  new Set(
    MYWORK.flatMap((w) => w.details.flatMap((d) => d.skills ?? []))
  )
).sort();

// ─── Filter pill component ────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded border px-2.5 py-1 font-mono text-[11px] transition-all duration-150",
        active
          ? "border-foreground/50 bg-foreground text-background"
          : "border-border/60 bg-muted/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({ work }: { work: MyWork }) {
  const allSkills = Array.from(
    new Set(work.details.flatMap((d) => d.skills ?? []))
  );
  const allBullets = work.details.flatMap((d) =>
    d.description
      .split("\n")
      .map((l) => l.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean)
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative screen-line-bottom border-line",
        "p-4 transition-colors hover:bg-muted/20 dark:hover:bg-white/2.5"
      )}
    >
      {/* Featured badge */}
      {work.isFeatured && (
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded border border-border/60 bg-muted/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Star className="size-2.5" />
          Featured
        </span>
      )}

      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        {/* Category icon */}
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
          <MyWorkDetailIcon className="size-4" icon={work.icon} />
        </div>

        <div className="min-w-0 flex-1 pr-16">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <h2 className="font-sans text-base font-semibold text-foreground">
              {work.name}
            </h2>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {work.tagline}
          </p>
        </div>
      </div>

      {/* ── Highlight bullets (first 3) ── */}
      {allBullets.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 pl-11">
          {allBullets.slice(0, 3).map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
            >
              <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
              <span>{bullet}</span>
            </li>
          ))}
          {allBullets.length > 3 && (
            <li className="pl-3 font-mono text-[11px] text-muted-foreground/50">
              +{allBullets.length - 3} more highlights
            </li>
          )}
        </ul>
      )}

      {/* ── Skill tags ── */}
      {allSkills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pl-11">
          {allSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* ── External links ── */}
      {(work.githubUrl || work.websiteUrl) && (
        <div className="mt-3 flex items-center gap-3 pl-11">
          {work.githubUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={work.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${work.name} on GitHub`}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="size-3.5" />
                  Source
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
                  className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Paperclip className="size-3.5" />
                  Live Demo
                </a>
              </TooltipTrigger>
              <TooltipContent>Open Live Demo</TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = MYWORK.filter((w) => {
    const skills = w.details.flatMap((d) => d.skills ?? []);
    const matchesSearch =
      search.trim() === "" ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.tagline.toLowerCase().includes(search.toLowerCase()) ||
      skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      activeFilter === null ||
      skills.some((s) => s.toLowerCase() === activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Top skills by frequency
  const topSkills = Object.entries(
    MYWORK.flatMap((w) => w.details.flatMap((d) => d.skills ?? [])).reduce<
      Record<string, number>
    >((acc, s) => {
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([s]) => s);

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in-blur pb-20">
      {/* ── Page header divider ── */}
      <SectionDivider index="00" label="Projects" />

      {/* ── Intro panel ── */}
      <Panel>
        <PanelHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <FolderOpen className="size-4 text-muted-foreground" />
            <PanelTitle>Projects</PanelTitle>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {MYWORK.length} projects &mdash; full-stack, AI-powered, and
            developer tools built with modern web tech.
          </p>
        </PanelHeader>

        {/* ── Search + filters ── */}
        <PanelContent className="flex flex-col gap-3">
          {/* Search input */}
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
            <input
              id="projects-search"
              type="search"
              placeholder="Search projects or technologies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full rounded border border-border bg-transparent py-2 pl-9 pr-3",
                "font-mono text-xs text-foreground placeholder:text-muted-foreground/50",
                "outline-none transition-colors focus:border-foreground/30 focus:ring-0"
              )}
            />
          </div>

          {/* Quick-filter pills */}
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              label="All"
              active={activeFilter === null}
              onClick={() => setActiveFilter(null)}
            />
            {topSkills.map((skill) => (
              <FilterPill
                key={skill}
                label={skill}
                active={activeFilter === skill}
                onClick={() =>
                  setActiveFilter(activeFilter === skill ? null : skill)
                }
              />
            ))}
          </div>

          {/* Result count */}
          <p className="font-mono text-[11px] text-muted-foreground/50">
            Showing {filtered.length} of {MYWORK.length} projects
          </p>
        </PanelContent>
      </Panel>

      {/* ── Project list ── */}
      <SectionDivider index="01" label="All Projects" />

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((work) => <ProjectCard key={work.id} work={work} />)
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen-line-bottom border-line px-4 py-12 text-center"
          >
            <p className="font-mono text-sm text-muted-foreground">
              No projects match &ldquo;{search}&rdquo;
              {activeFilter ? ` with filter "${activeFilter}"` : ""}.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter(null);
              }}
              className="mt-3 font-mono text-xs text-muted-foreground/60 underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer note ── */}
      <div className="screen-line-bottom border-line px-4 py-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/40">
          More coming soon · Open to collaborations
        </p>
      </div>
    </div>
  );
}
