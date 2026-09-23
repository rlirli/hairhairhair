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

test("hairstyle filters expose kind and thresholded major and subtype options", () => {
  const markup = page("/hairstyles/");
  assert.match(markup, /data-hairstyle-filter="kind"/);
  assert.match(markup, /data-hairstyle-filter="hair-type"/);
  assert.match(markup, /data-default-label="Kind"/);
  assert.match(markup, /data-default-label="Hair type"/);
  assert.match(markup, /⌄/);
  assert.doesNotMatch(markup, /<select|>\s*Any\s*</);
  assert.match(markup, /border-b border-ink\/30/);
  assert.match(markup, /data-hairstyle-results role="status" aria-live="polite"/);
  assert.match(markup, /No hairstyles match these filters\./);

  for (const type of [...hairTypes, ...hairSubtypes]) {
    assert.match(markup, new RegExp(`value="${type.id}"`));
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

test("hairstyle filters follow accessible people filter behavior without reordering cards", () => {
  const source = readFileSync(join(root, "src/pages/hairstyles/index.astro"), "utf8");
  assert.match(source, /selected\.length === 1/);
  assert.match(source, /filters\.every\(/);
  assert.match(source, /selected\.some\(/);
  assert.match(source, /card\.classList\.toggle\("hidden", !matches\)/);
  assert.match(source, /filter\.addEventListener\("change", update\)/);
  assert.match(source, /if \(event\.key !== "Escape"\) return/);
  assert.match(source, /filter\.querySelector\("summary"\)\?\.focus\(\)/);
  assert.match(source, /filter\.contains\(event\.target\)/);
});
