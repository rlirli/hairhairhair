import { hairstyles } from "./hairstyles.ts";
import { appearances, people } from "./people.ts";

export function appearancesForPerson(personId: string) {
  return appearances
    .filter((appearance) => appearance.personId === personId)
    .sort((a, b) => a.taken.value.localeCompare(b.taken.value));
}

export function observedStylesForAppearance(appearanceId: string) {
  const appearance = appearances.find((item) => item.id === appearanceId);
  return (
    appearance?.observations
      .map((observation) => ({
        observation,
        style: hairstyles.find((style) => style.id === observation.hairstyleId),
      }))
      .filter((item): item is { observation: typeof item.observation; style: NonNullable<typeof item.style> } =>
        Boolean(item.style),
      ) ?? []
  );
}

export function appearancesForStyle(styleId: string) {
  return appearances.filter((appearance) =>
    appearance.observations.some((observation) => observation.hairstyleId === styleId),
  );
}

// This is editorial order, not an accidental consequence of the hairstyle or appearance data order.
export const personHairstyleOrder: Record<string, string[]> = {
  "person-will-smith": ["hairstyle-flat-top", "hairstyle-buzz-cut"],
  "person-mario-balotelli": [
    "hairstyle-thin-mohawk",
    "hairstyle-taper-fade",
    "hairstyle-top-knot",
    "hairstyle-buzz-cut",
  ],
};

export function appearancesForPersonStyle(personId: string, styleId: string) {
  return appearances
    .filter(
      (appearance) =>
        appearance.personId === personId &&
        appearance.observations.some((observation) => observation.hairstyleId === styleId),
    )
    .sort((a, b) => b.taken.value.localeCompare(a.taken.value));
}

export function hairstylesForPerson(personId: string) {
  const orderedIds = personHairstyleOrder[personId] ?? [];
  return orderedIds
    .map((styleId) => ({
      style: hairstyles.find((style) => style.id === styleId),
      appearances: appearancesForPersonStyle(personId, styleId),
    }))
    .filter((item): item is { style: NonNullable<typeof item.style>; appearances: typeof item.appearances } =>
      Boolean(item.style && item.appearances.length),
    );
}

export function personForAppearance(appearanceId: string) {
  const appearance = appearances.find((item) => item.id === appearanceId);
  return appearance ? people.find((person) => person.id === appearance.personId) : undefined;
}

export function personBySlug(slug: string) {
  return people.find((person) => person.slug === slug);
}
