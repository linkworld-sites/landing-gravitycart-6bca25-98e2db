"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";

const ROW_1 = ["CHAMONIX", "ZERMATT", "DOLOMITES", "INNSBRUCK", "VAL D'ISÈRE", "SÖLDEN"];
const ROW_2 = ["ANDERMATT", "GARMISCH", "COURCHEVEL", "ORTLER", "TIGNES", "ZUGSPITZE"];

function Tile({ label }: { label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.12 }}
      className="liquid-glass group flex h-14 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 md:h-16 md:w-48"
    >
      <span className="px-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 grayscale transition-colors duration-[120ms] group-hover:text-accent">
        {label}
      </span>
    </motion.div>
  );
}

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const track = [...items, ...items];
  return (
    <div className="group/row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/row:[animation-play-state:paused]`}
      >
        {track.map((label, i) => (
          <Tile key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative z-10 bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Operating on mountains across the Alps
          </p>
        </FadeUp>
      </div>
      <div className="mt-10 space-y-4">
        <Row items={ROW_1} direction="left" />
        <Row items={ROW_2} direction="right" />
      </div>
    </section>
  );
}
