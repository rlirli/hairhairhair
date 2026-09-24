import { naturalProfileForPerson, resolvedHairTypeForNaturalProfile } from "./natural-profiles";
import type { Person } from "./people";

export interface PersonDirectoryCardImage {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
}

export interface PersonDirectoryCardItem {
  href: string;
  name: string;
  imageSrc?: string;
  imageSrcSet?: string;
  imageSizes?: string;
  imageAlt?: string;
  profileValues: { hair: string[]; color: string; skin: string };
  description: string;
  profileRows: { label: string; value: string; href?: string }[];
}

const displayValue = (value: string | null, labels: Record<string, string>) =>
  value ? (labels[value] ?? value) : null;

export function personDirectoryCardData(
  person: Person,
  image: PersonDirectoryCardImage = {},
  profile = naturalProfileForPerson(person.id),
): PersonDirectoryCardItem {
  const resolvedType = profile ? resolvedHairTypeForNaturalProfile(profile) : undefined;
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
          value: displayValue(profile.naturalHairColor.value, {
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
          value: displayValue(profile.naturalSkinTone.value, {
            "deep-brown": "Deep brown",
            brown: "Brown",
            medium: "Medium",
            light: "Light",
            fair: "Fair",
          })!,
        },
        profile.hairThickness.value && {
          label: "Hair thickness",
          value: displayValue(profile.hairThickness.value, { fine: "Fine", medium: "Medium", coarse: "Coarse" })!,
        },
        profile.hairDensity.value && {
          label: "Hair density",
          value: displayValue(profile.hairDensity.value, { low: "Low", medium: "Medium", high: "High" })!,
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
