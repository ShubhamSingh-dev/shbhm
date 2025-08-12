"use client";
import React, { ReactElement, useRef } from "react";
import gsap from "gsap";

export interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  text: string;
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-white text-black border border-black",
  secondary: "bg-white text-black border border-black",
  tertiary: "bg-transparent text-purple-600 border border-purple-600",
};

const sizeStyles = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

const defaultStyles =
  "relative rounded-full flex gap-2 items-center justify-center overflow-hidden";

const Button = (props: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!buttonRef.current || !fillRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const fill = fillRef.current;
    const text = textRef.current;

    const rect = button.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    const maxDistance = Math.sqrt(
      Math.pow(buttonWidth / 2, 2) + Math.pow(buttonHeight, 2)
    );
    const diameter = maxDistance * 2;

    gsap.set(fill, {
      width: 0,
      height: 0,
      left: "50%",
      top: "100%",
      xPercent: -50,
      yPercent: -50,
      backgroundColor: "black",
    });

    gsap.to(fill, {
      width: diameter,
      height: diameter,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(text, {
      color: "white",
      duration: 0.3,
      delay: 0.1,
    });
  };

  const handleMouseLeave = () => {
    if (!fillRef.current || !textRef.current) return;

    gsap.to(fillRef.current, {
      width: 0,
      height: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      color: "black",
      duration: 0.3,
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {/* Flood fill circle */}
      <span
        ref={fillRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* Button content */}
      <span
        ref={textRef}
        className="relative z-10 flex gap-2 items-center font-semibold"
        style={{ color: "black" }}
      >
        {props.startIcon} {props.text} {props.endIcon}
      </span>
    </button>
  );
};

export default Button;
