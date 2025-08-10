"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/specific/LoadingScreen";
import { Hero } from "@/sections/Hero/Hero";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <Hero />
      </div>
    </>
  );
}