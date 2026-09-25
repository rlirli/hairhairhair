import type {
  Hairstyle,
  HairSubtype,
  HairType,
  HairTypePerson,
  HairTypePersonWithPhoto,
  NaturalProfile,
  NaturalProfileTrait,
  PeopleForHairTypeOptions,
  Person,
  PersonDirectoryCardImage,
  PersonDirectoryCardItem,
  StyleExample,
} from "../types";
import { hairSubtypes, hairTypes } from "./hair-types";
import { hairstyleCompatibility, MIN_COMPATIBILITY_FOR_LISTING } from "./hairstyle-compatibility";
import { hairstyles, styleExamples } from "./hairstyles";
import { hairstyleMedia } from "./media";
import { naturalProfiles } from "./natural-profiles";
import { people, personPhotographs } from "./people";

export { kindLabels } from "./hairstyles";

export function getCompatibleHairstylesForHairTypeSlug(slug: string) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  return target ? getCompatibleHairstylesForHairType(target.id) : [];
}

export function getPeopleByHairTypeSlug(slug: string): HairTypePersonWithPhoto[];
export function getPeopleByHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage: false },
): HairTypePerson[];
export function getPeopleByHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage?: true },
): HairTypePersonWithPhoto[];
export function getPeopleByHairTypeSlug(slug: string, options: PeopleForHairTypeOptions = {}) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  if (!target) return [];
  const limit = Math.max(0, options.limit ?? Infinity);
  if (limit === 0) return [];
  const peopleById = new Map(people.map((person) => [person.id, person]));
  const photographsById = new Map(personPhotographs.map((photo) => [photo.id, photo]));
  const result: HairTypePerson[] = [];
  for (const profile of naturalProfiles) {
    if (result.length >= limit) break;
    if (!naturalProfileMatchesHairTypeId(profile, target.id)) continue;
    const person = peopleById.get(profile.personId);
    if (!person) continue;
    const heroPhotograph = photographsById.get(person.heroImageId);
    const photo = heroPhotograph ? heroPhotograph : undefined;
    if (options.requireHeroImage !== false && !photo) continue;
    const subtype = profile.hairSubtypeId.value
      ? hairSubtypes.find((item) => item.id === profile.hairSubtypeId.value)
      : undefined;
    result.push({ person, photo, naturalProfile: profile, subtype });
  }
  return result;
}

export function getRepresentativeHairstyleMedia(hairstyleId: string) {
  const example = styleExamples.find((item) => item.hairstyleIds.includes(hairstyleId));
  if (!example) return undefined;

  const media = getHairstyleMediaById(example.imageId);
  return media ? { example, media } : undefined;
}

export function getHairstyleCompatibility(styleId: string, hairTypeId: string) {
  const subtype = hairSubtypes.find((item) => item.id === hairTypeId);
  const majorId = subtype?.hairTypeId ?? hairTypeId;
  const row =
    hairstyleCompatibility.find((item) => item.hairstyleId === styleId && item.hairTypeId === hairTypeId) ??
    hairstyleCompatibility.find((item) => item.hairstyleId === styleId && item.hairTypeId === majorId);
  return row;
}

export function getCompatibleHairstylesForHairType(hairTypeId: string) {
  return publishedHairstyles.filter((style) => {
    const subtypes = hairSubtypes.filter((subtype) => subtype.hairTypeId === hairTypeId);
    if (subtypes.length) {
      return subtypes.some((subtype) => {
        const resolved = getHairstyleCompatibility(style.id, subtype.id);
        return resolved?.score != null && resolved.score >= MIN_COMPATIBILITY_FOR_LISTING;
      });
    }
    const compatibility = getHairstyleCompatibility(style.id, hairTypeId);
    return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
  });
}

