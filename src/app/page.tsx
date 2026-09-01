// Signature element: the Season Conversion Bay's exploded-mount scroll-scrub —
// the same chassis mount point accepting wheel or ski assembly is the one
// visual proof only GravityCart can make (automotive engineering, not a toy).
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { NumbersBand } from "@/components/sections/NumbersBand";
import { ConversionBay } from "@/components/sections/ConversionBay";
import { ComponentDossier } from "@/components/sections/ComponentDossier";
import { Timeline } from "@/components/sections/Timeline";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Faq } from "@/components/sections/Faq";
import { SplitCTA } from "@/components/sections/SplitCTA";

export const metadata: Metadata = {
  title: "Engineered Like a Car. Built for the Mountain.",
  description:
    "The GravityCart JM-001 all-season chassis (€3,499) ships with the wheel assembly mounted and converts to the ski assembly in under five minutes — forged fork, dual-piston brakes, automotive-grade tolerances.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <NumbersBand />
      <ConversionBay />
      <ComponentDossier />
      <Timeline />
      <LogoMarquee />
      <Faq />
      <SplitCTA />
      <Footer />
    </main>
  );
}
