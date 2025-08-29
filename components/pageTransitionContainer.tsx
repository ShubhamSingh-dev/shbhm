"use client";
import React from "react";
import { useScrollTransition } from "@/hooks/useScrollTransition";

interface ScrollTransitionContainerProps {
  heroComponent: React.ReactNode;
  aboutComponent: React.ReactNode;
}

const ScrollTransitionContainer: React.FC<ScrollTransitionContainerProps> = ({
  heroComponent,
  aboutComponent,
}) => {
  const { containerRef, heroRef, aboutRef } = useScrollTransition();

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "150vh" }} // Reduced from 200vh to 150vh
    >
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="absolute inset-0 w-full h-screen pointer-events-auto"
      >
        {heroComponent}
      </div>

      {/* About Section */}
      <div
        ref={aboutRef}
        className="absolute inset-0 w-full h-screen pointer-events-none"
      >
        {aboutComponent}
      </div>
    </div>
  );
};

export default ScrollTransitionContainer;
