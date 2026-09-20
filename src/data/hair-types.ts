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

export interface HairType {
  id: string;
  classificationSystemId: string;
  code: string;
  slug: string;
  family: "straight" | "wavy" | "curly" | "coily";
  subtype: "A" | "B" | "C";
  name: string;
  description: string;
  sortOrder: number;
  characteristics: string[];
  comparison: string;
}

export interface HairFamily {
  id: string;
  code: string;
  slug: string;
  name: string;
  description: string;
  family: HairType['family'];
}

export const classificationSystems: HairClassificationSystem[] = [
  {
    id: "walker-inspired-expanded",
    name: "Modern expanded Walker-inspired curl-pattern chart",
    code: "WALKER-EXPANDED-12",
    description:
      "A common 1A–4C shorthand for describing visible natural pattern, expanded from the Walker tradition. It is a reference vocabulary, not a diagnosis or a measure of strand properties.",
  },
];

const classificationSystemId = "walker-inspired-expanded";

export const hairTypes: HairType[] = [
  {
    id: "hair-type-1a",
    classificationSystemId,
    code: "1A",
    slug: "1a",
    family: "straight",
    subtype: "A",
    name: "Straight, very little visible bend",
    description: "Falls from root to tip with a nearly linear silhouette.",
    sortOrder: 1,
    characteristics: ["Minimal visible bend", "Smooth line when air-dried", "Little to no natural wave"],
    comparison: "The least visibly bent pattern in this chart; 1B and 1C show more body or bend.",
  },
  {
    id: "hair-type-1b",
    classificationSystemId,
    code: "1B",
    slug: "1b",
    family: "straight",
    subtype: "B",
    name: "Straight with gentle body",
    description: "Mostly straight, with a little natural fullness or movement.",
    sortOrder: 2,
    characteristics: ["Mostly linear fall", "Subtle body", "No continuous S-wave"],
    comparison: "More body than 1A, but less visible bend than 1C.",
  },
  {
    id: "hair-type-1c",
    classificationSystemId,
    code: "1C",
    slug: "1c",
    family: "straight",
    subtype: "C",
    name: "Straight with visible bend",
    description: "Generally straight, with occasional bends or a slight wave through the lengths.",
    sortOrder: 3,
    characteristics: ["Straight overall shape", "Noticeable bends", "Movement may appear in the lengths"],
    comparison: "The most visibly bent straight-family pattern; 2A forms a more continuous S-wave.",
  },
  {
    id: "hair-type-2a",
    classificationSystemId,
    code: "2A",
    slug: "2a",
    family: "wavy",
    subtype: "A",
    name: "Loose S-wave",
    description: "Forms a soft, open S-shape that may begin below the roots.",
    sortOrder: 4,
    characteristics: ["Open S-shaped pattern", "Loose wave definition", "Often flatter near the roots"],
    comparison: "The loosest wavy pattern; 2B and 2C have progressively stronger S-bends.",
  },
  {
    id: "hair-type-2b",
    classificationSystemId,
    code: "2B",
    slug: "2b",
    family: "wavy",
    subtype: "B",
    name: "Defined S-wave",
    description: "Shows a clearer S-shaped wave through the lengths, often with a straighter root area.",
    sortOrder: 5,
    characteristics: ["Distinct S-waves", "Wave often starts mid-length", "More pattern than 2A"],
    comparison: "More defined than 2A, while 2C bends more strongly and closer to the roots.",
  },
  {
    id: "hair-type-2c",
    classificationSystemId,
    code: "2C",
    slug: "2c",
    family: "wavy",
    subtype: "C",
    name: "Strong S-wave",
    description: "Forms pronounced S-bends from near the roots and can approach a loose curl.",
    sortOrder: 6,
    characteristics: ["Pronounced S-waves", "Pattern close to the roots", "Some sections may loop"],
    comparison: "The strongest wavy pattern; 3A begins to form repeated spiral loops.",
  },
  {
    id: "hair-type-3a",
    classificationSystemId,
    code: "3A",
    slug: "3a",
    family: "curly",
    subtype: "A",
    name: "Loose spiral curl",
    description: "Forms visible, open spiral loops with a rounded curl path.",
    sortOrder: 7,
    characteristics: ["Open spiral loops", "Rounded curl path", "Clear curl formation"],
    comparison: "Looser and larger-looking loops than 3B; 2C is more S-shaped than spiral.",
  },
  {
    id: "hair-type-3b",
    classificationSystemId,
    code: "3B",
    slug: "3b",
    family: "curly",
    subtype: "B",
    name: "Springy spiral curl",
    description: "Forms compact, spring-like spirals with a clear repeating curl path.",
    sortOrder: 8,
    characteristics: ["Spring-like spirals", "Compact repeating loops", "Defined curl path"],
    comparison: "Tighter and more compact than 3A; 3C has the smallest curls in the curly family.",
  },
  {
    id: "hair-type-3c",
    classificationSystemId,
    code: "3C",
    slug: "3c",
    family: "curly",
    subtype: "C",
    name: "Tight spiral curl",
    description: "Forms dense, tightly looping spirals that retain a rounded curl shape.",
    sortOrder: 9,
    characteristics: ["Tight spiral loops", "Small rounded curl path", "Strong curl definition"],
    comparison: "Tighter than 3B; 4A shifts from rounded spirals toward visibly coiled loops.",
  },
  {
    id: "hair-type-4a",
    classificationSystemId,
    code: "4A",
    slug: "4a",
    family: "coily",
    subtype: "A",
    name: "Defined coiled loops",
    description: "Forms small, visibly coiled loops with a repeating rounded pattern.",
    sortOrder: 10,
    characteristics: ["Small coiled loops", "Rounded repeating pattern", "Visible coil from close range"],
    comparison: "More tightly coiled than 3C; 4B uses sharper bends rather than rounded loops.",
  },
  {
    id: "hair-type-4b",
    classificationSystemId,
    code: "4B",
    slug: "4b",
    family: "coily",
    subtype: "B",
    name: "Z-shaped coils and bends",
    description: "Follows a compact path of sharp bends and angles rather than round loops.",
    sortOrder: 11,
    characteristics: ["Z-shaped bends", "Angular compact pattern", "Less visibly round than 4A"],
    comparison: "More angular than 4A; 4C has the least consistently visible repeated pattern.",
  },
  {
    id: "hair-type-4c",
    classificationSystemId,
    code: "4C",
    slug: "4c",
    family: "coily",
    subtype: "C",
    name: "Very tight, subtle coil pattern",
    description: "Has very tight bends or coils whose repeated pattern may be subtle without close inspection.",
    sortOrder: 12,
    characteristics: ["Very tight bends", "Pattern can look less defined", "Compact coil or zig-zag path"],
    comparison: "The least visibly uniform coily pattern in this chart; 4A and 4B show clearer loop or angle repetition.",
  },
];

export const hairFamilies: HairFamily[] = [
  { id: 'hair-family-1', code: '1', slug: '1', name: 'Straight', family: 'straight', description: 'Patterns that fall mostly linear, from almost no visible bend to a slight bend through the lengths.' },
  { id: 'hair-family-2', code: '2', slug: '2', name: 'Wavy', family: 'wavy', description: 'Patterns shaped by visible S-waves, from soft open movement to pronounced bends near the roots.' },
  { id: 'hair-family-3', code: '3', slug: '3', name: 'Curly', family: 'curly', description: 'Patterns that form repeated rounded loops or spirals, with curl definition that varies by subtype.' },
  { id: 'hair-family-4', code: '4', slug: '4', name: 'Coily', family: 'coily', description: 'Compact patterns of coils, curves, or angles whose scale and visibility shift across subtypes.' },
];

export function getHairType(slug: string): HairType | undefined {
  return hairTypes.find((hairType) => hairType.slug === slug);
}
