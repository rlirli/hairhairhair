import { hairSubtypes } from "./hair-types";
import { getPublishedHairstylesForHairType, patternGuidance, publishedHairstyles } from "./hairstyles";

export const kindLabels = {
  cut: "Cut",
  "finishing-technique": "Finishing technique",
  "styling-technique": "Styling technique",
} as const;

export function publishedStylesForHairType(hairTypeId: string) {
  const subtype = hairSubtypes.find((item) => item.id === hairTypeId);
  const typeId = subtype ? `hair-type-${subtype.code[0]}` : hairTypeId;
  return getPublishedHairstylesForHairType(typeId);
}

export function guidanceFor(styleId: string, hairTypeId: string) {
  return patternGuidance.find((item) => item.hairstyleId === styleId && item.hairTypeId === hairTypeId);
}

export function publishedRelatedHairstyles(ids: string[]) {
  return ids
    .map((id) => publishedHairstyles.find((style) => style.id === id))
    .filter((style): style is (typeof publishedHairstyles)[number] => Boolean(style));
}
