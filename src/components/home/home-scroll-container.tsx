"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { HeroSection } from "./hero-section";

export function HomeScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-foreground transition-colors duration-300 selection:bg-foreground/10"
    >
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.03] bg-noise" />

      <main className="relative z-20 mx-auto max-w-3xl">
        <HeroSection heroOpacity={heroOpacity} heroY={heroY} />
        {children}
      </main>
    </div>
  );
}
