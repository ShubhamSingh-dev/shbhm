import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/config/footer";


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/4 bg-[#080808]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <span className="font-pixel text-lg text-white/80">S</span>
            <p className="mt-3 max-w-[200px] font-mono text-[10px] leading-relaxed text-white/20">
              Building things that matter, one commit at a time.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-mono text-[9px] uppercase tracking-widest text-white/15">
              Navigate
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] text-white/30 transition-colors hover:text-white/60"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-mono text-[9px] uppercase tracking-widest text-white/15">
              Connect
            </span>
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] text-white/30 transition-colors hover:text-white/60"
                >
                  <Icon size={11} />
                  {social.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex items-center justify-between border-t border-white/4 pt-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
              Available for work
            </span>
          </div>
          <span className="font-mono text-[9px] text-white/15">
            © {currentYear} Shubham Singh
          </span>
        </div>
      </div>
    </footer>
  );
}