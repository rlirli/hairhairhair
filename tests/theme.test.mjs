import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url).pathname;
const source = (path) => readFileSync(`${root}${path}`, "utf8");

test("theme control lives in the footer and offers system, light, and dark choices", () => {
  const footer = source("src/components/Footer.astro");
  const header = source("src/components/Header.astro");

  assert.match(footer, /id="theme-choice"/);
  assert.match(footer, /value="system">System/);
  assert.match(footer, /value="light">Light/);
  assert.match(footer, /value="dark">Dark/);
  assert.match(footer, /window\.hairhairhairTheme/);
  assert.doesNotMatch(footer, /localStorage|prefers-color-scheme|onSystemThemeChange/);
  assert.doesNotMatch(header, /theme-toggle|Choose theme|Toggle dark mode/);
});

test("the initial theme script defaults to system and applies before first paint", () => {
  const layout = source("src/components/Layout.astro");

  assert.match(layout, /themes = new Set\(\["system", "light", "dark"\]\)/);
  assert.match(layout, /: "system"/);
  assert.match(layout, /root\.classList\.toggle\("dark", dark\)/);
  assert.match(layout, /root\.dataset\.theme = preference/);
  assert.match(layout, /<script is:inline>/);
  assert.match(layout, /window\.hairhairhairTheme = controller/);
  assert.match(layout, /localStorage\.setItem\(storageKey, preference\)/);
  assert.match(layout, /onSystemThemeChange/);
});

test("dark utility classes follow the page theme instead of the operating-system preference", () => {
  const styles = source("src/styles/global.css");

  assert.match(styles, /@custom-variant dark \(&:where\(\.dark, \.dark \*\)\);/);
});
