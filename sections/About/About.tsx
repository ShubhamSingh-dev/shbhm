"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import "./animations.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "@/constants/constants";
import { HighlightText, CircleText, InteractiveBox } from "./textAnimation";
import { AnimationManager } from "./animation";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainContentRef.current) return;

    const animationManager = new AnimationManager(mainContentRef.current);

    // Marquee animation
    if (marqueeRef.current) {
      animationManager.createMarqueeAnimation(marqueeRef.current);
    }

    // Highlight animations
    animationManager.createHighlightAnimations([
      { selector: ".highlight-sleek" },
      { selector: ".highlight-flawless", delay: 0.5 },
      { selector: ".highlight-smooth", delay: 0.5 },
    ]);

    // Circle animation
    animationManager.createCircleAnimations([
      { selector: ".circle-develop", delay: 0.5 },
    ]);
  }, []);

  const handleEnter = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 2.5,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative bg-black text-white flex flex-col justify-center pb-8">
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
      <main
        ref={mainContentRef}
        className="w-[90%] p-6 md:px-12 lg:px-20 max-w-10xl mx-auto bg-gray-200 text-black rounded-4xl mt-20"
      >
        <h1 className="font-vailery font-semibold text-lg tracking-wide mb-10">
          What you can expect from me:
        </h1>

        <div className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center">
          I design and{" "}
          <CircleText className="circle-develop">develop</CircleText>{" "}
          high-impact
          <InteractiveBox
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          />
          websites that blend
        </div>

        <div className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center">
          <span>
            <HighlightText className="highlight-sleek">
              sleek visuals
            </HighlightText>
            ,{" "}
            <InteractiveBox
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            />
            custom animations, and{" "}
            <HighlightText className="highlight-flawless">
              flawless
            </HighlightText>{" "}
            responsiveness
          </span>
        </div>

        <div className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight mt-8 text-center">
          <InteractiveBox
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="inline-block px-3"
          />
          delivering
          <HighlightText className="highlight-smooth">
            smooth, interactive
          </HighlightText>
          experiences with a modern edge.
        </div>

        <div className="w-full flex flex-col-reverse gap-5 lg:flex-row lg:justify-between lg:items-start pt-18">
          <aside className="lg:w-1/4 flex flex-col gap-2">
            <h1 className="text-3xl font-vailery font-semibold tracking-wide mb-2">
              All Services:
            </h1>
            <h2 className="font-general text-sm sm:text-xl text-[#535353]">
              Web Development: Websites, Landing Pages, Custom Web Applications
            </h2>
            <h2 className="font-general text-sm sm:text-md text-[#535353]">
              From Development to Deployment
            </h2>
          </aside>

          <aside className="lg:w-2/4 flex flex-col gap-2">
            <p className="text-[#363636] tracking-wider font-semibold text-sm sm:text-lg">
              I'm a dedicated developer crafting custom websites, landing pages,
              and mobile apps that combine modern design with clean, efficient
              code. I focus on building responsive, intuitive experiences that
              look great and work flawlessly. From concept to launch, I
              collaborate closely with clients to turn ideas into polished
              digital products, delivered with precision and care.
            </p>
          </aside>
        </div>
      </main>
    </section>
  );
};

export default About;
