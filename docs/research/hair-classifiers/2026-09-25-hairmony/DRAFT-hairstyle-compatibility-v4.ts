/**
 * DRAFT — discussion model only. This file is intentionally outside src/ and is not
 * imported by the application.
 *
 * Hairmony source: https://arxiv.org/html/2410.11528 (Appendix D)
 * Hairmony describes the visible hairstyle in an image. The separate profile and
 * compatibility types below are our proposed extension for asking whether a
 * person can achieve a particular hairstyle variation.
 *
 * Global and regional keys use Hairmony's taxonomy identifiers. Regional
 * attributes are grouped by SCALP_REGIONS. Missing values are represented by
 * null; "" is not an option. No display labels or translations are included.
 */

export const SCALP_REGIONS = [
  "crown",
  "front",
  "nape",
  "side_left",
  "side_right",
  "temple_left",
  "temple_right",
  "top",
] as const;

export type ScalpRegion = (typeof SCALP_REGIONS)[number];

export const HAIRMONY_GLOBAL = {
  baby_hair: ["dont_know", "no_baby_hair", "styled", "unstyled"],
  bangs_length: ["above_eye_brows", "below_eye_brows", "to_eye_brows"],
  bang_style: [
    "diagonal_top_left_to_bottom_right",
    "diagonal_top_right_to_bottom_left",
    "inverted_u_shaped",
    "inverted_v_shaped",
    "none",
    "other",
    "straight",
    "u_shaped",
    "v_shaped",
  ],
  flag_hair_attribute_changes: ["no", "yes"],
  hair_accessories_multi: ["beads", "clips", "elastic_hair_tie", "headband", "none", "other", "ribbons_and_cords"],
  hair_surface_appearance: ["matte", "shiny", "very_shiny_oiled", "wet_look"],
  hairline_position: ["dont_know", "high", "low", "middle"],
  hairline_type: [
    "bell_shaped",
    "dont_know",
    "no_hairline_bald",
    "receding_or_m_shape",
    "straight",
    "uneven_other",
    "widows_peak",
  ],
  hairline_visibility: [
    "fully_visible",
    "not_visible",
    "partially_visible_left_covered",
    "partially_visible_right_covered",
  ],
  parting_location: ["central", "diagonal", "left_side", "no_parting", "other", "right_side", "zigzag"],
} as const;

export const HAIRMONY_REGIONAL = {
  decorative_patterns: ["no", "yes"],
  hair_direction: [
    "brushed_flowing_down",
    "brushed_gathered_up",
    "brushed_swept_to_the_side",
    "not_visible",
    "pointing_out",
  ],
  hair_gathered: [
    "attached_to_skin_cornrows_french_plaits",
    "bun_multiple",
    "bun_single",
    "gathered_not_visible",
    "gathered_other",
    "knot_multiple",
    "knot_single",
    "not_gathered",
    "not_visible",
    "pony_tail_multiple",
    "pony_tail_single",
    "tucked_behind_ear",
  ],
  hair_length: [
    "0.5_no_hair_shaved_but_roots_visible",
    "1_5_cm",
    "armpit_length",
    "chin_length",
    "ear_length",
    "midback_length",
    "no_hair_bald",
    "not_visible",
    "shoulder_length",
    "very_short_less_than_1cm",
    "waist_length_or_longer",
  ],
  hair_type: ["curly_hair", "no_hair_bald", "not_visible", "straight_hair", "tightly_curled_hair", "wavy_hair"],
  layering: ["fade", "layered_textured", "not_visible", "single_length", "taper"],
  strand_styling: ["braids", "dreadlocks", "hair_not_styled_into_strands", "other", "ringlets"],
  // Styled bundle size, not individual hair fibre diameter.
  strand_styling_thickness: ["hair_not_styled_into_strands", "large", "medium", "micro", "not_visible"],
} as const;

type ValueOf<T extends Record<string, readonly unknown[]>> = T[keyof T][number];
export type HairmonyGlobalKey = keyof typeof HAIRMONY_GLOBAL;
export type HairmonyRegionalKey = keyof typeof HAIRMONY_REGIONAL;
export type HairmonyGlobalValue = ValueOf<typeof HAIRMONY_GLOBAL>;
export type HairmonyRegionalValue = ValueOf<typeof HAIRMONY_REGIONAL>;

