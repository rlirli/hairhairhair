export interface Person {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImageId?: string;
  sources: PersonSource[];
}

export interface PersonSource {
  kind: "photograph" | "biography";
  url: string;
}

export interface ReportedHairstyle {
  description: string;
  sourceId: string;
}

export interface PreCatalogHairstyleCandidate {
  rank: number;
  title: string;
}

export interface AppearanceObservation {
  reportedHairstyle?: ReportedHairstyle;
  visualDescription?: string;
  preCatalogCandidates?: PreCatalogHairstyleCandidate[];
  hairstyleId?: string;
  styleExampleId?: string;
  catalogMatchReasoning?: string;
}

export interface Appearance {
  id: string;
  personId: string;
  imageId?: string;
  event: string;
  taken: {
    value: string;
    precision: "day" | "month" | "year" | "decade";
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
