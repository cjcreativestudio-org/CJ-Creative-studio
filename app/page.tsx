import HomeClient from "@/components/home-client";
import WhyItMatters from "@/components/why-it-matters";
import WorkTeaser from "@/components/work-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HomeClient />
      <WhyItMatters />
      <WorkTeaser />
      <CTA />
      <Footer />
    </>
  );
}
