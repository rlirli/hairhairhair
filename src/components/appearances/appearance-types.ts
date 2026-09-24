import type { ImageMedia } from "../../types";

export interface AppearanceCardData {
  id: string;
  personSlug: string;
  personName: string;
  date: string;
  event: string;
  media: ImageMedia;
}
