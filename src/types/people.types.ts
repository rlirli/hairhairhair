export interface Person {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImageId: string;
  sources: PersonSource[];
}

export interface PersonSource {
  kind: "photograph" | "biography";
  url: string;
}

export interface AppearanceObservation {
  hairstyleId: string;
  note: string;
}

export interface Appearance {
  id: string;
  personId: string;
  imageId: string;
  event: string;
  taken: {
    value: string;
    precision: "day" | "year";
    sourceUrl: string;
  };
  observations: AppearanceObservation[];
}

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
