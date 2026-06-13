import type { Metadata } from "next";
import AuroraBackground from "@/components/aurora-background";
import Nav from "@/components/nav";
import About from "@/components/about";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | CJ Studio",
  description: "Who we are, how we work, and the people behind CJ Creative Studio.",
};

export default function AboutPage() {
  return (
    <AuroraBackground>
      <Nav />
      <main>
        <About />
      </main>
      <Footer />
    </AuroraBackground>
  );
}
