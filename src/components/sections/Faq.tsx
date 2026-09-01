import { FadeUp } from "@/components/FadeUp";
import { SITE_URL } from "@/lib/site";
import { getSiteMeta } from "@/lib/site-meta";

export function Faq() {
  const { faq } = getSiteMeta();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <section id="faq" className="relative z-10 bg-ink py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeUp className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Spec sheet / FAQ
          </p>
          <h2 className="mt-4 font-display font-display-expanded text-[2.75rem] font-light leading-[0.95] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
            Questions, answered to tolerance.
          </h2>
        </FadeUp>

        <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
          {faq.map((entry, i) => (
            <FadeUp key={entry.q} amount={0.3} delay={i * 0.05}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display font-display-expanded text-lg font-medium text-white md:text-xl">
                  <span>{entry.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-sm text-accent transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl font-sans text-sm text-white/70 md:text-base">
                  {entry.a}
                </p>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
