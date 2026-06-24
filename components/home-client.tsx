import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import HeroMediaPlane from "@/components/hero-media-plane";
import PortfolioCarousel from "@/components/portfolio-carousel";

export default function HomeClient() {
  return (
    <div className="bg-white">
      <EditorialNav />

      <HeroMediaPlane />
      <PortfolioCarousel />

      <EditorialFooter />
    </div>
  );
}
