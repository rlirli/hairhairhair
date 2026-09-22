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
import {
  attrs,
  builtHtmlRoutes,
  dist,
  htmlFiles,
  localUrl,
  page,
  publicRoutes,
  root,
  routeFile,
} from "./helpers/site.mjs";

const hairstyleAssetIds = readdirSync(join(root, "src/assets/hairstyles"))
  .filter((fileName) => extname(fileName) === ".png")
  .map((fileName) => fileName.slice(0, -extname(fileName).length))
  .sort();

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
  const mediaIds = new Set(hairstyleAssetIds);
  for (const style of hairstyles) {
    for (const id of style.relatedStyleIds) {
      assert.ok(styleIds.has(id));
      assert.notEqual(id, style.id);
      assert.ok(hairstyles.find((item) => item.id === id).relatedStyleIds.includes(style.id));
    }
    for (const id of style.sourceIds) assert.ok(sourceIds.has(id));
    if (isPublishedGuide(style)) assert.ok(getExamplesForHairstyle(style.id).length >= 1);
    for (const example of getExamplesForHairstyle(style.id)) {
      assert.ok(example.hairstyleIds.every((id) => styleIds.has(id)));
      assert.ok(mediaIds.has(example.imageId));
    }
    for (const origin of [style.inventedAt, style.inventor].filter(Boolean)) {
      assert.ok(sourceIds.has(origin.sourceId));
      assert.ok(style.sourceIds.includes(origin.sourceId));
    }
  }
  for (const row of patternGuidance) {
    assert.ok(styleIds.has(row.hairstyleId));
    assert.ok(hairTypeIds.has(row.hairTypeId));
  }
});

test("published hairstyle guidance is sparse and query results derive from its rows", () => {
  for (const style of publishedHairstyles) assert.ok(getGuidanceForHairstyle(style.id).length >= 1);

  for (const hairType of hairTypes) {
    const expectedStyleIds = patternGuidance
      .filter((row) => row.hairTypeId === hairType.id)
      .map((row) => row.hairstyleId)
      .filter((styleId) => publishedHairstyles.some((style) => style.id === styleId))
      .sort();
    assert.deepEqual(
      getPublishedHairstylesForHairType(hairType.id)
        .map((style) => style.id)
        .sort(),
      expectedStyleIds,
    );
  }
});

test("style examples and hairstyle assets stay in one-to-one correspondence", () => {
  const exampleMediaIds = styleExamples.map((example) => example.imageId).sort();
  assert.deepEqual(exampleMediaIds, hairstyleAssetIds);
});

