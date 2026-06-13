import type { Metadata } from "next";
import AuroraBackground from "@/components/aurora-background";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact | CJ Studio",
  description: "Get in touch with CJ Creative Studio. We reply within 24 hours.",
};

const contacts = [
  {
    icon: EnvelopeSimple,
    label: "hello@cjstudio.co.uk",
    href: "mailto:hello@cjstudio.co.uk",
    sub: "Email us any time",
  },
  {
    icon: InstagramLogo,
    label: "@cjcreativestudio",
    href: "https://instagram.com/cjcreativestudio",
    sub: "Instagram",
  },
  {
    icon: LinkedinLogo,
    label: "CJ Creative Studio",
    href: "https://linkedin.com/company/cj-creative-studio",
    sub: "LinkedIn",
  },
];

export default function ContactPage() {
  return (
    <AuroraBackground>
      <Nav />
      <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-32">
        <div className="w-full max-w-xl">
          <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 mb-5 font-medium">
            Get in touch
          </p>
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-tight text-gray-900 leading-[1.05] mb-4">
            Say hello.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-12">
            Tell us about your project. We reply within 24 hours with a free, no-obligation quote.
          </p>

          <div className="flex flex-col gap-4">
            {contacts.map(({ icon: Icon, label, href, sub }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:bg-gray-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-purple-50 flex items-center justify-center transition-colors shrink-0">
                  <Icon size={18} className="text-gray-500 group-hover:text-purple-500 transition-colors" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    {label}
                  </p>
                  <p className="text-[13px] text-gray-400">{sub}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col gap-2">
            {["Free, no-obligation quote", "Reply within 24 hours", "Based in the UK"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </AuroraBackground>
  );
}
