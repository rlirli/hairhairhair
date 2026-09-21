import { hairFamilies } from "./hair-types";
import { getPublishedHairstylesForFamily, patternGuidance, publishedHairstyles } from "./hairstyles";

export const kindLabels = {
  cut: "Cut",
  "finishing-technique": "Finishing technique",
  "styling-technique": "Styling technique",
} as const;

export function publishedStylesForFamily(family: string) {
  const familyId = hairFamilies.find((item) => item.family === family)?.id;
  return familyId ? getPublishedHairstylesForFamily(familyId) : [];
}

export function guidanceFor(styleId: string, family: string) {
  const familyId = hairFamilies.find((item) => item.family === family)?.id;
  return familyId
    ? patternGuidance.find((item) => item.hairstyleId === styleId && item.hairFamilyId === familyId)
    : undefined;
}

export function publishedRelatedHairstyles(ids: string[]) {
  return ids
    .map((id) => publishedHairstyles.find((style) => style.id === id))
    .filter((style): style is (typeof publishedHairstyles)[number] => Boolean(style));
}
