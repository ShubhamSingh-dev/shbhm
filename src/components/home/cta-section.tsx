"use client";

import { motion } from "motion/react";
import { SOCIAL_LINKS } from "@/config/site";
import { SectionHead } from "@/components/common/section-head";

export function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-20"
    >
      <SectionHead index="03" label="Contact" />

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/20 mb-6"
      >
        Have an idea? Let's talk.
      </motion.p>

      {/* Big email CTA */}
      <div className="relative">
        {/* Decorative vertical line */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/8 to-transparent hidden sm:block" />

        <a
          href="mailto:mine.shubhamsingh@gmail.com"
          className="group block"
        >
          <div className="space-y-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="font-black leading-[0.9] tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)" }}
              >
                mine.shubhamsingh
              </span>
              <span
                className="font-black leading-[0.9] tracking-tight text-white/25 transition-all duration-300 group-hover:text-white/60"
                style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)" }}
              >
                @gmail.com
              </span>
            </div>

            {/* Animated underline */}
            <div className="h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-500 ease-out group-hover:w-full" />
          </div>

          {/* Arrow */}
          <div className="mt-4 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/20 transition-colors group-hover:text-white/50">
              Send a message
            </span>
            <span className="inline-block text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50 text-sm">
              ↗
            </span>
          </div>
        </a>
      </div>

      {/* Divider */}
      <div className="mt-14 mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/5" />
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/10">
          or find me on
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* Socials row */}
      <div className="flex flex-wrap items-center gap-6">
        {SOCIAL_LINKS.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/20 transition-all duration-200 hover:text-white/60"
          >
            <span className="h-px w-4 bg-current opacity-0 transition-all group-hover:opacity-100 group-hover:w-6" />
            {s.label}
          </a>
        ))}
      </div>

      {/* Location & year */}
      <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/15">📍</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/15">
            India — IST (UTC+5:30)
          </span>
        </div>
        <span className="font-mono text-[9px] text-white/10">
          © {new Date().getFullYear()} Shubham Singh · Built with Next.js
        </span>
      </div>
    </motion.section>
  );
}