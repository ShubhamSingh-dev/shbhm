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
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !logoTextRef.current ||
        !taglineRef.current ||
        !navRef.current ||
        !containerRef.current
      )
        return;

      // Initialize SplitText
      const splitLogo = new SplitText(logoTextRef.current, { type: "chars" });
      const logoChars = splitLogo.chars;

      // Set initial states
      gsap.set([containerRef.current, curtainRef.current], {
        opacity: 1,
      });

      gsap.set(curtainRef.current, {
        yPercent: 100,
        willChange: "transform",
      });

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

      // Create main timeline
      const mainTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Animation sequence
      mainTl
        // Slide up curtain first
        .to(curtainRef.current, {
          yPercent: 0,
          duration: 1.2,
          ease: "power3.inOut",
        })
        // Then animate navbar elements
        .to(
          navRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
          },
          "-=0.8"
        )
        // Animate logo characters
        .to(
          logoChars,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.8,
          },
          "-=0.6"
        )
        // Animate tagline
        .to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4"
        )
        // Pause briefly
        .to({}, { duration: 0.5 })
        // Fade out everything
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            // Clean up will-change properties
            gsap.set(
              [
                logoChars,
                taglineRef.current,
                ...(navRef.current ? Array.from(navRef.current.children) : []),
                curtainRef.current,
              ],
              {
                willChange: "auto",
              }
            );
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
      {/* Curtain element for slide effect */}
      <div ref={curtainRef} className="absolute inset-0 bg-black z-0" />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 w-full flex justify-center pt-12 z-10"
      >
        <span className="text-xl font-normal tracking-wide">Portfolio</span>
      </nav>

      {/* Main Logo */}
      <div className="flex items-center justify-center min-h-[10vh] px-4 overflow-hidden z-10">
        <h1
          ref={logoTextRef}
          className="font-bord tracking-wider text-center leading-none mb-12 text-[clamp(6rem,12vw,14rem)]"
        >
          SHBHM
        </h1>
      </div>

      {/* Tagline */}
      <div className="flex justify-center absolute bottom-12 w-full z-10">
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
