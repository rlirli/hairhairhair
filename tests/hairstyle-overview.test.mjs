import assert from "node:assert/strict";
import test from "node:test";

import { publishedHairstyles } from "../src/data/hairstyles.ts";
import { attrs, page } from "./helpers/site.mjs";

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
