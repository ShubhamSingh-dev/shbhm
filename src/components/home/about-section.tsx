"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-line screen-line-bottom w-full px-4 py-14"
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Bio paragraphs */}
        <div className="space-y-4 text-sm leading-[1.75] text-muted-foreground">
          <p>
            I'm Shubham — a full stack engineer who believes great software is
            equal parts engineering precision and design intuition. I've shipped
            production systems that handle millions of requests and side
            projects that delight a handful of friends equally.
          </p>
          <p>
            When I'm not pushing commits, I'm reading about distributed systems,
            tinkering with programming languages, or trying to figure out why my
            Rust code won't compile.
          </p>
        </div>

        {/* Quick-info rows */}
        <div className="space-y-0 divide-y divide-border">
          {[
            { label: "Based in", value: "India 🇮🇳" },
            { label: "Currently", value: "Open to work" },
            { label: "Focus", value: "Full Stack & Systems" },
            { label: "Education", value: "B.Tech Computer Science" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="font-mono text-xs text-muted-foreground/70">
                {label}
              </span>
              <span className="text-sm font-medium text-foreground/90">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
