import { hairSubtypes, hairTypes } from "./hair-types";
import { compatibleHairstylesForHairType, subtypeLabelsForHairstyleInMajorType } from "./hairstyle-compatibility";
import type { ImageMedia } from "./media-types";
import { naturalProfileMatchesHairType, naturalProfiles, type NaturalProfile } from "./natural-profiles";
import { people, personPhotographs, type Person } from "./people";

export function parentHairTypeId(slug: string) {
  return (
    hairTypes.find((item) => item.slug === slug)?.id ?? hairSubtypes.find((item) => item.slug === slug)?.hairTypeId
  );
}

export function stylesForHairTypeSlug(slug: string) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  return target ? compatibleHairstylesForHairType(target.id) : [];
}

export function subtypeLabelsForHairstyleOnMajorTypePage(styleId: string, slug: string) {
  const major = hairTypes.find((item) => item.slug === slug);
  return major ? subtypeLabelsForHairstyleInMajorType(styleId, major.id) : [];
}

export type HairTypePerson = {
  person: Person;
  photo?: ImageMedia;
  naturalProfile: NaturalProfile;
  subtype: (typeof hairSubtypes)[number] | undefined;
};

type HairTypePersonWithPhoto = HairTypePerson & { photo: NonNullable<HairTypePerson["photo"]> };
type PeopleForHairTypeOptions = { requireHeroImage?: boolean; limit?: number };

export function peopleForHairTypeSlug(slug: string): HairTypePersonWithPhoto[];
export function peopleForHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage: false },
): HairTypePerson[];
export function peopleForHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage?: true },
): HairTypePersonWithPhoto[];
export function peopleForHairTypeSlug(slug: string, options: PeopleForHairTypeOptions = {}) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  if (!target) return [];
  const limit = Math.max(0, options.limit ?? Infinity);
  if (limit === 0) return [];
  const peopleById = new Map(people.map((person) => [person.id, person]));
  const photographsById = new Map(personPhotographs.map((photo) => [photo.id, photo]));
  const result: HairTypePerson[] = [];
  for (const profile of naturalProfiles) {
    if (result.length >= limit) break;
    if (!naturalProfileMatchesHairType(profile, target.id)) continue;
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
