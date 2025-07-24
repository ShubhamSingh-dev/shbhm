import { useEffect, useRef, useState } from "react";
import { socials } from "@/constants/socials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const BurgerNavbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  const lenis = useRef<Lenis | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true); // Show burger by default

  // Register plugins once
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

    // Initialize refs array with correct length
    linkRef.current = new Array(5).fill(null);

    // Set initial states with better positioning
    if (navRef.current) {
      gsap.set(navRef.current, { xPercent: 100 });
    }

    // Only animate elements that exist
    const existingLinks = linkRef.current.filter(Boolean);
    if (existingLinks.length > 0) {
      gsap.set(existingLinks, {
        autoAlpha: 0,
        y: 30, // Use y instead of x for better effect
      });
    }

    if (contactRef.current) {
      gsap.set(contactRef.current, {
        autoAlpha: 0,
        y: 20, // Use y instead of x for better effect
      });
    }

    // Create main animation timeline with slower, more elegant timing
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

    // Burger icon animation - slower and smoother
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

    // ScrollTrigger for burger visibility - using a more stable approach
    let scrollTrigger: ScrollTrigger | null = null;

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: function (self) {
          // Use function declaration instead of arrow function to avoid context issues
          const isVisible = self.direction === -1 || self.scroll() < 100;
          setShowBurger(isVisible);
        },
        onRefresh: function () {
          // Handle refresh events
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
  }, []);

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
    // Add smooth scroll to section logic here
    const element = document.getElementById(section.toLowerCase());
    if (element && lenis.current) {
      lenis.current.scrollTo(element);
    }

    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2" // style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-[4.8rem] items-center mt-25">
          {["MAIN HOME", "ABOUT", "SERVICES", "WORK", "CONTACT"].map(
            (section, index) => (
              <div
                className="border border-white/10 w-full text-center"
                key={section}
                ref={(el) => {
                  if (linkRef.current) {
                    linkRef.current[index] = el;
                  }
                }}
              >
                <button
                  type="button"
                  className="transition-all duration-300 cursor-pointer hover:text-white w-full font-bold tracking-tighter font-spacegrotesk"
                  onClick={() => handleNavClick(section)}
                >
                  {section}
                </button>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row mt-15"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50 ">E-mail</p>
            <p className="text-lg tracking-widest lowercase text-pretty">
              mine.shubhamsingh@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50 ">Social media</p>
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

      <button
        type="button"
        className={`fixed z-50 flex flex-col justify-center items-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-8 h-8 md:w-14 md:h-14 right-6  ${
          showBurger ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
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
