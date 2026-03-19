"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";

import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";

// ─── Main Component ───────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#080808] text-white selection:bg-white/10"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/1.5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-indigo-900/10 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-rose-900/8 blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.03] bg-noise"
      />

      <main className="relative z-20 mx-auto max-w-3xl px-6">
        {/* ── HERO ─────────────────────────────────────── */}
        <HeroSection heroOpacity={heroOpacity} heroY={heroY} />

        {/* ── ABOUT ─────────────────────────────────────── */}
        <AboutSection />

        {/* ── FOOTER CTA ────────────────────────────────── */}
        <CtaSection />
      </main>
    </div>
  );
}