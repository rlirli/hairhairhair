import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { hairstyles } from "../src/data/hairstyles.ts";
import { appearances, people, personPhotographs } from "../src/data/people.ts";

const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const routeFile = (pathname) => {
  const route = pathname.split("#")[0].split("?")[0].replace(/^\//, "").replace(/\/$/, "");
  return route ? join(dist, route, "index.html") : join(dist, "index.html");
};
const page = (pathname) => readFileSync(routeFile(pathname), "utf8");
const readSource = (pathname) => readFileSync(join(root, pathname), "utf8");
const attrs = (markup, attribute) =>
  [...markup.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
const localUrl = (value) => value.startsWith("/") && !value.startsWith("//");

test("people, appearances, and photographs have closed stable records", () => {
  assert.equal(new Set(people.map((person) => person.id)).size, people.length);
  assert.equal(new Set(people.map((person) => person.slug)).size, people.length);
  assert.equal(people.length, 1);
  assert.equal(people[0].id, "person-will-smith");
  assert.equal(people[0].slug, "will-smith");
  const personIds = new Set(people.map((person) => person.id));
  const photoIds = new Set(personPhotographs.map((photo) => photo.id));
  const styleIds = new Set(hairstyles.map((style) => style.id));
  assert.equal(new Set(appearances.map((appearance) => appearance.id)).size, appearances.length);
  assert.equal(new Set(personPhotographs.map((photo) => photo.id)).size, personPhotographs.length);
  for (const appearance of appearances) {
    assert.ok(personIds.has(appearance.personId));
    assert.ok(photoIds.has(appearance.imageId));
    assert.equal(appearance.taken.precision, "day");
    assert.ok(appearance.taken.sourceUrl);
    for (const observation of appearance.observations) assert.ok(styleIds.has(observation.hairstyleId));
  }
  for (const photo of personPhotographs) {
    assert.ok(photo.fileName.endsWith(".jpg"));
    assert.ok(
      photo.creator &&
        photo.sourceUrl &&
        photo.originalUrl &&
        photo.rightsEvidenceUrl &&
        photo.rightsBasis &&
        photo.identifier,
    );
    assert.equal(photo.jurisdiction, "United States");
  }
});

test("appearance dates and observations match the phase-one contract", () => {
  const byDate = new Map(appearances.map((appearance) => [appearance.taken.value, appearance]));
  assert.deepEqual([...byDate.keys()].sort(), ["2009-12-10", "2011-04-24", "2012-05-23"]);
  assert.equal(byDate.get("2009-12-10").observations[0].hairstyleId, "hairstyle-buzz-cut");
  assert.equal(byDate.get("2011-04-24").observations[0].hairstyleId, "hairstyle-flat-top");
  assert.equal(byDate.get("2012-05-23").observations[0].hairstyleId, "hairstyle-buzz-cut");
});

test("person page has a newest-first appearance preview with local media", () => {
  const markup = page("/people/will-smith/");
  assert.doesNotMatch(markup, /AI-generated|generated reference/);
  assert.equal(attrs(markup, "src").filter((src) => /\.png(?:\?|$)/.test(src)).length, 0);
  assert.match(markup, /Appearances/);
  assert.match(markup, /More/);
  assert.match(markup, /May 2012/);
  assert.match(markup, /Apr 2011/);
  assert.match(markup, /Dec 2009/);
  assert.ok(markup.indexOf("May 2012") < markup.indexOf("Apr 2011"));
  assert.ok(markup.indexOf("Apr 2011") < markup.indexOf("Dec 2009"));
  assert.match(markup, /href="\/people\/will-smith\/appearances\/"/);
  for (const href of attrs(markup, "href")
    .filter(localUrl)
    .filter((href) => href.split("#")[0].endsWith("/"))) {
    const [pathname, fragment] = href.split("#");
    assert.ok(existsSync(routeFile(pathname)), href);
    if (fragment) assert.match(page(pathname), new RegExp(`id="${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
  assert.match(markup, /\/people\/will-smith\/appearances\/#appearance-will-smith-2011/);
});

test("person page presents a concise bio and natural profile above appearances", () => {
  const markup = page("/people/will-smith/");
  assert.match(markup, /Home/);
  assert.match(markup, /People/);
  assert.match(markup, /Person record/);
  assert.match(markup, /Willard Carroll Smith II/);
  assert.match(markup, /Natural profile/);
  assert.match(markup, /href="\/hair-types\/4\/"/);
  assert.doesNotMatch(markup, /change a silhouette|Use the images as haircut references/);
});

test("appearance overview is newest-first and links back to the person record", () => {
  const markup = page("/people/will-smith/appearances/");
  assert.match(markup, /Appearance archive/);
  assert.match(markup, /Newest first/);
  assert.ok(markup.indexOf("2012-05-23") < markup.indexOf("2011-04-24"));
  assert.ok(markup.indexOf("2011-04-24") < markup.indexOf("2009-12-10"));
  for (const appearance of appearances) {
    assert.match(markup, new RegExp(`id="${appearance.id}"`));
    assert.match(markup, /href="\/people\/will-smith\/"/);
  }
  assert.doesNotMatch(markup, /AI-generated|generated reference/);
  assert.match(markup, /<link rel="canonical" href="https:\/\/hairhairhair\.hair\/people\/will-smith\/appearances\//);
});

test("appearance anchors and hairstyle backlinks are one-to-one", () => {
  const personById = new Map(people.map((person) => [person.id, person]));
  for (const appearance of appearances) {
    const person = personById.get(appearance.personId);
    assert.ok(person);
    const archiveMarkup = page(`/people/${person.slug}/appearances/`);
    assert.equal((archiveMarkup.match(new RegExp(`id="${appearance.id}"`, "g")) ?? []).length, 1);
    for (const observation of appearance.observations) {
      const style = hairstyles.find((item) => item.id === observation.hairstyleId);
      assert.ok(style);
      if (style.guidePublicationStatus === "published") {
        const styleMarkup = page(`/hairstyles/${style.slug}/`);
        assert.match(styleMarkup, new RegExp(`href="/people/${person.slug}/appearances/#${appearance.id}"`));
      }
    }
  }
});

test("person photographs have public-domain provenance and locally built media", () => {
  const mediaSource = readSource("src/data/people-media.ts");
  assert.match(mediaSource, /kind: ["']public-domain["']/);
  assert.match(mediaSource, /type PublicDomainMedia/);
  const appearancePhotoIds = new Set(appearances.map((appearance) => appearance.imageId));
  assert.deepEqual(appearancePhotoIds, new Set(personPhotographs.map((photo) => photo.id)));
  for (const photo of personPhotographs) {
    assert.ok(existsSync(join(root, "src/assets/people", photo.fileName)), photo.fileName);
    assert.match(mediaSource, new RegExp(photo.fileName.replace(".", "\\.")));
  }
  for (const person of people) {
    const hero = personPhotographs.find((photo) => photo.id === person.heroImageId);
    assert.ok(hero, person.heroImageId);
    assert.match(mediaSource, new RegExp(hero.fileName.replace(".", "\\.")));
  }
});

test("sitemap and canonical metadata include people routes", () => {
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const path of ["/people/", "/people/will-smith/", "/people/will-smith/appearances/"])
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  for (const path of ["/people/", "/people/will-smith/", "/people/will-smith/appearances/"]) {
    const markup = page(path);
    const canonical = markup.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical);
    assert.equal(canonical[1], `https://hairhairhair.hair${path}`);
  }
});
