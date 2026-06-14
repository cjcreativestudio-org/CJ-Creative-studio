import type { Metadata } from "next";
import AuroraBackground from "@/components/aurora-background";
import Nav from "@/components/nav";
import About from "@/components/about";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how we work, and the people behind CJ Studio.",
};

export default function AboutPage() {
  return (
    <AuroraBackground>
      <Nav />
      <main id="main-content">
        <About />
      </main>
      <Footer />
    </AuroraBackground>
  );
}
