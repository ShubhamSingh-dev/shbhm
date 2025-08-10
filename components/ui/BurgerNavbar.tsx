"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { socials } from "@/constants/socials";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const navigationItems = [
  { name: "HOME", id: "hero" },
  { name: "ABOUT", id: "about" },
  { name: "SERVICES", id: "services" },
  { name: "WORK", id: "work" },
  { name: "CONTACT", id: "contact" },
];

const BurgerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Timelines
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const burgerTl = useRef<gsap.core.Timeline | null>(null);
  
  const { scrollTo } = useSmoothScroll();

  useGSAP(() => {
    // Initialize arrays
    linkRefs.current = new Array(navigationItems.length).fill(null);

    // Wait for next tick to ensure refs are set
    const initAnimation = () => {
      // Check if all required refs exist
      if (!navRef.current || !overlayRef.current || !contactRef.current) {
        return;
      }

      // Filter out null refs for links
      const validLinkRefs = linkRefs.current.filter(Boolean);
      
      // Set initial states only for existing elements
      gsap.set(navRef.current, { xPercent: 100 });
      gsap.set(overlayRef.current, { opacity: 0 });
      
      if (validLinkRefs.length > 0) {
        gsap.set(validLinkRefs, { opacity: 0, y: 30 });
      }
      
      gsap.set(contactRef.current, { opacity: 0, y: 20 });

      // Menu animation timeline
      menuTl.current = gsap.timeline({ paused: true })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(navRef.current, {
          xPercent: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.1");

      // Only animate links if they exist
      if (validLinkRefs.length > 0) {
        menuTl.current.to(validLinkRefs, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");
      }

      menuTl.current.to(contactRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.2");

      // Burger icon animation
      if (topLineRef.current && bottomLineRef.current) {
        burgerTl.current = gsap.timeline({ paused: true })
          .to(topLineRef.current, {
            rotation: 45,
            y: 3.5,
            duration: 0.3,
            ease: "power2.inOut",
          })
          .to(bottomLineRef.current, {
            rotation: -45,
            y: -3.5,
            duration: 0.3,
            ease: "power2.inOut",
          }, "<");
      }
    };

    // Use setTimeout to ensure refs are set after render
    const timeoutId = setTimeout(initAnimation, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      menuTl.current?.reverse();
      burgerTl.current?.reverse();
    } else {
      menuTl.current?.play();
      burgerTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

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
  }, [isOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pointer-events-none"
        style={{ display: isOpen ? 'block' : 'none' }}
      />

      {/* Navigation Menu - Restored your original style */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-[4.8rem] items-center mt-25">
          {navigationItems.map((item, index) => (
            <div
              className="border border-white/10 w-full text-center"
              key={item.name}
              ref={(el) => {
                if (linkRefs.current) {
                  linkRefs.current[index] = el;
                }
              }}
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className="transition-all duration-300 cursor-pointer hover:text-white w-full font-bold tracking-tighter font-spacegrotesk"
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>

        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row mt-15"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-lg tracking-widest lowercase text-pretty">
              mine.shubhamsingh@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social) => (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  {"{"}
                  {social.name}
                  {"}"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Burger Button with higher z-index */}
      <button
        ref={burgerRef}
        onClick={toggleMenu}
        className="fixed z-[60] flex flex-col justify-center items-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-8 h-8 md:w-14 md:h-14 right-6 top-4"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </button>
    </>
  );
};

export default BurgerNavbar;