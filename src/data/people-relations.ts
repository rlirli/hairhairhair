import { hairstyles } from "./hairstyles";
import { appearances, people } from "./people";

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

export function personForAppearance(appearanceId: string) {
  const appearance = appearances.find((item) => item.id === appearanceId);
  return appearance ? people.find((person) => person.id === appearance.personId) : undefined;
}

export function personBySlug(slug: string) {
  return people.find((person) => person.slug === slug);
}
