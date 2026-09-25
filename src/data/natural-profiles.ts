import type { NaturalProfile, NaturalProfileProvenance } from "../types";
export const createAiPrefillProvenance = (note: string): NaturalProfileProvenance => ({
  source: "ai-prefill",
  status: "unverified",
  confidence: "low",
  note,
});

const createNotDocumentedProvenance = (note: string): NaturalProfileProvenance => ({
  source: "not-documented",
  status: "unverified",
  confidence: "low",
  note,
});

export const naturalProfiles: NaturalProfile[] = [
  {
    id: "natural-profile-will-smith",
    personId: "person-will-smith",
    hairTypeId: {
      value: "hair-type-4",
      provenance: createAiPrefillProvenance(
        "Inferred from public photographs; not self-reported or independently verified.",
      ),
    },
    hairSubtypeId: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: createAiPrefillProvenance(
        "Inferred from public photographs; lighting and styling can affect appearance.",
      ),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: createAiPrefillProvenance("A visual descriptor, not a scientific or clinical measurement."),
    },
    hairThickness: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found."),
    },
    hairDensity: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found."),
    },
  },
  {
    id: "natural-profile-mario-balotelli",
    personId: "person-mario-balotelli",
    hairTypeId: {
      value: "hair-type-4",
      provenance: createAiPrefillProvenance(
        "Inferred from public photographs; not self-reported or independently verified.",
      ),
    },
    hairSubtypeId: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: createAiPrefillProvenance(
        "Inferred from public photographs; lighting and styling can affect appearance.",
      ),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: createAiPrefillProvenance("A visual descriptor, not a scientific or clinical measurement."),
    },
    hairThickness: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found."),
    },
    hairDensity: { value: null, provenance: createNotDocumentedProvenance("No reliable public documentation found.") },
  },
];
