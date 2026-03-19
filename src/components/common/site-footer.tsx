"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube, Instagram, Mail, Rss } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "Twitter",   href: "https://x.com/ramxcodes",                 icon: Twitter   },
  { name: "GitHub",    href: "https://github.com/ramxcodes",             icon: Github    },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/ramxcodes/",   icon: Linkedin  },
  { name: "YouTube",   href: "https://youtube.com/@ramxcodes",           icon: Youtube   },
  { name: "Instagram", href: "https://www.instagram.com/ramxcodes/",     icon: Instagram },
  { name: "Email",     href: "mailto:hi@ramx.in",                        icon: Mail      },
  { name: "RSS",       href: "/blog/feed.xml",                           icon: Rss       },
];

const NAV_COLS = [
  [
    { name: "Home",     href: "/" },
    { name: "Work",     href: "/work" },
    { name: "Blog",     href: "/blog" },
    { name: "Projects", href: "/projects" },
  ],
  [
    { name: "Resume",   href: "/resume" },
    { name: "Gears",    href: "/gears" },
    { name: "Setup",    href: "/setup" },
    { name: "Terminal", href: "/terminal" },
  ],
  [
    { name: "Books",    href: "/books" },
    { name: "Movies",   href: "/movies" },
    { name: "RSS Feed", href: "/blog/feed.xml" },
  ],
];

/* ── Magnetic wrapper ─────────────────────────────────────────── */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ display: "inline-flex", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
    >
      {children}
    </div>
  );
}

