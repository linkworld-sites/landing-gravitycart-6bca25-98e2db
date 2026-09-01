"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CatalogCTA({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent/90"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
    </motion.a>
  );
}
