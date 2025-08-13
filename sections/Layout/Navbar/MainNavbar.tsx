"use client";

import { useState } from "react";
import BurgerNavbar from "./BurgerNavbar";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useEffect, useRef } from "react";

const navigationItems = [
  { name: "HOME", id: "hero" },
  { name: "ABOUT", id: "about" },
  { name: "SERVICES", id: "services" },
  { name: "WORK", id: "work" },
  { name: "CONTACT", id: "contact" },
];

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLHeadElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle navbar visibility based on scroll direction (desktop behavior)
  useEffect(() => {
    if (scrollDirection === "down" && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  return (
    <>
      {/* Main Navbar */}
      <header
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } bg-transparent flex justify-between items-center px-6 py-4 z-50 `}
      >
        {/* Left - Available for work */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          {/* Responsive text: "Available for work" on desktop, "Available" on mobile */}
          <span className="text-sm text-black tracking-wider md:text-base md:inline hidden">
            Available for work
          </span>
          <span className="text-sm text-black md:hidden tracking-wider">
            Available
          </span>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="font-bord text-2xl md:text-3xl font-bold tracking-wider uppercase text-black hover:text-gray-600 transition-colors duration-200"
          >
            SHBHM
          </Link>
        </div>

        <BurgerNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
      </header>
    </>
  );
}
