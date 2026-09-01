"use client";

import { CountUp } from "@/components/CountUp";
import { FadeUp } from "@/components/FadeUp";

function mmss(n: number): string {
  const m = Math.floor(n / 60);
  const s = n % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const METRICS = [
  { value: 180, format: (n: number) => `Ø${n}`, unit: "MM", label: "Brake disc diameter" },
  { value: 300, format: (n: number) => `${n}`, unit: "+100MM", label: "Seat travel, summer + winter" },
  { value: 1, format: (n: number) => `${n}`, unit: "SIZE", label: "Frame fits every terrain" },
  { value: 100, format: (n: number) => `${n}`, unit: "%", label: "Recyclable mono-material" },
  { value: 252, format: mmss, unit: "", label: "Wheels-to-skis conversion time" },
];

export function NumbersBand() {
  return (
    <section className="relative z-10 bg-gradient-to-b from-transparent via-black/75 to-ink pb-24 pt-40 md:pb-28 md:pt-56">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="mx-auto max-w-xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Spec sheet &middot; JM-001
          </p>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Every figure here is measured, not marketed — the ledger a CE
            auditor would sign off on.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {METRICS.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.08} className="px-2 py-8 text-center sm:px-4">
              <div className="font-display font-display-expanded text-[3.25rem] font-light leading-none text-white md:text-[4rem] lg:text-[4.5rem]">
                <CountUp value={m.value} format={m.format} delay={i * 0.08} />
                <span className="ml-1 text-[1.25rem] font-normal text-accent md:text-2xl">{m.unit}</span>
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
