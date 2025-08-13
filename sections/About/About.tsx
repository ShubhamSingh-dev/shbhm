"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "@/constants/constants";

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ paused: true });

const About: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (marqueeRef.current) {
      gsap.set(marqueeRef.current, { xPercent: 0 });
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 15,
        ease: "none",
        repeat: -1,
      });
    }
  });

  const handleEnter = (target: EventTarget) => {
    gsap.to(target, {
      scale: 2.5,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (target: EventTarget) => {
    gsap.to(target, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative bg-black text-white flex flex-col justify-center h-auto py-20">
      {/* Top wave */}
      <div className="absolute -top-65 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="w-full h-[300px]"
        >
          <path
            d="M0,100 C360,180 1080,180 1440,100 L1440,300 L0,300 Z"
            fill="black"
          />
        </svg>
      </div>

      {/* Marquee */}
      <div className="absolute -top-14 w-full overflow-hidden whitespace-nowrap z-10">
        <div ref={marqueeRef} className="inline-block will-change-transform">
          {[...skills, ...skills].map((skill: string, index: number) => (
            <span
              key={`skill-${index}`}
              className="mx-8 text-3xl font-bold uppercase tracking-widest select-none"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="w-[90%] p-6 md:px-12 lg:px-20 max-w-10xl mx-auto bg-gray-100 text-black rounded-4xl">
        <h1 className="font-vailery font-semibold text-lg tracking-wide mb-10 ">
          What you can expect from me:
        </h1>

        <div className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-snug text-center">
          I craft visually stunning
          <span
            onMouseEnter={(e) => handleEnter(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            className="inline-block align-middle px-3"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-black rounded-md" />
          </span>
          websites that offer
        </div>

        <div className="my-8 ml-[20rem] flex justify-start ">
          <span
            onMouseEnter={(e) => handleEnter(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            className="inline-block px-3"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-black rounded-md" />
          </span>
        </div>

        <div className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-snug text-center">
          <span>smooth, interactive experiences with custom animations</span>
        </div>

        <div className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-snug mt-8 text-center">
          <span
            onMouseEnter={(e) => handleEnter(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            className="inline-block px-3"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-black rounded-md" />
          </span>
          and modern design.
        </div>
      </main>
    </section>
  );
};

export default About;
