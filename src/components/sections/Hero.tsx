"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoLoop } from "@/components/VideoLoop";

const LINES = ["ENGINEERED", "LIKE A CAR.", "BUILT FOR", "THE MOUNTAIN."];

function HeroLine({ text, index }: { text: string; index: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <>
      <VideoLoop
        src="/videos/hero.mp4"
        className="fixed inset-0 z-0 h-screen w-screen overflow-hidden"
        style={{ scale: videoScale }}
      />
      <section ref={ref} className="relative z-10 flex h-screen flex-col justify-center">
        {/* Engineered veil: dark on the copy side, clearing by ~65% width so the chassis stays visible on the right. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,18,20,0.75) 0%, rgba(16,18,20,0.45) 40%, rgba(16,18,20,0) 65%)",
          }}
        />
        <motion.div
          className="relative mx-auto w-full max-w-6xl px-6 md:px-10"
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <div className="max-w-[720px]">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
              JM-001 &middot; All-Season Gravity Cart
            </p>
            <h1 className="font-display font-display-expanded text-[clamp(1.875rem,7vw,4.75rem)] font-extrabold uppercase leading-[1.02] text-white">
              {LINES.map((line, i) => (
                <HeroLine key={line} text={line} index={i} />
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              className="mt-6 max-w-md font-sans text-base text-white/85 md:text-lg"
            >
              CE-certified. Automotive-engineered. One frame, dimensioned to
              automotive tolerances, converts between wheels and skis in
              under five minutes — proven brakes, not prototypes.
            </motion.p>
          </div>
        </motion.div>

        {/* CE certification stamp */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-10 left-6 z-10 flex items-center gap-3 md:left-10"
        >
          <div className="liquid-glass flex h-14 w-14 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] font-medium uppercase leading-none tracking-widest text-white">
            <span className="text-center">
              CE
              <br />
              CERT.
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
            ISO&nbsp;9001
            <br />
            Verified 2026
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 md:right-10"
        >
          <span>Scroll</span>
          <motion.span
            className="h-8 w-px bg-white/40"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>
    </>
  );
}
