import type { HairSubtype } from "./hair-types.types";
import type { ImageMedia } from "./media.types";
import type { NaturalProfile } from "./natural-profiles.types";
import type { Person } from "./people.types";

export type HairTypePerson = {
  person: Person;
  photo?: ImageMedia;
  naturalProfile: NaturalProfile;
  subtype: HairSubtype | undefined;
};

export type HairTypePersonWithPhoto = HairTypePerson & { photo: NonNullable<HairTypePerson["photo"]> };
export type PeopleForHairTypeOptions = { requireHeroImage?: boolean; limit?: number };
