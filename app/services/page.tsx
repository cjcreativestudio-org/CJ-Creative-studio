import type { Metadata } from "next";
import AuroraBackground from "@/components/aurora-background";
import Nav from "@/components/nav";
import Services from "@/components/services";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, build, and maintenance services from CJ Studio.",
};

export default function ServicesPage() {
  return (
    <AuroraBackground>
      <Nav />
      <main id="main-content">
        <Services />
      </main>
      <Footer />
    </AuroraBackground>
  );
}
