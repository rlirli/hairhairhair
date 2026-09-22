import { hairSubtypes, hairTypes, type HairSubtype, type HairType } from "./hair-types.ts";

export type NaturalProfileStatus = "unverified" | "community-corrected";
export type NaturalProfileSource = "ai-prefill" | "community-correction" | "self-reported" | "not-documented";
export type NaturalProfileConfidence = "low" | "medium" | "high";

export type NaturalHairColor = "black" | "brown" | "blonde" | "red" | "gray" | "white";
export type NaturalSkinTone = "deep-brown" | "brown" | "medium" | "light" | "fair";
export type HairThickness = "fine" | "medium" | "coarse";
export type HairDensity = "low" | "medium" | "high";

export interface NaturalProfileProvenance {
  source: NaturalProfileSource;
  status: NaturalProfileStatus;
  confidence: NaturalProfileConfidence;
  note?: string;
}

export interface NaturalProfileTrait<T> {
  value: T | null;
  provenance: NaturalProfileProvenance;
}

export interface NaturalProfile {
  id: string;
  personId: string;
  hairTypeId: NaturalProfileTrait<HairType["id"]>;
  hairSubtypeId: NaturalProfileTrait<HairSubtype["id"]>;
  naturalHairColor: NaturalProfileTrait<NaturalHairColor>;
  naturalSkinTone: NaturalProfileTrait<NaturalSkinTone>;
  hairThickness: NaturalProfileTrait<HairThickness>;
  hairDensity: NaturalProfileTrait<HairDensity>;
}

export const aiPrefill = (note: string): NaturalProfileProvenance => ({
  source: "ai-prefill",
  status: "unverified",
  confidence: "low",
  note,
});

const notDocumented = (note: string): NaturalProfileProvenance => ({
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
      provenance: aiPrefill("Inferred from public photographs; not self-reported or independently verified."),
    },
    hairSubtypeId: {
      value: null,
      provenance: notDocumented("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: aiPrefill("Inferred from public photographs; lighting and styling can affect appearance."),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: aiPrefill("A visual descriptor, not a scientific or clinical measurement."),
    },
    hairThickness: {
      value: null,
      provenance: notDocumented("No reliable public documentation found."),
    },
    hairDensity: {
      value: null,
      provenance: notDocumented("No reliable public documentation found."),
    },
  },
  {
    id: "natural-profile-mario-balotelli",
    personId: "person-mario-balotelli",
    hairTypeId: {
      value: "hair-type-4",
      provenance: aiPrefill("Inferred from public photographs; not self-reported or independently verified."),
    },
    hairSubtypeId: {
      value: null,
      provenance: notDocumented("No reliable public documentation found for a specific hair subtype."),
    },
    naturalHairColor: {
      value: "black",
      provenance: aiPrefill("Inferred from public photographs; lighting and styling can affect appearance."),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: aiPrefill("A visual descriptor, not a scientific or clinical measurement."),
    },
    hairThickness: { value: null, provenance: notDocumented("No reliable public documentation found.") },
    hairDensity: { value: null, provenance: notDocumented("No reliable public documentation found.") },
  },
];

export function naturalProfileForPerson(personId: string) {
  return naturalProfiles.find((profile) => profile.personId === personId);
}

export function hairTypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairType["id"]>) {
  return trait.value ? hairTypes.find((hairType) => hairType.id === trait.value) : undefined;
}

export function hairSubtypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairSubtype["id"]>) {
  return trait.value ? hairSubtypes.find((hairSubtype) => hairSubtype.id === trait.value) : undefined;
}

export function naturalProfileHasValidHairTypeHierarchy(profile: NaturalProfile) {
  const hairType = hairTypeForNaturalProfileTrait(profile.hairTypeId);
  const hairSubtype = hairSubtypeForNaturalProfileTrait(profile.hairSubtypeId);

  if (profile.hairTypeId.value !== null && !hairType) return false;
  if (profile.hairSubtypeId.value === null) return true;
  return Boolean(hairType && hairSubtype && hairSubtype.hairTypeId === hairType.id);
}

export function resolvedHairTypeForNaturalProfile(profile: NaturalProfile) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return undefined;
  return hairSubtypeForNaturalProfileTrait(profile.hairSubtypeId) ?? hairTypeForNaturalProfileTrait(profile.hairTypeId);
}

export function naturalProfileMatchesHairType(profile: NaturalProfile, hairTypeOrSubtypeId: string) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return false;

  const targetType = hairTypes.find((hairType) => hairType.id === hairTypeOrSubtypeId);
  if (targetType) return profile.hairTypeId.value === targetType.id;

  const targetSubtype = hairSubtypes.find((hairSubtype) => hairSubtype.id === hairTypeOrSubtypeId);
  return Boolean(targetSubtype && profile.hairSubtypeId.value === targetSubtype.id);
}

export function naturalProfilesForHairType(hairTypeOrSubtypeId: string) {
  return naturalProfiles.filter((profile) => naturalProfileMatchesHairType(profile, hairTypeOrSubtypeId));
}
