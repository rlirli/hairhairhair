import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import test from "node:test";

import { hairSubtypes, hairTypes } from "../src/data/hair-types.ts";
import {
  getExamplesForHairstyle,
  getGuidanceForHairstyle,
  getPublishedHairstylesForHairType,
  hairstyles,
  isPublishedGuide,
  patternGuidance,
  publishedHairstyles,
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
  for (const records of [hairSubtypes, hairTypes, hairstyles, styleExamples, sources]) {
    assert.equal(new Set(records.map((record) => record.id)).size, records.length);
  }
  assert.equal(new Set(hairSubtypes.map((type) => type.slug)).size, hairSubtypes.length);
  assert.equal(new Set(hairstyles.map((style) => style.slug)).size, hairstyles.length);
  assert.equal(
    new Set(patternGuidance.map((row) => `${row.hairstyleId}:${row.hairTypeId}`)).size,
    patternGuidance.length,
  );
});

test("published hairstyle guides are derived from guide publication status", () => {
  assert.deepEqual(
    publishedHairstyles,
    hairstyles.filter((style) => style.guidePublicationStatus === "published"),
  );
  assert.ok(hairstyles.every((style) => ["draft", "published"].includes(style.guidePublicationStatus)));
  assert.equal(isPublishedGuide({ guidePublicationStatus: "published" }), true);
  assert.equal(isPublishedGuide({ guidePublicationStatus: "draft" }), false);
});

test("relationship, source, example, and media references are closed and reciprocal", () => {
  const styleIds = new Set(hairstyles.map((style) => style.id));
  const hairTypeIds = new Set(hairTypes.map((hairType) => hairType.id));
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
    assert.ok(hairTypeIds.has(row.hairTypeId));
  }
});

