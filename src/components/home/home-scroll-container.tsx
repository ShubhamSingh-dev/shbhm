"use client";

import { HeroSection } from "./hero-section";

/**
 * HomeScrollContainer
 *
 * Wraps the home page sections. Previously included a scroll-based parallax
 * on the hero (useScroll + useTransform) which caused layout jank because:
 *  - The hero had min-h-screen, making the scroll range unpredictable
 *  - The motion values were applied to the section itself, fighting sticky Navbar
 *
 * Now: clean stacking layout. Hero is just a tall section, no parallax.
 * Animations are handled per-section with simpler whileInView.
 */
export function HomeScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <HeroSection />
      {children}
    </div>
  );
}