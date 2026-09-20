import { hairFamilies } from './hair-types';
import { hairstyles, patternGuidance, getHairstylesForFamily } from './hairstyles';

export const kindLabels = {
  cut: 'Cut',
  'finishing-technique': 'Finishing technique',
  'styling-technique': 'Styling technique',
} as const;

export function stylesForFamily(family: string) {
  const familyId = hairFamilies.find((item) => item.family === family)?.id;
  return familyId ? getHairstylesForFamily(familyId) : [];
}

export function guidanceFor(styleId: string, family: string) {
  const familyId = hairFamilies.find((item) => item.family === family)?.id;
  return familyId ? patternGuidance.find((item) => item.hairstyleId === styleId && item.hairFamilyId === familyId) : undefined;
}

export function relatedHairstyles(ids: string[]) {
  return ids.map((id) => hairstyles.find((style) => style.id === id)).filter((style): style is (typeof hairstyles)[number] => Boolean(style));
}