/** Hairmony's visible global and per-region attributes. */
export interface HairmonyVisibleLook {
  global: Partial<{
    [K in HairmonyGlobalKey]: (typeof HAIRMONY_GLOBAL)[K][number] | null;
  }>;
  regional: Partial<
    Record<
      ScalpRegion,
      Partial<{
        [K in HairmonyRegionalKey]: (typeof HAIRMONY_REGIONAL)[K][number] | null;
      }>
    >
  >;
}

/**
 * Proposed person-side inputs. Unknown means unobserved, never a negative score.
 * Natural pattern is separate from the visible/possibly styled Hairmony hair_type.
 */
export type WalkerSubtype = "1A" | "1B" | "1C" | "2A" | "2B" | "2C" | "3A" | "3B" | "3C" | "4A" | "4B" | "4C";

export type Density = "low" | "medium" | "high";
export type HairFibreThickness = "fine" | "medium" | "coarse";

export interface PersonHairProfile {
  coverageByRegion?: Partial<Record<ScalpRegion, "none" | "sparse" | "partial" | "full">>;
  currentLengthCmByRegion?: Partial<Record<ScalpRegion, number>>;
  densityByRegion?: Partial<Record<ScalpRegion, Density>>;
  fibreThickness?: HairFibreThickness;
  growthDirectionByRegion?: Partial<Record<ScalpRegion, "forward" | "backward" | "left" | "right" | "mixed">>;
  hairlineShape?: (typeof HAIRMONY_GLOBAL.hairline_type)[number];
  maximumRoutineStylingMinutes?: number;
  naturalPattern?: WalkerSubtype;
}

/**
 * A variation states requirements. "required" is for structural impossibility;
 * "preferred" affects resemblance or effort and can have an adaptation.
 * Colour and gender are absent here by default: they are presentation/search
 * metadata unless a particular variation has a defensible colour requirement.
 */
export type CompatibilityDimension =
  | "coverage"
  | "currentLength"
  | "density"
  | "fibreThickness"
  | "growthDirection"
  | "hairlineShape"
  | "naturalPattern"
  | "routineStylingMinutes";

export interface CompatibilityRequirement {
  acceptedValues?: readonly string[];
  adaptationIfUnmet?: string;
  dimension: CompatibilityDimension;
  evidence: {
    confidence: "low" | "medium" | "high";
    provenance: "source-backed" | "editorial-estimate" | "professional-review";
    sourceIds: readonly string[];
  };
  importance: "required" | "preferred";
  maximum?: number;
  minimum?: number;
  reason: string;
  region?: ScalpRegion;
  unit?: "cm" | "minutes";
}

export interface VariationRequirements {
  hairstyleId: string;
  requirements: readonly CompatibilityRequirement[];
  variationId: string;
}

/** Derived per person × variation. Never stored as an attractiveness judgment. */
export interface CompatibilityAssessment {
  hairstyleId: string;
  perDimension: readonly {
    dimension: CompatibilityDimension;
    explanation: string;
    region?: ScalpRegion;
    result: "met" | "adaptable" | "unmet" | "unknown";
  }[];
  result: "directly-achievable" | "achievable-with-adaptation" | "not-currently-achievable" | "unknown";
  variationId: string;
}

/**
 * Example shape only; thresholds and sources must be researched before use.
 * The current product's hair-type compatibility scores remain separate editorial
 * estimates until a migration and scoring policy have been agreed.
 */
export const RACHEL_CLASSIC: VariationRequirements = {
  hairstyleId: "hairstyle-the-rachel",
  variationId: "the-rachel-classic",
  requirements: [
    {
      dimension: "currentLength",
      region: "nape",
      importance: "required",
      reason: "The finished look has a shoulder-skimming perimeter.",
      evidence: { provenance: "editorial-estimate", sourceIds: [], confidence: "low" },
    },
    {
      dimension: "density",
      region: "front",
      importance: "preferred",
      acceptedValues: ["medium", "high"],
      reason: "Many short face-framing layers can reduce apparent fullness on sparse hair.",
      adaptationIfUnmet: "Use fewer or longer face-framing layers.",
      evidence: { provenance: "editorial-estimate", sourceIds: [], confidence: "low" },
    },
    {
      dimension: "routineStylingMinutes",
      importance: "preferred",
      reason: "The classic curved blowout needs regular styling.",
      adaptationIfUnmet: "Choose a variation designed for the natural finish.",
      evidence: { provenance: "editorial-estimate", sourceIds: [], confidence: "low" },
    },
  ],
};