/* ── Spotlight ────────────────────────────────────────────────── */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const footer = ref.current?.parentElement;
    if (!footer) return;
    const fn = (e: MouseEvent) => {
      const r = footer.getBoundingClientRect();
      ref.current?.style.setProperty("--sx", `${e.clientX - r.left}px`);
      ref.current?.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    footer.addEventListener("mousemove", fn);
    return () => footer.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      style={{
        background: "radial-gradient(700px at var(--sx,50%) var(--sy,50%), rgba(124,58,237,0.07), transparent 70%)",
      }}
    />
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export function SiteFooter() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');

        @keyframes marquee-scroll { to { transform: translateX(-50%); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes rise { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        .ft-root { font-family:'DM Sans',sans-serif; background:#0a0a0a; position:relative; overflow:hidden; }

        /* noise */
        .ft-root::before {
          content:''; position:absolute; inset:0; z-index:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          opacity:.4;
        }

        .ft-serif { font-family:'Instrument Serif',Georgia,serif; }
        .ft-mono  { font-family:'JetBrains Mono',monospace; }

        /* top glow line */
        .ft-topline {
          height:1px; width:100%;
          background:linear-gradient(90deg,transparent 0%,rgba(124,58,237,.8) 35%,rgba(196,181,253,.5) 50%,rgba(124,58,237,.8) 65%,transparent 100%);
        }

        /* marquee */
        .ft-marquee-wrap { overflow:hidden; border-bottom:1px solid rgba(255,255,255,.06); }
        .ft-marquee-track {
          display:flex; white-space:nowrap;
          animation:marquee-scroll 22s linear infinite;
          will-change:transform;
        }
        .ft-marquee-track:hover { animation-play-state:paused; }
        .ft-marquee-item {
          padding:22px 48px;
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(2rem,5vw,3.75rem);
          font-style:italic;
          color:rgba(255,255,255,.05);
          letter-spacing:-0.02em;
          user-select:none;
          flex-shrink:0;
        }
        .ft-marquee-dot { color:rgba(124,58,237,.4); margin:0 24px; }

        /* big name */
        .ft-bigname {
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(3.8rem,12vw,10rem);
          line-height:.88;
          letter-spacing:-0.04em;
          background:linear-gradient(160deg,#fff 20%,rgba(255,255,255,.25) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        /* tag pill */
        .ft-tag {
          display:inline-flex; align-items:center; gap:7px;
          border:1px solid rgba(255,255,255,.1);
          border-radius:999px; padding:6px 14px;
          font-family:'JetBrains Mono',monospace;
          font-size:.68rem; color:rgba(255,255,255,.45);
          background:rgba(255,255,255,.03);
          backdrop-filter:blur(8px);
        }

        /* open badge */
        .ft-open-badge {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(74,222,128,.2);
          border-radius:999px; padding:8px 20px;
          font-family:'JetBrains Mono',monospace;
          font-size:.68rem; color:rgba(74,222,128,.7);
          background:rgba(74,222,128,.05);
        }
        .ft-greendot {
          width:6px;height:6px;border-radius:50%;
          background:#4ade80;
          box-shadow:0 0 8px #4ade80,0 0 20px rgba(74,222,128,.4);
          animation:blink 2s ease infinite;
        }

        /* nav */
        .ft-nav-label { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.18); margin-bottom:18px; display:block; }
        .ft-nav-link  { display:block; font-size:.8125rem; font-weight:300; color:rgba(255,255,255,.38); text-decoration:none; padding:3.5px 0; transition:color .18s ease,padding-left .18s ease; }
        .ft-nav-link:hover { color:rgba(255,255,255,.85); padding-left:5px; }

        /* social pill */
        .ft-social {
          width:40px;height:40px;border-radius:50%;
          border:1px solid rgba(255,255,255,.09);
          background:rgba(255,255,255,.03);
          display:flex;align-items:center;justify-content:center;
          color:rgba(255,255,255,.4); text-decoration:none;
          transition:background .25s,border-color .25s,color .25s,transform .4s;
        }
        .ft-social:hover { background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.28); color:#fff; }

        /* cta email */
        .ft-email-btn {
          display:inline-flex; align-items:center; gap:10px;
          border:1px solid rgba(255,255,255,.12); border-radius:999px;
          padding:12px 24px;
          font-family:'DM Sans',sans-serif; font-size:.8125rem; font-weight:500;
          color:rgba(255,255,255,.65); background:rgba(255,255,255,.04);
          text-decoration:none; backdrop-filter:blur(10px);
          transition:background .25s,color .25s,border-color .25s;
        }
        .ft-email-btn:hover { background:#fff; color:#000; border-color:#fff; }

        /* bottom */
        .ft-bottom { font-family:'JetBrains Mono',monospace; font-size:.62rem; color:rgba(255,255,255,.18); letter-spacing:.04em; }

        /* divider */
        .ft-hr { border:none; border-top:1px solid rgba(255,255,255,.07); margin:0; }

        /* animation */
        .ft-a1 { animation:rise .65s ease .05s both; }
        .ft-a2 { animation:rise .65s ease .15s both; }
        .ft-a3 { animation:rise .65s ease .25s both; }
        .ft-a4 { animation:rise .65s ease .35s both; }
      `}</style>

      <footer className="ft-root group">
        <Spotlight />

        {/* top glow */}
        <div className="ft-topline relative z-10" />

        {/* marquee */}
        <div className="ft-marquee-wrap ft-a1 relative z-10">
          <div className="ft-marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="ft-marquee-item">
                Ramkrishna Swarnkar
                <span className="ft-marquee-dot">✦</span>
                Full Stack Developer
                <span className="ft-marquee-dot">✦</span>
                Open to Work
                <span className="ft-marquee-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">

          {/* name + cta */}
          <div className="ft-a2 flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between border-b border-white/[0.07]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="ft-tag">Portfolio</span>
                <span className="ft-tag">2025</span>
              </div>
              <h2 className="ft-bigname">Ramkrishna<br />Swarnkar</h2>
            </div>

            <div className="flex flex-col items-start gap-5 sm:items-end pb-1">
              <p
                className="text-right leading-snug max-w-xs"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(.95rem, 2.2vw, 1.2rem)",
                  color: "rgba(255,255,255,.4)",
                }}
              >
                "Building things that actually matter."
              </p>
              <Magnetic>
                <a href="mailto:hi@ramx.in" className="ft-email-btn">
                  <Mail size={13} />
                  hi@ramx.in
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* nav + socials */}
          <div className="ft-a3 grid grid-cols-2 gap-10 py-14 sm:grid-cols-4 border-b border-white/[0.07]">
            {NAV_COLS.map((col, ci) => (
              <div key={ci}>
                <span className="ft-nav-label">
                  {["Navigate", "Content", "More"][ci]}
                </span>
                {col.map((link) => (
                  <Link key={link.name} href={link.href} className="ft-nav-link">
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}

            {/* socials */}
            <div>
              <span className="ft-nav-label">Connect</span>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Magnetic key={s.name} strength={0.4}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={s.name}
                        className="ft-social"
                      >
                        <Icon size={14} />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="ft-a4 flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="ft-open-badge">
              <span className="ft-greendot" />
              Available for freelance & full-time
            </div>
            <div className="flex items-center gap-6 ft-bottom">
              <span>Visitor <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 500 }}>#32,875</span></span>
              <span>© {new Date().getFullYear()} Ramkrishna Swarnkar</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}