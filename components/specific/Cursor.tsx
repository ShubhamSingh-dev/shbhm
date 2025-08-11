"use client";

import { useRef, useEffect } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const animate = () => {
      const current = positionRef.current;
      const target = targetRef.current;

      const ease = 0.2;

      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      if (dotRef.current) {
        // Use transform3d for better performance
        dotRef.current.style.transform = `translate3d(${current.x - 10}px, ${
          current.y - 10
        }px, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize position to center of screen
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    positionRef.current = { x: initialX, y: initialY };
    targetRef.current = { x: initialX, y: initialY };

    window.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-5 h-5 rounded-full bg-white mix-blend-difference transition-opacity duration-300"
      style={{
        willChange: "transform",
      }}
    />
  );
}
