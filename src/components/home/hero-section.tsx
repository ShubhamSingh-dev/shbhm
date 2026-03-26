"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, MapPin } from "lucide-react";
import FlipCard from "../common/flip-card";
import { SOCIAL_LINKS } from "@/config/site";
import { Icons } from "../icons/icons";

const ROLES = ["Full Stack Engineer", "AI Engineer", "Systems Builder"];

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

function LocalTime() {
  const [time, setTime] = useState("UTC+5:30");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}

export function HeroSection() {
  return (
    <section className="border-line screen-line-bottom mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:pt-16">
      {/* ── Status + clock row ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Available for hire
          </span>
        </div>
        <LiveClock />
      </motion.div>

      {/* ── Name + Card row ── */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Name block */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          className="flex flex-col gap-4"
        >
          <h1
            className="font-sans font-black leading-[0.88] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.5rem, 9vw, 5rem)" }}
          >
            Shubham
            <br />
            <span className="text-muted-foreground/40">Singh.</span>
          </h1>

          {/* Role ticker */}
          <div className="flex items-center gap-2.5">
            <div className="h-px w-5 bg-foreground/20" />
            <RoleTicker />
          </div>
        </motion.div>

        {/* Flip card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <FlipCard />
        </motion.div>
      </div>

      {/* ── Location / meta chips ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <MapPin className="size-2.5" />
          India · <LocalTime />
        </span>
        <span className="hidden text-border/60 sm:block">·</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          B.Tech CS
        </span>
        <span className="hidden text-border/60 sm:block">·</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Full Stack &amp; Systems
        </span>
      </motion.div>

      {/* ── Bio + Social Grid ── */}
      <div className="mt-1 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="max-w-lg  text-sm leading-[1.75] text-muted-foreground sm:text-[0.9375rem]"
        >
          I engineer products at the intersection of performance and craft.
          Obsessed with developer experience, clean systems, and the art of
          shipping things people actually use.
        </motion.p>

        {/* 3x3 Social Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = Icons[link.label.toLowerCase().replace(/ /g, "") as keyof typeof Icons] || Icons.react;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="group relative flex size-10 items-center justify-center rounded-xl border border-border/50 bg-secondary/30 transition-all duration-300 hover:border-foreground/30 hover:bg-secondary/50 active:scale-95"
                aria-label={link.label}
              >
                <Icon className="size-4 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-foreground" />
              </a>
            );
          })}
          {/* Filler squares for the 3x3 grid (9 total) */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex size-10 items-center justify-center rounded-xl border border-border/20 bg-secondary/5 opacity-[0.15]"
              aria-hidden="true"
            >
              <div className="size-1 rounded-full bg-muted-foreground/20" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
        className="mt-6 flex items-center gap-5"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2 text-sm font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.98]"
        >
          View Work
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/resume"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Resume
          <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </section>
  );
}