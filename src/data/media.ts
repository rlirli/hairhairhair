import bluntBobChin from "../assets/hairstyles/blunt-bob-chin.png";
import buzzShort from "../assets/hairstyles/buzz-short.png";
import buzzTextured from "../assets/hairstyles/buzz-textured.png";
import croppedAfroCompact from "../assets/hairstyles/cropped-afro-compact.png";
import croppedAfroFull from "../assets/hairstyles/cropped-afro-full.png";
import curtainHaircutStraight1b from "../assets/hairstyles/curtain-haircut-straight-1b.png";
import farrahFawcettCutBlack from "../assets/hairstyles/farrah-fawcett-cut-black.png";
import farrahFawcettCutClassicFeathered from "../assets/hairstyles/farrah-fawcett-cut-classic-feathered.png";
import fivePointCutGeometricBlack from "../assets/hairstyles/five-point-cut-geometric-black.png";
import fivePointCutGeometricDark from "../assets/hairstyles/five-point-cut-geometric-dark.png";
import flatTopCoily from "../assets/hairstyles/flat-top-coily.png";
import flatTopStraight from "../assets/hairstyles/flat-top-straight.png";
import freeformLocsLong from "../assets/hairstyles/freeform-locs-long.png";
import frenchCropTextured2a from "../assets/hairstyles/french-crop-textured-2a.png";
import knotlessBoxBraidsMedium from "../assets/hairstyles/knotless-box-braids-medium.png";
import longLayeredCutBrunette from "../assets/hairstyles/long-layered-cut-brunette.png";
import naturalAfroDeepSkinMan from "../assets/hairstyles/natural-afro-deep-skin-man.png";
import naturalAfroRoundedCoily from "../assets/hairstyles/natural-afro-rounded-coily.png";
import patternedMohawkCurved from "../assets/hairstyles/patterned-mohawk-curved.png";
import patternedMohawkGeometric from "../assets/hairstyles/patterned-mohawk-geometric.png";
import sculptedSphericalAfroClassic from "../assets/hairstyles/sculpted-spherical-afro-classic.png";
import sculptedSphericalAfroOlderMan from "../assets/hairstyles/sculpted-spherical-afro-older-man.png";
import shortFeatheredShagCopper from "../assets/hairstyles/short-feathered-shag-copper.png";
import sleekLongCutBlonde from "../assets/hairstyles/sleek-long-cut-blonde.png";
import sleekLongCutSilverGray from "../assets/hairstyles/sleek-long-cut-silver-gray.png";
import sleekLongCutStraightBlack from "../assets/hairstyles/sleek-long-cut-straight-black.png";
import taperCoily from "../assets/hairstyles/taper-coily.png";
import taperWavy from "../assets/hairstyles/taper-wavy.png";
import theRachelClassicLayered from "../assets/hairstyles/the-rachel-classic-layered.png";
import theRachelSoftWave from "../assets/hairstyles/the-rachel-soft-wave.png";
import thinMohawkBlond from "../assets/hairstyles/thin-mohawk-blond.png";
import thinMohawkDark from "../assets/hairstyles/thin-mohawk-dark.png";
import topKnotCurly from "../assets/hairstyles/top-knot-curly.png";
import topKnotTapered from "../assets/hairstyles/top-knot-tapered.png";
import twistsLong from "../assets/hairstyles/twists-long.png";
import twistsShort from "../assets/hairstyles/twists-short.png";
import wolfCutCurlyMedium from "../assets/hairstyles/wolf-cut-curly-medium.png";
import wolfCutWavyMedium from "../assets/hairstyles/wolf-cut-wavy-medium.png";
import type { Media, MediaProvenance } from "./media-types";

export type HairstyleMedia = Media<Extract<MediaProvenance, { kind: "generated" | "photograph" }>>;

