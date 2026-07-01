import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import ShaderBackground from "@/components/shader-background";
import FilmGrain from "@/components/film-grain";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const fontInter = Inter({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
  variable: "--font-inter",
});

const fontArchivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-archivo-black",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const BASE_URL = "https://cj-studio-beta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CJ Studio | Web Design Agency UK",
    template: "%s | CJ Studio",
  },
  description: "Premium websites for ambitious UK businesses. Flat fee, no agency markup. Fast, modern, conversion-focused.",
  openGraph: {
    type: "website",
    siteName: "CJ Studio",
    title: "CJ Studio | Web Design Agency UK",
    description: "Premium websites for ambitious UK businesses. Flat fee, no agency markup.",
    url: BASE_URL,
    images: [{ url: "/assets/cj-logo-stacked.png", width: 1200, height: 630, alt: "CJ Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ Studio | Web Design Agency UK",
    description: "Premium websites for ambitious UK businesses. Flat fee, no agency markup.",
    images: ["/assets/cj-logo-stacked.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSpaceGrotesk.variable} ${fontMono.variable} ${fontInter.variable} ${fontArchivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <ShaderBackground />
        <FilmGrain />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

