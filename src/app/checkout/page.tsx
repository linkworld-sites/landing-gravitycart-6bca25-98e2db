import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { CheckoutClient } from "@/components/shop/CheckoutClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your GravityCart order and complete secure payment.",
  alternates: { canonical: "/checkout" },
};

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Order / Review
        </p>
        <h1 className="mt-4 font-display font-display-expanded text-4xl font-light text-white sm:text-5xl">
          Checkout
        </h1>
        <div className="mt-12">
          <CartProvider>
            <CheckoutClient products={products} />
          </CartProvider>
        </div>
      </div>
      <Footer />
    </main>
  );
}
