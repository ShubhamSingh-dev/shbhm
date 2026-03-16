import { Suspense } from "react";
import { navbarConfig } from "@/config/Navbar";
import { Link } from "next-view-transitions";
import Container from "./container";
import { ThemeSwitch } from "./theme-switch";
import { CommandMenu } from "./command-menu";
import { Separator } from "../ui/separator";
import { NavItemGitHub } from "./nav-item-github";

const Navbar = () => {
  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="font-pixel text-lg leading-none">S</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <CommandMenu enableHotkeys />
          <Suspense fallback={null}>
            <NavItemGitHub />
          </Suspense>
          <Separator
            orientation="vertical"
            className="mx-1 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
          />
          <ThemeSwitch />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
