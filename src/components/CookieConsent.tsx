"use client";

import { useEffect, useState } from "react";
import { FUNNEL_JURISDICTION } from "@/funnel-config";

// EU-only cookie consent. Until the visitor chooses, non-essential tracking
// (the LinkWorld funnel beacon + Meta/LinkedIn pixels) does NOT fire — see
// src/lib/funnel.ts which reads the same localStorage["lw_consent"]. Non-EU
// sites never show this and tracking runs (no consent regime assumed).
const KEY = "lw_consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (FUNNEL_JURISDICTION !== "eu") return;
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* storage blocked → no banner */
    }
  }, []);

  if (FUNNEL_JURISDICTION !== "eu" || !show) return null;

  const save = (analytics: boolean, marketing: boolean) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ essential: true, analytics, marketing, ts: Date.now() }),
      );
      window.dispatchEvent(new Event("lw-consent-changed"));
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-ink/95 p-4 font-mono text-[12px] text-silver backdrop-blur md:p-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-white/70">
          Wir verwenden notwendige Cookies für den Betrieb der Website und – mit
          Ihrer Einwilligung – optionale Cookies für Statistik und Marketing.
          Details in der{" "}
          <a href="/legal/cookies" className="underline">
            Cookie-Richtlinie
          </a>{" "}
          und{" "}
          <a href="/legal/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => save(false, false)}
            className="rounded-full border border-white/25 px-4 py-2 uppercase tracking-[0.1em] hover:bg-white/10"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => save(true, true)}
            className="rounded-full bg-accent px-4 py-2 uppercase tracking-[0.1em] text-white hover:bg-accent/90"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
