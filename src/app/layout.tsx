import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import { getSiteMeta } from "@/lib/site-meta";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteMeta = getSiteMeta();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GravityCart — Engineered Like a Car. Built for the Mountain.",
    template: "%s — GravityCart",
  },
  description: siteMeta.organization.description,
  verification: {
    google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: siteMeta.organization.name,
      description: siteMeta.organization.description,
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteMeta.organization.name,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...siteMeta.products.map((p) => ({
      "@type": "Product",
      "@id": `${SITE_URL}/product#${p.sku.toLowerCase()}`,
      name: p.name,
      sku: p.sku,
      description: p.description,
      url: `${SITE_URL}/product`,
      brand: { "@type": "Brand", name: siteMeta.organization.name },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: p.currency,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/product`,
      },
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink font-sans text-silver antialiased">
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
