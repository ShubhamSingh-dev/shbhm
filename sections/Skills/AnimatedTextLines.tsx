"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextLinesProps {
  text: string;
  className?: string;
}

export const AnimatedTextLines: React.FC<AnimatedTextLinesProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into non-empty lines
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(
    () => {
      if (lineRefs.current.length > 0) {
        gsap.from(lineRefs.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el;
          }}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
