"use client";

import { FadeUp } from "@/components/FadeUp";

const PHOTOS = [
  {
    src: "/images/proof/hochjoch-descent.jpg",
    alt: "Two riders descending a gravel trail on GravityCart carts at Hochjoch, Montafon",
    caption: "Hochjoch, Montafon",
    detail: "Summer configuration, wheels",
  },
  {
    src: "/images/proof/chassis-onsite.webp",
    alt: "Two GravityCart chassis parked on an alpine hillside",
    caption: "On site, not in a studio",
    detail: "JM-001 frame, as shipped",
  },
  {
    src: "/images/proof/fleet-descent.webp",
    alt: "A group of riders descending a mountain road on GravityCart carts",
    caption: "Fleet on the move",
    detail: "Same frame, same tolerances, every unit",
  },
];

export function FieldProof() {
  return (
    <section id="proof" className="relative z-10 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Field proof
          </p>
          <h2 className="mt-4 font-display font-display-expanded text-[2.75rem] font-light leading-[0.95] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
            On the mountain, not just on paper.
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <FadeUp key={p.src} delay={i * 0.08} amount={0.3}>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-steel/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
                {p.caption}
              </p>
              <p className="mt-1 text-[12px] text-muted">{p.detail}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
