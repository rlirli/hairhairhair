import type { HairSubtype, HairType, NaturalProfile, NaturalProfileProvenance, NaturalProfileTrait } from "../types";
import { hairSubtypes, hairTypes } from "./hair-types.ts";

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
      provenance: createAiPrefillProvenance("Inferred from public photographs; not self-reported or independently verified."),
    },
    hairSubtypeId: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: createAiPrefillProvenance("Inferred from public photographs; lighting and styling can affect appearance."),
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
      provenance: createAiPrefillProvenance("Inferred from public photographs; not self-reported or independently verified."),
    },
    hairSubtypeId: {
      value: null,
      provenance: createNotDocumentedProvenance("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: createAiPrefillProvenance("Inferred from public photographs; lighting and styling can affect appearance."),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: createAiPrefillProvenance("A visual descriptor, not a scientific or clinical measurement."),
    },
    hairThickness: { value: null, provenance: createNotDocumentedProvenance("No reliable public documentation found.") },
    hairDensity: { value: null, provenance: createNotDocumentedProvenance("No reliable public documentation found.") },
  },
];

export function getNaturalProfileForPerson(personId: string) {
  return naturalProfiles.find((profile) => profile.personId === personId);
}

export function getHairTypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairType["id"]>) {
  return trait.value ? hairTypes.find((hairType) => hairType.id === trait.value) : undefined;
}

export function getHairSubtypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairSubtype["id"]>) {
  return trait.value ? hairSubtypes.find((hairSubtype) => hairSubtype.id === trait.value) : undefined;
}

export function naturalProfileHasValidHairTypeHierarchy(profile: NaturalProfile) {
  const hairType = getHairTypeForNaturalProfileTrait(profile.hairTypeId);
  const hairSubtype = getHairSubtypeForNaturalProfileTrait(profile.hairSubtypeId);

  if (profile.hairTypeId.value !== null && !hairType) return false;
  if (profile.hairSubtypeId.value === null) return true;
  return Boolean(hairType && hairSubtype && hairSubtype.hairTypeId === hairType.id);
}

export function resolveHairTypeForNaturalProfile(profile: NaturalProfile) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return undefined;
  return getHairSubtypeForNaturalProfileTrait(profile.hairSubtypeId) ?? getHairTypeForNaturalProfileTrait(profile.hairTypeId);
}

export function naturalProfileMatchesHairTypeId(profile: NaturalProfile, hairTypeOrSubtypeId: string) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return false;

  const targetType = hairTypes.find((hairType) => hairType.id === hairTypeOrSubtypeId);
  if (targetType) return profile.hairTypeId.value === targetType.id;

  const targetSubtype = hairSubtypes.find((hairSubtype) => hairSubtype.id === hairTypeOrSubtypeId);
  return Boolean(targetSubtype && profile.hairSubtypeId.value === targetSubtype.id);
}
