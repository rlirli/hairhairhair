import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import { getExamplesForHairstyle, publishedHairstyles } from "../src/data/hairstyles.ts";
import { page, routeFile } from "./helpers/site.mjs";

test("style examples have linked cards and individual routes with hairstyle and archive links", () => {
  for (const style of publishedHairstyles) {
    const detail = page(`/hairstyles/${style.slug}/`);
    const archive = page(`/hairstyles/${style.slug}/examples/`);
    const examples = getExamplesForHairstyle(style.id);

    for (const example of examples) {
      const path = `/hairstyles/${style.slug}/examples/${example.id}/`;
      assert.ok(existsSync(routeFile(path)), `missing ${path}`);
      assert.match(detail, new RegExp(`href="${path}"`));
      assert.match(archive, new RegExp(`href="${path}"`));

      const pageHtml = page(path);
      assert.match(pageHtml, new RegExp(`<h1[^>]*>${example.title}</h1>`));
      assert.match(
        pageHtml,
        new RegExp(`<h2[^>]*><a class="focus-ring" href="/hairstyles/${style.slug}/">${style.name}</a></h2>`),
      );
      assert.doesNotMatch(pageHtml, /<h2[^>]*><a[^>]*text-orange[^>]*>/);
      assert.match(pageHtml, new RegExp(`href="/hairstyles/${style.slug}/examples/"`));
    }
  }
});

test("style example cards pair a square image with a height-matched description", () => {
  const archive = page(`/hairstyles/${publishedHairstyles[0].slug}/examples/`);
  const [example] = getExamplesForHairstyle(publishedHairstyles[0].id);
  assert.match(archive, /grid-cols-\[minmax\(0,1fr\)_minmax\(0,1fr\)\]/);
  assert.match(archive, /aspect-square/);
  assert.match(archive, /items-stretch/);
  assert.match(archive, /style-example-copy aspect-square/);
  assert.match(archive, /rounded-3xl border-2 border-ink p-3/);
  assert.match(archive, /rounded-2xl object-cover/);
  assert.ok(archive.includes(`${example.caption} ${example.patternDescription} ${example.lengthDescription}`));
  assert.doesNotMatch(archive, /-webkit-line-clamp:\s*2/);
});