export function getCompatibleSubtypeCodesForHairstyleInMajorType(styleId: string, hairTypeId: string) {
  const hasSubtypePrecision = hairstyleCompatibility.some(
    (row) =>
      row.hairstyleId === styleId &&
      hairSubtypes.some((subtype) => subtype.id === row.hairTypeId && subtype.hairTypeId === hairTypeId),
  );
  if (!hasSubtypePrecision) return [];
  return hairSubtypes
    .filter((subtype) => subtype.hairTypeId === hairTypeId)
    .filter((subtype) => {
      const compatibility = getHairstyleCompatibility(styleId, subtype.id);
      return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
    })
    .map((subtype) => subtype.code);
}

export function getCompatibleHairTypeLabelsForHairstyle(styleId: string) {
  return hairTypes.flatMap((hairType) => {
    const subtypes = hairSubtypes.filter((subtype) => subtype.hairTypeId === hairType.id);
    const eligible = subtypes.filter((subtype) => {
      const compatibility = getHairstyleCompatibility(styleId, subtype.id);
      return compatibility?.score != null && compatibility.score >= MIN_COMPATIBILITY_FOR_LISTING;
    });
    if (eligible.length === subtypes.length && subtypes.length > 0) return [`Type ${hairType.code}`];
    if (eligible.length === 0) return [];
    return eligible.map((subtype) => `Type ${subtype.code}`);
  });
}

export function getHairstyleBySlug(slug: string): Hairstyle | undefined {
  return hairstyles.find((hairstyle) => hairstyle.slug === slug);
}

export function getStyleExamplesForHairstyle(id: string): StyleExample[] {
  return styleExamples.filter((example) => example.hairstyleIds.includes(id));
}

export function isPublishedHairstyleGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean {
  return hairstyle.guidePublicationStatus === "published";
}

export const publishedHairstyles = hairstyles.filter(isPublishedHairstyleGuide);

export function getPublishedHairstylesByIds(ids: string[]) {
  return ids
    .map((id) => publishedHairstyles.find((style) => style.id === id))
    .filter((style): style is (typeof publishedHairstyles)[number] => Boolean(style));
}

export function getHairstyleMediaById(id: string) {
  return hairstyleMedia.find((media) => media.id === id);
}

export function getNaturalProfileForPerson(personId: string) {
  return naturalProfiles.find((profile) => profile.personId === personId);
}

export function getHairTypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairType["id"]>) {
  return trait.value ? hairTypes.find((hairType) => hairType.id === trait.value) : undefined;
}

export function getHairSubtypeForNaturalProfileTrait(trait: NaturalProfileTrait<HairSubtype["id"]>) {
  return trait.value ? hairSubtypes.find((hairSubtype) => hairSubtype.id === trait.value) : undefined;
}

export function naturalProfileHasValidHairTypeHierarchy(profile: NaturalProfile) {
  const hairType = getHairTypeForNaturalProfileTrait(profile.hairTypeId);
  const hairSubtype = getHairSubtypeForNaturalProfileTrait(profile.hairSubtypeId);

  if (profile.hairTypeId.value !== null && !hairType) return false;
  if (profile.hairSubtypeId.value === null) return true;
  return Boolean(hairType && hairSubtype && hairSubtype.hairTypeId === hairType.id);
}

export function resolveHairTypeForNaturalProfile(profile: NaturalProfile) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return undefined;
  return (
    getHairSubtypeForNaturalProfileTrait(profile.hairSubtypeId) ?? getHairTypeForNaturalProfileTrait(profile.hairTypeId)
  );
}

export function naturalProfileMatchesHairTypeId(profile: NaturalProfile, hairTypeOrSubtypeId: string) {
  if (!naturalProfileHasValidHairTypeHierarchy(profile)) return false;

  const targetType = hairTypes.find((hairType) => hairType.id === hairTypeOrSubtypeId);
  if (targetType) return profile.hairTypeId.value === targetType.id;

  const targetSubtype = hairSubtypes.find((hairSubtype) => hairSubtype.id === hairTypeOrSubtypeId);
  return Boolean(targetSubtype && profile.hairSubtypeId.value === targetSubtype.id);
}

