import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import test from "node:test";

import { hairFamilies, hairTypes } from "../src/data/hair-types.ts";
import {
  getExamplesForHairstyle,
  getGuidanceForHairstyle,
  getHairstylesForFamily,
  hairstyles,
  patternGuidance,
  sources,
  styleExamples,
} from "../src/data/hairstyles.ts";

const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const read = (path) => readFileSync(join(root, path), "utf8");
const expectedMediaIds = [
  "taper-coily",
  "taper-wavy",
  "buzz-short",
  "buzz-textured",
  "twists-short",
  "twists-long",
  "flat-top-straight",
  "flat-top-coily",
];

function htmlFiles(directory = dist) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
  });
}

function routeFile(pathname) {
  const route = pathname.split("#")[0].split("?")[0].replace(/^\//, "").replace(/\/$/, "");
  if (!route) return join(dist, "index.html");
  return extname(route) ? join(dist, route) : join(dist, route, "index.html");
}

function page(pathname) {
  return readFileSync(routeFile(pathname), "utf8");
}
function attrs(markup, attribute) {
  return [...markup.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
}
function localUrl(value) {
  return value.startsWith("/") && !value.startsWith("//");
}

test("data records have unique stable ids and slugs", () => {
  for (const records of [hairTypes, hairFamilies, hairstyles, styleExamples, sources]) {
    assert.equal(new Set(records.map((record) => record.id)).size, records.length);
  }
  assert.equal(new Set(hairTypes.map((type) => type.slug)).size, hairTypes.length);
  assert.equal(new Set(hairstyles.map((style) => style.slug)).size, hairstyles.length);
  assert.equal(
    new Set(patternGuidance.map((row) => `${row.hairstyleId}:${row.hairFamilyId}`)).size,
    patternGuidance.length,
  );
});

test("relationship, source, example, and media references are closed and reciprocal", () => {
  const styleIds = new Set(hairstyles.map((style) => style.id));
  const familyIds = new Set(hairFamilies.map((family) => family.id));
  const sourceIds = new Set(sources.map((source) => source.id));
  const mediaIds = new Set(expectedMediaIds);
  for (const style of hairstyles) {
    for (const id of style.relatedStyleIds) {
      assert.ok(styleIds.has(id));
      assert.notEqual(id, style.id);
      assert.ok(hairstyles.find((item) => item.id === id).relatedStyleIds.includes(style.id));
    }
    for (const id of style.sourceIds) assert.ok(sourceIds.has(id));
    assert.equal(getExamplesForHairstyle(style.id).length, 2);
    for (const example of getExamplesForHairstyle(style.id)) {
      assert.ok(example.hairstyleIds.every((id) => styleIds.has(id)));
      assert.ok(mediaIds.has(example.imageId));
    }
  }
  for (const row of patternGuidance) {
    assert.ok(styleIds.has(row.hairstyleId));
    assert.ok(familyIds.has(row.hairFamilyId));
  }
});

test("each family has one row per guide in both directions", () => {
  const styleIds = hairstyles.map((style) => style.id).sort();
  for (const family of hairFamilies) {
    for (const style of hairstyles)
      assert.equal(getGuidanceForHairstyle(style.id).filter((row) => row.hairFamilyId === family.id).length, 1);
    assert.deepEqual(
      getHairstylesForFamily(family.id)
        .map((style) => style.id)
        .sort(),
      styleIds,
    );
  }
});

test("media declarations cover every approved generated asset", () => {
  const mediaSource = read("src/data/media.ts");
  const ids = expectedMediaIds;
  assert.deepEqual([...new Set(ids)].sort(), ids.slice().sort());
  for (const id of ids) {
    assert.match(mediaSource, new RegExp(`id: ["']${id}["']`));
    assert.ok(existsSync(join(root, `src/assets/hairstyles/${id}.png`)));
    assert.match(mediaSource, new RegExp(`id: ["']${id}["'][^]*?kind: ["']generated["']`));
  }
});

test("static build contains all data-derived expected HTML pages", () => {
  const expectedPageCount = 3 + hairFamilies.length + hairTypes.length + 1 + hairstyles.length + 2;
  assert.equal(htmlFiles().length, expectedPageCount);
  for (const path of ["/", "/hair-types/", "/hairstyles/", "/people/", "/people/will-smith/"])
    assert.ok(existsSync(routeFile(path)));
  assert.ok(existsSync(join(dist, "404.html")));
  for (const family of hairFamilies) assert.ok(existsSync(routeFile(`/hair-types/${family.slug}/`)));
  for (const type of hairTypes) assert.ok(existsSync(routeFile(`/hair-types/${type.slug}/`)));
  for (const style of hairstyles) assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/`)));
});

test("built HTML internal hrefs, fragments, and local src targets exist", () => {
  for (const file of htmlFiles()) {
    const markup = readFileSync(file, "utf8");
    for (const href of attrs(markup, "href").filter((href) => localUrl(href) || href.startsWith("#"))) {
      const [pathname, fragment] = href.split("#");
      const targetMarkup = href.startsWith("#") ? markup : page(pathname);
      if (pathname) assert.ok(existsSync(routeFile(pathname)), `${relative(dist, file)} -> ${href}`);
      if (fragment)
        assert.match(
          targetMarkup,
          new RegExp(`id="${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`),
          `${relative(dist, file)} -> ${href}`,
        );
    }
    for (const src of attrs(markup, "src").filter(localUrl))
      assert.ok(existsSync(join(dist, src.slice(1))), `${relative(dist, file)} -> ${src}`);
    for (const srcset of attrs(markup, "srcset")) {
      for (const candidate of srcset
        .split(",")
        .map((item) => item.trim().split(/\s+/)[0])
        .filter(localUrl))
        assert.ok(existsSync(join(dist, candidate.slice(1))), `${relative(dist, file)} srcset ${candidate}`);
    }
  }
});

