import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { hairSubtypes, hairTypes } from "../src/data/hair-types.ts";
import { naturalProfileMatchesHairType, naturalProfiles } from "../src/data/natural-profiles.ts";
import { people } from "../src/data/people.ts";
import { dist, page, publicRoutes } from "./helpers/site.mjs";

test("detail pages show one-line names and a grouped hair-type navigator", () => {
  const subtypeMarkup = page("/hair-types/3a/");
  assert.match(subtypeMarkup, /<h1[^>]*>Type 3A: Loose spiral curl<\/h1>/);
  assert.match(subtypeMarkup, /aria-label="Hair type navigator"/);
  assert.match(subtypeMarkup, /aria-label="Type 3 curly"/);
  assert.match(subtypeMarkup, /href="\/hair-types\/3a\/"[^>]*aria-current="page"/);

  for (const type of hairTypes) {
    assert.match(subtypeMarkup, new RegExp(`href="/hair-types/${type.slug}/"`));
  }
  for (const subtype of hairSubtypes) {
    assert.match(subtypeMarkup, new RegExp(`href="/hair-types/${subtype.slug}/"`));
  }

  for (const type of hairTypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    assert.match(markup, /aria-label="Hair type navigator"/);
    assert.match(markup, new RegExp(`href="/hair-types/${type.slug}/"[^>]*aria-current="page"`));
  }
});

test("built hair-type pages show a preview only when matching people exist", () => {
  for (const type of [...hairTypes, ...hairSubtypes]) {
    const markup = page(`/hair-types/${type.slug}/`);
    const hasMatches = naturalProfiles.some(
      (profile) =>
        naturalProfileMatchesHairType(profile, type.id) && people.some((person) => person.id === profile.personId),
    );
    assert.equal(markup.includes('data-testid="hair-type-celebrity-preview"'), hasMatches);
    if (hasMatches) assert.ok(markup.includes(`href="/hair-types/${type.slug}/people/"`));
  }
});

test("hair-type people archives are generated for every major type and subtype and included in sitemap", () => {
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const item of [...hairTypes, ...hairSubtypes]) {
    const path = `/hair-types/${item.slug}/people/`;
    assert.ok(publicRoutes().includes(path));
    assert.match(page(path), new RegExp(`People with Type ${item.code}`));
    assert.ok(sitemap.includes(`https://hairhairhair.hair${path}`));
  }
});

test("hair-type people archives use passport portrait proportions", () => {
  const archive = page("/hair-types/4/people/");
  assert.match(archive, /aspect-\[4\/5\]/);
  const headingIds = [...archive.matchAll(/id="(natural-profile-[^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(headingIds).size, headingIds.length);
  assert.ok(headingIds.length > 0);
});
