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
    const relatedArchive = page(`/hairstyles/${style.slug}/related-hairstyles/`);

    assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/examples/`)));
    assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/appearances/`)));
    assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/related-hairstyles/`)));
    assert.match(detail, />Examples</);
    assert.match(detail, new RegExp(`href="/hairstyles/${style.slug}/examples/">More</a>`));

    const previewGallery = detail.split(">Examples</")[1].split("Worn by celebs")[0];
    assert.equal(
      (previewGallery.match(/<figure>/g) ?? []).length,
      Math.min(4, getExamplesForHairstyle(style.id).length),
    );
    assert.doesNotMatch(previewGallery, /More\s*↗/);

    const hero = detail.split("<h1")[1].split(">Examples</")[0];
    assert.doesNotMatch(hero, /figcaption|<title>|Photographic reference/);

    const appearanceCount = appearancesForStyle(style.id).length;
    if (appearanceCount) {
      assert.match(detail, /Worn by celebs/);
      assert.ok(detail.indexOf("Worn by celebs") < detail.indexOf("Variations"));
      assert.match(detail, new RegExp(`href="/hairstyles/${style.slug}/appearances/">More</a>`));
      const appearancePreview = detail.split("Worn by celebs")[1].split("Variations")[0];
      assert.ok((appearancePreview.match(/<article\b/g) ?? []).length <= 6);
      assert.equal((appearancePreview.match(/<img\b/g) ?? []).length, Math.min(6, appearanceCount));
      assert.match(appearancePreview, /<time\b[^>]*datetime="\d{4}-\d{2}-\d{2}"[^>]*data-local-date/);
      assert.match(appearancePreview, /text-ink\/60/);
    } else {
      assert.doesNotMatch(detail, /Worn by celebs|No dated appearance photographs/);
    }

    const relatedStyles = style.relatedStyleIds
      .map((id) => publishedHairstyles.find((candidate) => candidate.id === id))
      .filter(Boolean);
    assert.match(relatedArchive, new RegExp(`${style.name} related hairstyles`));
    if (relatedStyles.length) {
      assert.match(detail, new RegExp(`href="/hairstyles/${style.slug}/related-hairstyles/">More</a>`));
      const relatedPreview = detail.split("Related Hairstyles")[1].split("Sources reviewed")[0];
      assert.equal(
        (relatedPreview.match(/data-slot="hover-card-trigger"/g) ?? []).length,
        Math.min(6, relatedStyles.length),
      );
      assert.doesNotMatch(relatedPreview, /<p class="mt-2 text-sm leading-5/);
      assert.equal((relatedArchive.match(/data-slot="hover-card-trigger"/g) ?? []).length, relatedStyles.length);
    } else {
      assert.doesNotMatch(detail, /Related Hairstyles|related-hairstyles/);
      assert.match(relatedArchive, /No related hairstyles are currently listed/);
    }

    assert.match(examples, new RegExp(`${style.name} examples`));
    assert.equal((examples.match(/<figure>/g) ?? []).length, getExamplesForHairstyle(style.id).length);
    assert.match(appearances, new RegExp(`${style.name} worn by celebs`));
    assert.doesNotMatch(
      appearances,
      /Dated appearance photographs where this style has been visually documented|Each record is a moment in time, not a definition of the style/,
    );
    if (appearanceCount) {
      assert.match(appearances, /<time\b[^>]*datetime="\d{4}-\d{2}-\d{2}"[^>]*data-local-date/);
      assert.match(appearances, /text-ink\/60/);
    }
    if (appearancesForStyle(style.id).length) assert.match(appearances, /<img\b/);
    assert.doesNotMatch(appearances, /<img\b[^>]*class="[^"]*rounded-/);

    assert.doesNotMatch(detail, /Data sheet|Pattern guidance|Related guides/);
    assert.match(detail, /Sources reviewed/);
  }
});
