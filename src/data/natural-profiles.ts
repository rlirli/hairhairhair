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
  {
    hairTypeId: {
      value: "hair-type-3",
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "medium",
        note: "Multiple reviewed editorial photographs and interviews describe or show Zendaya's natural texture as curly; broad Type 3 is the best visual fit, while styling varies substantially across appearances.",
      },
    },
    hairSubtypeId: {
      value: null,
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "low",
        note: "Reviewed natural-texture evidence ranges from looser waves to defined curls, so an exact 3A, 3B, or 3C subtype is not defensible from the available photographs.",
      },
    },
    naturalHairColor: {
      value: "brown",
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "medium",
        note: "Across reviewed natural-texture and less-styled imagery, the hair and visible roots read as dark brown; frequent professional coloring makes the exact natural shade less certain.",
      },
    },
    naturalSkinTone: {
      value: "medium",
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "medium",
        note: "Across multiple well-lit public photographs, her complexion visually reads closest to the collection's medium category; lighting and makeup can shift apparent tone.",
      },
    },
    hairThickness: {
      value: null,
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "low",
        note: "Individual strand thickness cannot be estimated reliably from the reviewed public photographs.",
      },
    },
    hairDensity: {
      value: "high",
      provenance: {
        source: "ai-prefill",
        status: "unverified",
        confidence: "medium",
        note: "Natural-texture photographs and Zendaya's own description of her younger hair as long and full support a high visible-density estimate, though photographs cannot directly measure follicular density.",
      },
    },
    personId: "person-zendaya",
    id: "natural-profile-zendaya",
  },
];
