import type { Hairstyle, StyleExample } from "../types";
import { hairstyles, styleExamples } from "./hairstyles";

export function getHairstyleBySlug(slug: string): Hairstyle | undefined {
  return hairstyles.find((hairstyle) => hairstyle.slug === slug);
}

export function getStyleExamplesForHairstyle(id: string): StyleExample[] {
  return styleExamples.filter((example) => example.hairstyleIds.includes(id));
}

export function isPublishedHairstyleGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean {
  return hairstyle.guidePublicationStatus === "published";
}

export const publishedHairstyles = hairstyles.filter(isPublishedHairstyleGuide);

export function getPublishedHairstylesByIds(ids: string[]) {
  return ids
    .map((id) => publishedHairstyles.find((style) => style.id === id))
    .filter((style): style is (typeof publishedHairstyles)[number] => Boolean(style));
}
