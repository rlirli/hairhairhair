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
  // A taper changes the perimeter while the top can retain its natural pattern.
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-2", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-taper-fade", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  // A close, even cut does not depend on curl shape.
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-1", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-2", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-3", score: 0.9, provenance: "estimated" },
  { hairstyleId: "hairstyle-buzz-cut", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  // Natural curl helps twists retain their shape; looser patterns need more setting and may release sooner.
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-1", score: 0.3, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-2", score: 0.5, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-twists", hairTypeId: "hair-type-4", score: 0.95, provenance: "estimated" },
  // Clipped side patterns work broadly; the natural texture changes the crest silhouette, not the concept.
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-1", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-2", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-3", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-patterned-mohawk", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  // A narrow central strip can be cut on any pattern, with ordinary styling affecting its height.
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-1", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-2", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-thin-mohawk", hairTypeId: "hair-type-4", score: 0.8, provenance: "estimated" },
  // Visible natural curl/coils define an afro; straighter patterns cannot retain that feature naturally.
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-1", score: 0.1, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-2", score: 0.2, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3", score: 0.65, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-4", score: 0.95, provenance: "estimated" },
  // Gathering hair into a knot is possible across patterns when sufficient length is assumed.
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-1", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-2", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-top-knot", hairTypeId: "hair-type-4", score: 0.8, provenance: "estimated" },
  // A level top can retain its shape more fully as natural texture becomes more self-supporting.
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-1", score: 0.6, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-2", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-3", score: 0.8, provenance: "estimated" },
  { hairstyleId: "hairstyle-flat-top", hairTypeId: "hair-type-4", score: 0.9, provenance: "estimated" },
  // Wave/curl gives the layered crown its characteristic volume; straight hair can need more styling.
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-1", score: 0.4, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-3", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-4", score: 0.75, provenance: "estimated" },
  // Explicit subtype estimates override their major-type defaults. Stronger Type 2 waves retain more layered volume.
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2a", score: 0.7, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2b", score: 0.85, provenance: "estimated" },
  { hairstyleId: "hairstyle-wolf-cut", hairTypeId: "hair-type-2c", score: 0.9, provenance: "estimated" },
  // Type 3A's loose curls may not hold a compact afro silhouette; tighter 3C curls can retain it more fully.
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3a", score: 0.45, provenance: "estimated" },
  { hairstyleId: "hairstyle-cropped-afro", hairTypeId: "hair-type-3c", score: 0.85, provenance: "estimated" },
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
