import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url).pathname;
const source = (path) => readFileSync(`${root}${path}`, "utf8");

test("public section and header separators outside hairstyle details are one pixel", () => {
  const files = [
    "src/components/Footer.astro",
    "src/components/PersonPhoto.astro",
    "src/pages/people/[slug]/hairstyles/[hairstyleSlug].astro",
    "src/pages/people/[slug]/hairstyles.astro",
    "src/pages/people/[slug]/appearances.astro",
    "src/pages/hair-types/[slug]/people.astro",
    "src/pages/hair-types/[slug]/hairstyles.astro",
    "src/pages/hair-types/[slug].astro",
  ];

  for (const file of files) {
    assert.doesNotMatch(source(file), /border-(?:t|b|y)-2(?:\s|\")/, `${file} has a thick separator`);
  }
});

test("thin collection and profile hairlines remain intact", () => {
  assert.match(source("src/pages/people/[slug].astro"), /border-b border-taupe pb-3 sm:pb-2/);
  assert.match(source("src/components/NaturalProfile.astro"), /border-b border-ink\/25/);
  assert.match(source("src/components/PersonDirectoryCard.tsx"), /border-t border-ink\/20/);
});

test("the footer has no top rule", () => {
  const footerTag = source("src/components/Footer.astro").match(/<footer\b[^>]*>/)?.[0];
  assert.ok(footerTag);
  assert.doesNotMatch(footerTag, /\bborder-t(?:\s|["'])/);
});
