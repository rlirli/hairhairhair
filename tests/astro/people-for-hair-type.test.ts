import { expect, test, vi } from "vitest";

import { getPeopleByHairTypeSlug } from "../../src/data";
import { hairTypes } from "../../src/data/hair-types";

const fixtures = vi.hoisted(() => ({
  people: [
    { id: "first", slug: "first", name: "First", description: "", heroImageId: "missing-first", sources: [] },
    { id: "second", slug: "second", name: "Second", description: "", heroImageId: "missing-second", sources: [] },
  ],
  profiles: [
    {
      id: "first-profile",
      personId: "first",
      hairTypeId: { value: "hair-type-1" },
      hairSubtypeId: { value: null },
    },
    {
      id: "second-profile",
      personId: "second",
      hairTypeId: { value: "hair-type-1" },
      hairSubtypeId: { value: null },
    },
  ],
}));

vi.mock("../../src/data/people", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/data/people")>();
  return { ...actual, people: fixtures.people, personPhotographs: [] };
});

vi.mock("../../src/data/natural-profiles", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/data/natural-profiles")>();
  return { ...actual, naturalProfiles: fixtures.profiles };
});

test("the lookup can include people without hero images", () => {
  const slug = hairTypes[0].slug;

  expect(getPeopleByHairTypeSlug(slug)).toEqual([]);
  expect(getPeopleByHairTypeSlug(slug, { requireHeroImage: false }).map(({ person }) => person.id)).toEqual([
    "first",
    "second",
  ]);
});

test("the preview lookup stops at its requested limit", () => {
  const slug = hairTypes[0].slug;

  expect(getPeopleByHairTypeSlug(slug, { requireHeroImage: false, limit: 0 })).toEqual([]);
  expect(getPeopleByHairTypeSlug(slug, { requireHeroImage: false, limit: 1 }).map(({ person }) => person.id)).toEqual([
    "first",
  ]);
});
