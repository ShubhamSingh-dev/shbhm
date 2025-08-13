// components/TextAnimations.tsx
import React from "react";

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
}

interface CircleTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  children,
  className = "",
}) => {
  return <span className={`highlight-text ${className}`}>{children}</span>;
};

export const CircleText: React.FC<CircleTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`circle-wrapper ${className}`}>
      <span className="circle-text">{children}</span>
      <svg className="circle-svg" viewBox="0 1 100 40">
        <path
          className="circle-path"
          d="M5,25 C20,5 80,5 95,25 C80,45 20,45 5,25 Z"
          fill="none"
        />
      </svg>
    </span>
  );
};

interface InteractiveBoxProps {
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  className?: string;
}

export const InteractiveBox: React.FC<InteractiveBoxProps> = ({
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => {
  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`inline-block align-middle px-3 ${className}`}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-black rounded-md" />
    </span>
  );
};
