import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CJ Studio. Free, no-obligation quote. We reply within 24 hours.",
};

const contacts = [
  {
    icon: EnvelopeSimple,
    label: "hello@cjcreativestudio.com",
    href: "mailto:hello@cjcreativestudio.com",
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
    label: "CJ Studio",
    href: "https://linkedin.com/company/cj-creative-studio",
    sub: "LinkedIn",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav onLight={false} />
      <main id="main-content" className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p
              className="text-[11px] uppercase mb-4"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.40)" }}
            >
              Get in touch
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-tight text-white leading-[1.05] mb-4">
              Say hello.
            </h1>
            <p className="text-lg text-white/55 leading-relaxed max-w-[48ch]">
              Tell us about your project. We reply within 24 hours with a free, no-obligation quote.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact info */}
            <aside className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                {contacts.map(({ icon: Icon, label, href, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] hover:border-[#8a6cff]/30 hover:bg-[#8a6cff]/[0.06] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] group-hover:bg-[#8a6cff]/10 flex items-center justify-center transition-colors shrink-0">
                      <Icon size={18} className="text-white/55 group-hover:text-[#8a6cff] transition-colors" />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-white group-hover:text-white transition-colors">
                        {label}
                      </p>
                      <p className="text-[13px] text-white/40">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-2.5">
                {["Free, no-obligation quote", "Reply within 24 hours", "Based in the UK"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[14px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
