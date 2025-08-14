"use client";
import React, { ReactElement, useRef } from "react";
import gsap from "gsap";

export interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  text: string;
  size?: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-white text-black border border-black rounded-full",
  secondary: "bg-black text-white border border-black rounded-full",
  tertiary: "text-black", // no bg, no border, no padding
};

const sizeStyles = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

const defaultStyles =
  "relative flex gap-2 items-center justify-center overflow-hidden transition-colors duration-300";

const Button = ({
  variant,
  text,
  size = "md",
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (variant === "tertiary") return;
    if (!buttonRef.current || !fillRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const fill = fillRef.current;
    const textEl = textRef.current;

    const rect = button.getBoundingClientRect();
    const maxDistance = Math.sqrt(
      Math.pow(rect.width / 2, 2) + Math.pow(rect.height, 2)
    );
    const diameter = maxDistance * 2;

    gsap.set(fill, {
      width: 0,
      height: 0,
      left: "50%",
      top: "100%",
      xPercent: -50,
      yPercent: -50,
      backgroundColor: variant === "primary" ? "black" : "white",
    });

    gsap.to(fill, {
      width: diameter,
      height: diameter,
      duration: 0.45,
      ease: "power2.out",
      onStart: () => {
        gsap.to(textEl, {
          color: variant === "primary" ? "white" : "black",
          duration: 0.25,
          delay: 0.05,
        });
      },
    });
  };

  const handleMouseLeave = () => {
    if (variant === "tertiary") return;
    if (!fillRef.current || !textRef.current) return;

    gsap.to(fillRef.current, {
      width: 0,
      height: 0,
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      color: variant === "primary" ? "black" : "white",
      duration: 0.25,
    });
  };

  if (variant === "tertiary") {
    // Pure text with underline on hover
    return (
      <button
        onClick={onClick}
        className="relative font-semibold text-black group"
      >
        <span className="flex gap-2 items-center">
          {startIcon} {text} {endIcon}
        </span>
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]} font-semibold`}
    >
      {/* Fill effect */}
      <span
        ref={fillRef}
        className="absolute z-0 rounded-full pointer-events-none"
      />

      {/* Button text */}
      <span ref={textRef} className="relative z-10 flex gap-2 items-center">
        {startIcon} {text} {endIcon}
      </span>
    </button>
  );
};

export default Button;
