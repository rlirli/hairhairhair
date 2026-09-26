import type { ImageMetadata } from "astro";
import kindLabels from "../content/hairstyle-kinds.json";
import type {
  Appearance,
  EditorialSource,
  HairClassificationSystem,
  Hairstyle,
  HairstyleCompatibility,
  HairstyleMedia,
  HairSubtype,
  HairType,
  ImageMedia,
  NaturalProfile,
  Person,
  StyleExample,
} from "../types";

type RecordWithId = { id: string };
type MediaRecord = Omit<HairstyleMedia | ImageMedia, "image"> & {
  asset: string;
};

function records<T extends RecordWithId>(modules: Record<string, T>): T[] {
  return Object.values(modules).sort((left, right) => left.id.localeCompare(right.id));
}

const hairstyleFiles = import.meta.glob<Hairstyle>("../content/hairstyles/*.json", {
  eager: true,
  import: "default",
});
const hairTypeFiles = import.meta.glob<HairType | HairSubtype>("../content/hair-types/*.json", {
  eager: true,
  import: "default",
});
const sourceFiles = import.meta.glob<EditorialSource>("../content/sources/*.json", {
  eager: true,
  import: "default",
});
const exampleFiles = import.meta.glob<StyleExample>("../content/style-examples/*.json", {
  eager: true,
  import: "default",
});
const personFiles = import.meta.glob<Person>("../content/people/*.json", {
  eager: true,
  import: "default",
});
const appearanceFiles = import.meta.glob<Appearance>("../content/appearances/*.json", {
  eager: true,
  import: "default",
});
const profileFiles = import.meta.glob<NaturalProfile>("../content/natural-profiles/*.json", {
  eager: true,
  import: "default",
});
const systemFiles = import.meta.glob<HairClassificationSystem>("../content/classification-systems/*.json", {
  eager: true,
  import: "default",
});
type CompatibilityAssessment = {
  criteria: Array<{ dimension: string; valueId: string }>;
  score: number | null;
  provenance: "estimated";
  variationId?: string;
};
const compatibilityFiles = import.meta.glob<{ hairstyleId: string; assessments: CompatibilityAssessment[] }>(
  "../content/compatibility/*.json",
  { eager: true, import: "default" },
);
const mediaFiles = import.meta.glob<MediaRecord>("../content/media/*.json", {
  eager: true,
  import: "default",
});
const assetFiles = import.meta.glob<ImageMetadata>("../content/assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

export const hairstyles = records(hairstyleFiles);
export const hairSubtypes = records(hairTypeFiles).filter((item): item is HairSubtype => "subtypeCode" in item);
export const hairTypes = records(hairTypeFiles).filter((item): item is HairType => !("subtypeCode" in item));
export const sources = records(sourceFiles);
export const styleExamples = records(exampleFiles);
export const people = records(personFiles);
export const appearances = records(appearanceFiles);
export const naturalProfiles = records(profileFiles);
export const classificationSystems = records(systemFiles);
export { kindLabels };

export const hairstyleCompatibility: HairstyleCompatibility[] = Object.values(compatibilityFiles)
  .sort((left, right) => left.hairstyleId.localeCompare(right.hairstyleId))
  .flatMap(({ hairstyleId, assessments }) =>
    assessments.flatMap((assessment) => {
      if (assessment.criteria.length !== 1) return [];
      const hairTypeCriterion = assessment.criteria.find((criterion) => criterion.dimension === "hair-type");
      if (!hairTypeCriterion) return [];
      return [
        {
          hairstyleId,
          hairTypeId: hairTypeCriterion.valueId,
          score: assessment.score,
          provenance: assessment.provenance,
          ...(assessment.variationId ? { variationId: assessment.variationId } : {}),
        },
      ];
    }),
  )
  .sort(
    (left, right) =>
      left.hairstyleId.localeCompare(right.hairstyleId) || left.hairTypeId.localeCompare(right.hairTypeId),
  );

function loadMedia(
  files: Record<string, MediaRecord>,
  collection: "hairstyles" | "people",
): Array<HairstyleMedia | ImageMedia> {
  return records(files)
    .filter((item) => item.asset.startsWith(`assets/${collection}/`))
    .map(({ asset, ...media }) => {
      const assetModule = assetFiles[`../content/${asset}`];
      if (!assetModule) throw new Error(`Media ${media.id} references missing or unbundled asset "${asset}".`);
      return { ...media, image: assetModule } as HairstyleMedia | ImageMedia;
    });
}

export const hairstyleMedia = loadMedia(mediaFiles, "hairstyles") as HairstyleMedia[];
export const personPhotographs = loadMedia(mediaFiles, "people") as ImageMedia[];
export const MIN_COMPATIBILITY_FOR_LISTING = 0.5;
