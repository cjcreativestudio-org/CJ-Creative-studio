"use client";

import { useEffect } from "react";
import { calBookingHref, calConfig, calLinkSlug } from "@/lib/calcom";

// Book-a-call CTA for /demo/[slug] (outreach engine Brick 7). Closes the funnel:
// demo-request -> booked call, the north-star metric of g9.
//
// DEGRADATION GUARD (mirrors the cc4t-site load-time-armed pattern):
//   - `calLink` set   -> render an <a> to the real cal.com booking page AND arm
//                        Cal.com's embed.js so a click opens the in-page popup.
//                        If the script is blocked/fails, the anchor still books.
//   - `calLink` unset -> render the interim mailto <a>. The public /demo page
//                        therefore NEVER shows a broken/empty booking widget; it
//                        auto-arms the moment NEXT_PUBLIC_CALCOM_LINK is present,
//                        with no code change needed to go live.
// Exactly ONE primary booking CTA either way (design-taste-frontend rule).

const CAL_ORIGIN = "https://cal.com";
const CAL_EMBED_JS = "https://app.cal.com/embed/embed.js";

// Minimal typing for Cal.com's queue-based embed global. embed.js reads the
// queue once it loads and wires every element carrying `data-cal-link`.
type CalQueueArgs = unknown[];
interface CalApi {
  (...args: CalQueueArgs): void;
  loaded?: boolean;
  q?: CalQueueArgs[];
}

function ensureCalLoaded(): void {
  const w = window as Window & { Cal?: CalApi };
  if (w.Cal) return; // already initialised on this page

  const cal: CalApi = (...args: CalQueueArgs) => {
    if (!cal.loaded) {
      cal.loaded = true;
      const script = document.createElement("script");
      script.src = CAL_EMBED_JS;
      script.async = true;
      document.head.appendChild(script);
    }
    (cal.q ??= []).push(args);
  };
  cal.q = [];
  w.Cal = cal;
  w.Cal("init", { origin: CAL_ORIGIN });
}

export default function BookCallCta({
  calLink,
  mailtoHref,
  prefillName,
  label,
  className,
}: {
  /** Cal.com handle/event slug from NEXT_PUBLIC_CALCOM_LINK; undefined -> mailto fallback. */
  calLink?: string;
  /** Interim mailto fallback (always works, even with no Cal.com link configured). */
  mailtoHref: string;
  /** Lead/business name, prefilled into the Cal.com booking. */
  prefillName?: string;
  label: string;
  className: string;
}) {
  const armed = Boolean(calLink && calLink.trim());

  useEffect(() => {
    if (armed) ensureCalLoaded();
  }, [armed]);

  if (!armed || !calLink) {
    return (
      <a href={mailtoHref} className={className}>
        {label}
      </a>
    );
  }

  return (
    <a
      href={calBookingHref(calLink, prefillName)}
      data-cal-link={calLinkSlug(calLink)}
      data-cal-config={calConfig(prefillName)}
      className={className}
    >
      {label}
    </a>
  );
}
