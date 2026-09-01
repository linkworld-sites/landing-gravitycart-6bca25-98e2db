"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

function CTAButton({
  label,
  variant,
}: {
  label: string;
  variant: "light" | "dark";
}) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] ${
        variant === "dark"
          ? "liquid-glass border border-white/25 text-white"
          : "bg-ink text-white"
      }`}
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
    </motion.a>
  );
}

export function SplitCTA() {
  return (
    <section id="cta" className="relative z-10 bg-ink px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#17191c] p-10 md:p-16">
            <FadeUp>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                For mountain operators
              </p>
              <h3 className="mt-4 font-display font-display-expanded text-[2.25rem] font-light leading-[0.95] text-white sm:text-[2.75rem]">
                Fleet-grade, CE-certified, serviceable in minutes.
              </h3>
              <p className="mt-4 max-w-sm text-sm text-white/70">
                Volume pricing, spare-parts logistics and on-site technician
                training for resorts running gravity fleets season-round.
              </p>
              <div className="mt-8">
                <CTAButton label="Fleet inquiry" variant="dark" />
              </div>
            </FadeUp>
          </div>

          <div className="flex flex-col justify-center bg-silver p-10 md:p-16">
            <FadeUp delay={0.1}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                For riders
              </p>
              <h3 className="mt-4 font-display font-display-expanded text-[2.25rem] font-light leading-[0.95] text-ink sm:text-[2.75rem]">
                Find your nearest certified dealer.
              </h3>
              <p className="mt-4 max-w-sm text-sm text-ink/70">
                Test ride the same frame in both configurations before you
                decide — wheels in the parking lot, skis on the slope.
              </p>
              <div className="mt-8">
                <CTAButton label="Dealer locator" variant="light" />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
