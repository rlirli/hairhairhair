export interface HairClassificationSystem {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface HairCharacteristics {
  thickness?: string;
  density?: string;
  porosity?: string;
}

export type HairSubtypeCode = `${1 | 2 | 3 | 4}${"A" | "B" | "C"}`;

export interface HairSubtype {
  id: string;
  classificationSystemId: string;
  code: HairSubtypeCode;
  slug: string;
  hairTypeId: "hair-type-1" | "hair-type-2" | "hair-type-3" | "hair-type-4";
  pattern: "straight" | "wavy" | "curly" | "coily";
  subtypeCode: "A" | "B" | "C";
  name: string;
  description: string;
  sortOrder: number;
  characteristics: string[];
  comparison: string;
}

export interface HairType {
  id: string;
  code: string;
  slug: string;
  name: string;
  description: string;
  pattern: HairSubtype["pattern"];
}
