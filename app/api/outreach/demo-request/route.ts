// app/api/outreach/demo-request/route.ts
//
// Capture endpoint for the /demo/[slug] "book a call" beacon. A demo request is
// INBOUND and opt-in, so no consent gate applies — we validate the slug against
// the known demos and record a best-effort attribution event. Neutral JSON only.
import { getDemo } from "@/lib/demos";
import { recordDemoRequest } from "@/lib/outreach-attribution";

export async function POST(request: Request) {
  let slug: unknown;
  try {
    const body = (await request.json()) as { slug?: unknown };
    slug = body?.slug;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (typeof slug !== "string" || slug.length === 0) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const demo = getDemo(slug);
  if (!demo) {
    // Unknown slug — neutral rejection (don't confirm which slugs exist).
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    await recordDemoRequest(demo.slug, demo.businessName, "demo-cta");
  } catch (err) {
    // Store is fail-soft; belt-and-braces so the beacon never 500s.
    console.error("[demo-request] record failed:", err);
  }

  return Response.json({ ok: true });
}
