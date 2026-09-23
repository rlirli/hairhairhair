import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import { getExamplesForHairstyle, publishedHairstyles } from "../src/data/hairstyles.ts";
import { appearancesForStyle } from "../src/data/people-relations.ts";
import { page, routeFile } from "./helpers/site.mjs";

test("published hairstyle detail routes provide the requested previews and full collections", () => {
  for (const style of publishedHairstyles) {
    const detail = page(`/hairstyles/${style.slug}/`);
    const examples = page(`/hairstyles/${style.slug}/examples/`);
    const appearances = page(`/hairstyles/${style.slug}/appearances/`);

    assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/examples/`)));
    assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/appearances/`)));
    assert.match(detail, />Examples</);
    assert.match(detail, /Worn by celebs/);
    assert.ok(detail.indexOf("Worn by celebs") < detail.indexOf("Variations"));
    assert.match(detail, new RegExp(`href="/hairstyles/${style.slug}/examples/">More</a>`));
    assert.match(detail, new RegExp(`href="/hairstyles/${style.slug}/appearances/">More</a>`));

    const previewGallery = detail.split(">Examples</")[1].split("Worn by celebs")[0];
    assert.equal(
      (previewGallery.match(/<figure>/g) ?? []).length,
      Math.min(4, getExamplesForHairstyle(style.id).length),
    );
    assert.doesNotMatch(previewGallery, /More\s*↗/);

    const hero = detail.split("<h1")[1].split(">Examples</")[0];
    assert.doesNotMatch(hero, /figcaption|<title>|Photographic reference/);

    const appearancePreview = detail.split("Worn by celebs")[1].split("Variations")[0];
    assert.ok((appearancePreview.match(/<article\b/g) ?? []).length <= 6);
    assert.equal((appearancePreview.match(/<img\b/g) ?? []).length, Math.min(6, appearancesForStyle(style.id).length));
    if (appearancesForStyle(style.id).length) assert.match(appearancePreview, /<img\b/);

    assert.match(examples, new RegExp(`${style.name} examples`));
    assert.equal((examples.match(/<figure>/g) ?? []).length, getExamplesForHairstyle(style.id).length);
    assert.match(appearances, new RegExp(`${style.name} worn by celebs`));
    if (appearancesForStyle(style.id).length) assert.match(appearances, /<img\b/);
    assert.doesNotMatch(appearances, /<img\b[^>]*class="[^"]*rounded-/);

    assert.doesNotMatch(detail, /Data sheet|Pattern guidance|Related guides/);
    assert.match(detail, /Sources reviewed/);
  }
});
