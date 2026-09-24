import marioBalotelli2009 from "../assets/people/mario-balotelli-2009-inter.jpg";
import marioBalotelli2012 from "../assets/people/mario-balotelli-2012-training.jpg";
import marioBalotelli2013 from "../assets/people/mario-balotelli-2013-inter.jpg";
import marioBalotelli2014 from "../assets/people/mario-balotelli-2014-liverpool.jpg";
import marioBalotelli2019 from "../assets/people/mario-balotelli-2019-marseille.jpg";
import willSmith2009 from "../assets/people/will-smith-2009.jpg";
import willSmith2011 from "../assets/people/will-smith-2011.jpg";
import willSmith2012 from "../assets/people/will-smith-2012.jpg";
import type { Photograph, PhotographMedia, PhotographProvenance } from "./media-types";

const provenance = (photo: Photograph): PhotographProvenance => ({
  kind: photo.licenseName === "Public domain" ? "public-domain" : "licensed",
  creator: photo.creator,
  licenseName: photo.licenseName,
  licenseUrl: photo.licenseUrl,
  attribution: photo.attribution,
  derivativeStatus: photo.derivativeStatus,
  sourceUrl: photo.sourceUrl,
  originalUrl: photo.originalUrl,
  rightsEvidenceUrl: photo.rightsEvidenceUrl,
  rightsBasis: photo.rightsBasis,
  jurisdiction: photo.jurisdiction,
  identifier: photo.identifier,
});

export function buildPersonMedia(photographs: Photograph[]): PhotographMedia[] {
  const sources: Record<string, ImageMetadata> = {
    "will-smith-2009.jpg": willSmith2009,
    "will-smith-2011.jpg": willSmith2011,
    "will-smith-2012.jpg": willSmith2012,
    "mario-balotelli-2009-inter.jpg": marioBalotelli2009,
    "mario-balotelli-2012-training.jpg": marioBalotelli2012,
    "mario-balotelli-2013-inter.jpg": marioBalotelli2013,
    "mario-balotelli-2014-liverpool.jpg": marioBalotelli2014,
    "mario-balotelli-2019-marseille.jpg": marioBalotelli2019,
  };
  return photographs
    .map((photo) => ({ ...photo, src: sources[photo.fileName], provenance: provenance(photo) }))
    .filter((photo) => photo.src);
}
