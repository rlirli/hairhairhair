export interface Person {
  id: string;
  slug: string;
  name: string;
  description: string;
  intro: string[];
  heroImageId: string;
  sourceUrls: string[];
}

export interface AppearanceObservation {
  hairstyleId: string;
  note: string;
}

export interface Appearance {
  id: string;
  personId: string;
  imageId: string;
  event: string;
  taken: {
    value: string;
    precision: 'day' | 'year';
    sourceUrl: string;
  };
  observations: AppearanceObservation[];
}

export interface PersonPhotograph {
  id: string;
  fileName: string;
  alt: string;
  creator: string;
  sourceUrl: string;
  originalUrl: string;
  rightsEvidenceUrl: string;
  rightsBasis: string;
  jurisdiction: 'United States';
  identifier: string;
}

const obamaFindingAid =
  'https://www.obamalibrary.gov/digital-research-room/finding-aids/photographs-will-smith-22-64503-f';
const paramountBiography =
  'https://ir.paramount.com/static-files/9b49e1c7-435f-49d1-b432-b9b08f8cd9e1';

export const people: Person[] = [
  {
    id: 'person-will-smith',
    slug: 'will-smith',
    name: 'Will Smith',
    description: 'Actor and recording artist whose public appearances show how a haircut can change a silhouette over time.',
    intro: [
      'Will Smith is an actor and recording artist. These three dated photographs follow close-cropped looks and a low flat top between 2009 and 2012.',
      'Compare top height, outline, edge shape, and visible finish as you move through the appearances. Use the images as haircut references, not as a definition of someone’s natural hair characteristics.',
    ],
    heroImageId: 'will-smith-2012',
    sourceUrls: [obamaFindingAid, paramountBiography],
  },
];

export const appearances: Appearance[] = [
  {
    id: 'appearance-will-smith-2009',
    personId: 'person-will-smith',
    imageId: 'will-smith-2009',
    event: 'Nobel Peace Prize ceremony, Oslo City Hall',
    taken: { value: '2009-12-10', precision: 'day', sourceUrl: 'https://catalog.archives.gov/id/355006648' },
    observations: [
      { hairstyleId: 'hairstyle-buzz-cut', note: 'A close-cropped silhouette with a neat, low profile in the available frame.' },
    ],
  },
  {
    id: 'appearance-will-smith-2011',
    personId: 'person-will-smith',
    imageId: 'will-smith-2011',
    event: 'White House State Dining Room visit',
    taken: { value: '2011-04-24', precision: 'day', sourceUrl: 'https://catalog.archives.gov/id/355008678' },
    observations: [
      { hairstyleId: 'hairstyle-flat-top', note: 'A low, squared flat-top shape is visible at the crown and front.' },
    ],
  },
  {
    id: 'appearance-will-smith-2012',
    personId: 'person-will-smith',
    imageId: 'will-smith-2012',
    event: 'Fleet Week New York aboard Intrepid',
    taken: { value: '2012-05-23', precision: 'day', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg#Summary' },
    observations: [
      { hairstyleId: 'hairstyle-buzz-cut', note: 'A short, close-cropped top with a subtle perimeter transition is visible from the front.' },
    ],
  },
];

export const personPhotographs: PersonPhotograph[] = [
  {
    id: 'will-smith-2009',
    fileName: 'will-smith-2009.jpg',
    alt: 'Will Smith seated at a 2009 Nobel Peace Prize event, shown in profile with a close-cropped haircut.',
    creator: 'White House Photo Office / National Archives and Records Administration',
    sourceUrl: 'https://catalog.archives.gov/id/355006648',
    originalUrl: 'https://catalog.archives.gov/medialz/presidential-libraries/obama/bho-whpo/81145631/Batch0031/P121009PS-0547.JPG',
    rightsEvidenceUrl: obamaFindingAid,
    rightsBasis: 'Official U.S. federal White House photograph held in the Obama Presidential Library collection; public-domain U.S. government work.',
    jurisdiction: 'United States',
    identifier: 'P121009PS-0547',
  },
  {
    id: 'will-smith-2011',
    fileName: 'will-smith-2011.jpg',
    alt: 'Will Smith standing at a 2011 White House event with a low squared flat-top haircut.',
    creator: 'White House Photo Office / National Archives and Records Administration',
    sourceUrl: 'https://catalog.archives.gov/id/355008678',
    originalUrl: 'https://catalog.archives.gov/medialz/presidential-libraries/obama/bho-whpo/81145631/Batch0031/P042411PS-0363.JPG',
    rightsEvidenceUrl: obamaFindingAid,
    rightsBasis: 'Official U.S. federal White House photograph held in the Obama Presidential Library collection; public-domain U.S. government work.',
    jurisdiction: 'United States',
    identifier: 'P042411PS-0363',
  },
  {
    id: 'will-smith-2012',
    fileName: 'will-smith-2012.jpg',
    alt: 'Will Smith aboard the Intrepid during Fleet Week New York in 2012, wearing a short close-cropped haircut beside sailors.',
    creator: 'Mass Communication Specialist 2nd Class Drae Parker / U.S. Navy',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg',
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg',
    rightsEvidenceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg#Licensing',
    rightsBasis: 'U.S. Navy personnel official-duty photograph; the file record identifies the work as public domain under the PD-US Navy basis. VIRIN 120523-N-MH374-101; released.',
    jurisdiction: 'United States',
    identifier: '120523-N-MH374-101',
  },
];
