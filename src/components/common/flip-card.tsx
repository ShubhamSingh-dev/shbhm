import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, RotateCcw } from "lucide-react";
import BlueTick from "../icons/blue-tick";

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2.5 shrink-0">
      <div
        className="relative h-37 w-37 cursor-pointer select-none"
        style={{ perspective: "900px" }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label="Flip card"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* Front — avatar */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="Shubham Singh"
              className="h-full w-full object-cover object-top"
            />
            {/* Flip hint badge */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md border border-foreground/20 bg-background/80 px-1.5 py-0.5 backdrop-blur-sm">
              <QrCode className="size-2.5 text-foreground/60" />
            </div>
          </div>

          {/* Back — QR */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-foreground/10 bg-background flex items-center justify-center p-2"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bmc_qr.png"
              alt="QR Code"
              className="h-full w-full object-contain dark:invert"
            />
          </div>
        </motion.div>
      </div>

      {/* Twitter handle */}
      <a
        href="https://x.com/shbhm_X0"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-0.5 transition-all hover:border-foreground/20 hover:bg-foreground/[0.08]"
      >
        <span className="font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
          @shbhm_X0
        </span>
        <BlueTick className="size-3 shrink-0" />
      </a>

      {/* Flip cue */}
      <div className="flex items-center gap-1 opacity-35">
        <RotateCcw className="size-[9px] text-foreground" />
        <span className="font-mono text-[7px] uppercase tracking-widest text-foreground">
          {flipped ? "flip back" : "tap to flip"}
        </span>
      </div>
    </div>
  );
}