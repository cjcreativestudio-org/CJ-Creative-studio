import type { Metadata } from "next";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import ContactForm from "@/components/contact-form";
import MaskReveal from "@/components/mask-reveal";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact — CJ Studio",
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
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      <EditorialNav />
      <main id="main-content" className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <MaskReveal>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666] block mb-6">
                Get in touch
              </span>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h1
                className="text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.9] text-[#f0f0f0] mb-8"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                Say hello.
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <p className="text-[15px] leading-[1.7] text-[#888] font-serif max-w-[420px]">
                Tell us about your project. We reply within 24 hours with a free, no-obligation quote.
              </p>
            </MaskReveal>
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
                    className="flex items-center gap-4 p-4 border border-[#333] transition-[border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#5b9fd6] group"
                  >
                    <div className="w-10 h-10 border border-[#333] flex items-center justify-center shrink-0 transition-[border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[#5b9fd6]">
                      <Icon size={18} className="text-[#666] [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#5b9fd6] transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-[15px] text-[#f0f0f0]">{label}</p>
                      <p className="text-[12px] text-[#666] tracking-[0.06em]">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-[#222] flex flex-col gap-3">
                {["Free, no-obligation quote", "Reply within 24 hours", "Based in the UK"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px] text-[#666]">
                    <span className="w-1.5 h-1.5 bg-[#5b9fd6] shrink-0" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <EditorialFooter />
    </div>
  );
}
