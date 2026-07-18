// Cold-email outreach drafts for leads that now have a live /proposal page.
// Pure data + a pure lookup — no client/runtime/server deps. Keyed by lead slug
// (which equals the proposal slug). The private /leads page renders these as
// copy-ready blocks so Ollie can paste them into email while RESEND_API_KEY is
// still not set in Vercel (contact form can't send — cold outreach is manual).

export interface OutreachDraft {
  subject: string;
  body: string; // plain text; \n line breaks render in a <pre> block on /leads
}

// Keyed by lead/proposal slug. Only leads we have prepared a cold intro for
// appear here; already-contacted leads (proposal-sent) intentionally have none.
export const outreachDrafts: Record<string, OutreachDraft> = {
  "harbot-builders": {
    subject: "A quick idea for the Harbot Builders website",
    body:
      "Hi,\n\nI came across Harbot Builders while looking at building firms around Leicester and had a proper look at your website. It's clearly served you for years — the copyright still reads 1986 — but it isn't really built for how people find a builder now: on a phone, on Google, deciding in seconds who to trust.\n\nI run CJ Studio, a small web design studio. We build fast, modern sites for trades and construction firms that turn visitors into real enquiries — recent work includes a roofing company in Exeter whose new site now brings in quote requests directly.\n\nI put together a short, no-obligation proposal for what a new Harbot Builders site could look like:\nhttps://www.cjcreativestudio.com/proposal/harbot-builders\n\nIf it's of interest, just reply and we can find 20 minutes for a call.\n\nAll the best,\nOllie\nCJ Studio · www.cjcreativestudio.com",
  },
  "bristol-roof-company": {
    subject: "A quick idea for Bristol Roof Company's website",
    body:
      "Hi,\n\nI came across Bristol Roof Company while looking at roofers in the area and took a look at your site. The work looks solid — but the website dates back to 2008, from before most people started searching for a roofer on their phone, mid-problem, often right after a leak.\n\nI run CJ Studio. We recently built a new site for LA Roofing, a 4.9-star Exeter roofer, with an instant roof-cost tool and their reviews and real jobs up front — it now turns first-time visitors into quote requests. I think the same would work well for you.\n\nHere's a short, no-obligation proposal I put together:\nhttps://www.cjcreativestudio.com/proposal/bristol-roof-company\n\nIf it's worth a look, reply here and we can grab 20 minutes.\n\nAll the best,\nOllie\nCJ Studio · www.cjcreativestudio.com",
  },
  "spa-landscaping": {
    subject: "Your SPA Landscaping site doesn't open on mobile",
    body:
      "Hi,\n\nI was looking at landscapers around Sheffield and tried opening the SPA Landscaping site on my phone — it doesn't really work on mobile, which is the exact device most people use to find a landscaper. With the copyright still on 2008, the site is quietly costing you enquiries the work deserves.\n\nI run CJ Studio, a small web studio. We build fast, mobile-first sites for trades that put your work and a simple quote request front and centre — recent work includes a new site for an Exeter trade business that now brings in enquiries directly.\n\nHere's a short, no-obligation proposal for a new SPA Landscaping site:\nhttps://www.cjcreativestudio.com/proposal/spa-landscaping\n\nIf it's of interest, reply and we can find 20 minutes for a call.\n\nAll the best,\nOllie\nCJ Studio · www.cjcreativestudio.com",
  },
  "the-ginger-bistro": {
    subject: "A quick idea for The Ginger Bistro's website",
    body:
      "Hi,\n\nI came across The Ginger Bistro while looking at restaurants in Belfast and had a look at your website. The bistro clearly has a real following — but the site dates to 2009, and it's hard to see the menu, the room or how to book, especially on a phone, which is where most 'where to eat tonight' decisions now happen.\n\nI run CJ Studio, a small web studio. We build sites for hospitality that make people choose you before they've walked in — menus a tap away, reviews up front, booking made easy. We recently did exactly this for a cafe-and-restaurant called Taste of Portugal.\n\nHere's a short, no-obligation proposal for a new Ginger Bistro site:\nhttps://www.cjcreativestudio.com/proposal/the-ginger-bistro\n\nIf it's of interest, just reply and we can find 20 minutes.\n\nAll the best,\nOllie\nCJ Studio · www.cjcreativestudio.com",
  },
  "catalyst-digital-energy": {
    subject: "A quick idea for the Catalyst website",
    body:
      "Hi,\n\nI came across Catalyst while researching energy consultancies and took a look at your website. The advice you offer is clearly high-stakes for the businesses you work with — but the site carries a 2001 copyright, and a dated first impression works against the credibility you're actually selling.\n\nI run CJ Studio, a small web studio. We build clean, credible B2B sites that make expertise obvious and give a warm prospect a clear next step — recent work includes Range Shipping, where we built a boardroom-ready site that earns trust from serious buyers.\n\nHere's a short, no-obligation proposal for a new Catalyst site:\nhttps://www.cjcreativestudio.com/proposal/catalyst-digital-energy\n\nIf it's worth a conversation, reply here and we can find 20 minutes.\n\nAll the best,\nOllie\nCJ Studio · www.cjcreativestudio.com",
  },
};

export function getOutreachDraft(slug: string): OutreachDraft | undefined {
  return outreachDrafts[slug];
}
