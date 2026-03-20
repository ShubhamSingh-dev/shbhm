import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/config/footer";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] overflow-hidden border-t border-white/5">
      {/* ── MASSIVE NAME ─────────────────────────────────── */}
      <div className="relative select-none px-3 pb-0 overflow-hidden">
        {/* Gradient fade — name bleeds off the bottom edge */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent z-10" />

        <p
          className="font-black leading-[0.82] tracking-tighter text-white/[0.045] transition-colors duration-700 hover:text-white/[0.08] whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 22vw, 14rem)",
            letterSpacing: "-0.03em",
          }}
        >
          SHBHM
        </p>
      </div>
    </footer>
  );
}