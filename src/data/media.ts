import taperCoily from '../assets/hairstyles/taper-coily.png';
import taperWavy from '../assets/hairstyles/taper-wavy.png';
import buzzShort from '../assets/hairstyles/buzz-short.png';
import buzzTextured from '../assets/hairstyles/buzz-textured.png';
import twistsShort from '../assets/hairstyles/twists-short.png';
import twistsLong from '../assets/hairstyles/twists-long.png';

export type MediaProvenance =
  | { kind: 'generated'; provider: 'OpenAI'; promptKey: string }
  | { kind: 'photograph'; creator: string; sourceUrl: string; licenseName: string; licenseUrl: string };

export type HairstyleMedia = {
  id: string;
  src: ImageMetadata;
  alt: string;
  provenance: MediaProvenance;
};

export const hairstyleMedia: HairstyleMedia[] = [
  { id: 'taper-coily', src: taperCoily, alt: 'Editorial reference showing a low taper with a coiled top and clean perimeter.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'taper-coily' } },
  { id: 'taper-wavy', src: taperWavy, alt: 'Editorial reference showing a low taper with a wavy top and soft perimeter.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'taper-wavy' } },
  { id: 'buzz-short', src: buzzShort, alt: 'Editorial reference showing a very short even buzz silhouette.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'buzz-short' } },
  { id: 'buzz-textured', src: buzzTextured, alt: 'Editorial reference showing a longer textured buzz silhouette.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'buzz-textured' } },
  { id: 'twists-short', src: twistsShort, alt: 'Editorial reference showing short individual two-strand twists.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'twists-short' } },
  { id: 'twists-long', src: twistsLong, alt: 'Editorial reference showing longer individual two-strand twists.', provenance: { kind: 'generated', provider: 'OpenAI', promptKey: 'twists-long' } },
];

export function getMedia(id: string) { return hairstyleMedia.find((media) => media.id === id); }
