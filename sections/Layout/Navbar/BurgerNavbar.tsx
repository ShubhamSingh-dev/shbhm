"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { socials } from "@/constants/constants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Link from "next/link";

const navigationItems = [
  { name: "HOME", id: "hero", hoverText: "GO HOME" },
  { name: "ABOUT", id: "about", hoverText: "LEARN MORE" },
  { name: "SERVICES", id: "services", hoverText: "WHAT I DO" },
  { name: "WORK", id: "work", hoverText: "MY PROJECTS" },
  { name: "CONTACT", id: "contact", hoverText: "GET IN TOUCH" },
];

interface BurgerNavbarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const BurgerNavbar = ({ isOpen, toggleMenu }: BurgerNavbarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useSmoothScroll();

  // Initialize animations once on mount
  useEffect(() => {
    if (
      !navRef.current ||
      !overlayRef.current ||
      !contactRef.current ||
      !containerRef.current
    )
      return;

    // Set initial states
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contactRef.current, { opacity: 0, y: 20 });

    // Set initial state for navigation items using class selector
    gsap.set(".nav-item", { opacity: 0, y: 30 });
  }, []);

  // Handle open/close animations
  useEffect(() => {
    if (!navRef.current || !overlayRef.current || !contactRef.current) return;

    if (isOpen) {
      // Create and play opening animation
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          navRef.current,
          {
            xPercent: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .to(
          ".nav-item",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          contactRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Burger animation
      if (topLineRef.current && bottomLineRef.current) {
        gsap.to(topLineRef.current, {
          rotation: 45,
          y: 3.5,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(bottomLineRef.current, {
          rotation: -45,
          y: -3.5,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Create and play closing animation
      const tl = gsap.timeline();

      tl.to(".nav-item", {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      })
        .to(
          contactRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2"
        )
        .to(
          navRef.current,
          {
            xPercent: 100,
            duration: 0.5,
            ease: "power3.in",
          },
          "-=0.1"
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.2"
        );

      // Reset burger animation
      if (topLineRef.current && bottomLineRef.current) {
        gsap.to(topLineRef.current, {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(bottomLineRef.current, {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    if (isOpen) {
      toggleMenu();
    }
  };

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, toggleMenu]);

  return (
    <div ref={containerRef}>
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm pointer-events-none"
        style={{ display: isOpen ? "block" : "none" }}
      />

      {/* Navigation Menu */}
      <nav
        ref={navRef}
        className="fixed z-60 flex flex-col justify-between w-full h-full px-6 md:px-10 uppercase bg-black text-white/80 pt-20 pb-8 md:pt-24 md:pb-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-4xl md:text-5xl lg:text-[4.8rem] items-center">
          {navigationItems.map((item, index) => (
            <div
              className="nav-item border border-white/20 w-full text-center font-spacegrotesk relative overflow-hidden"
              key={item.name}
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className="w-full font-bold tracking-tighter font-spacegrotesk py-2 transition-colors duration-300 relative group"
              >
                {/* Original text */}
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  {item.name}
                </span>

                {/* Hover text that slides up from below */}
                <span className="absolute inset-0 flex items-center justify-center text-white transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                  {item.hoverText}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between md:flex-row"
        >
          <div className="font-normal">
            <p className="tracking-wider text-white/50">E-mail</p>
            <Link
              href="mailto:mine.shubhamsingh@gmail.com"
              className="text-lg tracking-widest lowercase text-pretty hover:cursor-pointer hover:text-white transition-colors duration-300 relative group"
            >
              <span className="relative">
                mine.shubhamsingh@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
          <div className="font-normal">
            <p className="tracking-wider text-white/50">Social media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-2">
              {socials.map((social) => (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    {social.name}

                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed z-[70] flex flex-col justify-center items-center gap-1 bg-gray-900 rounded-full cursor-pointer w-10 h-10 md:w-12 md:h-12 right-6 top-4 transition-colors duration-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          ref={topLineRef}
          className="block w-7 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-7 h-0.5 bg-white rounded-full origin-center"
        />
      </button>
    </div>
  );
};

export default BurgerNavbar;
