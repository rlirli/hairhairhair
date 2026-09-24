import { hairSubtypes, hairTypes } from "./hair-types.ts";
import { publishedHairstyles } from "./hairstyles.ts";

export const MIN_COMPATIBILITY_FOR_LISTING = 0.5;

export interface HairstyleCompatibility {
  hairstyleId: string;
  hairTypeId: string;
  score: number | null;
  provenance: "estimated";
  variationId?: string;
}

// Scores estimate how fully the defining features can be achieved through ordinary
// cutting and styling while preserving the natural curl pattern. They are not a
// judgment of attractiveness, personal suitability, or an absolute limitation.
export const hairstyleCompatibility: HairstyleCompatibility[] = [
  { hairstyleId: "hairstyle-blunt-bob", hairTypeId: "hair-type-1", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-blunt-bob", hairTypeId: "hair-type-2", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-blunt-bob", hairTypeId: "hair-type-3", score: 0.55, provenance: "estimated" },
  { hairstyleId: "hairstyle-blunt-bob", hairTypeId: "hair-type-4", score: 0.0, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-2", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-1", score: 0.1, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-2", score: 0.2, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3", score: 0.65, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3a", score: 0.45, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3c", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-4", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-1a", score: 0.82, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-1b", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-1c", score: 0.98, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-2a", score: 0.98, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-2b", score: 0.93, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-2c", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-3a", score: 0.78, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-3b", score: 0.68, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-3c", score: 0.58, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-4a", score: 0.45, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-4b", score: 0.3, provenance: "estimated" },
  { hairstyleId: "hairstyle-curtain-haircut", hairTypeId: "hair-type-4c", score: 0.22, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-1", score: 0.88, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-1a", score: 0.72, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-1b", score: 0.86, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-1c", score: 0.96, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-2", score: 0.87, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-2a", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-2b", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-2c", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-3", score: 0.27, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-3a", score: 0.45, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-3b", score: 0.24, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-3c", score: 0.12, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-4", score: 0.05, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-4a", score: 0.08, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-4b", score: 0.04, provenance: "estimated" },
  { hairstyleId: "hairstyle-farrah-fawcett-cut", hairTypeId: "hair-type-4c", score: 0.02, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-1", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-1a", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-1b", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-1c", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-2", score: 0.35, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-2a", score: 0.5, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-2b", score: 0.3, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-2c", score: 0.15, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-3", score: 0.08, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-3a", score: 0.12, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-3b", score: 0.06, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-3c", score: 0.03, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-4", score: 0.02, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-4a", score: 0.03, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-4b", score: 0.01, provenance: "estimated" },
  { hairstyleId: "hairstyle-five-point-cut", hairTypeId: "hair-type-4c", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-1", score: 0.6, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-2", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-freeform-locs", hairTypeId: "hair-type-1", score: 0.45, provenance: "estimated" },
  { hairstyleId: "hairstyle-freeform-locs", hairTypeId: "hair-type-2", score: 0.65, provenance: "estimated" },
  { hairstyleId: "hairstyle-freeform-locs", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-freeform-locs", hairTypeId: "hair-type-4", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-1a", score: 0.82, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-1b", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-1c", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-2a", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-2b", score: 0.96, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-2c", score: 0.88, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-3a", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-3b", score: 0.67, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-3c", score: 0.52, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-4a", score: 0.42, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-4b", score: 0.3, provenance: "estimated" },
  { hairstyleId: "hairstyle-french-crop", hairTypeId: "hair-type-4c", score: 0.22, provenance: "estimated" },
  { hairstyleId: "hairstyle-knotless-box-braids", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-knotless-box-braids", hairTypeId: "hair-type-2", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-knotless-box-braids", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-knotless-box-braids", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-long-layered-cut", hairTypeId: "hair-type-1", score: 0.96, provenance: "estimated" },
  { hairstyleId: "hairstyle-long-layered-cut", hairTypeId: "hair-type-2", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-long-layered-cut", hairTypeId: "hair-type-3", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-long-layered-cut", hairTypeId: "hair-type-4", score: 0.86, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-1a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-1b", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-1c", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-2a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-2b", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-2c", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-3a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-3b", score: 0.4, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-3c", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-4a", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-4b", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-natural-afro", hairTypeId: "hair-type-4c", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-1", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-2", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-3", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-1a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-1b", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-1c", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-2a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-2b", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-2c", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-3a", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-3b", score: 0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-3c", score: 0.1, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-4a", score: 0.2, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-4b", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-sculpted-spherical-afro", hairTypeId: "hair-type-4c", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-short-feathered-shag", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-short-feathered-shag", hairTypeId: "hair-type-2", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-short-feathered-shag", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-short-feathered-shag", hairTypeId: "hair-type-4", score: 0.72, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-1", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-1a", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-1b", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-1c", score: 0.75, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-2", score: 0.55, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-3", score: 0.0, provenance: "estimated" },
  { hairstyleId: "hairstyle-sleek-long-cut", hairTypeId: "hair-type-4", score: 0.0, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-2", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-1", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-1a", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-1b", score: 1, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-1c", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-2", score: 0.72, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-2a", score: 0.88, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-2b", score: 0.68, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-2c", score: 0.48, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-3", score: 0.25, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-3a", score: 0.38, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-3b", score: 0.22, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-3c", score: 0.12, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-4", score: 0.07, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-4a", score: 0.1, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-4b", score: 0.06, provenance: "estimated" },
  { hairstyleId: "hairstyle-the-rachel", hairTypeId: "hair-type-4c", score: 0.03, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-1", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-2", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-4", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-1", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-2", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-4", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-1", score: 0.3, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-2", score: 0.5, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-4", score: 0.95, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-1", score: 0.4, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2a", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2b", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2c", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-3", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-4", score: 0.75, provenance: "estimated" },
];

export function compatibilityForHairstyle(styleId: string, hairTypeId: string) {
  const subtype = hairSubtypes.find((item) => item.id === hairTypeId);
  const majorId = subtype?.hairTypeId ?? hairTypeId;
  const row =
    hairstyleCompatibility.find((item) => item.hairstyleId === styleId && item.hairTypeId === hairTypeId) ??
    hairstyleCompatibility.find((item) => item.hairstyleId === styleId && item.hairTypeId === majorId);
  return row;
}

export function compatibilityScoreForHairstyle(styleId: string, hairTypeId: string): number | null {
  return compatibilityForHairstyle(styleId, hairTypeId)?.score ?? null;
}

export function compatibleHairstylesForHairType(hairTypeId: string) {
  return publishedHairstyles.filter((style) => {
    const subtypes = hairSubtypes.filter((subtype) => subtype.hairTypeId === hairTypeId);
    if (subtypes.length) {
      return subtypes.some((subtype) => {
        const resolved = compatibilityForHairstyle(style.id, subtype.id);
        return resolved?.score != null && resolved.score >= MIN_COMPATIBILITY_FOR_LISTING;
      });
    }
    const compatibility = compatibilityForHairstyle(style.id, hairTypeId);
    return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
  });
}

export function compatibleMajorHairTypesForHairstyle(styleId: string) {
  return hairTypes.filter((hairType) =>
    compatibleHairstylesForHairType(hairType.id).some((style) => style.id === styleId),
  );
}

export function subtypeLabelsForHairstyleInMajorType(styleId: string, hairTypeId: string) {
  const hasSubtypePrecision = hairstyleCompatibility.some(
    (row) =>
      row.hairstyleId === styleId &&
      hairSubtypes.some((subtype) => subtype.id === row.hairTypeId && subtype.hairTypeId === hairTypeId),
  );
  if (!hasSubtypePrecision) return [];
  return hairSubtypes
    .filter((subtype) => subtype.hairTypeId === hairTypeId)
    .filter((subtype) => {
      const compatibility = compatibilityForHairstyle(styleId, subtype.id);
      return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
    })
    .map((subtype) => subtype.code);
}

export function compatibilityLabelsForHairstyle(styleId: string) {
  return hairTypes.flatMap((hairType) => {
    const subtypes = hairSubtypes.filter((subtype) => subtype.hairTypeId === hairType.id);
    const eligible = subtypes.filter((subtype) => {
      const compatibility = compatibilityForHairstyle(styleId, subtype.id);
      return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
    });
    if (eligible.length === subtypes.length && subtypes.length > 0) return [`Type ${hairType.code}`];
    if (eligible.length === 0) return [];
    return eligible.map((subtype) => `Type ${subtype.code}`);
  });
}

export function compatibilityLabelsForHairTypeSlug(slug: string) {
  const major = hairTypes.find((item) => item.slug === slug);
  const subtype = hairSubtypes.find((item) => item.slug === slug);
  const id = major?.id ?? subtype?.id;
  if (!id) return [];
  return compatibleHairstylesForHairType(id).map((style) => style.name);
}
