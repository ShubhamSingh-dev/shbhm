import { Slot } from "radix-ui";
import React from "react";

import { cn } from "@/lib/utils";

/**
 * Panel
 *
 * Fixed: removed non-existent CSS classes (screen-line-top, screen-line-bottom,
 * border-line) — these are now defined in globals.css and work correctly.
 * The left/right border-line connects to the GridOverlay rails because both
 * use the same max-w-3xl + px-4 boundary.
 */
function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn(
        // Horizontal lines top + bottom that extend full viewport width via pseudo-elements
        "screen-line-top screen-line-bottom",
        // Left + right borders that sit on the vertical rails
        "border-line",
        className
      )}
      {...props}
    />
  );
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        "screen-line-bottom px-4 py-4",
        className
      )}
      {...props}
    />
  );
}

function PanelTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"h2"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "h2";

  return (
    <Comp
      data-slot="panel-title"
      className={cn(
        "font-sans text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

function PanelTitleSup({ className, ...props }: React.ComponentProps<"sup">) {
  return (
    <sup
      className={cn(
        "-top-[0.75em] ml-1 text-sm font-normal tracking-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function PanelDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-description"
      className={cn(
        "py-3 font-mono text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-body"
      className={cn("px-4 py-4", className)}
      {...props}
    />
  );
}

export {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
};