const formatLabeledValue = (value: string | null, labels: Record<string, string>) =>
  value ? (labels[value] ?? value) : null;

export function buildPersonDirectoryCardData(
  person: Person,
  image: PersonDirectoryCardImage = {},
  profile = getNaturalProfileForPerson(person.id),
): PersonDirectoryCardItem {
  const resolvedType = profile ? resolveHairTypeForNaturalProfile(profile) : undefined;
  const hairValues = [profile?.hairTypeId.value, profile?.hairSubtypeId.value].filter((value): value is string =>
    Boolean(value),
  );
  const profileRows = profile
    ? [
        resolvedType && {
          label: "Hair type",
          value: `Type ${resolvedType.code} · ${resolvedType.name}`,
          href: `/hair-types/${resolvedType.slug}/`,
        },
        profile.naturalHairColor.value && {
          label: "Hair color",
          value: formatLabeledValue(profile.naturalHairColor.value, {
            black: "Black",
            brown: "Brown",
            blonde: "Blonde",
            red: "Red",
            gray: "Gray",
            white: "White",
          })!,
        },
        profile.naturalSkinTone.value && {
          label: "Skin tone",
          value: formatLabeledValue(profile.naturalSkinTone.value, {
            "deep-brown": "Deep brown",
            brown: "Brown",
            medium: "Medium",
            light: "Light",
            fair: "Fair",
          })!,
        },
        profile.hairThickness.value && {
          label: "Hair thickness",
          value: formatLabeledValue(profile.hairThickness.value, { fine: "Fine", medium: "Medium", coarse: "Coarse" })!,
        },
        profile.hairDensity.value && {
          label: "Hair density",
          value: formatLabeledValue(profile.hairDensity.value, { low: "Low", medium: "Medium", high: "High" })!,
        },
      ].filter((row): row is NonNullable<typeof row> => Boolean(row))
    : [];

  return {
    href: `/people/${person.slug}/`,
    name: person.name,
    imageSrc: image.src,
    imageSrcSet: image.srcSet,
    imageSizes: image.sizes,
    imageAlt: image.alt,
    description: person.description,
    profileValues: {
      hair: hairValues,
      color: profile?.naturalHairColor.value ?? "",
      skin: profile?.naturalSkinTone.value ?? "",
    },
    profileRows,
  };
}

import { appearances } from "./people.ts";

export function getAppearancesForPerson(personId: string) {
  return appearances
    .filter((appearance) => appearance.personId === personId)
    .sort((a, b) => a.taken.value.localeCompare(b.taken.value));
}

export function getResolvedHairstyleObservationsForAppearance(appearanceId: string) {
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

export function getAppearancesForHairstyle(styleId: string) {
  return appearances.filter((appearance) =>
    appearance.observations.some((observation) => observation.hairstyleId === styleId),
  );
}

export function getAppearancesForPersonAndHairstyle(personId: string, styleId: string) {
  return appearances
    .filter(
      (appearance) =>
        appearance.personId === personId &&
        appearance.observations.some((observation) => observation.hairstyleId === styleId),
    )
    .sort((a, b) => b.taken.value.localeCompare(a.taken.value));
}

export function getHairstyleAppearancesForPerson(personId: string) {
  const appearances = getAppearancesForPerson(personId);
  const hairstyleIds = [
    ...new Set(
      appearances.flatMap((appearance) => appearance.observations.map((observation) => observation.hairstyleId)),
    ),
  ];

  return hairstyleIds.flatMap((styleId) => {
    const style = hairstyles.find((item) => item.id === styleId);
    if (!style) return [];

    return [{ style, appearances: getAppearancesForPersonAndHairstyle(personId, styleId) }];
  });
}

export function getPersonForAppearance(appearanceId: string) {
  const appearance = appearances.find((item) => item.id === appearanceId);
  return appearance ? people.find((person) => person.id === appearance.personId) : undefined;
}
