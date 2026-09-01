"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";

function mmss(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `CONVERSION TIME: ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PARTS = [
  { name: "Wheel assembly", material: "6061 aluminium hub, Shimano bearing", weight: "2.1kg", time: "4 min" },
  { name: "Ski assembly", material: "UHMW-PE base, steel edge", weight: "1.8kg", time: "4 min" },
  { name: "Brake caliper", material: "Forged alloy, Shimano MT hydraulic", weight: "0.4kg", time: "Shared" },
  { name: "Steering fork", material: "CNC-machined 7075 aluminium", weight: "1.2kg", time: "Shared" },
  { name: "Seat frame", material: "Automotive-grade steel tube", weight: "3.4kg", time: "Shared" },
];

function CropMarks() {
  const mark = "absolute h-4 w-4 border-white/40";
  return (
    <>
      <div className={`${mark} left-3 top-3 border-l border-t`} />
      <div className={`${mark} right-3 top-3 border-r border-t`} />
      <div className={`${mark} bottom-3 left-3 border-b border-l`} />
      <div className={`${mark} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

function SeasonTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`relative border-b-2 border-dashed px-6 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-[120ms] ${
        active ? "border-accent text-white" : "border-white/25 text-muted"
      }`}
    >
      <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-ink" />
      {label}
      <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-ink" />
    </motion.button>
  );
}

