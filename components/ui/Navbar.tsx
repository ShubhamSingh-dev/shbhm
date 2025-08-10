"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import BurgerNavbar from "./BurgerNavbar";

const Navbar = () => {
  const navbarRef = useRef<HTMLHeadElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  // Handle navbar visibility based on scroll direction
  useEffect(() => {
    if (scrollDirection === "down" && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  return (
    <>
      <header
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } bg-white/90 backdrop-blur-sm shadow-sm`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          {/* Left: Available for Work */}
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-light text-gray-700">
              Available for work
            </span>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="font-bord text-2xl md:text-3xl font-bold tracking-wider uppercase text-black hover:text-gray-600 transition-colors duration-200"
            >
              SHBHM
            </Link>
          </div>

          {/* Right: Menu Toggle */}
          <BurgerNavbar />
        </div>
      </header>
    </>
  );
};

export default Navbar;
