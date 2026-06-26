import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HomeHero from "@/components/home-hero";
import HomeProblem from "@/components/home-problem";
import HomeDifferentiators from "@/components/home-differentiators";
import HomeWork from "@/components/home-work";
import HomeProcess from "@/components/home-process";
import HomeTestimonials from "@/components/home-testimonials";
import HomeFinalCta from "@/components/home-final-cta";
import ScrollRiver from "@/components/scroll-river";
import MobileStickyCta from "@/components/mobile-sticky-cta";

export default function HomeClient() {
  return (
    <div>
      <ScrollRiver />
      <EditorialNav />
      <MobileStickyCta />
      <HomeHero />
      <HomeProblem />
      <HomeDifferentiators />
      <HomeWork />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFinalCta />
      <EditorialFooter />
    </div>
  );
}
