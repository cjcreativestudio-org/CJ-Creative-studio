// components/demo-request-cta.tsx
"use client";

// The /demo/[slug] primary "book a call" CTA. Renders the exact interim mailto
// anchor from the demo page, and additionally fires a best-effort attribution
// beacon on click (POST /api/outreach/demo-request) so the north-star funnel can
// count the demo request. Progressive enhancement: if the beacon is blocked or JS
// is off, the anchor still navigates (mailto) — the CTA is never broken. Imports
// nothing from the store, so no server-only code leaks into the client bundle.
export default function DemoRequestCta({
  slug,
  href,
}: {
  slug: string;
  href: string;
}) {
  function fireBeacon() {
    try {
      void fetch("/api/outreach/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore — capture is best-effort, must never block the CTA navigation
    }
  }

  return (
    <a
      href={href}
      onClick={fireBeacon}
      className="inline-block bg-[#0A2540] text-white px-8 py-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d3060]"
    >
      Book your free 20-min call →
    </a>
  );
}
