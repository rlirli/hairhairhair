import assert from "node:assert/strict";
import test from "node:test";

import { hairSubtypes, hairTypes } from "../src/data/hair-types.ts";
import { compatibilityForHairstyle } from "../src/data/hairstyle-compatibility.ts";
import { publishedHairstyles, sources } from "../src/data/hairstyles.ts";
import { page } from "./helpers/site.mjs";

const orderedSubtypes = hairTypes.flatMap((hairType) =>
  hairSubtypes
    .filter((subtype) => subtype.hairTypeId === hairType.id)
    .sort((left, right) => left.sortOrder - right.sortOrder),
);

test("hairstyle fact sheets render resolved subtype estimates without implying suitability", () => {
  for (const style of publishedHairstyles) {
    const detail = page(`/hairstyles/${style.slug}/`);
    const factSheet = detail.split(">Style notes</h2>")[1]?.split("</section>")[0];

    assert.ok(factSheet, `${style.name} has a fact sheet in its detail header`);
    assert.equal((factSheet.match(/data-hairstyle-compatibility=/g) ?? []).length, orderedSubtypes.length);
    assert.equal((factSheet.match(/href="\/hair-types\/[^/]+\/" aria-label="Type [1-4]"/g) ?? []).length, 4);

    const renderedSubtypeIds = [...factSheet.matchAll(/data-hairstyle-compatibility="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(
      renderedSubtypeIds,
      orderedSubtypes.map((subtype) => subtype.id),
      `${style.name} shows all subtype marks in major-type and A/B/C order`,
    );

    for (const subtype of orderedSubtypes) {
      const segment = factSheet.match(new RegExp(`<div[^>]*data-hairstyle-compatibility="${subtype.id}"[^>]*>`))?.[0];
      assert.ok(segment, `${style.name} has a mark for ${subtype.code}`);

      const score = compatibilityForHairstyle(style.id, subtype.id)?.score ?? null;
      assert.match(segment, new RegExp(`data-score="${score === null ? "unknown" : score}"`));
      if (score === null) {
        assert.match(segment, /role="img"/);
        assert.match(segment, new RegExp(`aria-label="Type ${subtype.code}: compatibility estimate unknown"`));
        assert.doesNotMatch(segment, /aria-valuenow=/);
      } else {
        assert.match(segment, /role="meter"/);
        assert.match(segment, new RegExp(`aria-valuenow="${score}"`));
        assert.match(
          segment,
          new RegExp(`aria-label="Type ${subtype.code}: editorial compatibility estimate ${score}"`),
        );
      }
    }

    assert.match(factSheet, /Fill intensity is an editorial estimate/);
    assert.match(factSheet, /not suitability/);
    assert.match(factSheet, /not promises/);

    if (style.inventedAt) {
      assert.match(factSheet, /Origin date/);
      const source = sources.find((item) => item.id === style.inventedAt.sourceId);
      if (source) assert.ok(factSheet.includes(`href="${source.url}"`));
    } else {
      assert.doesNotMatch(factSheet, /Origin date/);
    }
    if (style.inventor) {
      assert.match(factSheet, new RegExp(style.inventor.name));
      const source = sources.find((item) => item.id === style.inventor.sourceId);
      if (source) assert.ok(factSheet.includes(`href="${source.url}"`));
    } else assert.doesNotMatch(factSheet, /Inventor/);
  }
});
