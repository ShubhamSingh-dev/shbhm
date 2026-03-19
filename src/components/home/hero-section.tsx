"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "motion/react";
import { Link } from "next-view-transitions";

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroY: MotionValue<number>;
}

const ROLES = ["FullStack Engineer", "AI Engineer"];

export function HeroSection({ heroOpacity, heroY }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="flex min-h-screen flex-col justify-center pb-16 pt-24"
    >
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-center gap-2.5"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
          Available for hire
        </span>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.9] tracking-tight text-white">
          Shubham
          <br />
          <span className="text-white/20">Singh.</span>
        </h1>
      </motion.div>

      {/* Role */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-6 flex flex-wrap items-center font-mono text-sm uppercase tracking-widest text-white/35"
      >
        <motion.span
          layout
          className="relative flex h-5 items-center overflow-hidden pr-1 sm:pr-2"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              layout
              key={roleIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                layout: { type: "spring", stiffness: 300, damping: 30 },
              }}
              className="inline-block whitespace-nowrap"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="whitespace-nowrap"
        >
          · Builder · Creator
        </motion.span>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="mt-8 max-w-md text-base leading-relaxed text-white/45"
      >
        I engineer products at the intersection of performance and craft. Obsessed with developer
        experience, clean systems, and the art of shipping things people actually use.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-10 flex items-center gap-4"
      >
        <Link
          href="/projects"
          className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          View Work
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <Link
          href="/resume"
          className="text-sm font-medium text-white/35 transition-colors hover:text-white/70"
        >
          Resume ↗
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-6"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-linear-to-b from-white/30 to-transparent"
          />
          <span className="origin-left translate-y-4 rotate-90 font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">
            scroll
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
