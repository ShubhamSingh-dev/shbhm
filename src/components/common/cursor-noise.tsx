"use client";
import { useEffect, useRef } from "react";

export default function NoiseCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let raf: number;
    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.12;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x - 16}px, ${smoothPos.current.y - 16}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-white/20 transition-transform duration-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