test("static build contains all data-derived expected HTML pages", () => {
  const expectedRoutes = [...publicRoutes(), "/404.html"].sort();
  assert.equal(new Set(expectedRoutes).size, expectedRoutes.length);
  assert.deepEqual(builtHtmlRoutes().sort(), expectedRoutes);
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

test("style guides contain responsive imagery, sparse hair-type links, and social metadata", () => {
  for (const style of publishedHairstyles) {
    const markup = page(`/hairstyles/${style.slug}/`);
    assert.ok((markup.match(/<img\b/g) ?? []).length >= 2);
    assert.doesNotMatch(markup, /AI-generated reference/);
    assert.ok((markup.match(/srcset=/g) ?? []).length >= 2);
    assert.ok((markup.match(/\.webp/g) ?? []).length >= 2);
    assert.match(markup, /property="og:image"/);
    for (const relatedId of style.relatedStyleIds) {
      const related = hairstyles.find((item) => item.id === relatedId);
      assert.ok(related);
      if (related.guidePublicationStatus === "published")
        assert.match(markup, new RegExp(`/hairstyles/${related.slug}/`), `${style.slug} links ${related.slug}`);
      else assert.doesNotMatch(markup, new RegExp(`/hairstyles/${related.slug}/`));
    }
    const guidanceTypeIds = new Set(getGuidanceForHairstyle(style.id).map((row) => row.hairTypeId));
    for (const hairType of hairTypes) {
      const assertion = guidanceTypeIds.has(hairType.id) ? assert.match : assert.doesNotMatch;
      assertion(markup, new RegExp(`/hair-types/${hairType.slug}/`), `${style.slug} hair type ${hairType.slug}`);
      for (const subtype of hairSubtypes.filter((item) => item.hairTypeId === hairType.id))
        assertion(markup, new RegExp(`/hair-types/${subtype.slug}/`), `${style.slug} subtype ${subtype.slug}`);
    }
  }
});

test("hair type and sub-type pages expose only styles associated by guidance", () => {
  for (const hairType of hairTypes) {
    const markup = page(`/hair-types/${hairType.slug}/`);
    const expectedStyles = getPublishedHairstylesForHairType(hairType.id).slice(0, 5);
    for (const style of expectedStyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const style of publishedHairstyles.filter((item) => !expectedStyles.includes(item)))
      assert.doesNotMatch(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const type of hairSubtypes.filter((item) => item.pattern === hairType.pattern))
      assert.match(markup, new RegExp(`/hair-types/${type.slug}/`));
  }
  for (const type of hairSubtypes) {
    const markup = page(`/hair-types/${type.slug}/`);
    const expectedStyles = getPublishedHairstylesForHairType(type.hairTypeId);
    for (const style of expectedStyles.slice(0, 5)) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const style of publishedHairstyles.filter((item) => !expectedStyles.includes(item)))
      assert.doesNotMatch(markup, new RegExp(`/hairstyles/${style.slug}/`));
  }
});

test("hair-type pages use a compact, five-card hairstyle preview with a more link", () => {
  for (const type of [...hairTypes, ...hairSubtypes]) {
    const markup = page(`/hair-types/${type.slug}/`);
    const relatedStyles = getPublishedHairstylesForHairType(hairTypes.includes(type) ? type.id : type.hairTypeId);
    assert.match(markup, /Hairstyles for this type/i);
    assert.match(markup, /font-normal[^\"]*text-ink\/60/);
    assert.doesNotMatch(markup, /More →/);
    assert.match(markup, /data-slot="hover-card-trigger"/);
    assert.match(markup, new RegExp(`href="/hair-types/${type.slug}/hairstyles/"`));
    assert.equal((markup.match(/data-slot="hover-card-trigger"/g) ?? []).length, Math.min(5, relatedStyles.length));
    assert.doesNotMatch(markup, /Pattern is one part of the picture|not a guaranteed result/i);
    assert.doesNotMatch(markup, /Pattern illustration/);
  }
});

test("hair-type hairstyle pages use a four-column grid with medium cards", () => {
  for (const type of [...hairTypes, ...hairSubtypes]) {
    const markup = page(`/hair-types/${type.slug}/hairstyles/`);
    assert.match(markup, /Hairstyle guides/);
    assert.match(markup, new RegExp(`Type ${type.code}`));
    assert.match(markup, /data-slot="hover-card-trigger"/);
    assert.match(markup, /grid-cols-2[^\"]*md:grid-cols-3[^\"]*lg:grid-cols-4/);
    const expectedStyles = getPublishedHairstylesForHairType(hairTypes.includes(type) ? type.id : type.hairTypeId);
    for (const style of expectedStyles) assert.match(markup, new RegExp(`/hairstyles/${style.slug}/`));
    for (const style of publishedHairstyles.filter((item) => !expectedStyles.includes(item)))
      assert.doesNotMatch(markup, new RegExp(`/hairstyles/${style.slug}/`));
  }
});

test("home, hairstyle index, sitemap, canonical URLs, and social image targets are complete", () => {
  for (const style of publishedHairstyles.slice(0, 4)) {
    assert.match(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  for (const style of publishedHairstyles) {
    assert.match(page("/hairstyles/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  for (const style of publishedHairstyles.slice(4))
    assert.doesNotMatch(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
  for (const style of hairstyles.filter((style) => style.guidePublicationStatus === "draft")) {
    assert.doesNotMatch(page("/"), new RegExp(`/hairstyles/${style.slug}/`));
    assert.doesNotMatch(page("/hairstyles/"), new RegExp(`/hairstyles/${style.slug}/`));
  }
  assert.doesNotMatch(page("/hairstyles/"), /AI-generated reference/);
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/hairhairhair\.hair([^<]*)<\/loc>/g)].map(
    (match) => match[1] || "/",
  );
  assert.deepEqual(sitemapRoutes.sort(), publicRoutes().sort());
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

test("home limits visual hairstyle discovery and presents concise celebrity links", () => {
  const markup = page("/");

  assert.equal((markup.match(/data-slot="hover-card-trigger"/g) ?? []).length, Math.min(4, publishedHairstyles.length));
  assert.match(markup, /Get inspired/i);
  assert.match(markup, /A look at the record/);
  assert.match(markup, /Browse celebrities who share your hair type or skin tone/);
  assert.match(markup, /href="\/people\/"[^>]*>\s*Browse all celebs/);
  assert.doesNotMatch(markup, /People and appearances|Explore Will Smith|Explore Mario Balotelli/);
});

test("home introduces four numbered hair types without family labels", () => {
  const markup = page("/");
  assert.match(markup, /Natural hair/i);
  assert.match(markup, /The four hair types/);
  assert.match(markup, /lettered sub-types/);
  assert.doesNotMatch(markup, /The four families|Family [1-4]/);
  for (const hairType of hairTypes) assert.match(markup, new RegExp(`Type ${hairType.code}:`));
});

test("flat-top keeps its broad guidance and reciprocal links", () => {
  const flatTop = hairstyles.find((style) => style.slug === "flat-top");
  assert.ok(flatTop);
  assert.deepEqual(
    getGuidanceForHairstyle(flatTop.id).map((row) => row.hairTypeId),
    hairTypes.map((hairType) => hairType.id),
  );
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-buzz-cut"));
  assert.ok(flatTop.relatedStyleIds.includes("hairstyle-taper-fade"));
});

test("Balotelli-inspired guides are complete, distinct, and published", () => {
  for (const slug of ["patterned-mohawk", "thin-mohawk", "cropped-afro", "top-knot"]) {
    const style = hairstyles.find((item) => item.slug === slug);
    assert.ok(style);
    assert.equal(style.guidePublicationStatus, "published");
    for (const relatedId of style.relatedStyleIds)
      assert.ok(hairstyles.find((item) => item.id === relatedId)?.relatedStyleIds.includes(style.id));
  }
  assert.deepEqual(
    getGuidanceForHairstyle("hairstyle-cropped-afro").map((row) => row.hairTypeId),
    ["hair-type-4"],
  );
});
