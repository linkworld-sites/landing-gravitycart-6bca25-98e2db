"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/checkout";
import { fetchProducts, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

function partIndex(i: number): string {
  return `JM-${String(i + 1).padStart(3, "0")}`;
}

export function ProductGrid({ products }: { products: Product[] }) {
  const { add, count } = useCart();
  const [catalog, setCatalog] = useState<Product[]>(products);

  useEffect(() => {
    track("product_view");
  }, []);

  useEffect(() => {
    let alive = true;
    fetchProducts().then((live) => {
      if (alive && live.length) setCatalog(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {catalog.length} entries
        </p>
        <Link
          href="/checkout"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-accent"
        >
          Cart ({count}) →
        </Link>
      </div>

      {catalog.length === 0 ? (
        <p className="mt-12 font-mono text-sm text-muted">
          The catalog is being fitted. Check back shortly.
        </p>
      ) : (
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="group flex flex-col border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span>{partIndex(i)}</span>
                <span>{p.stock === null ? "IN STOCK" : `${p.stock} UNITS`}</span>
              </div>
              <div className="mt-4 aspect-[4/5] w-full overflow-hidden border border-white/10 bg-white/[0.03]">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-white/20">
                    Spec Photo Pending
                  </div>
                )}
              </div>
              <h3 className="mt-4 font-display text-xl font-light text-white">{p.name}</h3>
              {p.description ? (
                <p className="mt-2 text-sm text-white/60">{p.description}</p>
              ) : null}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-lg tabular-nums text-white">
                  {formatPrice(p.price_cents, p.currency)}
                </span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => add(p)}
                  className="border border-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
