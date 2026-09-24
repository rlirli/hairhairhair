import type { HairSubtype, HairType } from "./hair-types.types";

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
