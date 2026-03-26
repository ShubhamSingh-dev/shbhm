import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container
 *
 * Centered content column, max-w-3xl, px-4.
 * The px-4 padding matches GridOverlay's rail positions exactly,
 * so section borders and dividers connect cleanly to the vertical rails.
 */
const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;