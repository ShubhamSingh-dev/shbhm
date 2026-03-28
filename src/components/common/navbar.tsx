import Image from "next/image";
import { Suspense } from "react";
import { navbarConfig } from "@/config/navbar";
import { Link } from "next-view-transitions";
import { ThemeSwitch } from "./theme-switch";
import { CommandMenu } from "./command-menu";
import { Separator } from "@/components/ui/separator";
import { NavItemGitHub } from "./nav-item-github";

/**
 * Navbar
 *
 * Sticky top bar. Uses px-4 max-w-3xl to align perfectly with the
 * GridOverlay rails. The left/right borders connect to the vertical rails.
 * backdrop-blur keeps it readable over page content on scroll.
 */
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="border-line mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="flex items-center transition-opacity hover:opacity-80">
          <Image
            src="/logo-dark.png"
            alt="Logo"
            width={38}
            height={38}
            className="block dark:hidden"
            priority
          />
          <Image
            src="/logo-white.png"
            alt="Logo"
            width={38}
            height={38}
            className="hidden dark:block"
            priority
          />
        </Link>


        {/* Right: nav links + actions */}
        <div className="flex items-center gap-1">
          {/* Nav links — hidden on mobile, shown sm+ */}
          <nav className="hidden items-center gap-1 sm:flex">
            {navbarConfig.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Separator
            orientation="vertical"
            className="mx-1 hidden h-4 self-center sm:block data-[orientation=vertical]:h-7"
          />

          <CommandMenu enableHotkeys />

          <Suspense fallback={null}>
            <NavItemGitHub />
          </Suspense>

          <Separator
            orientation="vertical"
            className="mx-1 h-4 self-center data-[orientation=vertical]:h-7"
          />

          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Navbar;