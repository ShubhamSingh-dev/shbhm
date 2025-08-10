"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!logoTextRef.current || !taglineRef.current || !navRef.current)
        return;

      // Initialize SplitText
      const splitLogo = new SplitText(logoTextRef.current, { type: "chars" });
      const logoChars = splitLogo.chars;

      // Create main timeline with optimized settings
      const mainTl = gsap.timeline({
        defaults: { force3D: true }, // Enable hardware acceleration
      });

      // Set initial states with will-change for better performance
      gsap.set(logoChars, {
        yPercent: 100,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set(taglineRef.current, {
        y: 30,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set(navRef.current.children, {
        y: -20,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Optimized animation sequence
      mainTl
        .to(navRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          delay: 0.1,
        })
        .to(
          logoChars,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03, // Reduced stagger for smoother effect
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to({}, { duration: 1 }) // Shorter hold time
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            // Clean up will-change properties
            if (navRef.current) {
              gsap.set([logoChars, taglineRef.current, navRef.current.children], {
                willChange: "auto",
              });
            } else {
              gsap.set([logoChars, taglineRef.current], {
                willChange: "auto",
              });
            }
            onComplete();
          },
        });

      return () => {
        splitLogo.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 w-full flex justify-center pt-12"
      >
        <span className="text-xl font-normal tracking-wide">Portfolio</span>
      </nav>

      {/* Main Logo */}
      <div className="flex items-center justify-center min-h-[10vh] px-4 overflow-hidden">
        <h1
          ref={logoTextRef}
          className="font-bord tracking-wider text-center leading-none mb-12 text-[clamp(6rem,12vw,14rem)]"
        >
          SHBHM
        </h1>
      </div>

      {/* Tagline */}
      <div className="flex justify-center absolute bottom-12 w-full">
        <p
          ref={taglineRef}
          className="text-xl md:text-2xl font-light tracking-wider text-center px-4"
        >
          Crafting delightful experiences
        </p>
      </div>
    </div>
  );
}
