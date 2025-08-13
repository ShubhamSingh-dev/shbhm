"use client";
import Button from "@/components/specific/Button";
import MainNavbar from "../Layout/Navbar/MainNavbar";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      

      {/* Hero Content */}
      <main className="relative flex flex-col justify-center h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-mediasansextended mb-4 text-gray-700">
            Hi👋, my name is Shubham and I am a
          </p>
          <div className="font-mediasans leading-none text-center text-[5rem] sm:text-[7rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[11rem]">
            <span
              className={`transition-all duration-500 ease-in-out
                ${
                  hovered
                    ? "text-transparent [-webkit-text-stroke:1px_black]"
                    : "text-black"
                }`}
              style={{
                WebkitTextStroke: hovered ? "1px black" : "0px",
                transition:
                  "color 0.3s cubic-bezier(0.4,0,0.2,1), -webkit-text-stroke 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              WebDeveloper
            </span>
            <br />
            <span
              className={`transition-all duration-500 ease-in-out cursor-pointer
                ${
                  hovered
                    ? "text-black"
                    : "text-transparent [-webkit-text-stroke:1px_black]"
                }`}
              style={{
                WebkitTextStroke: hovered ? "0px" : "1px black",
                transition:
                  "color 0.3s cubic-bezier(0.4,0,0.2,1), -webkit-text-stroke 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              & AI/ML Enthusiast
            </span>
          </div>
          <div className="mt-10">
            <Button
              variant="primary"
              text="Contact Me"
              size="lg"
              endIcon={<GoArrowUpRight className="w-6 h-6" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
