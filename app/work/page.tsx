import type { Metadata } from "next";
import Nav from "@/components/nav";
import Work from "@/components/work";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Work | CJ Studio",
  description: "Selected web design projects by CJ Studio.",
};

export default function WorkPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Work />
      <Footer />
    </main>
  );
}