import { styleExamples } from "./hairstyles";
import { getMedia } from "./media";

export function representativeHairstyleMedia(hairstyleId: string) {
  const example = styleExamples.find((item) => item.hairstyleIds.includes(hairstyleId));
  if (!example) return undefined;

  const media = getMedia(example.imageId);
  return media ? { example, media } : undefined;
}
