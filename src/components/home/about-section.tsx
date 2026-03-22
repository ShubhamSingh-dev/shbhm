"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10 py-20"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 text-[0.9rem] leading-relaxed text-muted-foreground">
          <p>
            I'm Shubham — a full stack engineer who believes great software is equal parts
            engineering precision and design intuition. I've shipped production systems that handle
            millions of requests and side projects that delight a handful of friends equally.
          </p>
          <p>
            When I'm not pushing commits, I'm reading about distributed systems, tinkering with
            programming languages, or trying to figure out why my Rust code won't compile.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { label: "Based in", value: "India 🇮🇳" },
            { label: "Currently", value: "Open to work" },
            { label: "Focus", value: "Full Stack & Systems" },
            { label: "Education", value: "B.Tech Computer Science" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-border py-2.5"
            >
              <span className="font-mono text-xs text-muted-foreground/80">{label}</span>
              <span className="text-sm text-foreground/80">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
