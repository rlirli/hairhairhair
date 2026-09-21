import buzzShort from "../assets/hairstyles/buzz-short.png";
import buzzTextured from "../assets/hairstyles/buzz-textured.png";
import flatTopCoily from "../assets/hairstyles/flat-top-coily.png";
import flatTopStraight from "../assets/hairstyles/flat-top-straight.png";
import taperCoily from "../assets/hairstyles/taper-coily.png";
import taperWavy from "../assets/hairstyles/taper-wavy.png";
import twistsLong from "../assets/hairstyles/twists-long.png";
import twistsShort from "../assets/hairstyles/twists-short.png";

export type MediaProvenance =
  | { kind: "generated"; provider: "OpenAI"; promptKey: string }
  | { kind: "photograph"; creator: string; sourceUrl: string; licenseName: string; licenseUrl: string };

export type HairstyleMedia = {
  id: string;
  src: ImageMetadata;
  alt: string;
  provenance: MediaProvenance;
};

export const hairstyleMedia: HairstyleMedia[] = [
  {
    id: "taper-coily",
    src: taperCoily,
    alt: "Editorial reference showing a low taper with a coiled top and clean perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "taper-coily" },
  },
  {
    id: "taper-wavy",
    src: taperWavy,
    alt: "Editorial reference showing a low taper with a wavy top and soft perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "taper-wavy" },
  },
  {
    id: "buzz-short",
    src: buzzShort,
    alt: "Editorial reference showing a very short even buzz silhouette.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "buzz-short" },
  },
  {
    id: "buzz-textured",
    src: buzzTextured,
    alt: "Editorial reference showing a longer textured buzz silhouette.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "buzz-textured" },
  },
  {
    id: "twists-short",
    src: twistsShort,
    alt: "Editorial reference showing short individual two-strand twists.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "twists-short" },
  },
  {
    id: "twists-long",
    src: twistsLong,
    alt: "Editorial reference showing longer individual two-strand twists.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "twists-long" },
  },
  {
    id: "flat-top-coily",
    src: flatTopCoily,
    alt: "Generated editorial reference showing a low flat plane above short graduated sides on a fictional adult with coily texture.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "flat-top-coily" },
  },
  {
    id: "flat-top-straight",
    src: flatTopStraight,
    alt: "Generated editorial reference showing an upright compact flat top with squared corners above short graduated sides on a fictional adult.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "flat-top-straight" },
  },
];

export function getMedia(id: string) {
  return hairstyleMedia.find((media) => media.id === id);
}
