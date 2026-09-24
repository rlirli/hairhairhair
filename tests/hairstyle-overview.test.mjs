import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { hairSubtypes, hairTypes } from "../src/data/hair-types.ts";
import { compatibleHairstylesForHairType } from "../src/data/hairstyle-compatibility.ts";
import { publishedHairstyles } from "../src/data/hairstyles.ts";
import { attrs, page, root } from "./helpers/site.mjs";

test("hairstyle overview keeps at least two columns across responsive sizes", () => {
  const markup = page("/hairstyles/");
  const gridClass = attrs(markup, "class").find(
    (className) =>
      className.includes("grid-cols-2") && className.includes("md:grid-cols-3") && className.includes("lg:grid-cols-4"),
  );

  assert.ok(gridClass, "expected a 2 → 3 → 4 column hairstyle grid");
  assert.doesNotMatch(gridClass, /(?:^|\s)(?:sm:|md:|lg:)?grid-cols-1(?:\s|$)/);
  for (const style of publishedHairstyles) {
    assert.match(markup, new RegExp(`href="/hairstyles/${style.slug}/"`));
  }
});

test("hairstyle filters expose kind and hierarchical major and subtype controls", () => {
  const markup = page("/hairstyles/");
  assert.match(markup, /data-slot="popover-trigger"/);
  assert.match(markup, /aria-label="Kind filter/);
  assert.match(markup, /aria-label="Hair type filter/);
  assert.match(markup, /aria-haspopup="dialog"/);
  assert.doesNotMatch(markup, /<select|>\s*Any\s*</);
  assert.match(markup, /border-b border-taupe/);
  assert.match(markup, /data-hairstyle-results role="status" aria-live="polite"/);
  assert.match(markup, /No hairstyles match these filters\./);

  for (const type of [...hairTypes, ...hairSubtypes]) {
    assert.ok(markup.includes(type.id), `expected filter data for ${type.code}`);
  }

  const cardMarkup = [...markup.matchAll(/<a\b[^>]*data-hairstyle-card[^>]*>/g)].map(([card]) => card);
  assert.equal(cardMarkup.length, publishedHairstyles.length);
  assert.deepEqual(
    cardMarkup.map((card) => card.match(/href="\/hairstyles\/([^/]+)\//)?.[1]),
    publishedHairstyles.map((style) => style.slug),
  );
  for (const [index, style] of publishedHairstyles.entries()) {
    const actualIds = cardMarkup[index].match(/data-hairstyle-hair-types="([^"]*)"/)?.[1].split(",") ?? [];
    const expectedIds = [...hairTypes, ...hairSubtypes]
      .filter((type) => compatibleHairstylesForHairType(type.id).some((item) => item.id === style.id))
      .map((type) => type.id);
    assert.deepEqual(actualIds, expectedIds, `${style.slug} compatibility options`);
  }
});

test("hairstyle filter controls are hydrated without changing catalogue order", () => {
  const markup = page("/hairstyles/");
  const pageSource = readFileSync(join(root, "src/pages/hairstyles/index.astro"), "utf8");
  assert.match(markup, /<astro-island[^>]+client="load"/);
  assert.match(pageSource, /children: hairSubtypes/);
  assert.match(pageSource, /subtype\.hairTypeId === type\.id/);

  const cardMarkup = [...markup.matchAll(/<a\b[^>]*data-hairstyle-card[^>]*>/g)].map(([card]) => card);
  assert.deepEqual(
    cardMarkup.map((card) => card.match(/href="\/hairstyles\/([^/]+)\//)?.[1]),
    publishedHairstyles.map((style) => style.slug),
  );
});
