import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { hairstyles } from "../src/data/hairstyles.ts";
import { hairstylesForPerson } from "../src/data/people-relations.ts";
import { appearances, people, personPhotographs } from "../src/data/people.ts";
import { appearanceTitle, formatAppearanceDate } from "../src/lib/appearance-formatting.ts";

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
const compactFourColumnGrids = (markup) =>
  [
    ...markup.matchAll(
      /<div class="mt-(?:7|8) grid gap-8 sm:grid-cols-2 lg:grid-cols-4">([\s\S]*?)<\/div><\/section>/g,
    ),
  ].map(([, content]) => content);

test("people, appearances, and photographs have closed stable records", () => {
  assert.equal(new Set(people.map((person) => person.id)).size, people.length);
  assert.equal(new Set(people.map((person) => person.slug)).size, people.length);
  assert.equal(people.length, 2);
  assert.equal(people[0].id, "person-will-smith");
  assert.equal(people[0].slug, "will-smith");
  assert.equal(people[1].id, "person-mario-balotelli");
  assert.equal(people[1].slug, "mario-balotelli");
  assert.deepEqual(
    people[0].sources.map((source) => source.kind),
    ["photograph", "biography"],
  );
  assert.deepEqual(
    people[1].sources.map((source) => source.kind),
    ["biography"],
  );
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
        photo.identifier &&
        photo.objectPosition,
    );
    assert.ok(photo.licenseName && photo.licenseUrl && photo.attribution);
    assert.ok(["original", "cropped", "edited"].includes(photo.derivativeStatus));
  }
});

