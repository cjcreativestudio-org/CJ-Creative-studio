import Nav from "@/components/nav";
import HomeScrollScene from "@/components/home-scroll-scene";
import WorkTeaser from "@/components/work-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <HomeScrollScene />
      <WorkTeaser />
      <CTA />
      <Footer />
    </main>
  );
}
