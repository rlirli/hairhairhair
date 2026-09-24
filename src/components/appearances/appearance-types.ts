import type { PhotographMedia } from "../../data/media-types";

export interface AppearanceCardData {
  id: string;
  personSlug: string;
  personName: string;
  date: string;
  event: string;
  media: PhotographMedia;
}