export function ConversionBay() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const [mode, setMode] = useState<"summer" | "winter">("summer");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.5 ? "summer" : "winter";
    setMode((prev) => (prev === next ? prev : next));
  });

  const wheelOpacity = useTransform(scrollYProgress, [0, 0.32, 0.48], [1, 1, 0]);
  const wheelX = useTransform(scrollYProgress, [0, 0.48], [0, -70]);
  const wheelY = useTransform(scrollYProgress, [0, 0.48], [0, -50]);
  const wheelRotate = useTransform(scrollYProgress, [0, 0.48], [0, -18]);

  const skiOpacity = useTransform(scrollYProgress, [0.52, 0.68, 1], [0, 1, 1]);
  const skiX = useTransform(scrollYProgress, [0.52, 1], [70, 0]);
  const skiY = useTransform(scrollYProgress, [0.52, 1], [50, 0]);

  const forkLabelOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const seatLabelOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const discLabelOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const counterText = useTransform(scrollYProgress, (p) => mmss(Math.round(p * 252)));

  const snapTo = (target: "summer" | "winter") => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const targetProgress = target === "summer" ? 0.01 : 0.99;
    window.scrollTo({ top: top + travel * targetProgress, behavior: "auto" });
    setMode(target);
  };

  return (
    <section id="bay" className="relative z-10 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            JM-002 &middot; Season Conversion Bay
          </p>
          <h2 className="mt-4 font-display font-display-expanded text-[2.75rem] font-light leading-[0.95] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
            One frame. Every season.
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            Scroll to watch the wheel assembly detach along its exploded axis
            while the ski assembly slides into the identical mount point.
            Same chassis, same tolerances, zero compromise.
          </p>
        </FadeUp>

        <div className="mt-10 flex items-center gap-4">
          <SeasonTab label="Summer" active={mode === "summer"} onClick={() => snapTo("summer")} />
          <SeasonTab label="Winter" active={mode === "winter"} onClick={() => snapTo("winter")} />
        </div>
      </div>

      {/* Pinned scroll-scrubbed stage */}
      <div ref={wrapperRef} className="relative mt-10 h-[350vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute inset-6 overflow-hidden rounded-2xl border border-white/10 bg-steel/15 md:inset-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 40px)",
            }}
          >
            <CropMarks />

            {/* Stopwatch counter */}
            <motion.div className="absolute right-8 top-8 z-20 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-accent md:right-12 md:top-12">
              <motion.span>{counterText}</motion.span>
            </motion.div>

            {/* Chassis + assemblies */}
            <div className="relative flex h-full w-full items-center justify-center">
              <svg
                viewBox="0 0 640 320"
                className="h-[60%] w-[85%] max-w-3xl overflow-visible"
                fill="none"
              >
                {/* static chassis frame */}
                <path
                  d="M120 220 L 420 220 L 480 150 L 520 150"
                  stroke="#C8CCD0"
                  strokeWidth="2"
                />
                <circle cx="120" cy="220" r="6" fill="#C8CCD0" />
                <circle cx="420" cy="220" r="6" fill="#C8CCD0" />
                <rect x="150" y="150" width="120" height="30" rx="4" stroke="#C8CCD0" strokeWidth="1.5" />

                {/* dimension line: seat travel */}
                <g opacity="0.9">
                  <line x1="150" y1="130" x2="270" y2="130" stroke="#7C8791" strokeWidth="1" />
                  <line x1="150" y1="122" x2="150" y2="138" stroke="#7C8791" strokeWidth="1" />
                  <line x1="270" y1="122" x2="270" y2="138" stroke="#7C8791" strokeWidth="1" />
                </g>

                {/* wheel assembly (front) */}
                <motion.g
                  style={{
                    opacity: wheelOpacity,
                    x: wheelX,
                    y: wheelY,
                    rotate: wheelRotate,
                  }}
                >
                  <circle cx="420" cy="220" r="55" stroke="#C8CCD0" strokeWidth="2" />
                  <circle cx="420" cy="220" r="18" stroke="#E63946" strokeWidth="2" />
                  <line x1="420" y1="220" x2="465" y2="220" stroke="#C8CCD0" strokeWidth="1" />
                  <line x1="420" y1="220" x2="395" y2="185" stroke="#C8CCD0" strokeWidth="1" />
                  <line x1="420" y1="220" x2="395" y2="255" stroke="#C8CCD0" strokeWidth="1" />
                </motion.g>

                {/* ski assembly (front, same mount point) */}
                <motion.g
                  style={{
                    opacity: skiOpacity,
                    x: skiX,
                    y: skiY,
                  }}
                >
                  <path
                    d="M365 220 L 470 220 Q 495 220 495 240 L 495 250 L 480 250 L 480 235 Q 480 228 470 228 L 365 228 Z"
                    stroke="#C8CCD0"
                    strokeWidth="2"
                  />
                  <circle cx="420" cy="205" r="14" stroke="#E63946" strokeWidth="2" />
                </motion.g>

                {/* dimension line: disc diameter, always present */}
                <motion.g style={{ opacity: discLabelOpacity }}>
                  <line x1="420" y1="220" x2="420" y2="292" stroke="#7C8791" strokeWidth="1" />
                  <line x1="412" y1="285" x2="428" y2="285" stroke="#7C8791" strokeWidth="1" />
                </motion.g>
              </svg>

              {/* mono callouts */}
              <motion.span
                style={{ opacity: forkLabelOpacity }}
                className="absolute left-[16%] top-[30%] font-mono text-[11px] uppercase tracking-[0.18em] text-silver/80"
              >
                Fork &Oslash; 35mm
              </motion.span>
              <motion.span
                style={{ opacity: seatLabelOpacity }}
                className="absolute left-[24%] top-[20%] font-mono text-[11px] uppercase tracking-[0.18em] text-silver/80"
              >
                Seat travel 300mm
              </motion.span>
              <motion.span
                style={{ opacity: discLabelOpacity }}
                className="absolute bottom-[10%] right-[18%] font-mono text-[11px] uppercase tracking-[0.18em] text-silver/80"
              >
                Disc &Oslash; 180mm
              </motion.span>
            </div>

            <div className="absolute bottom-6 left-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:left-12">
              Mode:{" "}
              <span className={mode === "summer" ? "text-accent" : "text-silver"}>
                {mode === "summer" ? "Summer / Wheels" : "Winter / Skis"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parts strip */}
      <div className="mx-auto mt-16 max-w-6xl px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Interchangeable components
        </p>
        <div className="mt-4 divide-y divide-white/10 border-t border-white/10">
          {PARTS.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.05} y={12}>
              <div className="grid grid-cols-2 gap-2 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-white/80 md:grid-cols-[1.3fr_1.6fr_0.6fr_0.6fr]">
                <span className="text-white">{p.name}</span>
                <span className="text-muted">{p.material}</span>
                <span className="tabular-nums text-muted">{p.weight}</span>
                <span className="tabular-nums text-accent">{p.time}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
