"use client";

import { useRouter } from "next/navigation";
import {
  BookOpenIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MoonStarIcon,
  RssIcon,
  SearchIcon,
  SunMediumIcon,
  TwitterIcon,
  MonitorIcon,
  Folder,
  File,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  openInNewTab?: boolean;
};

// ---------------------------------------------------------------------------
// Data — edit these to match your site
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/", icon: <HomeIcon /> },
  { title: "Blog", href: "/blog", icon: <BookOpenIcon /> },
  { title: "Projects", href: "/projects", icon: <Folder />},
  { title: "Resume", href: "/resume", icon: <File />}
];

const SOCIAL_ITEMS: NavItem[] = [
  {
    title: "GitHub",
    href: "https://github.com/yourusername",
    icon: <GithubIcon />,
    openInNewTab: true,
  },
  {
    title: "Twitter / X",
    href: "https://twitter.com/yourusername",
    icon: <TwitterIcon />,
    openInNewTab: true,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: <LinkedinIcon />,
    openInNewTab: true,
  },
];

const OTHER_ITEMS: NavItem[] = [
  { title: "RSS Feed", href: "/rss", icon: <RssIcon />, openInNewTab: true },
  {
    title: "llms.txt",
    href: "/llms.txt",
    icon: <FileTextIcon />,
    openInNewTab: true,
  },
];

// ---------------------------------------------------------------------------
// Trigger button
// ---------------------------------------------------------------------------

function CommandMenuTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-1.5 rounded-full text-muted-foreground shadow-none select-none
                 hover:bg-background hover:text-muted-foreground dark:hover:bg-input/30"
    >
      <SearchIcon className="size-3.5" />
      <span className="text-sm/4 font-medium sm:hidden">Search…</span>
      {/* Desktop kbd hint */}
      <span className="hidden items-center gap-0.5 sm:flex">
        <Kbd className="w-5 min-w-5">⌘</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </span>
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function CommandMenuFooter() {
  return (
    <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-t px-4 text-xs font-medium">
      <span className="text-muted-foreground">Navigate</span>

      <div className="flex shrink-0 items-center gap-2 max-sm:hidden">
        <span>Open</span>
        <Kbd>
          <CornerDownLeftIcon className="size-3" />
        </Kbd>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
        />
        <span className="text-muted-foreground">Close</span>
        <Kbd>Esc</Kbd>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav item group — reusable
// ---------------------------------------------------------------------------

function NavGroup({
  heading,
  items,
  onSelect,
}: {
  heading: string;
  items: NavItem[];
  onSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  if (!items.length) return null;
  return (
    <CommandGroup heading={heading}>
      {items.map((item) => (
        <CommandItem
          key={item.href}
          onSelect={() => onSelect(item.href, item.openInNewTab)}
        >
          {item.icon}
          {item.title}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CommandMenu({
  enableHotkeys = false,
}: {
  enableHotkeys?: boolean;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Keyboard shortcut to open/close
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      setOpen((prev) => !prev);
    },
    { enabled: enableHotkeys },
  );

  const handleSelect = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);
      if (openInNewTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    },
    [router],
  );

  const handleTheme = useCallback(
    (theme: "light" | "dark" | "system") => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme],
  );

  return (
    <>
      <CommandMenuTrigger onClick={() => setOpen(true)} />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />

        <CommandList className="min-h-80">
          <CommandEmpty>No results found.</CommandEmpty>

          <NavGroup heading="Menu" items={NAV_ITEMS} onSelect={handleSelect} />

          <NavGroup
            heading="Social"
            items={SOCIAL_ITEMS}
            onSelect={handleSelect}
          />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => handleTheme("light")}>
              <SunMediumIcon />
              Light
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("dark")}>
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => handleTheme("system")}>
              <MonitorIcon />
              System
            </CommandItem>
          </CommandGroup>

          <NavGroup heading="Other" items={OTHER_ITEMS} onSelect={handleSelect} />
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}