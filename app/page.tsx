import { CtaSection } from "@/features/landing/components/cta-section";
import { ProductSection } from "@/features/landing/components/product-section";
import { Footer } from "@/features/landing/components/footer";
import { Header } from "@/features/landing/components/header";
import { HeroSection } from "@/features/landing/components/hero-section";
import { StatsSection } from "@/features/landing/components/stats-section";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto">
        <HeroSection />
        <StatsSection />
      </div>
      <ProductSection />
      <CtaSection />

      <Footer />
    </>
  );
}
