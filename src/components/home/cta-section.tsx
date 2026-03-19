"use client";

import { motion } from "motion/react";
import { SOCIAL_LINKS } from "@/config/site";

export function CtaSection() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/4 py-20"
    >
      <div className="text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-white/20">
          Let's build something
        </p>
        <a
          href="mailto:mine.shubhamsingh@gmail.com"
          className="group inline-block text-[clamp(2rem,6vw,3.5rem)] font-black text-white/80 transition-colors duration-300 hover:text-white"
        >
          mine.shubhamsingh@gmail.com
          <span className="ml-3 inline-block text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60">
            ↗
          </span>
        </a>
        <div className="mt-12 flex items-center justify-center gap-6">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-white/20 transition-colors hover:text-white/50"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="mt-10 font-mono text-[9px] text-white/15">
          © {currentYear} Shubham Singh · Built with Next.js
        </p>
      </div>
    </motion.footer>
  );
}
