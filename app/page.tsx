import { Bento } from "@/features/landing/components/bento";
import { Feature } from "@/features/landing/components/feature";
import FeatureProduct from "@/features/landing/components/FeatureProduct";
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
      <FeatureProduct />
      <Feature />

      <Footer />
    </>
  );
}
