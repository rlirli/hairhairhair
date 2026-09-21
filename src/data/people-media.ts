import willSmith2009 from '../assets/people/will-smith-2009.jpg';
import willSmith2011 from '../assets/people/will-smith-2011.jpg';
import willSmith2012 from '../assets/people/will-smith-2012.jpg';
import type { PersonPhotograph } from './people';

export type PublicDomainMedia = {
  kind: 'public-domain';
  creator: string;
  sourceUrl: string;
  originalUrl: string;
  rightsEvidenceUrl: string;
  rightsBasis: string;
  jurisdiction: 'United States';
  identifier: string;
};

export type PersonMedia = PersonPhotograph & {
  src: ImageMetadata;
  provenance: PublicDomainMedia;
};

const provenance = (photo: PersonPhotograph): PublicDomainMedia => ({
  kind: 'public-domain',
  creator: photo.creator,
  sourceUrl: photo.sourceUrl,
  originalUrl: photo.originalUrl,
  rightsEvidenceUrl: photo.rightsEvidenceUrl,
  rightsBasis: photo.rightsBasis,
  jurisdiction: photo.jurisdiction,
  identifier: photo.identifier,
});

export function buildPersonMedia(photographs: PersonPhotograph[]): PersonMedia[] {
  const sources: Record<string, ImageMetadata> = {
    'will-smith-2009.jpg': willSmith2009,
    'will-smith-2011.jpg': willSmith2011,
    'will-smith-2012.jpg': willSmith2012,
  };
  return photographs.map((photo) => ({ ...photo, src: sources[photo.fileName], provenance: provenance(photo) })).filter((photo) => photo.src);
}
