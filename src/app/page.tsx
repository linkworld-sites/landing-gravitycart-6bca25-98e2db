// Signature element: the Season Conversion Bay's exploded-mount scroll-scrub —
// the same chassis mount point accepting wheel or ski assembly is the one
// visual proof only GravityCart can make (automotive engineering, not a toy).
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { NumbersBand } from "@/components/sections/NumbersBand";
import { ConversionBay } from "@/components/sections/ConversionBay";
import { ComponentDossier } from "@/components/sections/ComponentDossier";
import { Timeline } from "@/components/sections/Timeline";
import { FieldProof } from "@/components/sections/FieldProof";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { SplitCTA } from "@/components/sections/SplitCTA";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <NumbersBand />
      <ConversionBay />
      <ComponentDossier />
      <Timeline />
      <FieldProof />
      <LogoMarquee />
      <SplitCTA />
      <Footer />
    </main>
  );
}
