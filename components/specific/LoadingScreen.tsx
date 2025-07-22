// src/components/LoadingScreen.tsx
"use client"; // Essential for client-side components using hooks like useRef and useGSAP

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

// No props needed for this version
export function LoadingScreen() {
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // State to control the visibility of the loading screen
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      // Only run animation if the component is visible
      if (
        !isVisible ||
        !logoTextRef.current ||
        !taglineRef.current ||
        !navRef.current
      ) {
        return;
      }

      // Initialize SplitText on the logo text
      const splitLogo = new SplitText(logoTextRef.current, { type: "chars" });
      const logoChars = splitLogo.chars;

      // Create a timeline for the entire loading screen animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loadingScreenRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
              setIsVisible(false); // Set state to hide the component entirely after fade out
            },
          });
        },
      });

      // Initial state: hide elements
      gsap.set(logoChars, { yPercent: 100, opacity: 0 });
      gsap.set(taglineRef.current, { y: 30, opacity: 0 });
      gsap.set(navRef.current.children, { y: -20, opacity: 0 });

      // Animation sequence
      tl.to(navRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.2,
      })
        .to(logoChars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: -0.4,
        })
        .to(taglineRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: -0.7,
        });
    },
    { scope: loadingScreenRef, dependencies: [isVisible] }
  ); // Re-run effect only if isVisible changes (or for initial mount)

  // Only render the component if it's visible
  if (!isVisible) {
    return null; // Don't render anything if the loading screen is not visible
  }

  return (
    <div
      ref={loadingScreenRef}
      // Use opacity-0 initially with transition for graceful removal, or just fixed inset-0 z-50
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 w-full flex justify-center pt-12"
      >
        <span className="text-xl font-normal tracking-wide">Home</span>
      </nav>

      <div className="flex items-center justify-center min-h-[10vh] px-4 overflow-hidden">
        <h1
          ref={logoTextRef}
          className="font-bord tracking-wider text-center leading-none mb-12 text-[clamp(6rem,12vw,14rem)]"
        >
          SHBHM
        </h1>
      </div>

      <div className="flex justify-center absolute bottom-12 w-full">
        <p
          ref={taglineRef}
          className="text-xl md:text-2xl font-light tracking-wider"
        >
          Crafting delightful experiences
        </p>
      </div>
    </div>
  );
}
