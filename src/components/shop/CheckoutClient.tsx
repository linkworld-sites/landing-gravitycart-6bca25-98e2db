"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/checkout";
import { checkout, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

export function CheckoutClient({ products }: { products: Product[] }) {
  const { items, remove, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("checkout");
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const total = useMemo(
    () =>
      items.reduce((sum, i) => {
        const p = byId.get(i.product_id);
        return sum + (p ? p.price_cents * i.quantity : 0);
      }, 0),
    [items, byId],
  );

  const onPurchase = async () => {
    const valid = items.filter((i) => byId.has(i.product_id));
    if (!valid.length) {
      setError("Your cart is empty or out of date. Please return to the catalog.");
      return;
    }
    setError(null);
    setBusy(true);
    const ok = await checkout(valid);
    if (ok) {
      track("purchase");
    } else {
      setBusy(false);
      setError("Checkout couldn't be started right now. Please try again in a moment.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Cart Empty
        </p>
        <p className="mt-4 text-white/70">
          Nothing in the cart yet. Head back to the catalog to spec a chassis or kit.
        </p>
        <Link
          href="/product"
          className="mt-6 inline-block border border-accent px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-white"
        >
          View Catalog →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full border-collapse font-mono text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-[0.18em] text-muted">
            <th className="py-3">Item</th>
            <th className="py-3 text-right">Qty</th>
            <th className="py-3 text-right">Unit</th>
            <th className="py-3 text-right">Total</th>
            <th className="py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((i) => {
            const p = byId.get(i.product_id);
            if (!p) return null;
            return (
              <tr key={i.product_id} className="border-b border-white/10 text-white/80">
                <td className="py-4">{p.name}</td>
                <td className="py-4 text-right tabular-nums">{i.quantity}</td>
                <td className="py-4 text-right tabular-nums">
                  {formatPrice(p.price_cents, p.currency)}
                </td>
                <td className="py-4 text-right tabular-nums text-white">
                  {formatPrice(p.price_cents * i.quantity, p.currency)}
                </td>
                <td className="py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Remove ${p.name}`}
                    onClick={() => remove(i.product_id)}
                    className="text-white/40 hover:text-accent"
                  >
                    ×
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Order Total
        </span>
        <span className="font-mono text-2xl tabular-nums text-white">{formatPrice(total)}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPurchase}
          disabled={busy}
          className="flex-1 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Processing…" : "Complete Purchase"}
        </motion.button>
        <button
          type="button"
          onClick={clear}
          className="border border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
        >
          Clear Cart
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
    </div>
  );
}
