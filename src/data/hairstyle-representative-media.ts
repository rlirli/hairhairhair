import { styleExamples } from "./hairstyles";
import { getHairstyleMediaById } from "./media";

export function getRepresentativeHairstyleMedia(hairstyleId: string) {
  const example = styleExamples.find((item) => item.hairstyleIds.includes(hairstyleId));
  if (!example) return undefined;

  const media = getHairstyleMediaById(example.imageId);
  return media ? { example, media } : undefined;
}
