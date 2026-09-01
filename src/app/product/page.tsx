import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CatalogCTA } from "@/components/shop/CatalogCTA";
import { getProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catalog — Chassis, Wheel & Ski Kits",
  description:
    "Spec the GravityCart JM-series chassis and its interchangeable wheel and ski kits — automotive-engineered components with published tolerances.",
  alternates: { canonical: "/product" },
};

export default async function ProductPage() {
  const products = await getProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description ?? undefined,
        url: `${SITE_URL}/product`,
        offers: {
          "@type": "Offer",
          price: (p.price_cents / 100).toFixed(2),
          priceCurrency: p.currency || "EUR",
          availability:
            p.stock === null || p.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <main className="relative min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Catalog / JM Series
        </p>
        <h1 className="mt-4 font-display font-display-expanded text-4xl font-light text-white sm:text-5xl">
          One chassis. Wheels or skis in under five minutes.
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Order the complete JM-001 chassis, or add the wheel and ski assemblies on
          their own — every part ships to a published tolerance, so the fit is
          guaranteed the day it arrives.
        </p>
        <div className="mt-8">
          <CatalogCTA label="Start with the JM-001 chassis" href="#catalog" />
        </div>
        <div id="catalog" className="mt-12">
          <CartProvider>
            <ProductGrid products={products} />
          </CartProvider>
        </div>
      </div>
      <Footer />
    </main>
  );
}
