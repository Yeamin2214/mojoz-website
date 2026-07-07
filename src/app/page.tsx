import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlavoursSection from "@/components/FlavoursSection";
import IntroSection from "@/components/IntroSection";
import ProductStandards from "@/components/ProductStandards";
import DistributorPartners from "@/components/DistributorPartners";
import FranchisePartners from "@/components/FranchisePartners";
import WholesaleForm from "@/components/WholesaleForm";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/fx/AmbientBackground";
import SectionReveal from "@/components/fx/SectionReveal";

// Site-wide floating candy layer (WebGL, client-only, ultra light).
const AmbientCandyField = dynamic(() => import("@/components/three/AmbientCandyField"));

export default function Home() {
  return (
    <>
      {/* atmosphere layers (fixed, behind everything) */}
      <AmbientBackground />
      <AmbientCandyField />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionReveal parallax={26}>
          <FlavoursSection />
        </SectionReveal>
        <SectionReveal parallax={20}>
          <IntroSection />
        </SectionReveal>
        <SectionReveal variant="mask">
          <ProductStandards />
        </SectionReveal>
        <SectionReveal parallax={18}>
          <DistributorPartners />
        </SectionReveal>
        <SectionReveal variant="mask">
          <FranchisePartners />
        </SectionReveal>
        <SectionReveal parallax={14}>
          <WholesaleForm />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
