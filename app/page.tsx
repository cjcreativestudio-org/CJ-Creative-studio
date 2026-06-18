import HomeClient from "@/components/home-client";
import DarkWorkCarousel from "@/components/dark-work-carousel";
import WhyItMatters from "@/components/why-it-matters";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HomeClient />
      <main id="main-content">
        <WhyItMatters />
        <DarkWorkCarousel />
        {/* Gradient bridge: dark carousel → aurora */}
        <div className="h-32 bg-gradient-to-b from-[#0c0e14] to-transparent -mt-1" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
