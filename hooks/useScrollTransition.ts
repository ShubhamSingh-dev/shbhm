"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const heroSection = heroRef.current;
    const aboutSection = aboutRef.current;

    if (!container || !heroSection || !aboutSection) return;

    // Set initial states
    gsap.set(aboutSection, {
      yPercent: 100,
      zIndex: 10,
      pointerEvents: "none",
    });

    gsap.set(heroSection, {
      zIndex: 5,
      pointerEvents: "auto",
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "40% top", // Reduced from 50% to 40% to make transition faster
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: false, // This prevents extra space after pinned section
        onUpdate: (self) => {
          // Toggle pointer events based on scroll progress
          if (self.progress < 0.4) {
            // Hero is in view
            heroSection.style.pointerEvents = "auto";
            aboutSection.style.pointerEvents = "none";
          } else {
            // About is in view
            heroSection.style.pointerEvents = "none";
            aboutSection.style.pointerEvents = "auto";
          }
        },
      },
    });

    // Animate About section sliding up to overlay Hero
    tl.to(aboutSection, {
      yPercent: 0,
      duration: 1,
      ease: "none",
    });

    // Fade out hero content but preserve button interactivity
    const heroContent = heroSection.querySelector(".hero-content");
    if (heroContent) {
      // Find the button container and exclude it from fade animation
      const buttonContainer = heroContent.querySelector(
        '[style*="z-index: 50"]'
      );

      // Create separate timelines for different elements
      const heroText = heroContent.querySelectorAll(
        'p, div:not([style*="z-index: 50"])'
      );

      if (heroText.length > 0) {
        tl.to(
          heroText,
          {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "none",
          },
          0
        );
      }

      // Keep button container fully interactive by not animating it
      if (buttonContainer) {
        gsap.set(buttonContainer, {
          willChange: "auto",
          pointerEvents: "auto",
          opacity: 1,
        });
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { containerRef, heroRef, aboutRef };
};
