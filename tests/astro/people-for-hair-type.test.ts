import { expect, test, vi } from "vitest";

import { peopleForHairTypeSlug } from "../../src/data/hair-type-discovery";
import { hairTypes } from "../../src/data/hair-types";

const fixtures = vi.hoisted(() => ({
  people: [
    { id: "first", slug: "first", name: "First", description: "", heroImageId: "missing-first", sources: [] },
    { id: "second", slug: "second", name: "Second", description: "", heroImageId: "missing-second", sources: [] },
  ],
  profiles: [
    { id: "first-profile", personId: "first", hairSubtypeId: { value: null } },
    { id: "second-profile", personId: "second", hairSubtypeId: { value: null } },
  ],
}));

vi.mock("../../src/data/people", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/data/people")>();
  return { ...actual, people: fixtures.people, personPhotographs: [] };
});

vi.mock("../../src/data/natural-profiles", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/data/natural-profiles")>();
  return { ...actual, naturalProfiles: fixtures.profiles, naturalProfileMatchesHairType: () => true };
});

test("the lookup can include people without hero images", () => {
  const slug = hairTypes[0].slug;

  expect(peopleForHairTypeSlug(slug)).toEqual([]);
  expect(peopleForHairTypeSlug(slug, { requireHeroImage: false }).map(({ person }) => person.id)).toEqual([
    "first",
    "second",
  ]);
});

test("the preview lookup stops at its requested limit", () => {
  const slug = hairTypes[0].slug;

  expect(peopleForHairTypeSlug(slug, { requireHeroImage: false, limit: 0 })).toEqual([]);
  expect(peopleForHairTypeSlug(slug, { requireHeroImage: false, limit: 1 }).map(({ person }) => person.id)).toEqual([
    "first",
  ]);
});
