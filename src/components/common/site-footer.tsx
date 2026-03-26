"use client";

import { motion } from "motion/react";
import React from "react";
import { SOCIAL_LINKS } from "@/config/site";
import { VisitorCounter } from "../vistor-count";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-3xl border-line screen-line-top px-4 py-8"
    >
      {/* Label */}
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        Have an idea? Let&apos;s talk.
      </p>

      {/* Big email CTA */}
      <a
        href="mailto:mine.shubhamsingh@gmail.com"
        className="group block"
        aria-label="Send an email to mine.shubhamsingh@gmail.com"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span
              className="font-black leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-foreground/80"
              style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.5rem)" }}
            >
              mine.shubhamsingh
            </span>
            <span
              className="font-black leading-tight tracking-tight text-foreground/40 transition-all duration-300 group-hover:text-foreground/70"
              style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.5rem)" }}
            >
              @gmail.com
            </span>
          </div>

          {/* Animated underline */}
          <div className="h-px w-0 bg-gradient-to-r from-foreground/60 to-transparent transition-all duration-500 ease-out group-hover:w-full" />
        </div>

        {/* Arrow cue */}
        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
            Send a message
          </span>
          <span className="inline-block text-sm text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
            ↗
          </span>
        </div>
      </a>

      {/* Divider */}
      <div className="mb-8 mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-border/80" />
        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
          or find me on
        </span>
        <div className="h-px flex-1 bg-border/80" />
      </div>

      {/* Social links */}
      <div className="flex flex-wrap items-center gap-6">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-all duration-200 hover:text-foreground"
          >
            <span className="h-px w-0 bg-current transition-all duration-200 group-hover:w-5" />
            {s.label}
          </a>
        ))}
      </div>

      {/* Bottom meta row */}
      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-baseline">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80">
            Designed & Developed by Shubham
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/50">
            © 2026. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
            Total Visitors
          </span>
          <VisitorCounter />
        </div>
      </div>
    </motion.footer>
  );
}