test("each hair type has one row per guide in both directions", () => {
  const publishedStyleIds = publishedHairstyles.map((style) => style.id).sort();
  for (const hairType of hairTypes) {
    for (const style of hairstyles)
      assert.equal(getGuidanceForHairstyle(style.id).filter((row) => row.hairTypeId === hairType.id).length, 1);
    assert.deepEqual(
      getPublishedHairstylesForHairType(hairType.id)
        .map((style) => style.id)
        .sort(),
      publishedStyleIds,
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
  const expectedPageCount = 3 + hairTypes.length + hairSubtypes.length * 2 + 1 + publishedHairstyles.length + 2;
  assert.equal(htmlFiles().length, expectedPageCount);
  for (const path of ["/", "/hair-types/", "/hairstyles/", "/people/", "/people/will-smith/"])
    assert.ok(existsSync(routeFile(path)));
  assert.ok(existsSync(join(dist, "404.html")));
  for (const hairType of hairTypes) assert.ok(existsSync(routeFile(`/hair-types/${hairType.slug}/`)));
  for (const type of hairSubtypes) assert.ok(existsSync(routeFile(`/hair-types/${type.slug}/`)));
  for (const type of hairSubtypes) assert.ok(existsSync(routeFile(`/hair-types/${type.slug}/related-hairstyles/`)));
  for (const style of publishedHairstyles) assert.ok(existsSync(routeFile(`/hairstyles/${style.slug}/`)));
  for (const style of hairstyles.filter((style) => style.guidePublicationStatus === "draft"))
    assert.ok(!existsSync(routeFile(`/hairstyles/${style.slug}/`)));
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

test("style guides contain two responsive WebP examples and social metadata", () => {
  for (const style of publishedHairstyles) {
    const markup = page(`/hairstyles/${style.slug}/`);
    assert.ok((markup.match(/<img\b/g) ?? []).length >= 3);
    assert.doesNotMatch(markup, /AI-generated reference/);
    assert.ok((markup.match(/srcset=/g) ?? []).length >= 3);
    assert.ok((markup.match(/\.webp/g) ?? []).length >= 3);
    assert.match(markup, /property="og:image"/);
    for (const relatedId of style.relatedStyleIds) {
      const related = hairstyles.find((item) => item.id === relatedId);
      assert.ok(related);
      if (related.guidePublicationStatus === "published")
        assert.match(markup, new RegExp(`/hairstyles/${related.slug}/`), `${style.slug} links ${related.slug}`);
      else assert.doesNotMatch(markup, new RegExp(`/hairstyles/${related.slug}/`));
    }
    for (const hairType of hairTypes)
      assert.match(markup, new RegExp(`/hair-types/${hairType.slug}/`), `${style.slug} links ${hairType.slug}`);
    for (const type of hairSubtypes)
      assert.match(markup, new RegExp(`/hair-types/${type.slug}/`), `${style.slug} links ${type.slug}`);
  }
});

test("hair type and sub-type pages expose every hairstyle guide and expected subtype links", () => {
  for (const hairType of hairTypes) {
    const markup = page(`/hair-types/${hairType.slug}/`);
    for (const style of publishedHairstyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const type of hairSubtypes.filter((item) => item.pattern === hairType.pattern))
      assert.match(markup, new RegExp(`/hair-types/${type.slug}/`));
  }
  for (const type of hairSubtypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    for (const style of publishedHairstyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
  }
});

test("hair-type pages use a compact, five-column hairstyle overview with hover details and a more link", () => {
  for (const type of hairSubtypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    assert.match(markup, /Hairstyles for this type/i);
    assert.match(markup, /lg:grid-cols-5/);
    assert.match(markup, /grid-flow-col/);
    assert.match(markup, /overflow-x-auto/);
    assert.match(markup, /data-slot="hover-card-trigger"/);
    assert.match(markup, new RegExp(`href="/hair-types/${type.slug}/related-hairstyles/"`));
  }
});

test("related hairstyle pages use a four-column grid with medium cards and hover details", () => {
  for (const type of hairSubtypes) {
    const markup = page(`/hair-types/${type.slug}/related-hairstyles/`);
    const parentType = hairTypes.find((item) => item.pattern === type.pattern);
    assert.ok(parentType);
    assert.match(markup, /Hairstyles for/);
    assert.match(markup, new RegExp(`Hair Type ${type.code}`));
    assert.match(markup, /lg:grid-cols-4/);
    assert.match(markup, /data-slot="hover-card-trigger"/);
    for (const style of getPublishedHairstylesForHairType(parentType.id))
      assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
  }
});

test("home, hairstyle index, sitemap, canonical URLs, and social image targets are complete", () => {
  for (const style of publishedHairstyles) {
    assert.match(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
    assert.match(page("/hairstyles/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  for (const style of hairstyles.filter((style) => style.guidePublicationStatus === "draft")) {
    assert.doesNotMatch(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
    assert.doesNotMatch(page("/hairstyles/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  assert.doesNotMatch(page("/hairstyles/"), /AI-generated reference/);
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const path of [
    "/hairstyles/",
    ...publishedHairstyles.map((style) => `/hairstyles/${style.slug}/`),
    "/people/",
    "/people/will-smith/",
    ...hairTypes.map((hairType) => `/hair-types/${hairType.slug}/`),
    ...hairSubtypes.map((type) => `/hair-types/${type.slug}/`),
    ...hairSubtypes.map((type) => `/hair-types/${type.slug}/related-hairstyles/`),
  ])
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  for (const style of hairstyles.filter((style) => style.guidePublicationStatus === "draft"))
    assert.doesNotMatch(sitemap, new RegExp(`/hairstyles/${style.slug}/`));
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

test("home introduces four numbered hair types without family labels", () => {
  const markup = page("/");
  assert.match(markup, /Natural hair/i);
  assert.match(markup, /The four hair types/);
  assert.match(markup, /lettered sub-types/);
  assert.doesNotMatch(markup, /The four families|Family [1-4]/);
  for (const hairType of hairTypes) assert.match(markup, new RegExp(`Type ${hairType.code}:`));
});

test("flat-top is a complete guide with two examples and reciprocal links", () => {
  const flatTop = hairstyles.find((style) => style.slug === "flat-top");
  assert.ok(flatTop);
  assert.equal(getExamplesForHairstyle(flatTop.id).length, 2);
  assert.equal(getGuidanceForHairstyle(flatTop.id).length, hairTypes.length);
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-buzz-cut"));
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-taper-fade"));
});
