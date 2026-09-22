import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { hairSubtypes, hairTypes } from "../src/data/hair-types.ts";
import { dist, page, publicRoutes, root } from "./helpers/site.mjs";

test("detail pages show one-line names and an unobtrusive previous/current/next navigator", () => {
  const subtypeMarkup = page("/hair-types/3a/");
  assert.match(subtypeMarkup, /<h1[^>]*>Type 3A Loose spiral curl<\/h1>/);
  assert.match(subtypeMarkup, /aria-label="Hair type sequence"/);
  assert.match(subtypeMarkup, /href="\/hair-types\/2c\/"/);
  assert.match(subtypeMarkup, /href="\/hair-types\/3\/"[^>]*>curly · Type 3/i);
  assert.match(subtypeMarkup, /href="\/hair-types\/3b\/"/);
  assert.doesNotMatch(subtypeMarkup, /coily · subtype/i);
  assert.doesNotMatch(subtypeMarkup, /aria-label="Adjacent hair sub-types"/);

  for (const type of hairTypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    assert.match(markup, /aria-label="Hair type sequence"/);
    if (type !== hairTypes[0])
      assert.match(markup, new RegExp(`href="/hair-types/${hairTypes[hairTypes.indexOf(type) - 1].slug}/"`));
    if (type !== hairTypes.at(-1))
      assert.match(markup, new RegExp(`href="/hair-types/${hairTypes[hairTypes.indexOf(type) + 1].slug}/"`));
  }
});

test("celebrity preview is conditional and links to type-specific people archives", () => {
  const major = page("/hair-types/4/");
  assert.match(major, /Celebs with this hair type/);
  assert.match(major, /href="\/hair-types\/4\/people\/"/);
  assert.match(major, /Will Smith/);
  assert.match(major, /Mario Balotelli/);
  assert.match(major, /aspect-\[4\/5\]/);
  assert.doesNotMatch(major, /pointer-events-none/);

  const exactSubtype = page("/hair-types/4a/");
  assert.doesNotMatch(exactSubtype, /Celebs with this hair type|Will Smith|Mario Balotelli/);

  const empty = page("/hair-types/3a/");
  assert.doesNotMatch(empty, /Celebs with this hair type/);
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
  assert.equal(headingIds.length, 2);
  assert.match(readFileSync(join(root, "src/data/hair-type-discovery.ts"), "utf8"), /return profiles[\s\S]*?\}\);/);
  assert.match(
    readFileSync(join(root, "src/components/HairTypeCelebrityPreview.astro"), "utf8"),
    /people\.slice\(0, 7\)/,
  );
});
