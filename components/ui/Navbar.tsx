"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import BurgerNavbar from "./BurgerNavbar";

const Navbar = () => {
  // Navigation refs
  const navRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);

  // Burger button refs
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  // Animation timelines
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  const lenis = useRef<Lenis | null>(null);

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // Register plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Set initial states
    // Ensure navRef starts completely off-screen (100% of its width to the right)
    if (navRef.current) {
      gsap.set(navRef.current, { xPercent: 100 });
    }

    const existingLinks = linkRef.current.filter(Boolean);
    if (existingLinks.length > 0) {
      gsap.set(existingLinks, {
        autoAlpha: 0,
        y: 30,
      });
    }

    if (contactRef.current) {
      gsap.set(contactRef.current, {
        autoAlpha: 0,
        y: 20,
      });
    }

    // Create main animation timeline
    tl.current = gsap.timeline({ paused: true });

    if (navRef.current) {
      tl.current.to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (existingLinks.length > 0) {
      tl.current.to(
        existingLinks,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    }

    if (contactRef.current) {
      tl.current.to(
        contactRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );
    }

    // Burger icon animation
    if (topLineRef.current && bottomLineRef.current) {
      iconTl.current = gsap
        .timeline({ paused: true })
        .to(topLineRef.current, {
          rotation: 45,
          y: 3.3,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(
          bottomLineRef.current,
          {
            rotation: -45,
            y: -3.3,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<0.05"
        );
    }

    // ScrollTrigger for burger visibility
    let scrollTrigger: ScrollTrigger | null = null;

    const timer = setTimeout(() => {
      scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: function (self) {
          // Keep burger visible if menu is open, otherwise use scroll direction
          const isVisible =
            isOpen || self.direction === -1 || self.scroll() < 100;
          setShowBurger(isVisible);
        },
        onRefresh: function () {
          setShowBurger(true);
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.current?.destroy();
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isOpen]); // Add isOpen to dependency array to re-run ScrollTrigger on menu state change

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element && lenis.current) {
      lenis.current.scrollTo(element, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    if (isOpen) {
      toggleMenu();
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:mine.shubhamsingh@gmail.com";
  };

  // Close menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3 md:px-12 md:py-6">
          {/* Left: Available for Work */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-light text-gray-300">
              Available for work
            </span>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className=" font-bord text-2xl md:text-3xl font-bold tracking-wider uppercase text-white hover:text-gray-300 transition-colors duration-200"
            >
              SHBHM
            </Link>
          </div>

          {/* Right: Desktop Nav + Burger Button */}
          <div className="flex items-center">
            {/* Burger Button */}
            <BurgerNavbar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
