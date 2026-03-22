"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "motion/react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, MapPin } from "lucide-react";
import FlipCard from "../common/flip-card";

const ROLES = ["Full Stack Engineer", "AI Engineer", "Systems Builder"];
const TECH_TAGS = ["TypeScript", "Next.js", "Rust", "Go", "React", "Node.js"];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] tabular-nums tracking-widest text-muted-foreground">
      {time}&nbsp;IST
    </span>
  );
}

function RoleTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-5 items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 320, damping: 28 },
            opacity: { duration: 0.18 },
          }}
          className="inline-block whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-foreground/80"
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroY: MotionValue<number>;
}

export function HeroSection({ heroOpacity, heroY }: HeroSectionProps) {
  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 sm:px-8 md:px-10 pb-20 pt-24"
    >
      {/* ── Status + clock row ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-center justify-between "
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50 dark:opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Available for hire
          </span>
        </div>
        <LiveClock />
      </motion.div>

      {/* ── Name + Card row ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Name block */}
        <div className="flex flex-col gap-4">
          <h1
            className="font-black leading-[0.88] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.75rem, 9vw, 5.5rem)" }}
          >
            Shubham
            <br />
            <span className="text-muted-foreground/50">Singh.</span>
          </h1>

          {/* Role ticker with dash prefix */}
          <div className="flex items-center gap-2.5">
            <div className="h-px w-5 bg-foreground/25" />
            <RoleTicker />
          </div>
        </div>

        {/* Flip card — right side */}
        <FlipCard />
      </motion.div>

      {/* ── Location / meta chips ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <MapPin className="size-2.5" />
          India · UTC+5:30
        </span>
        <span className="text-border/60 hidden sm:block">·</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          B.Tech CS
        </span>
        <span className="text-border/60 hidden sm:block">·</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Full Stack &amp; Systems
        </span>
      </motion.div>

      {/* ── Bio ── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        className="mt-6 max-w-3xl text-[0.925rem] leading-[1.78] text-muted-foreground"
      >
        I engineer products at the intersection of performance and craft.
        Obsessed with developer experience, clean systems, and the art of
        shipping things people actually use.
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        className="mt-10 flex items-center gap-5"
      >
        {/* Primary CTA */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.98]"
        >
          View Work
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Secondary CTA */}
        <Link
          href="/resume"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Resume
          <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-0 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-7 w-px bg-linear-to-b from-foreground/25 to-transparent"
        />
        <span className="origin-left translate-y-4 rotate-90 font-mono text-[8px] uppercase tracking-[0.45em] text-muted-foreground/40">
          scroll
        </span>
      </motion.div>
    </motion.section>
  );
}
