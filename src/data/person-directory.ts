import type { Person, PersonDirectoryCardImage, PersonDirectoryCardItem } from "../types";
import { getNaturalProfileForPerson, resolveHairTypeForNaturalProfile } from "./natural-profiles";

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
