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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Hero Section */}
      <div ref={heroRef} className="absolute inset-0">
        {heroComponent}
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="absolute inset-0">
        {aboutComponent}
      </div>
    </div>
  );
};

export default ScrollTransitionContainer;
