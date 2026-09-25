/**
 * DRAFT — discussion model only. This file is intentionally outside src/ and is not
 * imported by the application.
 *
 * Hairmony source: https://arxiv.org/html/2410.11528 (Appendix D)
 * Hairmony describes the visible hairstyle in an image. The separate profile and
 * compatibility types below are our proposed extension for asking whether a
 * person can achieve a particular hairstyle variation.
 *
 * Labels below follow the paper's wording. They are not asserted to be the exact
 * machine values in Hairmony's CSV files.
 */

export const SCALP_REGIONS = [
  "front",
  "top",
  "crown",
  "nape",
  "rightSide",
  "rightTemple",
  "leftSide",
  "leftTemple",
] as const;

export type ScalpRegion = (typeof SCALP_REGIONS)[number];

export const HAIRMONY_GLOBAL = {
  bangsStyle: [
    "None",
    "Straight",
    "V-shaped",
    "U-shaped",
    "Inverted V-shaped",
    "Inverted U-shaped",
    "Diagonal top right to bottom left",
    "Diagonal top left to bottom right",
    "Other",
  ],
  bangsLength: ["Above eyebrows (<10cm)", "To eyebrows (10cm)", "Below eyebrows (>10cm)"],
  hairAccessories: ["None", "Headband", "Ribbons", "Hairnet", "Comb(s)", "Clip(s)", "Bead(s)"],
  partingLocation: ["Central", "Right side", "Left side", "Diagonal", "Zigzag", "Other", "None"],
  hairlineShape: ["Straight", "Bell-shaped", "Receding/M-shaped", "Widow’s peak", "Uneven/other", "I don’t know"],
  hairlinePosition: ["High", "Medium", "Low", "I don’t know"],
  hairlineVisibility: ["Full", "Partially visible (left)", "Partially visible (right)", "Not visible"],
  surfaceAppearance: ["Matte", "Shiny", "Very shiny (oiled)", "Wet look"],
  babyHair: ["No baby hair", "Unstyled", "Styled", "I don’t know"],
  hairAttributeVaries: ["No", "Yes"],
} as const;

export const HAIRMONY_REGIONAL = {
  hairType: ["Coily", "Curly", "Wavy", "Straight"],
  strandStyling: ["None", "Other", "Twists/Ringlets", "Dreadlocks", "Braids"],
  // Thickness of styled bundles, not diameter of an individual hair fibre.
  strandThickness: ["Large (>2cm)", "Medium (1-2cm)", "Micro (<1cm)"],
  hairGathered: [
    "None, not gathered",
    "Tucked behind the ear",
    "Bun, single",
    "Bun, multiple",
    "Pony tail, single",
    "Pony tail, multiple",
    "Attached to the skin (cornrows, French plaits)",
    "Knot, single",
    "Knot, multiple",
    "Gathered, other, not listed",
    "Gathered, gathering style not visible",
  ],
  hairDirection: ["Brushed/flowing down", "Brushed/swept to the side", "Brushed/gathered up", "Pointing out"],
  hairLength: [
    "No hair/Bald (clipper 0)",
    "Shaved, roots visible (clipper 0.5)",
    "Very short (<1cm, clipper 1-3)",
    "Short (1-5cm, clipper 4-10)",
    "Ear length",
    "Chin length",
    "Shoulder length",
    "Armpit length",
    "Mid-back length",
    "Waist length or longer",
    "Hair not visible",
  ],
  layering: ["None/Single length", "Textured/Layered", "Taper", "Fade"],
  decorativePatterns: ["None", "Decorated"],
} as const;

type ValueOf<T extends Record<string, readonly unknown[]>> = T[keyof T][number];
export type HairmonyGlobalKey = keyof typeof HAIRMONY_GLOBAL;
export type HairmonyRegionalKey = keyof typeof HAIRMONY_REGIONAL;
export type HairmonyGlobalValue = ValueOf<typeof HAIRMONY_GLOBAL>;
export type HairmonyRegionalValue = ValueOf<typeof HAIRMONY_REGIONAL>;

/** Observed look of a hairstyle or a specific variation, not personal suitability. */
export interface VisibleLook {
  hairstyleId: string;
  variationId?: string;
  global: Partial<{
    [K in HairmonyGlobalKey]: (typeof HAIRMONY_GLOBAL)[K][number];
  }>;
  regional: Partial<
    Record<
      ScalpRegion,
      Partial<{
        [K in HairmonyRegionalKey]: (typeof HAIRMONY_REGIONAL)[K][number];
      }>
    >
  >;
}

/**
 * Proposed person-side inputs. Unknown means unobserved, never a negative score.
 * Natural pattern is separate from the visible/possibly styled Hairmony hairType.
 */
export type WalkerSubtype =
  | "1A" | "1B" | "1C"
  | "2A" | "2B" | "2C"
  | "3A" | "3B" | "3C"
  | "4A" | "4B" | "4C";

export type Density = "low" | "medium" | "high";
export type HairFibreThickness = "fine" | "medium" | "coarse";

export interface PersonHairProfile {
  naturalPattern?: WalkerSubtype;
  fibreThickness?: HairFibreThickness;
  densityByRegion?: Partial<Record<ScalpRegion, Density>>;
  currentLengthCmByRegion?: Partial<Record<ScalpRegion, number>>;
  hairlineShape?: (typeof HAIRMONY_GLOBAL.hairlineShape)[number];
  coverageByRegion?: Partial<Record<ScalpRegion, "none" | "sparse" | "partial" | "full">>;
  growthDirectionByRegion?: Partial<Record<ScalpRegion, "forward" | "backward" | "left" | "right" | "mixed">>;
  maximumRoutineStylingMinutes?: number;
}

/**
 * A variation states requirements. "required" is for structural impossibility;
 * "preferred" affects resemblance or effort and can have an adaptation.
 * Colour and gender are absent here by default: they are presentation/search
 * metadata unless a particular variation has a defensible colour requirement.
 */
export type CompatibilityDimension =
  | "naturalPattern"
  | "fibreThickness"
  | "density"
  | "currentLength"
  | "hairlineShape"
  | "coverage"
  | "growthDirection"
  | "routineStylingMinutes";

export interface CompatibilityRequirement {
  dimension: CompatibilityDimension;
  region?: ScalpRegion;
  importance: "required" | "preferred";
  acceptedValues?: readonly string[];
  minimum?: number;
  maximum?: number;
  unit?: "cm" | "minutes";
  reason: string;
  adaptationIfUnmet?: string;
  evidence: {
    provenance: "source-backed" | "editorial-estimate" | "professional-review";
    sourceIds: readonly string[];
    confidence: "low" | "medium" | "high";
  };
}

export interface VariationRequirements {
  hairstyleId: string;
  variationId: string;
  requirements: readonly CompatibilityRequirement[];
}

/** Derived per person × variation. Never stored as an attractiveness judgment. */
export interface CompatibilityAssessment {
  hairstyleId: string;
  variationId: string;
  result: "directly-achievable" | "achievable-with-adaptation" | "not-currently-achievable" | "unknown";
  perDimension: readonly {
    dimension: CompatibilityDimension;
    region?: ScalpRegion;
    result: "met" | "adaptable" | "unmet" | "unknown";
    explanation: string;
  }[];
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
