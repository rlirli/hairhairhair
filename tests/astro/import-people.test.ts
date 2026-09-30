import { describe, expect, it } from "vitest";
import { validatePackages } from "../../scripts/import-people.mjs";

const aiProvenance = {
  source: "ai-prefill",
  status: "unverified",
  confidence: "medium",
  note: "Estimated from photographs.",
};

function packageItem(
  observation = { hairstyleId: "hairstyle-buzz-cut", note: "A clearly visible test hairstyle." },
  licenseOverrides = {},
) {
  const person = {
    id: "person-test",
    slug: "test-person",
    name: "Test Person",
    description: "A test record.",
    heroImageId: "test-photo",
    sources: [{ kind: "biography", url: "https://example.com/person" }],
  };
  const naturalProfile = {
    hairTypeId: { value: "hair-type-3", provenance: aiProvenance },
    hairSubtypeId: { value: "hair-type-3a", provenance: aiProvenance },
    naturalHairColor: { value: "brown", provenance: aiProvenance },
    naturalSkinTone: { value: "medium", provenance: aiProvenance },
    hairThickness: { value: null, provenance: { ...aiProvenance, confidence: "low" } },
    hairDensity: { value: null, provenance: { ...aiProvenance, confidence: "low" } },
  };
  const photograph = {
    id: "test-photo",
    fileName: "test-photo.jpg",
    alt: "Test person in a portrait.",
    objectPosition: "50% 50%",
    provenance: {
      licenseType: "licensed",
      costFree: true,
      commercialUse: true,
      derivativesAllowed: true,
      creator: "Test Photographer",
      licenseName: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      attribution: "Test Photographer, CC BY 4.0",
      sourceUrl: "https://example.com/file",
      originalUrl: "https://example.com/photo.jpg",
      rightsEvidenceUrl: "https://example.com/file#license",
      rightsBasis: "The file record documents this license.",
      derivativeStatus: "original",
      ...licenseOverrides,
    },
  };
  const appearance = {
    id: "appearance-test-person-2020",
    imageId: photograph.id,
    event: "Test event",
    taken: { value: "2020", precision: "year", sourceUrl: "https://example.com/event" },
    observations: [observation],
  };
  return {
    folderName: person.slug,
    files: [photograph.fileName],
    payload: { person, naturalProfile, photographs: [photograph], appearances: [appearance] },
  };
}

const emptyData = {
  personIds: new Set<string>(),
  slugs: new Set<string>(),
  photoIds: new Set<string>(),
  appearanceIds: new Set<string>(),
  profileIds: new Set<string>(),
  styleIds: new Set(["hairstyle-buzz-cut"]),
  styleExamples: [{ id: "example-buzz-cut", hairstyleIds: ["hairstyle-buzz-cut"] }],
};
const schemaAccepts = () => [];

describe("people importer validation", () => {
  it("rejects an appearance that references an unknown hairstyle ID", () => {
    const result = validatePackages(
      [packageItem({ hairstyleId: "hairstyle-not-in-catalog" })],
      emptyData,
      schemaAccepts,
    );

    expect(result.errors).toContain(
      "test-person: appearance appearance-test-person-2020 references unknown hairstyle hairstyle-not-in-catalog.",
    );
  });

  it("accepts an appearance observation with no catalog link", () => {
    const result = validatePackages(
      [packageItem({ note: "A visible but unidentified hairstyle." })],
      emptyData,
      schemaAccepts,
    );

    expect(result.errors).toEqual([]);
    expect(result.planned).toHaveLength(1);
  });

  it("keeps a valid catalog link on its observation", () => {
    const result = validatePackages(
      [packageItem({ hairstyleId: "hairstyle-buzz-cut", note: "Known style." })],
      emptyData,
      schemaAccepts,
    );

    expect(result.errors).toEqual([]);
    expect(result.planned[0].payload.appearances[0].observations[0]).toEqual({
      hairstyleId: "hairstyle-buzz-cut",
      note: "Known style.",
    });
  });

  it("rejects a style example when the observation has no linked hairstyle", () => {
    const result = validatePackages([packageItem({ styleExampleId: "example-buzz-cut" })], emptyData, schemaAccepts);

    expect(result.errors).toContain(
      "test-person: appearance appearance-test-person-2020 styleExampleId example-buzz-cut must reference an example for its linked hairstyle.",
    );
  });

  it("rejects licensed photos without cost-free commercial derivative rights", () => {
    const result = validatePackages(
      [
        packageItem(
          { hairstyleId: "hairstyle-buzz-cut" },
          { costFree: false, commercialUse: false, derivativesAllowed: false },
        ),
      ],
      emptyData,
      schemaAccepts,
    );

    expect(result.errors).toContain(
      "test-person: licensed photo test-photo must permit cost-free commercial use and derivatives.",
    );
  });
});
