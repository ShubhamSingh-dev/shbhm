"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "motion/react";
import { Link } from "next-view-transitions";
import { QrCode, RotateCcw } from "lucide-react";

interface HeroSectionProps {
  heroOpacity: MotionValue<number>;
  heroY: MotionValue<number>;
}

const ROLES = ["FullStack Engineer", "AI Engineer"];

// ── Twitter Blue Tick SVG ────────────────────────────────────────
function BlueTick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="Verified account"
      className={className}
      fill="none"
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="#1D9BF0"
      />
    </svg>
  );
}

// ── Flip Profile Card ────────────────────────────────────────────
function ProfileCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      {/* The flipping card */}
      <div
        className="relative h-[120px] w-[120px] cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* ── FRONT: Avatar ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="Shubham Singh"
              className="h-full w-full object-cover object-top"
            />
            {/* QR hint badge */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg border border-white/20 bg-black/75 px-1.5 py-1 text-white/60 backdrop-blur-sm">
              <QrCode className="size-3.5" />
              <span className="font-mono text-[8px] uppercase tracking-widest">qr</span>
            </div>
          </div>

          {/* ── BACK: QR image ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-white flex items-center justify-center p-2"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bmc_qr.png"
              alt="QR Code"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* Handle + verified badge — links to X */}
      <a
        href="https://x.com/shbhm_X0"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08]"
      >
        <span className="font-mono text-[11px] text-white/50 transition-colors group-hover:text-white/80">
          @shbhm_X0
        </span>
        <BlueTick className="size-3.5 shrink-0" />
      </a>

      {/* Flip hint */}
      <div className="flex items-center gap-1 opacity-30">
        <RotateCcw className="size-2.5 text-white/50" />
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">
          {flipped ? "flip back" : "tap to flip"}
        </span>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
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

      {/* Name + Profile Card side by side */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="flex items-end gap-6"
      >
        <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.9] tracking-tight text-white">
          Shubham
          <br />
          <span className="text-white/20">Singh.</span>
        </h1>

        {/* Profile card — bottom-aligned with name */}
        <ProfileCard />
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