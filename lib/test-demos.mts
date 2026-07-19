// Pure-data tests for lib/demos.ts. Runs with Node 24's native TS type-stripping
// and the built-in test runner — no bundler, no node_modules, so it is unaffected
// by the Turbopack-in-worktree limitation. Run from the repo root:
//   node --test lib/test-demos.mts
import { test } from "node:test";
import assert from "node:assert/strict";
import { demos, getDemo } from "./demos.ts";
import { projects } from "./projects.ts";

test("getDemo returns the demo for a known seed slug", () => {
  const demo = getDemo("harbot-builders");
  assert.ok(demo, "expected a demo for 'harbot-builders'");
  assert.equal(demo?.businessName, "Harbot Builders");
});

test("getDemo returns undefined for an unknown slug", () => {
  assert.equal(getDemo("does-not-exist"), undefined);
});

test("seed data is non-empty and every demo is well-formed", () => {
  assert.ok(demos.length >= 2, "expected at least two seeded demos");
  for (const d of demos) {
    assert.ok(d.slug.length > 0, "slug must be non-empty");
    assert.ok(d.businessName.length > 0, `${d.slug}: businessName must be non-empty`);
    assert.ok(d.town.length > 0, `${d.slug}: town must be non-empty`);
    assert.ok(d.currentSiteUrl.length > 0, `${d.slug}: currentSiteUrl must be non-empty`);
    assert.ok(d.outdatedFlags.length > 0, `${d.slug}: must list at least one outdated flag`);
    assert.ok(d.offer.length > 0, `${d.slug}: must list at least one offer item`);
    assert.ok(d.headline.length > 0, `${d.slug}: headline must have at least one line`);
    // Headline lines each render as a keyed MaskReveal — they must be unique.
    assert.equal(
      new Set(d.headline).size,
      d.headline.length,
      `${d.slug}: headline lines must be unique`
    );
  }
});

test("demo slugs are unique", () => {
  const slugs = demos.map((d) => d.slug);
  assert.equal(new Set(slugs).size, slugs.length, "demo slugs must be unique");
});

test("every proof.projectSlug resolves to a real /work project", () => {
  const workSlugs = new Set(projects.map((p) => p.slug));
  for (const d of demos) {
    assert.ok(
      workSlugs.has(d.proof.projectSlug),
      `${d.slug}: proof.projectSlug '${d.proof.projectSlug}' is not a /work slug`
    );
  }
});
