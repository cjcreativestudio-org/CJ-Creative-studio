import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for CJ Studio web design and maintenance services.",
};

const updated = "30 May 2026";

export default function Terms() {
  return (
    <>
      <Nav onLight={false} />
      <main className="min-h-[100dvh]" id="main-content">
        <article className="max-w-3xl mx-auto px-6 pt-28 pb-16">
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[12px] font-medium mb-4">
              Legal
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Terms of Service</h1>
            <p className="text-white/55 text-[15px] leading-relaxed">
              These terms govern the relationship between CJ Studio (&quot;we&quot;, &quot;us&quot;) and you (&quot;the Client&quot;) when you engage us to design, build, or maintain a website. Please read them carefully before placing an order.
            </p>
          </header>

          <div className="space-y-10 text-[15px] leading-relaxed text-white/60">

            <Section title="1. About CJ Studio">
              <p>CJ Studio is a web design and development business operated by Ollie Jackson and Josh Carter, trading in the United Kingdom. Contact: <a href="mailto:hello@cjcreativestudio.com" className="text-blue-400 underline hover:text-blue-300">hello@cjcreativestudio.com</a></p>
            </Section>

            <Section title="2. Services">
              <p>We provide the following services:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  "Website design and development (one-off project, fixed fee)",
                  "Website hosting and deployment via Vercel",
                  "Monthly website maintenance and updates (subscription)",
                  "Minor content changes and bug fixes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">The specific scope of each project will be agreed in writing (including by email) before work begins. Additional features or pages not included in the original brief will be quoted separately.</p>
            </Section>

            <Section title="3. Payment terms">
              <div className="space-y-3">
                <p><strong className="text-white">Build projects:</strong> Payment is split 50% upfront (deposit) before work begins and 50% on completion before the website goes live. We will not publish or transfer the website until final payment has been received in full.</p>
                <p><strong className="text-white">Monthly retainer:</strong> Billed automatically each month via Stripe. The retainer is charged on the same date each month from the start date agreed.</p>
                <p><strong className="text-white">Payment methods:</strong> Bank transfer or card payment via Stripe payment link.</p>
                <p><strong className="text-white">Late payment:</strong> Invoices unpaid after 14 days may incur interest at 8% above the Bank of England base rate in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.</p>
                <p><strong className="text-white">Quotes:</strong> All quotes are valid for 30 days from the date issued.</p>
              </div>
            </Section>

            <Section title="4. Intellectual property">
              <div className="space-y-3">
                <p><strong className="text-white">Ownership on full payment:</strong> Upon receipt of full payment for the build, the Client owns the final website design and source code outright.</p>
                <p><strong className="text-white">Before full payment:</strong> All work-in-progress designs, code, and assets remain the property of CJ Studio until the final invoice is settled.</p>
                <p><strong className="text-white">Third-party assets:</strong> Any third-party fonts, images, icons, or libraries used in the project are subject to their own licences. We will only use assets that permit commercial use, and we will inform the Client of any assets that require a separate licence.</p>
                <p><strong className="text-white">Portfolio:</strong> We reserve the right to feature the completed website in our portfolio and marketing materials unless the Client requests otherwise in writing.</p>
              </div>
            </Section>

            <Section title="5. Website hosting and maintenance">
              <div className="space-y-3">
                <p><strong className="text-white">Hosting infrastructure:</strong> Client websites are hosted on Vercel. Hosting is included as part of the monthly maintenance retainer while the retainer is active.</p>
                <p><strong className="text-white">First 30 days:</strong> We provide free bug fixes for the first 30 calendar days after a website goes live. A bug is defined as a technical fault in the code we delivered. Design changes or new features requested after launch are not covered.</p>
                <p><strong className="text-white">Monthly retainer:</strong> The retainer covers minor updates, content changes, security updates, and ongoing hosting. Major new features or redesigns will be quoted separately.</p>
                <p><strong className="text-white">Cancellation:</strong> Either party may cancel the monthly retainer with 30 days&apos; written notice. On cancellation, we will provide the Client with a full copy of the website source code within 7 days. The Client is then responsible for arranging alternative hosting.</p>
              </div>
            </Section>

            <Section title="6. Client responsibilities">
              <p>The Client agrees to:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  "Provide accurate content, branding assets, and information required for the project in a timely manner",
                  "Respond to design previews and feedback requests within 5 working days",
                  "Ensure they have the right to use any content, images, or materials supplied to us",
                  "Notify us promptly of any issues or concerns with the website",
                  "Manage their own domain registration and DNS settings (we will provide clear instructions)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">Delays caused by the Client (e.g. late content, unanswered feedback requests) may affect project timelines. CJ Studio is not liable for delays resulting from Client inaction.</p>
            </Section>

            <Section title="7. Limitation of liability">
              <div className="space-y-3">
                <p>To the fullest extent permitted by law, CJ Studio&apos;s total liability to the Client for any claim arising out of or in connection with these terms shall not exceed the total fees paid by the Client in the 12 months preceding the claim.</p>
                <p>We are not liable for:</p>
                <ul className="mt-2 space-y-2 list-none pl-0">
                  {[
                    "Loss of revenue, profit, or business resulting from website downtime or errors",
                    "Any third-party service outages (including Vercel, Stripe, or domain registrars)",
                    "Content errors or inaccuracies provided by the Client",
                    "Indirect or consequential losses of any kind",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited by law.</p>
              </div>
            </Section>

            <Section title="8. Confidentiality">
              <p>Both parties agree to keep confidential any sensitive business information shared during the course of a project. We will not share your project details, business information, or unpublished designs with any third party except those listed in our Privacy Policy who are necessary to deliver the service.</p>
            </Section>

            <Section title="9. Termination">
              <div className="space-y-3">
                <p><strong className="text-white">Termination by Client:</strong> If the Client cancels a build project after work has begun, they forfeit the deposit. Any work completed to date may be invoiced proportionally.</p>
                <p><strong className="text-white">Termination by CJ Studio:</strong> We reserve the right to terminate a project if the Client acts abusively, fails to pay, or repeatedly fails to meet their obligations. In this case, we will refund any fees paid for work not yet completed.</p>
              </div>
            </Section>

            <Section title="10. Governing law">
              <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales. We will always attempt to resolve disputes informally in the first instance - please contact us at <a href="mailto:hello@cjcreativestudio.com" className="text-blue-400 underline hover:text-blue-300">hello@cjcreativestudio.com</a>.</p>
            </Section>

            <Section title="11. Changes to these terms">
              <p>We may update these terms from time to time. We will notify active clients of any material changes by email. The current version is always available at this URL. Continued use of our services after changes are made constitutes acceptance of the updated terms.</p>
              <p className="mt-2">Last updated: {updated}.</p>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap gap-4 text-[14px] text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <a href="mailto:hello@cjcreativestudio.com" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
        </article>
      </main>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[18px] font-semibold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}
