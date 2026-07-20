// Pure-data tests for lib/calcom.ts (outreach engine Brick 7). Runs with Node's
// native TS type-stripping + the built-in test runner — no bundler, no DOM, so it
// is unaffected by the Turbopack-in-worktree limitation. Run from the repo root:
//   node --test lib/test-calcom.mts
import { test } from "node:test";
import assert from "node:assert/strict";
import { calBookingHref, calConfig, calLinkSlug } from "./calcom.ts";

test("calLinkSlug passes a bare handle/event slug through unchanged", () => {
  assert.equal(calLinkSlug("cjstudio/intro-20min"), "cjstudio/intro-20min");
});

test("calLinkSlug strips a full cal.com URL down to its slug", () => {
  assert.equal(calLinkSlug("https://cal.com/cjstudio/intro-20min"), "cjstudio/intro-20min");
  assert.equal(calLinkSlug("http://app.cal.com/cjstudio/intro"), "cjstudio/intro");
});

test("calLinkSlug trims whitespace and surrounding slashes", () => {
  assert.equal(calLinkSlug("  /cjstudio/intro/  "), "cjstudio/intro");
});

test("calBookingHref builds a full-page booking URL and prefills the name", () => {
  assert.equal(
    calBookingHref("cjstudio/intro-20min", "Harbot Builders"),
    "https://cal.com/cjstudio/intro-20min?name=Harbot%20Builders"
  );
});

test("calBookingHref omits the query when no prefill name is given", () => {
  assert.equal(calBookingHref("cjstudio/intro-20min"), "https://cal.com/cjstudio/intro-20min");
  assert.equal(calBookingHref("cjstudio/intro-20min", "   "), "https://cal.com/cjstudio/intro-20min");
});

test("calConfig emits valid JSON with the prefill name and a month layout", () => {
  assert.deepEqual(JSON.parse(calConfig("Harbot Builders")), {
    name: "Harbot Builders",
    layout: "month_view",
  });
  assert.deepEqual(JSON.parse(calConfig()), { layout: "month_view" });
});
