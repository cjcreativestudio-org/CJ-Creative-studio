import type { Metadata } from "next";
import Nav from "@/components/nav";
import Founders from "@/components/founders";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Founders | CJ Studio",
  description: "Meet Ollie and Josh, the people behind CJ Studio.",
};

export default function FoundersPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Founders />
      <Footer />
    </main>
  );
}