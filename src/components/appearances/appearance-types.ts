import type { ImageMedia } from "../../data/media-types";

export interface AppearanceCardData {
  id: string;
  personSlug: string;
  personName: string;
  date: string;
  event: string;
  media: ImageMedia;
}
