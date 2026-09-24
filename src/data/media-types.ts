/** Source record for a photograph used by the site. */
export interface Photograph {
  id: string;
  fileName: string;
  alt: string;
  creator: string;
  licenseName: string;
  licenseUrl: string;
  attribution: string;
  derivativeStatus: "original" | "cropped" | "edited";
  sourceUrl: string;
  originalUrl: string;
  rightsEvidenceUrl: string;
  rightsBasis: string;
  jurisdiction: string;
  identifier: string;
  objectPosition: string;
}

export type PhotographProvenance = {
  kind: "public-domain" | "licensed";
  creator: string;
  licenseName: string;
  licenseUrl: string;
  attribution: string;
  derivativeStatus: Photograph["derivativeStatus"];
  sourceUrl: string;
  originalUrl: string;
  rightsEvidenceUrl: string;
  rightsBasis: string;
  jurisdiction: string;
  identifier: string;
};

export type MediaProvenance =
  | { kind: "generated"; provider: "OpenAI"; promptKey: string; background: "opaque" | "transparent" }
  | { kind: "photograph"; creator: string; sourceUrl: string; licenseName: string; licenseUrl: string }
  | PhotographProvenance;

export type Media<TProvenance extends MediaProvenance = MediaProvenance> = {
  id: string;
  src: ImageMetadata;
  alt: string;
  provenance: TProvenance;
};

export type PhotographMedia = Photograph & Media<PhotographProvenance>;
