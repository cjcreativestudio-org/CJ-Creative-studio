// Pure helpers for the Cal.com "book a call" CTA (outreach engine Brick 7).
// No DOM / runtime deps, so they are trivially testable with node --test and are
// shared by the "use client" BookCallCta component and its tests.
//
// The Cal.com handle/event is ENV-CONFIGURED via NEXT_PUBLIC_CALCOM_LINK (e.g.
// "cjstudio/intro-20min"); it is never hardcoded — Ollie owns the Cal.com
// account, so this is the one Ollie-gated env var for this brick. When it is
// unset the /demo CTA falls back to the interim mailto (see components/book-call-cta.tsx),
// so the live page never renders a broken/empty booking widget.

/**
 * Normalise a configured Cal.com link to its bare handle/event slug.
 * Accepts a bare slug ("cjstudio/intro-20min") or a full pasted URL
 * ("https://cal.com/cjstudio/intro-20min") and returns the slug either way.
 */
export function calLinkSlug(calLink: string): string {
  return calLink
    .trim()
    .replace(/^https?:\/\/(app\.)?cal\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

/**
 * Full-page cal.com booking URL used as the anchor href. This is the
 * progressive-enhancement fallback: if the embed popup script does not load
 * (JS disabled/blocked), the anchor still navigates to a working booking page.
 * Prefills the lead's business name when supplied.
 */
export function calBookingHref(calLink: string, prefillName?: string): string {
  const url = `https://cal.com/${calLinkSlug(calLink)}`;
  const name = prefillName?.trim();
  return name ? `${url}?name=${encodeURIComponent(name)}` : url;
}

/**
 * `data-cal-config` JSON string read by Cal.com's embed.js when opening the
 * popup: prefills the lead's business name and pins a month-view layout.
 */
export function calConfig(prefillName?: string): string {
  const name = prefillName?.trim();
  return JSON.stringify(
    name ? { name, layout: "month_view" } : { layout: "month_view" }
  );
}