export const hairstyleMedia: HairstyleMedia[] = [
  {
    id: "blunt-bob-chin",
    src: bluntBobChin,
    alt: "Transparent editorial reference showing a chin-length blunt bob with a strong single-length perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "blunt-bob-chin", background: "transparent" },
  },
  {
    id: "buzz-short",
    src: buzzShort,
    alt: "Editorial reference showing a very short even buzz silhouette.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "buzz-short", background: "opaque" },
  },
  {
    id: "buzz-textured",
    src: buzzTextured,
    alt: "Editorial reference showing a longer textured buzz silhouette.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "buzz-textured", background: "opaque" },
  },
  {
    id: "cropped-afro-compact",
    src: croppedAfroCompact,
    alt: "Transparent editorial reference showing a compact cropped afro with a neat silhouette.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "cropped-afro-compact", background: "transparent" },
  },
  {
    id: "cropped-afro-full",
    src: croppedAfroFull,
    alt: "Transparent editorial reference showing a short cropped afro with rounded coily texture.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "cropped-afro-full", background: "transparent" },
  },
  {
    id: "curtain-haircut-straight-1b",
    src: curtainHaircutStraight1b,
    alt: "Editorial reference showing a mid-20s East Asian man with dense black straight hair in a medium-length center-parted curtain haircut.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "curtain-haircut-straight-1b",
      background: "transparent",
    },
  },
  {
    id: "farrah-fawcett-cut-black",
    src: farrahFawcettCutBlack,
    alt: "A fictional Indian woman in her 20s wearing long black hair in a Farrah-style feathered cut with broad face-opening layers and outward-flipped lower sections.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "farrah-fawcett-cut-black",
      background: "transparent",
    },
  },
  {
    id: "farrah-fawcett-cut-classic-feathered",
    src: farrahFawcettCutClassicFeathered,
    alt: "Fictional blonde woman with long heavily layered hair styled into large outward feathered sections around the face and shoulders.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "farrah-fawcett-cut-classic-feathered",
      background: "transparent",
    },
  },
  {
    id: "five-point-cut-geometric-black",
    src: fivePointCutGeometricBlack,
    alt: "Fictional woman shown three-quarter view with a glossy black geometric Five Point-style short haircut and pronounced pointed side perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "five-point-cut-geometric-black",
      background: "transparent",
    },
  },
  {
    id: "five-point-cut-geometric-dark",
    src: fivePointCutGeometricDark,
    alt: "Fictional woman shown three-quarter view with a glossy dark geometric Five Point-style short haircut and pronounced pointed side perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "five-point-cut-geometric-dark",
      background: "transparent",
    },
  },
  {
    id: "flat-top-coily",
    src: flatTopCoily,
    alt: "Generated editorial reference showing a low flat plane above short graduated sides on a fictional adult with coily texture.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "flat-top-coily", background: "opaque" },
  },
  {
    id: "flat-top-straight",
    src: flatTopStraight,
    alt: "Generated editorial reference showing an upright compact flat top with squared corners above short graduated sides on a fictional adult.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "flat-top-straight", background: "opaque" },
  },
  {
    id: "freeform-locs-long",
    src: freeformLocsLong,
    alt: "Editorial reference showing a Black man with long mature freeform locs of varied thickness and irregular natural roots.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "freeform-locs-long", background: "transparent" },
  },
  {
    id: "french-crop-textured-2a",
    src: frenchCropTextured2a,
    alt: "Editorial reference showing a fair-skinned white man with dark-blond wavy hair in a textured French crop with a short forward fringe.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "french-crop-textured-2a",
      background: "transparent",
    },
  },
  {
    id: "knotless-box-braids-medium",
    src: knotlessBoxBraidsMedium,
    alt: "Transparent editorial reference showing medium knotless box braids with flat feed-in roots.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "knotless-box-braids-medium",
      background: "transparent",
    },
  },
  {
    id: "long-layered-cut-brunette",
    src: longLayeredCutBrunette,
    alt: "Editorial reference showing an adult woman with long dark brunette hair, soft face-framing layers, curtain fringe, and loose waves.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "long-layered-cut-brunette",
      background: "transparent",
    },
  },
  {
    id: "natural-afro-deep-skin-man",
    src: naturalAfroDeepSkinMan,
    alt: "Fictional Black man in his early 40s with very deep brown skin, no beard, and a full softly rounded natural Afro with visible coily texture.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "natural-afro-deep-skin-man",
      background: "transparent",
    },
  },
  {
    id: "natural-afro-rounded-coily",
    src: naturalAfroRoundedCoily,
    alt: "Fictional Black woman with a large softly rounded natural Afro showing visible coily texture and an organic perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "natural-afro-rounded-coily",
      background: "transparent",
    },
  },
  {
    id: "patterned-mohawk-curved",
    src: patternedMohawkCurved,
    alt: "Transparent editorial reference showing a patterned mohawk with a curved raised crest.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "patterned-mohawk-curved",
      background: "transparent",
    },
  },
  {
    id: "patterned-mohawk-geometric",
    src: patternedMohawkGeometric,
    alt: "Transparent editorial reference showing a patterned mohawk with geometric shaved side detail.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "patterned-mohawk-geometric",
      background: "transparent",
    },
  },
  {
    id: "sculpted-spherical-afro-classic",
    src: sculptedSphericalAfroClassic,
    alt: "Fictional Black woman with a large dense black Afro shaped into a nearly spherical silhouette.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "sculpted-spherical-afro-classic",
      background: "transparent",
    },
  },
  {
    id: "sculpted-spherical-afro-older-man",
    src: sculptedSphericalAfroOlderMan,
    alt: "Fictional dark-skinned African man in his late 60s with a large dense black Afro shaped into a near-spherical silhouette.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "sculpted-spherical-afro-older-man",
      background: "transparent",
    },
  },
  {
    id: "short-feathered-shag-copper",
    src: shortFeatheredShagCopper,
    alt: "Editorial reference showing a tanned 60-year-old woman with short copper hair in a soft feathered shag.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "short-feathered-shag-copper",
      background: "transparent",
    },
  },
  {
    id: "sleek-long-cut-blonde",
    src: sleekLongCutBlonde,
    alt: "Fictional tanned white woman in her 40s with long sleek highlighted blonde hair and a full continuous perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "sleek-long-cut-blonde",
      background: "transparent",
    },
  },
  {
    id: "sleek-long-cut-silver-gray",
    src: sleekLongCutSilverGray,
    alt: "Fictional white woman in her 60s with long sleek center-parted silver-gray hair and a softly blunt perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "sleek-long-cut-silver-gray",
      background: "transparent",
    },
  },
  {
    id: "sleek-long-cut-straight-black",
    src: sleekLongCutStraightBlack,
    alt: "Fictional East Asian woman in her 30s with long sleek center-parted black hair and a dense straight perimeter.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "sleek-long-cut-straight-black",
      background: "transparent",
    },
  },
  {
    id: "taper-coily",
    src: taperCoily,
    alt: "Editorial reference showing a low taper with a coiled top and clean perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "taper-coily", background: "opaque" },
  },
  {
    id: "taper-wavy",
    src: taperWavy,
    alt: "Editorial reference showing a low taper with a wavy top and soft perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "taper-wavy", background: "opaque" },
  },
  {
    id: "the-rachel-classic-layered",
    src: theRachelClassicLayered,
    alt: "Fictional South Asian woman with a shoulder-length heavily layered Rachel-style haircut, rounded face framing and flicked lower ends.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "the-rachel-classic-layered",
      background: "transparent",
    },
  },
  {
    id: "the-rachel-soft-wave",
    src: theRachelSoftWave,
    alt: "Fictional middle-aged Black or mixed-race woman with a softer shoulder-length Rachel-style layered haircut and visible curved face framing.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "the-rachel-soft-wave", background: "transparent" },
  },
  {
    id: "thin-mohawk-blond",
    src: thinMohawkBlond,
    alt: "Transparent editorial reference showing a thin blond mohawk with close shaved sides.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "thin-mohawk-blond", background: "transparent" },
  },
  {
    id: "thin-mohawk-dark",
    src: thinMohawkDark,
    alt: "Transparent editorial reference showing a thin dark mohawk with close shaved sides.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "thin-mohawk-dark", background: "transparent" },
  },
  {
    id: "top-knot-curly",
    src: topKnotCurly,
    alt: "Transparent editorial reference showing a compact curly top knot.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "top-knot-curly", background: "transparent" },
  },
  {
    id: "top-knot-tapered",
    src: topKnotTapered,
    alt: "Transparent editorial reference showing a tied top knot above a tapered perimeter.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "top-knot-tapered", background: "transparent" },
  },
  {
    id: "twists-long",
    src: twistsLong,
    alt: "Editorial reference showing longer individual two-strand twists.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "twists-long", background: "opaque" },
  },
  {
    id: "twists-short",
    src: twistsShort,
    alt: "Editorial reference showing short individual two-strand twists.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "twists-short", background: "opaque" },
  },
  {
    id: "wolf-cut-curly-medium",
    src: wolfCutCurlyMedium,
    alt: "Editorial reference showing a dark-skinned woman with a medium-length curly wolf cut.",
    provenance: {
      kind: "generated",
      provider: "OpenAI",
      promptKey: "wolf-cut-curly-medium",
      background: "transparent",
    },
  },
  {
    id: "wolf-cut-wavy-medium",
    src: wolfCutWavyMedium,
    alt: "Editorial reference showing mid-20s, light skin woman with a wavy shoulder length wolf cut.",
    provenance: { kind: "generated", provider: "OpenAI", promptKey: "wolf-cut-wavy-medium", background: "transparent" },
  },
];

export function getMedia(id: string) {
  return hairstyleMedia.find((media) => media.id === id);
}
