"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  Clock,
  ExternalLink,
  Search,
  User,
} from "lucide-react";
import type { Metadata } from "next";

import SectionDivider from "@/components/common/section-divider";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blogs } from "@/features/portfolio/data/blog";
import type { Blog } from "@/features/portfolio/types/blog";
import { cn } from "@/lib/utils";

// ─── Source badge ─────────────────────────────────────────────────────────────
const sourceBadgeClass: Record<string, string> = {
  "Medium":
    "border-border/60 bg-muted/50 text-muted-foreground",
  "Dev.to":
    "border-border/60 bg-muted/50 text-muted-foreground",
};

function SourceBadge({ source }: { source: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        sourceBadgeClass[source] ??
          "border-border/60 bg-muted/50 text-muted-foreground"
      )}
    >
      {source}
    </span>
  );
}

// ─── Filter pill ──────────────────────────────────────────────────────────────
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

// ─── Single blog card ─────────────────────────────────────────────────────────
function BlogCard({ blog }: { blog: Blog }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="group screen-line-bottom border-line transition-colors hover:bg-muted/20 dark:hover:bg-white/2.5"
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        {/* ── Trigger row ── */}
        <CollapsibleTrigger className="w-full p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <div className="flex items-start gap-3">
            {/* Icon badge */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <BookOpen className="size-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <h2 className="flex-1 font-sans text-sm font-semibold leading-snug text-foreground">
                  {blog.title}
                </h2>

                {/* Expand chevron */}
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                >
                  <ChevronDown className="size-3.5" />
                </motion.span>
              </div>

              {/* Meta row */}
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <SourceBadge source={blog.source} />

                <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <User className="size-3" />
                  {blog.author}
                </span>

                <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {blog.readTime}
                </span>

                <span className="font-mono text-[11px] text-muted-foreground/50">
                  {blog.category}
                </span>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        {/* ── Expanded content ── */}
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
              <div className="px-4 pb-4 pl-15">
                {/* Summary */}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {blog.summary}
                </p>

                {/* Key insights */}
                {blog.keyInsights.length > 0 && (
                  <motion.ul
                    className="mt-3 flex flex-col gap-1.5"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.04,
                          delayChildren: 0.06,
                        },
                      },
                    }}
                  >
                    {blog.keyInsights.map((insight, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -4 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                        <span>{insight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* Read article link */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read: ${blog.title}`}
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-3" />
                      Read article
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open on {blog.source}</TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeSource, setActiveSource] = useState<string | null>(null);

  // Unique sources
  const sources = Array.from(new Set(blogs.map((b) => b.source)));

  const filtered = blogs.filter((b) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q);

    const matchesSource =
      activeSource === null || b.source === activeSource;

    return matchesSearch && matchesSource;
  });

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in-blur pb-20">
      {/* ── Page header ── */}
      <SectionDivider index="00" label="Reading List" />

      {/* ── Intro panel ── */}
      <Panel>
        <PanelHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-muted-foreground" />
            <PanelTitle>Reading List</PanelTitle>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {blogs.length} articles curated from across the web — things I
            found worth reading and worth remembering.
          </p>
        </PanelHeader>

        {/* ── Search + filters ── */}
        <PanelContent className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
            <input
              id="blog-search"
              type="search"
              placeholder="Search by title, category, or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full rounded border border-border bg-transparent py-2 pl-9 pr-3",
                "font-mono text-xs text-foreground placeholder:text-muted-foreground/50",
                "outline-none transition-colors focus:border-foreground/30 focus:ring-0"
              )}
            />
          </div>

          {/* Source filter pills */}
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              label="All"
              active={activeSource === null}
              onClick={() => setActiveSource(null)}
            />
            {sources.map((source) => (
              <FilterPill
                key={source}
                label={source}
                active={activeSource === source}
                onClick={() =>
                  setActiveSource(activeSource === source ? null : source)
                }
              />
            ))}
          </div>

          {/* Result count */}
          <p className="font-mono text-[11px] text-muted-foreground/50">
            Showing {filtered.length} of {blogs.length} articles
          </p>
        </PanelContent>
      </Panel>

      {/* ── Article list ── */}
      <SectionDivider index="01" label="Articles" />

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((blog, i) => (
            <motion.div
              key={blog.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                delay: i * 0.04,
              }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen-line-bottom border-line px-4 py-12 text-center"
          >
            <p className="font-mono text-sm text-muted-foreground">
              No articles match &ldquo;{search}&rdquo;
              {activeSource ? ` from "${activeSource}"` : ""}.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveSource(null);
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
          Updated regularly · Links open in new tab
        </p>
      </div>
    </div>
  );
}
