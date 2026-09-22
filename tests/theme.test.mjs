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
  assert.match(footer, /localStorage\.setItem\("hairhairhair-theme", theme\)/);
  assert.match(footer, /prefers-color-scheme: dark/);
  assert.match(footer, /onSystemThemeChange/);
  assert.doesNotMatch(header, /theme-toggle|Choose theme|Toggle dark mode/);
});

test("the initial theme script defaults to system and applies before first paint", () => {
  const layout = source("src/components/Layout.astro");

  assert.match(layout, /saved === "light" \|\| saved === "dark" \|\| saved === "system"/);
  assert.match(layout, /: "system"/);
  assert.match(layout, /document\.documentElement\.classList\.toggle\("dark", dark\)/);
  assert.match(layout, /document\.documentElement\.dataset\.theme = theme/);
  assert.match(layout, /<script is:inline>/);
});

test("dark utility classes follow the page theme instead of the operating-system preference", () => {
  const styles = source("src/styles/global.css");

  assert.match(styles, /@custom-variant dark \(&:where\(\.dark, \.dark \*\)\);/);
});
