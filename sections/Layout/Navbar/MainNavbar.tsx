"use client";

import { useState } from "react";
import BurgerNavbar from "./BurgerNavbar";
import Link from "next/link";

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* White top navbar */}
      <header className="fixed top-0 left-0 w-full bg-white flex justify-between items-center px-6 py-4 z-50 shadow-sm">
        {/* Left - Available for work */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm md:text-base text-normal trac text-black">
            Available for work
          </span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="font-bord text-2xl md:text-3xl font-bold tracking-wider uppercase text-black hover:text-gray-600 transition-colors duration-200"
          >
            SHBHM
          </Link>
        </div>

        {/* Right - Hamburger */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center gap-1 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 z-[60]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="block w-6 h-0.5 bg-white rounded-full origin-center transition-transform duration-300" />
          <span className="block w-6 h-0.5 bg-white rounded-full origin-center transition-transform duration-300" />
        </button>
      </header>

      {/* Burger menu overlay */}
      <BurgerNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
}