test("appearance dates and observations match the documented people contract", () => {
  const byDate = new Map(appearances.map((appearance) => [appearance.taken.value, appearance]));
  assert.deepEqual([...byDate.keys()].sort(), [
    "2009-08-16",
    "2009-12-10",
    "2011-04-24",
    "2012-05-23",
    "2012-06-26",
    "2013-02-24",
    "2014-09-21",
    "2019-01-25",
  ]);
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
  assert.match(markup, /\/people\/will-smith\/appearances\/appearance-will-smith-2011\//);
});

test("appearance formatting is shared and keeps title/date conventions stable", () => {
  assert.equal(
    appearanceTitle("White House State Dining Room visit, Washington, D.C."),
    "White House State Dining Room visit",
  );
  assert.equal(formatAppearanceDate("2011-04-24", "short"), "Apr 2011");
  assert.equal(formatAppearanceDate("2011-04-24"), "April 24, 2011");
  const formattingSource = readSource("src/lib/appearance-formatting.ts");
  assert.match(formattingSource, /shortDateFormatter/);
  assert.match(formattingSource, /longDateFormatter/);
  for (const route of [
    "src/pages/people/[slug].astro",
    "src/pages/people/[slug]/appearances.astro",
    "src/pages/people/[slug]/hairstyles.astro",
    "src/pages/people/[slug]/appearances/[appearanceId].astro",
    "src/pages/people/[slug]/photographs/[photoId].astro",
    "src/pages/people/[slug]/hairstyles/[hairstyleSlug].astro",
  ]) {
    assert.doesNotMatch(readSource(route), /new Intl\.DateTimeFormat|event\.split\(","\)/);
  }
});

test("expandable bio only adds a visible multiline ellipsis after measuring overflow", () => {
  const source = readSource("src/components/ExpandableBio.astro");
  assert.match(source, /fullHeight > collapsedHeight/);
  assert.match(source, /-webkit-line-clamp: 3/);
  assert.match(source, /if \(expanded \|\| !overflows\) text\.classList\.remove\("bio-text--collapsed"\)/);
  assert.match(source, /toggle\.hidden = !overflows/);
});

test("person page presents an explicitly ordered hairstyles-worn preview", () => {
  const markup = page("/people/will-smith/");
  assert.match(markup, /Hairstyles worn/);
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/"/);
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/flat-top\/"/);
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/buzz-cut\/"/);
  assert.ok(markup.indexOf("Flat top") < markup.indexOf("Buzz cut"));
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

test("person profile hero uses a balanced record header and links directly to photograph details", () => {
  const markup = page("/people/mario-balotelli/");
  assert.match(markup, /lg:grid-cols-\[minmax\(0,\.95fr\)_minmax\(0,1\.2fr\)_minmax\(15rem,\.85fr\)\]/);
  assert.match(markup, /href="\/people\/mario-balotelli\/photographs\/mario-balotelli-2012-training\/"/);
  assert.match(markup, /aria-label="View photograph details for Mario Balotelli"/);
  assert.doesNotMatch(markup, /photograph details ↓/);
  assert.doesNotMatch(
    markup,
    /href="\/people\/mario-balotelli\/appearances\/appearance-mario-balotelli-2012\/"[^>]*>[^<]*2012-06-26/,
  );
});

test("Mario Balotelli is a complete second person record with five licensed appearances", () => {
  const profile = page("/people/mario-balotelli/");
  assert.match(profile, /Mario Balotelli Barwuah/);
  assert.match(profile, /Natural profile/);
  assert.match(profile, /href="\/hair-types\/4\/"/);
  assert.match(profile, /CC BY/);
  assert.match(profile, /bio source/);
  assert.match(profile, /href="\/people\/mario-balotelli\/appearances\/"/);

  const archive = page("/people/mario-balotelli/appearances/");
  for (const year of ["2019-01-25", "2014-09-21", "2013-02-24", "2012-06-26", "2009-08-16"]) {
    assert.ok(archive.includes(year));
  }
  assert.ok(archive.indexOf("2019-01-25") < archive.indexOf("2014-09-21"));
  assert.match(archive, /CC BY-SA 4\.0/);
  assert.match(page("/people/mario-balotelli/hairstyles/"), /Thin mohawk/);
  assert.match(page("/people/mario-balotelli/photographs/mario-balotelli-2013-inter/"), /cropped image/);
  assert.match(page("/people/mario-balotelli/photographs/mario-balotelli-2013-inter/"), /Mario Balotelli's record/);
});

test("appearance overview is newest-first and links back to the person record", () => {
  const markup = page("/people/will-smith/appearances/");
  assert.match(markup, /Appearance archive/);
  assert.match(markup, /Newest first/);
  assert.ok(markup.indexOf("2012-05-23") < markup.indexOf("2011-04-24"));
  assert.ok(markup.indexOf("2011-04-24") < markup.indexOf("2009-12-10"));
  for (const appearance of appearances.filter((item) => item.personId === "person-will-smith")) {
    assert.match(markup, new RegExp(`id="${appearance.id}"`));
    assert.match(markup, /href="\/people\/will-smith\/"/);
  }
  assert.doesNotMatch(markup, /AI-generated|generated reference/);
  assert.match(markup, /<link rel="canonical" href="https:\/\/hairhairhair\.hair\/people\/will-smith\/appearances\//);
});

test("each photograph has a dedicated provenance page and existing cards reach it", () => {
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const photo of personPhotographs) {
    const owner = people.find((person) =>
      appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
    );
    assert.ok(owner);
    const path = `/people/${owner.slug}/photographs/${photo.id}/`;
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
    const markup = page(path);
    assert.match(markup, /Photograph record/);
    assert.ok(markup.includes(photo.identifier));
    assert.match(markup, new RegExp(photo.creator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(markup, /Rights evidence/);
    assert.match(markup, /Appearances/);
    assert.match(markup, new RegExp(`href="/people/${owner.slug}/appearances/appearance-${owner.slug}-`));
    assert.match(markup, new RegExp(`href="/people/${owner.slug}/"`));
  }
  const profile = page("/people/will-smith/");
  assert.doesNotMatch(profile, /Appearance record ↗/);
  assert.match(profile, /href="\/people\/will-smith\/appearances\/appearance-will-smith-2011\/"/);
  const archive = page("/people/will-smith/appearances/");
  assert.match(archive, /\/people\/will-smith\/appearances\/appearance-will-smith-2011\//);
  assert.doesNotMatch(archive, /Appearance record ↗/);
  assert.match(archive, /<h3[^>]*>\s*<a[^>]*href="\/people\/will-smith\/appearances\/appearance-will-smith-2011\/"/);
});

test("appearance anchors and hairstyle backlinks are one-to-one", () => {
  const personById = new Map(people.map((person) => [person.id, person]));
  for (const appearance of appearances.filter((item) => item.personId === "person-will-smith")) {
    const person = personById.get(appearance.personId);
    assert.ok(person);
    const archiveMarkup = page(`/people/${person.slug}/appearances/`);
    assert.equal((archiveMarkup.match(new RegExp(`id="${appearance.id}"`, "g")) ?? []).length, 1);
    for (const observation of appearance.observations) {
      const style = hairstyles.find((item) => item.id === observation.hairstyleId);
      assert.ok(style);
      if (style.guidePublicationStatus === "published") {
        const styleMarkup = page(`/hairstyles/${style.slug}/`);
        assert.match(styleMarkup, new RegExp(`href="/people/${person.slug}/appearances/${appearance.id}/"`));
      }
    }
  }
});

test("single appearance records connect the photograph, observations, and archives", () => {
  const markup = page("/people/will-smith/appearances/appearance-will-smith-2011/");
  assert.match(markup, /Appearance record/);
  assert.match(markup, /April 24, 2011/);
  assert.match(markup, /White House State Dining Room visit/);
  assert.match(markup, /href="\/people\/will-smith\/photographs\/will-smith-2011\/"/);
  assert.match(markup, /href="\/hairstyles\/flat-top\/"/);
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/flat-top\/"/);
  assert.match(markup, /Open source record/);
  assert.match(markup, /href="\/people\/will-smith\/appearances\/"/);
  assert.match(markup, /href="\/people\/will-smith\/"/);
});

test("reference record pages use restrained responsive title scales", () => {
  const appearance = readSource("src/pages/people/[slug]/appearances/[appearanceId].astro");
  const photograph = readSource("src/pages/people/[slug]/photographs/[photoId].astro");
  for (const source of [appearance, photograph]) {
    assert.match(source, /font-display text-4xl leading-\[\.95\] tracking-\[-\.05em\] sm:text-5xl sm:leading-\[\.92\]/);
    assert.doesNotMatch(source, /font-display text-6xl[\s\S]*sm:text-8xl/);
  }
});

test("person photographs have reusable license provenance and locally built media", () => {
  const mediaSource = readSource("src/data/people-media.ts");
  assert.match(mediaSource, /kind: photo\.licenseName === ["']Public domain["']/);
  const appearancePhotoIds = new Set(appearances.map((appearance) => appearance.imageId));
  assert.deepEqual(appearancePhotoIds, new Set(personPhotographs.map((photo) => photo.id)));
  for (const photo of personPhotographs) {
    assert.ok(existsSync(join(root, "src/assets/people", photo.fileName)), photo.fileName);
    assert.match(mediaSource, new RegExp(photo.fileName.replace(".", "\\.")));
    const owner = people.find((person) =>
      appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
    );
    assert.ok(owner);
    assert.ok(
      page(`/people/${owner.slug}/photographs/${photo.id}/`).includes(`object-position: ${photo.objectPosition}`),
    );
  }
  for (const person of people) {
    const hero = personPhotographs.find((photo) => photo.id === person.heroImageId);
    assert.ok(hero, person.heroImageId);
    assert.match(mediaSource, new RegExp(hero.fileName.replace(".", "\\.")));
  }
});

test("licensed people media exposes visible attribution metadata", () => {
  const source = readSource("src/components/PersonPhotoAttribution.astro");
  assert.match(source, /provenance\.attribution/);
  assert.match(source, /provenance\.licenseUrl/);
  assert.match(source, /derivativeStatus/);
  for (const photo of personPhotographs.filter((item) => item.licenseName.startsWith("CC "))) {
    assert.ok(photo.attribution.includes(photo.creator));
    assert.ok(photo.licenseUrl.startsWith("https://creativecommons.org/"));
  }
});

test("compact people grids keep each attribution inside its card", () => {
  for (const route of ["/people/will-smith/", "/people/will-smith/appearances/", "/people/will-smith/hairstyles/"]) {
    const grids = compactFourColumnGrids(page(route));
    assert.ok(grids.length, `${route} should render at least one four-column grid`);
    for (const grid of grids) {
      const cards = grid.match(/<a class="group focus-ring block"/g) ?? [];
      assert.ok(cards.length, `${route} should render cards`);
      assert.equal(
        grid.match(/<p class="text-xs leading-5 opacity-75/g)?.length ?? 0,
        cards.length,
        `${route} should render one attribution per card`,
      );
      assert.doesNotMatch(
        grid,
        /<a class="group focus-ring block"[\s\S]*?<a class="underline"/,
        `${route} must not put a license link inside a linked card`,
      );
    }
  }
});

test("sitemap and canonical metadata include people routes", () => {
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  for (const path of [
    "/people/",
    "/people/will-smith/",
    "/people/will-smith/appearances/",
    "/people/will-smith/appearances/appearance-will-smith-2009/",
    "/people/will-smith/appearances/appearance-will-smith-2011/",
    "/people/will-smith/appearances/appearance-will-smith-2012/",
    "/people/will-smith/hairstyles/",
  ])
    assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  for (const path of [
    "/people/",
    "/people/will-smith/",
    "/people/will-smith/appearances/",
    "/people/will-smith/appearances/appearance-will-smith-2009/",
    "/people/will-smith/appearances/appearance-will-smith-2011/",
    "/people/will-smith/appearances/appearance-will-smith-2012/",
    "/people/will-smith/hairstyles/",
  ]) {
    const markup = page(path);
    const canonical = markup.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical);
    assert.equal(canonical[1], `https://hairhairhair.hair${path}`);
  }
});

test("person hairstyle overview uses explicit editorial order", () => {
  const markup = page("/people/will-smith/hairstyles/");
  assert.match(markup, /Hairstyles worn/);
  assert.ok(markup.indexOf("Flat top") < markup.indexOf("Buzz cut"));
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/flat-top\/"/);
  assert.match(markup, /href="\/people\/will-smith\/hairstyles\/buzz-cut\/"/);
});

test("person hairstyle detail pages collect every matching appearance", () => {
  const expected = [
    ["flat-top", ["April 24, 2011"]],
    ["buzz-cut", ["May 23, 2012", "December 10, 2009"]],
  ];
  for (const [slug, dates] of expected) {
    const markup = page(`/people/will-smith/hairstyles/${slug}/`);
    assert.match(markup, /Person hairstyle record/);
    for (const date of dates) assert.match(markup, new RegExp(date));
    assert.doesNotMatch(markup, /Appearance record ↗/);
    assert.match(markup, /Read the .* guide/);
    assert.match(markup, /href="\/people\/will-smith\/photographs\/will-smith-/);
  }
  assert.deepEqual(
    hairstylesForPerson("person-will-smith").map(({ style }) => style.slug),
    ["flat-top", "buzz-cut"],
  );
});

test("hairstyle appearance cards link titles to appearance records without nested links", () => {
  const markup = page("/people/will-smith/hairstyles/buzz-cut/");
  assert.doesNotMatch(markup, /Appearance record ↗/);
  for (const [date, appearanceId] of [
    ["May 23, 2012", "appearance-will-smith-2012"],
    ["December 10, 2009", "appearance-will-smith-2009"],
  ]) {
    const titleIndex = markup.indexOf(date);
    assert.ok(titleIndex >= 0, date);
    const card = markup.slice(titleIndex, titleIndex + 800);
    assert.match(card, new RegExp(`href="/people/will-smith/appearances/${appearanceId}/"`));
  }
});
