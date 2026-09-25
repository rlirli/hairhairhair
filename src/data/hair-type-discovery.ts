import type { HairTypePerson, HairTypePersonWithPhoto, PeopleForHairTypeOptions } from "../types";
import { hairSubtypes, hairTypes } from "./hair-types";
import { getCompatibleHairstylesForHairType, getCompatibleSubtypeCodesForHairstyleInMajorType } from "./hairstyle-compatibility";
import { naturalProfileMatchesHairTypeId, naturalProfiles } from "./natural-profiles";
import { people, personPhotographs } from "./people";

export function getCompatibleHairstylesForHairTypeSlug(slug: string) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  return target ? getCompatibleHairstylesForHairType(target.id) : [];
}

export function getPeopleForHairTypeSlug(slug: string): HairTypePersonWithPhoto[];
export function getPeopleForHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage: false },
): HairTypePerson[];
export function getPeopleForHairTypeSlug(
  slug: string,
  options: PeopleForHairTypeOptions & { requireHeroImage?: true },
): HairTypePersonWithPhoto[];
export function getPeopleForHairTypeSlug(slug: string, options: PeopleForHairTypeOptions = {}) {
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
