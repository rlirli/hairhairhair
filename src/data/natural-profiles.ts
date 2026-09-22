import { hairTypes, type HairType } from "./hair-types.ts";

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
  naturalHairColor: NaturalProfileTrait<NaturalHairColor>;
  naturalSkinTone: NaturalProfileTrait<NaturalSkinTone>;
  hairThickness: NaturalProfileTrait<HairThickness>;
  hairDensity: NaturalProfileTrait<HairDensity>;
}

const willSmithAiPrefill = (note: string): NaturalProfileProvenance => ({
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
      provenance: willSmithAiPrefill("Inferred from public photographs; not self-reported or independently verified."),
    },
    naturalHairColor: {
      value: "black",
      provenance: willSmithAiPrefill("Inferred from public photographs; lighting and styling can affect appearance."),
    },
    naturalSkinTone: {
      value: "deep-brown",
      provenance: willSmithAiPrefill("A visual descriptor, not a scientific or clinical measurement."),
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
];

export function naturalProfileForPerson(personId: string) {
  return naturalProfiles.find((profile) => profile.personId === personId);
}

export function hairTypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairType["id"]>) {
  return trait.value ? hairTypes.find((hairType) => hairType.id === trait.value) : undefined;
}
