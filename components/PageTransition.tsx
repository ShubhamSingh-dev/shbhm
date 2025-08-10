"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Start from invisible and slightly scaled down for a smoother feel
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.98, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="will-change-transform will-change-opacity"
    >
      {children}
    </div>
  );
}
