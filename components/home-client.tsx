import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HomeHero from "@/components/home-hero";
import HomeProblem from "@/components/home-problem";
import HomeDifferentiators from "@/components/home-differentiators";
import HomeWork from "@/components/home-work";
import HomeProcess from "@/components/home-process";
import ScrollRiver from "@/components/scroll-river";
import MobileStickyCta from "@/components/mobile-sticky-cta";
import HomeLoadingScreen from "@/components/home-loading-screen";

export default function HomeClient() {
  return (
    <div>
      <HomeLoadingScreen />
      <ScrollRiver />
      <EditorialNav />
      <MobileStickyCta />
      <HomeHero />
      <HomeProblem />
      <HomeDifferentiators />
      <HomeWork />
      <HomeProcess />
      <EditorialFooter />
    </div>
  );
}
