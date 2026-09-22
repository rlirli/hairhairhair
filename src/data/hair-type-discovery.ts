import { hairSubtypes, hairTypes } from "./hair-types";
import { publishedStylesForHairType } from "./hairstyle-relations";
import { naturalProfileForPerson, naturalProfilesForHairType } from "./natural-profiles";
import { people, personPhotographs } from "./people";
import { buildPersonMedia } from "./people-media";

export function parentHairTypeId(slug: string) {
  return (
    hairTypes.find((item) => item.slug === slug)?.id ?? hairSubtypes.find((item) => item.slug === slug)?.hairTypeId
  );
}

export function stylesForHairTypeSlug(slug: string) {
  const id = parentHairTypeId(slug);
  return id ? publishedStylesForHairType(id) : [];
}

export function peopleForHairTypeSlug(slug: string) {
  const target = hairTypes.find((item) => item.slug === slug) ?? hairSubtypes.find((item) => item.slug === slug);
  if (!target) return [];
  const profiles = naturalProfilesForHairType(target.id);
  const mediaById = new Map(buildPersonMedia(personPhotographs).map((photo) => [photo.id, photo]));
  return profiles.flatMap((profile) => {
    const person = people.find((item) => item.id === profile.personId);
    const photo = person && mediaById.get(person.heroImageId);
    if (!person || !photo) return [];
    const naturalProfile = naturalProfileForPerson(person.id);
    const subtype = naturalProfile?.hairSubtypeId.value
      ? hairSubtypes.find((item) => item.id === naturalProfile.hairSubtypeId.value)
      : undefined;
    return [{ person, photo, naturalProfile: naturalProfile!, subtype }];
  });
}
