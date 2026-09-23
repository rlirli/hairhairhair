import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { hairstyles } from "../src/data/hairstyles.ts";
import { hairstylesForPerson } from "../src/data/people-relations.ts";
import { appearances, people, personPhotographs } from "../src/data/people.ts";
import { appearanceTitle, formatAppearanceDate } from "../src/lib/appearance-formatting.ts";
import { attrs, dist, localUrl, page, publicRoutes, root, routeFile } from "./helpers/site.mjs";

const readSource = (pathname) => readFileSync(join(root, pathname), "utf8");
test("people overview offers portrait cards, profile filters, and profile details on focus or hover", () => {
  const markup = page("/people/");
  assert.match(markup, /Browse celebrities/i);
  assert.match(markup, /A look at/);
  assert.doesNotMatch(markup, /People and appearances|Dated photographs can show|Person record/);
  assert.match(markup, /data-profile-filter="hair"/);
  assert.match(markup, /data-profile-filter="color"/);
  assert.match(markup, /data-profile-filter="skin"/);
  assert.match(markup, /data-default-label="Hair type"/);
  assert.match(markup, /data-default-label="Color"/);
  assert.match(markup, /data-default-label="Skin tone"/);
  assert.doesNotMatch(markup, /<select|>\s*Any\s*</);
  assert.match(markup, /data-profile-hair=/);
  assert.match(markup, /data-profile-color=/);
  assert.match(markup, /data-profile-skin=/);
  assert.doesNotMatch(markup, /data-profile-values=/);
  assert.match(markup, /grid-cols-2[^\"]*sm:grid-cols-3[^\"]*lg:grid-cols-4[^\"]*xl:grid-cols-6/);
  assert.equal((markup.match(/data-slot="hover-card-trigger"/g) ?? []).length, people.length);
  for (const person of people) {
    assert.match(markup, new RegExp(`href="/people/${person.slug}/"`));
    assert.match(markup, new RegExp(`alt="${person.name}[^\"]*"`));
  }
  assert.match(readSource("src/components/PersonDirectoryCard.tsx"), /Natural profile/);
  assert.match(readSource("src/components/PersonDirectoryCard.tsx"), /person\.description/);
  assert.match(markup, /data-profile-results/);
  assert.match(readSource("src/pages/people/index.astro"), /card\.classList\.toggle\("hidden", !matches\)/);
  const filters = readSource("src/pages/people/index.astro");
  assert.match(filters, /selected\.some\(\(value\) => values\.includes\(value\)\)/);
  assert.match(filters, /selected\.length === 1/);
  assert.match(markup, /text-sm font-normal text-ink\/60/);
});

test("people, appearances, and photographs have closed stable records", () => {
  assert.equal(new Set(people.map((person) => person.id)).size, people.length);
  assert.equal(new Set(people.map((person) => person.slug)).size, people.length);
  const personIds = new Set(people.map((person) => person.id));
  const photoIds = new Set(personPhotographs.map((photo) => photo.id));
  const styleIds = new Set(hairstyles.map((style) => style.id));
  assert.equal(new Set(appearances.map((appearance) => appearance.id)).size, appearances.length);
  assert.equal(new Set(personPhotographs.map((photo) => photo.id)).size, personPhotographs.length);
  for (const person of people) {
    assert.ok(person.id && person.slug && person.name && person.description && person.heroImageId);
    assert.ok(person.sources.length > 0);
    assert.ok(person.sources.every((source) => ["photograph", "biography"].includes(source.kind) && source.url));
    assert.ok(appearances.some((appearance) => appearance.personId === person.id));
  }
  for (const appearance of appearances) {
    assert.ok(personIds.has(appearance.personId));
    assert.ok(photoIds.has(appearance.imageId));
    assert.equal(appearance.taken.precision, "day");
    assert.match(appearance.taken.value, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(Number.isNaN(Date.parse(`${appearance.taken.value}T00:00:00Z`)), false);
    assert.ok(appearance.taken.sourceUrl);
    assert.ok(appearance.observations.length > 0);
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

test("editorial hairstyle order covers every observed person/style relationship", () => {
  for (const person of people) {
    const observedStyleIds = new Set(
      appearances
        .filter((appearance) => appearance.personId === person.id)
        .flatMap((appearance) => appearance.observations.map((observation) => observation.hairstyleId)),
    );
    assert.deepEqual(new Set(hairstylesForPerson(person.id).map(({ style }) => style.id)), observedStyleIds);
  }
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
  const moreLabels = [
    ...markup.matchAll(/<a[^>]*href="\/people\/will-smith\/(?:appearances|hairstyles)\/"[^>]*>(.*?)<\/a>/g),
  ].map(([, content]) => content);
  assert.equal(moreLabels.length, 2);
  assert.ok(moreLabels.every((content) => content.trim() === "More"));
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
  assert.doesNotMatch(markup, /Newest first/);
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

test("person photographs have reusable license provenance and locally built media", () => {
  const appearancePhotoIds = new Set(appearances.map((appearance) => appearance.imageId));
  assert.deepEqual(appearancePhotoIds, new Set(personPhotographs.map((photo) => photo.id)));
  assert.deepEqual(
    personPhotographs.map((photo) => photo.fileName).sort(),
    readdirSync(join(root, "src/assets/people"))
      .filter((fileName) => fileName.endsWith(".jpg"))
      .sort(),
  );
  for (const photo of personPhotographs) {
    assert.ok(existsSync(join(root, "src/assets/people", photo.fileName)), photo.fileName);
    const owner = people.find((person) =>
      appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
    );
    assert.ok(owner);
    const photographPage = page(`/people/${owner.slug}/photographs/${photo.id}/`);
    assert.ok(attrs(photographPage, "src").some(localUrl), `${photo.id} should render local media`);
    assert.ok(photographPage.includes(`object-position: ${photo.objectPosition}`));
  }
  for (const person of people) {
    const hero = personPhotographs.find((photo) => photo.id === person.heroImageId);
    assert.ok(hero, person.heroImageId);
    assert.ok(appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === hero.id));
  }
});

test("licensed people media exposes visible attribution metadata", () => {
  for (const photo of personPhotographs.filter((item) => item.licenseName.startsWith("CC "))) {
    assert.ok(photo.attribution.includes(photo.creator));
    assert.ok(photo.licenseUrl.startsWith("https://creativecommons.org/"));
    const owner = people.find((person) =>
      appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
    );
    assert.ok(owner);
    const markup = page(`/people/${owner.slug}/photographs/${photo.id}/`);
    assert.ok(markup.includes(photo.creator));
    assert.ok(markup.includes(photo.licenseUrl));
    assert.ok(markup.includes(photo.sourceUrl));
    assert.match(markup, new RegExp(`Identifier: ${photo.identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    assert.doesNotMatch(markup, new RegExp(`${photo.attribution.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  }
});

test("compact people grids show linked, non-bold attribution overlays only for licensed photos", () => {
  for (const route of people.flatMap((person) => [
    `/people/${person.slug}/`,
    `/people/${person.slug}/appearances/`,
    `/people/${person.slug}/hairstyles/`,
  ])) {
    const markup = page(route);
    const credits = [...markup.matchAll(/data-photo-attribution[\s\S]*?>([\s\S]*?)<\/div>/g)].map(([, body]) => body);
    const images = markup.match(/<img\b/g) ?? [];
    assert.ok(credits.length <= images.length, `${route} should not show more credits than photos`);
    assert.doesNotMatch(markup, /text-xs leading-5 opacity-75/);
    for (const credit of credits) {
      assert.equal((credit.match(/<a\b/g) ?? []).length, 2, "each compact credit links the license and source");
      assert.doesNotMatch(credit, /<b\b|<strong\b/);
      assert.match(credit, /href="https:\/\/creativecommons\.org\//);
      assert.match(credit, /href="https:\/\/commons\.wikimedia\.org\//);
    }
  }
  const willSmith = page("/people/will-smith/");
  assert.doesNotMatch(willSmith, /Mass Communication Specialist 2nd Class Drae Parker/);
  const mario = page("/people/mario-balotelli/");
  assert.match(mario, /Bigmatbasket[\s\S]*?CC BY-SA 4\.0[\s\S]*?source[\s\S]*?cropped/);
  const cropCard = page("/people/mario-balotelli/appearances/").match(
    /data-photo-attribution[\s\S]*?cropped[\s\S]*?<\/div>/,
  );
  assert.ok(cropCard, "cropped CC photo keeps its change notice in the overlay");
});

test("person and appearance photographs render with square corners across profiles and archives", () => {
  const routes = [
    ...people.flatMap((person) => [
      `/people/${person.slug}/`,
      `/people/${person.slug}/appearances/`,
      `/people/${person.slug}/hairstyles/`,
      ...appearances
        .filter((appearance) => appearance.personId === person.id)
        .map((appearance) => `/people/${person.slug}/appearances/${appearance.id}/`),
      ...hairstylesForPerson(person.id).map(({ style }) => `/people/${person.slug}/hairstyles/${style.slug}/`),
      ...personPhotographs
        .filter((photo) =>
          appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
        )
        .map((photo) => `/people/${person.slug}/photographs/${photo.id}/`),
    ]),
  ];
  for (const route of routes) {
    const markup = page(route);
    assert.doesNotMatch(markup, /<img\b[^>]*class="[^"]*rounded-/);
  }
  for (const photo of personPhotographs) {
    const owner = people.find((person) =>
      appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
    );
    if (owner)
      assert.doesNotMatch(page(`/people/${owner.slug}/photographs/${photo.id}/`), /<img\b[^>]*class="[^"]*rounded-/);
  }
  const publicDomainRecord = page("/people/will-smith/photographs/will-smith-2012/");
  const publicDomainPhoto = personPhotographs.find((photo) => photo.id === "will-smith-2012");
  assert.ok(publicDomainPhoto);
  assert.match(publicDomainRecord, /Mass Communication Specialist 2nd Class Drae Parker/);
  assert.ok(publicDomainRecord.includes(publicDomainPhoto.rightsBasis));
  assert.doesNotMatch(page("/people/will-smith/appearances/appearance-will-smith-2012/"), /data-photo-attribution/);
  assert.doesNotMatch(readSource("src/components/HairTypeCelebrityPreview.astro"), /<Image[^>]*rounded-/);
  assert.doesNotMatch(readSource("src/components/PersonDirectoryCard.tsx"), /className="[^"]*rounded-/);
  assert.doesNotMatch(readSource("src/components/HairstyleAppearanceGrid.astro"), /<Image[^>]*rounded-/);
});

test("sitemap and canonical metadata include people routes", () => {
  const sitemap = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
  const peopleRoutes = publicRoutes().filter((path) => path.startsWith("/people/"));
  for (const path of peopleRoutes) assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
  for (const path of peopleRoutes) {
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
    assert.match(
      markup,
      new RegExp(`<a[^>]+href="/hairstyles/${slug}/"[^>]*>${slug === "flat-top" ? "Flat top" : "Buzz cut"}</a>`),
    );
    assert.match(markup, /href="\/people\/will-smith\/photographs\/will-smith-/);
  }
  assert.deepEqual(
    hairstylesForPerson("person-will-smith").map(({ style }) => style.slug),
    ["flat-top", "buzz-cut"],
  );
});

test("hairstyle appearance cards place linked titles before dates", () => {
  const markup = page("/people/will-smith/hairstyles/buzz-cut/");
  assert.doesNotMatch(markup, /Appearance record ↗/);
  for (const [date, appearanceId] of [
    ["May 23, 2012", "appearance-will-smith-2012"],
    ["December 10, 2009", "appearance-will-smith-2009"],
  ]) {
    const appearance = appearances.find((item) => item.id === appearanceId);
    assert.ok(appearance, appearanceId);
    const title = appearanceTitle(appearance.event);
    const titleIndex = markup.indexOf(title);
    const dateIndex = markup.indexOf(date);
    assert.ok(titleIndex >= 0, title);
    assert.ok(dateIndex > titleIndex, `${title} should come before ${date}`);
    const cardStart = markup.lastIndexOf("<article", titleIndex);
    const cardEnd = markup.indexOf("</article>", titleIndex);
    const card = markup.slice(cardStart, cardEnd);
    assert.match(card, new RegExp(`href="/people/will-smith/appearances/${appearanceId}/"`));
  }
});
