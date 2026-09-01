"use client";

import { FadeUp } from "@/components/FadeUp";

const COMPONENTS = [
  {
    id: "JM-011",
    name: "Steering fork",
    material: "CNC-machined 7075-T6 aluminium",
    tolerance: "±0.05mm",
    note: "Sourced from an automotive tier-1 supplier — the same geometry discipline as a rally suspension arm.",
    icon: (
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <path d="M60 30 L60 120" stroke="#C8CCD0" strokeWidth="2" />
        <path d="M60 120 L40 160" stroke="#C8CCD0" strokeWidth="2" />
        <path d="M60 120 L80 160" stroke="#C8CCD0" strokeWidth="2" />
        <circle cx="40" cy="168" r="8" stroke="#E63946" strokeWidth="2" />
        <circle cx="80" cy="168" r="8" stroke="#E63946" strokeWidth="2" />
        <line x1="100" y1="30" x2="140" y2="30" stroke="#7C8791" strokeWidth="1" />
        <line x1="100" y1="120" x2="140" y2="120" stroke="#7C8791" strokeWidth="1" />
        <line x1="140" y1="30" x2="140" y2="120" stroke="#7C8791" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "JM-014",
    name: "Seat frame & travel mechanism",
    material: "Automotive-grade seamless steel tube",
    tolerance: "±0.1mm",
    note: "Adjustable stroke: 300mm summer, 100mm winter — one rail, two calibrations.",
    icon: (
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <rect x="40" y="70" width="120" height="24" rx="3" stroke="#C8CCD0" strokeWidth="2" />
        <line x1="60" y1="94" x2="60" y2="150" stroke="#C8CCD0" strokeWidth="2" />
        <line x1="140" y1="94" x2="140" y2="150" stroke="#C8CCD0" strokeWidth="2" />
        <line x1="40" y1="50" x2="160" y2="50" stroke="#7C8791" strokeWidth="1" />
        <line x1="40" y1="44" x2="40" y2="56" stroke="#7C8791" strokeWidth="1" />
        <line x1="160" y1="44" x2="160" y2="56" stroke="#7C8791" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "JM-001",
    name: "Main chassis",
    material: "Mono-material recyclable aluminium",
    tolerance: "±0.05mm",
    note: "One frame, one size — dimensioned so every rider gets the same driving dynamics.",
    icon: (
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <path d="M30 140 L100 140 L150 90 L170 90" stroke="#C8CCD0" strokeWidth="2" />
        <circle cx="30" cy="140" r="7" fill="#C8CCD0" />
        <circle cx="100" cy="140" r="7" fill="#C8CCD0" />
        <circle cx="170" cy="90" r="10" stroke="#E63946" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "JM-021",
    name: "Hydraulic disc brake",
    material: "Forged alloy caliper, Shimano MT rotor",
    tolerance: "Ø180mm",
    note: "Proven on downhill bikes for a decade — not a prototype borrowed for marketing.",
    icon: (
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <circle cx="100" cy="100" r="60" stroke="#C8CCD0" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" stroke="#7C8791" strokeWidth="1" strokeDasharray="4 6" />
        <rect x="85" y="40" width="30" height="36" rx="4" stroke="#E63946" strokeWidth="2" />
      </svg>
    ),
  },
];

export function ComponentDossier() {
  return (
    <section id="dossier" className="relative z-10 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Component dossier
          </p>
          <h2 className="mt-4 font-display font-display-expanded text-[2.75rem] font-light leading-[0.95] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
            Parts you can find at the hardware store, not the harbor.
          </h2>
        </FadeUp>

        <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
          {COMPONENTS.map((c, i) => (
            <div
              key={c.id}
              className={`grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <FadeUp amount={0.35}>
                <div className="relative aspect-square w-full max-w-sm rounded-xl border border-white/10 bg-steel/10 p-10">
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {c.id}
                  </span>
                  {c.icon}
                </div>
              </FadeUp>
              <FadeUp amount={0.35} delay={0.1}>
                <h3 className="font-display font-display-expanded text-2xl font-medium text-white md:text-3xl">
                  {c.name}
                </h3>
                <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 font-mono text-[12px] uppercase tracking-[0.08em]">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">Material</dt>
                    <dd className="text-right text-white/85">{c.material}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">Tolerance</dt>
                    <dd className="text-right text-accent">{c.tolerance}</dd>
                  </div>
                </dl>
                <p className="mt-5 max-w-md text-sm text-white/70">{c.note}</p>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
