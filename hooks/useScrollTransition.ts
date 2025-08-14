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
    });

    gsap.set(heroSection, {
      zIndex: 5,
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate About section sliding up to overlay Hero
    tl.to(aboutSection, {
      yPercent: 0,
      duration: 1,
      ease: "none",
    });

    // Fade out hero content
    const heroContent = heroSection.querySelector(".hero-content");
    if (heroContent) {
      tl.to(
        heroContent,
        {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "none",
        },
        0
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { containerRef, heroRef, aboutRef };
};
