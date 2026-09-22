import {
  compatibilityForHairstyle,
  compatibilityLabelsForHairstyle,
  compatibleHairstylesForHairType,
  subtypeLabelsForHairstyleInMajorType,
} from "./hairstyle-compatibility";
import { publishedHairstyles } from "./hairstyles";

export const kindLabels = {
  cut: "Cut",
  "finishing-technique": "Finishing technique",
  "styling-technique": "Styling technique",
} as const;

export function publishedStylesForHairType(hairTypeId: string) {
  return compatibleHairstylesForHairType(hairTypeId);
}

export { compatibilityLabelsForHairstyle, subtypeLabelsForHairstyleInMajorType };

export function compatibilityFor(styleId: string, hairTypeId: string) {
  return compatibilityForHairstyle(styleId, hairTypeId);
}

export function publishedRelatedHairstyles(ids: string[]) {
  return ids
    .map((id) => publishedHairstyles.find((style) => style.id === id))
    .filter((style): style is (typeof publishedHairstyles)[number] => Boolean(style));
}
