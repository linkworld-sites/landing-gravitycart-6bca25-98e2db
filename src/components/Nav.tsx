"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#bay", label: "Conversion Bay" },
  { href: "#dossier", label: "Parts Dossier" },
  { href: "#story", label: "Story" },
  { href: "/blog", label: "Journal" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="liquid-glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/10 px-5 py-3 md:mx-6">
        <Link href="/" className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-white">
          GravityCart<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 md:flex">
          {LINKS.map((l) => (
            <motion.span key={l.href} whileHover={{ color: "#ffffff" }} transition={{ duration: 0.12 }}>
              <Link href={l.href}>{l.label}</Link>
            </motion.span>
          ))}
        </nav>
        <motion.a
          href="#cta"
          whileHover={{ scale: 1.03, backgroundColor: "#ffffff", color: "#101214" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
        >
          Enquire
        </motion.a>
      </div>
    </header>
  );
}
