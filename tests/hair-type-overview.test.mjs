import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url).pathname;
const source = readFileSync(`${root}src/pages/hair-types/index.astro`, "utf8");
const markup = readFileSync(`${root}dist/hair-types/index.html`, "utf8");

test("hair chart introduction explains the system and purpose without redundant copy", () => {
  assert.match(markup, /The hair chart/i);
  assert.match(markup, /Identify your Hair Type/);
  assert.match(markup, /Andre Walker Hair Typing System/);
  assert.match(markup, /find hairstyles and celebrity inspiration/);
  assert.match(markup, /three lettered subtypes/);
  assert.doesNotMatch(markup, /A quick overview|The 12 patterns/i);
  assert.doesNotMatch(source, /diagnosis|rulebook/i);
});

test("shape visualizers lead directly into the type comparison at the medium breakpoint", () => {
  assert.match(markup, /Compare by shape/i);
  assert.match(markup, /All four types, at a glance/);
  assert.equal(markup.match(/aria-label="[1-4][A-C]: [^"]+"/g)?.length, 12);

  const responsiveGrids = source.match(/grid grid-cols-2 [^"]*md:grid-cols-4[^"]*/g) ?? [];
  assert.equal(responsiveGrids.length, 2);
  assert.ok(source.indexOf("<HairStrand") < source.indexOf('class="type-main'));
  assert.doesNotMatch(source, /grid grid-cols-2 [^"]*(?:sm|lg|xl):grid-cols-[34]/);
});
