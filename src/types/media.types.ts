export interface ImageMedia {
  id: string;
  kind: "image";
  image: ImageMetadata;
  alt: string;
  objectPosition?: string;
  transparentBackground?: boolean;
  provenance: MediaProvenance;
}

export type MediaProvenance = {
  origin?: string; // for example 'user-upload' | 'system'
  aiGeneration?: { provider?: string; promptKey?: string };
  licenseType?: "public-domain" | "licensed";
  creator?: string;
  licenseName?: string;
  licenseUrl?: string;
  attribution?: string;
  sourceUrl?: string;
  originalUrl?: string;
  rightsEvidenceUrl?: string;
  rightsBasis?: string;
  jurisdiction?: string;
  identifier?: string;
  derivativeStatus?: "original" | "cropped" | "edited";
};

export type HairstyleMedia = ImageMedia;
