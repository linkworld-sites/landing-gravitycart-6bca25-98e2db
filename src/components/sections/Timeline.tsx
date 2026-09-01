"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Diamond } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

const ROWS = [
  { period: "2022", milestone: "Concept analysis", place: "Alpine test track" },
  { period: "2023", milestone: "Downhill-bike brake system adapted", place: "Shimano partnership" },
  { period: "2024", milestone: "Automotive seat engineering applied", place: "Tier-1 supplier" },
  { period: "2025", milestone: "ISO certification passed", place: "Notified body, EU" },
  { period: "2026", milestone: "Serial production begins", place: "JM-001 onward" },
];

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.3 });

  return (
    <section id="story" className="relative z-10 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Origin</p>
            <h2 className="mt-4 font-display font-display-expanded text-[2.5rem] font-light leading-[0.95] text-white sm:text-[3rem]">
              Built by engineers who ride.
            </h2>
            <p className="mt-5 max-w-sm text-sm text-white/70">
              GravityCart began as a question inside an automotive supplier:
              why does gravity sport equipment tolerate a build quality a car
              never would? Four years of adapting proven components answered
              it.
            </p>
          </FadeUp>

          <div ref={listRef} className="relative pl-8">
            <svg className="absolute left-0 top-0 h-full w-4 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#3A3F44"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>

            <div className="divide-y divide-white/10">
              {ROWS.map((row, i) => (
                <FadeUp key={row.period} delay={i * 0.08} y={16}>
                  <div className="grid grid-cols-[3.5rem_auto_1fr] items-baseline gap-x-3 gap-y-1 py-4 md:grid-cols-[3.5rem_auto_1fr_auto]">
                    <span className="font-mono text-[13px] tabular-nums text-muted">{row.period}</span>
                    <Diamond className="h-3 w-3 text-accent" strokeWidth={1.5} />
                    <span className="text-[14px] text-white">{row.milestone}</span>
                    <span className="col-span-3 font-mono text-[12px] uppercase tracking-[0.1em] text-muted md:col-span-1 md:text-right">
                      {row.place}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
