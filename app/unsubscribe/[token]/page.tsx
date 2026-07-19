import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";
import EditorialFooter from "@/components/editorial-footer";
import MaskReveal from "@/components/mask-reveal";
import { verifyUnsubToken, getSuppressionStore } from "@/lib/outreach-unsubscribe";

// Opt-out is a per-request mutation (records to the suppression store) and must never
// be cached or statically prerendered. No generateStaticParams: tokens are unbounded.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // Generic title — never echo the recipient's business/email (privacy).
  title: { absolute: "Unsubscribe · CJ Studio" },
  // Private compliance surface: never index, never follow. Not in sitemap/robots/nav.
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = verifyUnsubToken(token, process.env.OUTREACH_TOKEN_SECRET);

  if (result.valid && result.subject) {
    // Safe direction: record the opt-out on load. Idempotent (double-click safe) and
    // degrades honestly when no durable store is configured (it logs). A link scanner
    // GET that lands here only ever over-suppresses — never emails someone in error.
    try {
      await getSuppressionStore().recordOptOut(result.subject, {
        token,
        source: "web-unsubscribe",
      });
    } catch (err) {
      // The store swallows its own transport errors; this is belt-and-suspenders so a
      // store fault never 500s the recipient. Log for ops; still show confirmation.
      console.error("[unsubscribe] recordOptOut failed:", err);
    }
  }

  const confirmed = result.valid;

  return (
    <div className="bg-[#0a0a0a] isolate">
      <EditorialNav />
      <main id="main-content">
        <section
          className="bg-[#0a0a0a] min-h-svh pt-14 flex items-center"
          aria-label={confirmed ? "Unsubscribe confirmation" : "Unsubscribe"}
        >
          <div className="px-6 py-24 max-w-[820px] mx-auto w-full">
            <div className="flex items-center justify-between mb-10">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                {confirmed ? "Unsubscribed" : "Unsubscribe"}
              </span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#666]">
                CJ Creative Studio
              </span>
            </div>

            {confirmed ? (
              <>
                <MaskReveal>
                  <h1
                    className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] text-[#f0f0f0]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    You&rsquo;ve been unsubscribed.
                  </h1>
                </MaskReveal>
                <div className="flex items-start gap-8 mt-8">
                  <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
                  <p className="max-w-[560px] text-[15px] leading-[1.65] text-[#888] font-serif">
                    You won&rsquo;t receive any further outreach emails from CJ Studio.
                    If this was a mistake, or you&rsquo;d like to talk another time,
                    email{" "}
                    <a
                      href="mailto:hello@cjcreativestudio.com"
                      className="text-[#5b9fd6] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                    >
                      hello@cjcreativestudio.com
                    </a>
                    .
                  </p>
                </div>
              </>
            ) : (
              <>
                <MaskReveal>
                  <h1
                    className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] text-[#f0f0f0]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    This link is invalid or has expired.
                  </h1>
                </MaskReveal>
                <div className="flex items-start gap-8 mt-8">
                  <div className="w-10 border-t-[2px] border-[#f0f0f0] mt-2 shrink-0" />
                  <p className="max-w-[560px] text-[15px] leading-[1.65] text-[#888] font-serif">
                    We couldn&rsquo;t verify this unsubscribe link. If you&rsquo;d like
                    to opt out of emails from CJ Studio, reply to any message
                    we&rsquo;ve sent you, or email{" "}
                    <a
                      href="mailto:hello@cjcreativestudio.com"
                      className="text-[#5b9fd6] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
                    >
                      hello@cjcreativestudio.com
                    </a>{" "}
                    and we&rsquo;ll remove you right away.
                  </p>
                </div>
              </>
            )}

            <p
              className="mt-12 text-[11px] tracking-[0.14em] uppercase text-[#555]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              CJ Studio · UK web design
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 text-[13px] tracking-[0.12em] uppercase text-[#5b9fd6] transition-opacity duration-[160ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
            >
              ← Back to cjcreativestudio.com
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
