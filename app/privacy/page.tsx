import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import AuroraBackground from "@/components/aurora-background";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CJ Studio collects, uses, and protects your personal data.",
};

const updated = "30 May 2026";

export default function PrivacyPolicy() {
  return (
    <AuroraBackground>
      <Nav />
      <main id="main-content" className="min-h-[100dvh]">
      <article className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[12px] font-medium mb-4">
            Legal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            This policy explains how CJ Studio collects, uses, and protects your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
        </header>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-gray-600">

          <Section title="1. Who we are">
            <p>CJ Studio is a web design and development business operated by Ollie Jackson and Josh Carter, based in the United Kingdom.</p>
            <p className="mt-3"><strong className="text-gray-900">Contact:</strong> hello@cjstudio.co.uk</p>
            <p className="mt-1">We are the data controller for the personal information we collect about you. We are registered with the Information Commissioner&apos;s Office (ICO) as required by UK law.</p>
          </Section>

          <Section title="2. What data we collect">
            <p>We collect the following personal data when you contact us or engage our services:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Your name",
                "Your email address",
                "Your phone number (if provided)",
                "Your business name and website (if applicable)",
                "Details of the project or enquiry you submit",
                "Payment information (processed securely by Stripe — we do not store card details)",
                "Technical data such as IP address and browser type when you visit our website (via standard server logs)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="3. How we use your data">
            <p>We use your personal data for the following purposes:</p>
            <table className="mt-4 w-full text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 w-1/2">Purpose</th>
                  <th className="text-left py-2 font-semibold text-gray-900">Legal basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Responding to your enquiry", "Legitimate interests"],
                  ["Providing web design and development services", "Performance of a contract"],
                  ["Processing payments", "Performance of a contract"],
                  ["Sending project updates and communications", "Performance of a contract"],
                  ["Keeping financial records", "Legal obligation (HMRC, 7 years)"],
                  ["Improving our services", "Legitimate interests"],
                ].map(([purpose, basis]) => (
                  <tr key={purpose}>
                    <td className="py-2.5 pr-4 text-gray-600">{purpose}</td>
                    <td className="py-2.5 text-gray-500">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4">We do not use your data for automated decision-making or profiling. We do not send marketing emails without your explicit consent.</p>
          </Section>

          <Section title="4. Who we share your data with">
            <p>We only share your data with third parties where necessary to deliver our services:</p>
            <ul className="mt-3 space-y-3 list-none pl-0">
              {[
                { name: "Stripe", detail: "Payment processing. Stripe is PCI-DSS compliant. View their privacy policy at stripe.com/privacy." },
                { name: "Vercel", detail: "Website hosting and deployment infrastructure. Your website is hosted on Vercel servers." },
                { name: "GitHub", detail: "Source code hosting for your project repository." },
                { name: "Google", detail: "Business email (Gmail) for project communications." },
              ].map((t) => (
                <li key={t.name} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[13px] font-semibold text-gray-900 min-w-[72px]">{t.name}</span>
                  <span className="text-gray-500 text-[14px]">{t.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">We do not sell your personal data to any third party.</p>
          </Section>

          <Section title="5. How long we keep your data">
            <p>We retain your data for the following periods:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Project and payment records: 7 years (required by HMRC)",
                "Enquiry and contact data: 2 years from the date of last contact",
                "Website server logs: 90 days",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">After these periods, your data is securely deleted.</p>
          </Section>

          <Section title="6. Your rights">
            <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Right of access: Request a copy of the data we hold about you.",
                "Right to rectification: Ask us to correct inaccurate or incomplete data.",
                "Right to erasure: Ask us to delete your data (subject to legal obligations).",
                "Right to restrict processing: Ask us to limit how we use your data.",
                "Right to data portability: Request your data in a machine-readable format.",
                "Right to object: Object to processing based on legitimate interests.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">To exercise any of these rights, email us at <a href="mailto:hello@cjstudio.co.uk" className="text-purple-600 underline hover:text-purple-800">hello@cjstudio.co.uk</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="7. Cookies">
            <p>Our website uses only essential cookies required for the site to function correctly (set by Next.js and Vercel). We do not use tracking, advertising, or analytics cookies. No cookie consent banner is required for essential cookies under UK PECR.</p>
          </Section>

          <Section title="8. Data security">
            <p>We take reasonable technical and organisational measures to protect your personal data, including:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "All data transmitted via HTTPS (SSL/TLS encryption)",
                "Payment data processed exclusively by Stripe (PCI-DSS compliant)",
                "Source code stored in private GitHub repositories",
                "Email secured via Google Workspace",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="9. Complaints">
            <p>If you are unhappy with how we have handled your personal data, please contact us in the first instance at <a href="mailto:hello@cjstudio.co.uk" className="text-purple-600 underline hover:text-purple-800">hello@cjstudio.co.uk</a>.</p>
            <p className="mt-3">You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" className="text-purple-600 underline hover:text-purple-800" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or by calling 0303 123 1113.</p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>We may update this policy from time to time. The current version will always be available at this URL. Last updated: {updated}.</p>
          </Section>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-[14px] text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
          <a href="mailto:hello@cjstudio.co.uk" className="hover:text-gray-700 transition-colors">Contact</a>
        </div>
      </article>
      </main>
    </AuroraBackground>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[18px] font-semibold text-gray-900 mb-3">{title}</h2>
      {children}
    </section>
  );
}
