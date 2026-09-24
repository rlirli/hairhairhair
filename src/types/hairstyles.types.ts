export interface HairstyleVariation {
  id: string;
  name: string;
  description: string;
}

export interface HairstyleConsultation {
  intro: string;
  questions: string[];
  sampleRequest: string;
}

export interface HairstyleOriginDate {
  year: number;
  precision: "year" | "decade";
  sourceId: string;
}

export interface HairstyleInventor {
  name: string;
  sourceId: string;
}

export interface Hairstyle {
  id: string;
  slug: string;
  name: string;
  kind: "cut" | "finishing-technique" | "styling-technique";
  summary: string;
  intro: string[];
  variations: HairstyleVariation[];
  consultation: HairstyleConsultation;
  considerations: string[];
  sourceIds: string[];
  relatedStyleIds: string[];
  guidePublicationStatus: "draft" | "published";
  inventedAt?: HairstyleOriginDate;
  inventor?: HairstyleInventor;
}

export interface StyleExample {
  id: string;
  hairstyleIds: string[];
  imageId: string;
  title: string;
  caption: string;
  patternDescription: string;
  lengthDescription: string;
}

export interface EditorialSource {
  id: string;
  title: string;
  displayTitle?: string;
  url: string;
  publisher: string;
  reviewedAt: string;
}

export interface HairstyleCompatibility {
  hairstyleId: string;
  hairTypeId: string;
  score: number | null;
  provenance: "estimated";
  variationId?: string;
}

export interface HairTypeSpecificHairstyleAdvice {
  hairstyleId: string;
  hairTypeId: string;
  note: string;
}
