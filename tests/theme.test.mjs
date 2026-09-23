import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url).pathname;
const source = (path) => readFileSync(`${root}${path}`, "utf8");

test("the icon theme menu lives beside the footer wordmark and offers all three choices", () => {
  const footer = source("src/components/Footer.astro");
  const header = source("src/components/Header.astro");

  assert.match(footer, /class="theme-menu relative"/);
  assert.match(footer, /data-theme-value="system"/);
  assert.match(footer, /data-theme-value="light"/);
  assert.match(footer, /data-theme-value="dark"/);
  assert.match(footer, /aria-pressed/);
  assert.match(footer, /window\.hairhairhairTheme/);
  assert.doesNotMatch(footer, /localStorage|prefers-color-scheme|onSystemThemeChange/);
  assert.doesNotMatch(footer, /Built for curiosity/);
  assert.doesNotMatch(header, /Choose color theme|Toggle dark mode/);
});

test("the footer wordmark links home and exposes the shared visible focus treatment", () => {
  const footer = source("src/components/Footer.astro");

  assert.match(footer, /<a href="\/" class="focus-ring font-black">[\s\S]*?hair[\s\S]*?<\/a>/);
});

test("primary navigation stays on one row and collapses behind an accessible menu", () => {
  const header = source("src/components/Header.astro");

  assert.doesNotMatch(header, />\s*About\s*</);
  assert.doesNotMatch(header, /flex-wrap/);
  assert.match(header, /id="primary-menu-toggle"/);
  assert.match(header, /aria-controls="primary-menu"/);
  assert.match(header, /aria-expanded="false"/);
  assert.match(header, /@container \(max-width: 41rem\)/);
  assert.match(header, /event\.key === "Escape"/);
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