test("style guides contain two responsive WebP examples, AI labels, and social metadata", () => {
  for (const style of hairstyles) {
    const markup = page(`/hairstyles/${style.slug}/`);
    assert.ok((markup.match(/<img\b/g) ?? []).length >= 3);
    assert.ok((markup.match(/AI-generated reference/g) ?? []).length >= 3);
    assert.ok((markup.match(/srcset=/g) ?? []).length >= 3);
    assert.ok((markup.match(/\.webp/g) ?? []).length >= 3);
    assert.match(markup, /Generated references show design details, not a real person or a diagnostic hair type/);
    assert.match(markup, /property="og:image"/);
    for (const relatedId of style.relatedStyleIds) {
      const related = hairstyles.find((item) => item.id === relatedId);
      assert.ok(related);
      assert.match(markup, new RegExp(`/hairstyles/${related.slug}/`), `${style.slug} links ${related.slug}`);
    }
    for (const family of hairFamilies)
      assert.match(markup, new RegExp(`/hair-types/${family.slug}/`), `${style.slug} links ${family.slug}`);
    for (const type of hairTypes)
      assert.match(markup, new RegExp(`/hair-types/${type.slug}/`), `${style.slug} links ${type.slug}`);
  }
});

test("family and subtype pages expose every hairstyle guide and expected subtype links", () => {
  for (const family of hairFamilies) {
    const markup = page(`/hair-types/${family.slug}/`);
    for (const style of hairstyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const type of hairTypes.filter((item) => item.family === family.family))
      assert.match(markup, new RegExp(`/hair-types/${type.slug}/`));
  }
  for (const type of hairTypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    for (const style of hairstyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
  }
});

test("home, hairstyle index, sitemap, canonical URLs, and social image targets are complete", () => {
  for (const style of hairstyles) {
    assert.match(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
    assert.match(page("/hairstyles/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  assert.equal((page("/hairstyles/").match(/AI-generated reference/g) ?? []).length, hairstyles.length);
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const path of [
    "/hairstyles/",
    ...hairstyles.map((style) => `/hairstyles/${style.slug}/`),
    "/people/",
    "/people/will-smith/",
    ...hairFamilies.map((family) => `/hair-types/${family.slug}/`),
    ...hairTypes.map((type) => `/hair-types/${type.slug}/`),
  ])
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  for (const file of htmlFiles()) {
    const markup = readFileSync(file, "utf8");
    const canonical = markup.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical);
    assert.match(canonical[1], /^https:\/\/hairhairhair\.hair\//);
    const social = markup.match(/property="og:image" content="([^"]+)"/);
    assert.ok(social);
    assert.ok(
      existsSync(join(dist, new URL(social[1]).pathname.slice(1))),
      `${relative(dist, file)} social image exists`,
    );
  }
});

test("flat-top is a complete guide with two examples and reciprocal links", () => {
  const flatTop = hairstyles.find((style) => style.slug === "flat-top");
  assert.ok(flatTop);
  assert.equal(getExamplesForHairstyle(flatTop.id).length, 2);
  assert.equal(getGuidanceForHairstyle(flatTop.id).length, hairFamilies.length);
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-buzz-cut"));
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-taper-fade"));
});
