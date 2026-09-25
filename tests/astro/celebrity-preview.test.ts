import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { expect, test, vi } from "vitest";

import CelebrityGrid from "../../src/components/people/CelebrityGrid.astro";
import { hairTypes } from "../../src/data/hair-types";
import HairTypePage from "../../src/pages/hair-types/[slug].astro";

const lookup = vi.hoisted(() => ({ people: [] as unknown[], calls: [] as unknown[][] }));

vi.mock("../../src/data/index", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/data/index")>();
  return {
    ...actual,
    getPeopleByHairTypeSlug: (...args: unknown[]) => {
      lookup.calls.push(args);
      return lookup.people;
    },
  };
});

const previewMarker = 'data-testid="hair-type-celebrity-preview"';
const noValue = { value: null, provenance: { source: "not-documented", status: "unverified", confidence: "low" } };
const profile = {
  id: "fixture-profile",
  personId: "fixture-person",
  hairTypeId: noValue,
  hairSubtypeId: noValue,
  naturalHairColor: noValue,
  naturalSkinTone: noValue,
  hairThickness: noValue,
  hairDensity: noValue,
};
const personWithoutPhoto = {
  person: {
    id: "fixture-person",
    slug: "fixture-person",
    name: "Fixture Person",
    description: "A person in the preview test.",
    heroImageId: "missing-hero",
    sources: [],
  },
  photo: undefined,
  naturalProfile: profile,
  subtype: undefined,
};

test("the hair-type page shows the preview exactly when matching people exist", async () => {
  const renderers = await loadRenderers([reactContainerRenderer()]);
  const container = await AstroContainer.create({
    renderers,
    astroConfig: { site: "https://hairhairhair.hair" },
  });
  const hairType = hairTypes[0];
  const options = {
    props: { kind: "hairType", hairType },
    params: { slug: hairType.slug },
    request: new Request(`https://hairhairhair.hair/hair-types/${hairType.slug}/`),
  };

  lookup.people = [];
  const withoutPeople = await container.renderToString(HairTypePage, options);
  expect(withoutPeople).not.toContain(previewMarker);

  lookup.people = [personWithoutPhoto];
  const withPerson = await container.renderToString(HairTypePage, options);
  expect(withPerson).toContain(previewMarker);
  expect(withPerson).toContain("Fixture Person");
  expect(lookup.calls).toEqual([
    [hairType.slug, { requireHeroImage: false, limit: 7 }],
    [hairType.slug, { requireHeroImage: false, limit: 7 }],
  ]);
});

test("the celebrity grid renders when it has no people", async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(CelebrityGrid, { props: { people: [] } });

  expect(html).toContain("<ul");
});
