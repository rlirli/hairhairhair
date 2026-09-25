import marioBalotelli2009 from "../assets/people/mario-balotelli-2009-inter.jpg";
import marioBalotelli2012 from "../assets/people/mario-balotelli-2012-training.jpg";
import marioBalotelli2013 from "../assets/people/mario-balotelli-2013-inter.jpg";
import marioBalotelli2014 from "../assets/people/mario-balotelli-2014-liverpool.jpg";
import marioBalotelli2019 from "../assets/people/mario-balotelli-2019-marseille.jpg";
import willSmith2009 from "../assets/people/will-smith-2009.jpg";
import willSmith2011 from "../assets/people/will-smith-2011.jpg";
import willSmith2012 from "../assets/people/will-smith-2012.jpg";
import type { Appearance, ImageMedia, Person } from "../types";

const obamaFindingAid =
  "https://www.obamalibrary.gov/digital-research-room/finding-aids/photographs-will-smith-22-64503-f";
const paramountBiography = "https://ir.paramount.com/static-files/9b49e1c7-435f-49d1-b432-b9b08f8cd9e1";
const britannicaMarioBalotelli = "https://www.britannica.com/biography/Mario-Balotelli";

export const people: Person[] = [
  {
    id: "person-will-smith",
    slug: "will-smith",
    name: "Will Smith",
    description:
      "Willard Carroll Smith II (born September 25, 1968, in Philadelphia, Pennsylvania) is an American actor, rapper, and film producer.",
    heroImageId: "will-smith-2012",
    sources: [
      { kind: "photograph", url: obamaFindingAid },
      { kind: "biography", url: paramountBiography },
    ],
  },
  {
    id: "person-mario-balotelli",
    slug: "mario-balotelli",
    name: "Mario Balotelli",
    description:
      "Mario Balotelli Barwuah (born August 12, 1990, in Palermo, Italy) is an Italian professional footballer.",
    heroImageId: "mario-balotelli-2012-training",
    sources: [{ kind: "biography", url: britannicaMarioBalotelli }],
  },
];

export const appearances: Appearance[] = [
  {
    id: "appearance-will-smith-2009",
    personId: "person-will-smith",
    imageId: "will-smith-2009",
    event: "Nobel Peace Prize ceremony, Oslo City Hall",
    taken: { value: "2009-12-10", precision: "day", sourceUrl: "https://catalog.archives.gov/id/355006648" },
    observations: [
      {
        hairstyleId: "hairstyle-buzz-cut",
        note: "A close-cropped silhouette with a neat, low profile in the available frame.",
      },
    ],
  },
  {
    id: "appearance-will-smith-2011",
    personId: "person-will-smith",
    imageId: "will-smith-2011",
    event: "White House State Dining Room visit",
    taken: { value: "2011-04-24", precision: "day", sourceUrl: "https://catalog.archives.gov/id/355008678" },
    observations: [
      { hairstyleId: "hairstyle-flat-top", note: "A low, squared flat-top shape is visible at the crown and front." },
    ],
  },
  {
    id: "appearance-will-smith-2012",
    personId: "person-will-smith",
    imageId: "will-smith-2012",
    event: "Fleet Week New York aboard Intrepid",
    taken: {
      value: "2012-05-23",
      precision: "day",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg#Summary",
    },
    observations: [
      {
        hairstyleId: "hairstyle-buzz-cut",
        note: "A short, close-cropped top with a subtle perimeter transition is visible from the front.",
      },
    ],
  },
  {
    id: "appearance-mario-balotelli-2009",
    personId: "person-mario-balotelli",
    imageId: "mario-balotelli-2009-inter",
    event: "Inter Milan match",
    taken: {
      value: "2009-08-16",
      precision: "day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_-_Inter_Mailand_(1).jpg",
    },
    observations: [
      {
        hairstyleId: "hairstyle-buzz-cut",
        note: "Very short, even buzz cut with a clean, low profile; the hair is visible from the front and crown.",
      },
    ],
  },
  {
    id: "appearance-mario-balotelli-2012",
    personId: "person-mario-balotelli",
    imageId: "mario-balotelli-2012-training",
    event: "Italy Euro 2012 training camp",
    taken: {
      value: "2012-06-26",
      precision: "day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_Euro_2012_Training.jpg",
    },
    observations: [
      {
        hairstyleId: "hairstyle-thin-mohawk",
        note: "Shaved sides and a narrow raised strip along the centre create a clearly visible mohawk-style silhouette.",
      },
    ],
  },
  {
    id: "appearance-mario-balotelli-2013",
    personId: "person-mario-balotelli",
    imageId: "mario-balotelli-2013-inter",
    event: "Inter Milan–AC Milan match",
    taken: {
      value: "2013-02-24",
      precision: "day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Balotelli_Inter-Milan_february_2013_(cropped).jpg",
    },
    observations: [
      {
        hairstyleId: "hairstyle-thin-mohawk",
        note: "The available frame shows a compact fauxhawk-like shape; Thin mohawk is the nearest published hairstyle, not a claim of an exact match.",
      },
    ],
  },
  {
    id: "appearance-mario-balotelli-2014",
    personId: "person-mario-balotelli",
    imageId: "mario-balotelli-2014-liverpool",
    event: "Liverpool vs West Ham United",
    taken: {
      value: "2014-09-21",
      precision: "day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_with_Liverpool_September_2014.jpg",
    },
    observations: [
      {
        hairstyleId: "hairstyle-taper-fade",
        note: "Short close tapered sides with a slightly longer textured top are visible in the available frame.",
      },
    ],
  },
  {
    id: "appearance-mario-balotelli-2019",
    personId: "person-mario-balotelli",
    imageId: "mario-balotelli-2019-marseille",
    event: "Olympique de Marseille debut",
    taken: {
      value: "2019-01-25",
      precision: "day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_OM_(cropped).jpg",
    },
    observations: [
      { hairstyleId: "hairstyle-top-knot", note: "Very short sides frame a longer top gathered into a small topknot." },
    ],
  },
];

export const personPhotographs: ImageMedia[] = [
  {
    id: "will-smith-2009",
    kind: "image",
    image: willSmith2009,
    alt: "Will Smith seated at a 2009 Nobel Peace Prize event, shown in profile with a close-cropped haircut.",
    objectPosition: "70% 48%",
    provenance: {
      origin: "system",
      licenseType: "public-domain",
      creator: "White House Photo Office / National Archives and Records Administration",
      licenseName: "Public domain",
      licenseUrl: "https://www.usa.gov/government-copyright",
      attribution: "White House Photo Office / National Archives and Records Administration, public domain",
      sourceUrl: "https://catalog.archives.gov/id/355006648",
      originalUrl:
        "https://catalog.archives.gov/medialz/presidential-libraries/obama/bho-whpo/81145631/Batch0031/P121009PS-0547.JPG",
      rightsEvidenceUrl: obamaFindingAid,
      rightsBasis:
        "Official U.S. federal White House photograph held in the Obama Presidential Library collection; public-domain U.S. government work.",
      jurisdiction: "United States",
      identifier: "P121009PS-0547",
      derivativeStatus: "original",
    },
  },
  {
    id: "will-smith-2011",
    kind: "image",
    image: willSmith2011,
    alt: "Will Smith standing at a 2011 White House event with a low squared flat-top haircut.",
    objectPosition: "58% 43%",
    provenance: {
      origin: "system",
      licenseType: "public-domain",
      creator: "White House Photo Office / National Archives and Records Administration",
      licenseName: "Public domain",
      licenseUrl: "https://www.usa.gov/government-copyright",
      attribution: "White House Photo Office / National Archives and Records Administration, public domain",
      sourceUrl: "https://catalog.archives.gov/id/355008678",
      originalUrl:
        "https://catalog.archives.gov/medialz/presidential-libraries/obama/bho-whpo/81145631/Batch0031/P042411PS-0363.JPG",
      rightsEvidenceUrl: obamaFindingAid,
      rightsBasis:
        "Official U.S. federal White House photograph held in the Obama Presidential Library collection; public-domain U.S. government work.",
      jurisdiction: "United States",
      identifier: "P042411PS-0363",
      derivativeStatus: "original",
    },
  },
  {
    id: "will-smith-2012",
    kind: "image",
    image: willSmith2012,
    alt: "Will Smith aboard the Intrepid during Fleet Week New York in 2012, wearing a short close-cropped haircut beside sailors.",
    objectPosition: "61% 43%",
    provenance: {
      origin: "system",
      licenseType: "public-domain",
      creator: "Mass Communication Specialist 2nd Class Drae Parker / U.S. Navy",
      licenseName: "Public domain",
      licenseUrl: "https://www.usa.gov/government-copyright",
      attribution: "Mass Communication Specialist 2nd Class Drae Parker / U.S. Navy, public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg",
      rightsEvidenceUrl:
        "https://commons.wikimedia.org/wiki/File:Flickr_-_Official_U.S._Navy_Imagery_-_Actor_Will_Smith_poses_for_a_photo_with_Sailors..jpg#Licensing",
      rightsBasis:
        "U.S. Navy personnel official-duty photograph; the file record identifies the work as public domain under the PD-US Navy basis. VIRIN 120523-N-MH374-101; released.",
      jurisdiction: "United States",
      identifier: "120523-N-MH374-101",
      derivativeStatus: "original",
    },
  },
  {
    id: "mario-balotelli-2009-inter",
    kind: "image",
    image: marioBalotelli2009,
    alt: "Mario Balotelli playing for Inter Milan in 2009 with a very short buzz cut.",
    objectPosition: "50% 40%",
    provenance: {
      origin: "system",
      licenseType: "licensed",
      creator: "Steindy",
      licenseName: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      attribution: "Steindy, CC BY-SA 3.0, via Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_-_Inter_Mailand_(1).jpg",
      originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Mario_Balotelli_-_Inter_Mailand_%281%29.jpg",
      rightsEvidenceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_-_Inter_Mailand_(1).jpg#Licensing",
      rightsBasis: "Wikimedia Commons file record identifies this image as CC BY-SA 3.0.",
      jurisdiction: "Italy",
      identifier: "Mario Balotelli - Inter Mailand (1)",
      derivativeStatus: "original",
    },
  },
  {
    id: "mario-balotelli-2012-training",
    kind: "image",
    image: marioBalotelli2012,
    alt: "Mario Balotelli at Italy's Euro 2012 training camp with a narrow mohawk.",
    objectPosition: "50% 38%",
    provenance: {
      origin: "system",
      licenseType: "licensed",
      creator: "Piotr Drabik",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      attribution: "Piotr Drabik, CC BY 2.0, via Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_Euro_2012_Training.jpg",
      originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Mario_Balotelli_Euro_2012_Training.jpg",
      rightsEvidenceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_Euro_2012_Training.jpg#Licensing",
      rightsBasis: "Wikimedia Commons file record identifies this image as CC BY 2.0.",
      jurisdiction: "Poland",
      identifier: "Mario Balotelli Euro 2012 Training",
      derivativeStatus: "original",
    },
  },
  {
    id: "mario-balotelli-2013-inter",
    kind: "image",
    image: marioBalotelli2013,
    alt: "Mario Balotelli during an Inter Milan match in February 2013 with a compact raised front.",
    objectPosition: "52% 40%",
    provenance: {
      origin: "system",
      licenseType: "licensed",
      creator: "danheap77",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      attribution: "danheap77, CC BY 2.0, via Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Balotelli_Inter-Milan_february_2013_(cropped).jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Balotelli_Inter-Milan_february_2013_%28cropped%29.jpg",
      rightsEvidenceUrl:
        "https://commons.wikimedia.org/wiki/File:Balotelli_Inter-Milan_february_2013_(cropped).jpg#Licensing",
      rightsBasis: "Wikimedia Commons file record identifies this crop as CC BY 2.0.",
      jurisdiction: "United Kingdom",
      identifier: "Balotelli Inter-Milan february 2013 (cropped)",
      derivativeStatus: "cropped",
    },
  },
  {
    id: "mario-balotelli-2014-liverpool",
    kind: "image",
    image: marioBalotelli2014,
    alt: "Mario Balotelli with Liverpool in September 2014 wearing a short tapered haircut.",
    objectPosition: "50% 42%",
    provenance: {
      origin: "system",
      licenseType: "licensed",
      creator: "Egghead06",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      attribution: "Egghead06, CC BY-SA 4.0, via Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_with_Liverpool_September_2014.jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Mario_Balotelli_with_Liverpool_September_2014.jpg",
      rightsEvidenceUrl:
        "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_with_Liverpool_September_2014.jpg#Licensing",
      rightsBasis: "Wikimedia Commons file record identifies this image as CC BY-SA 4.0.",
      jurisdiction: "United Kingdom",
      identifier: "Mario Balotelli with Liverpool September 2014",
      derivativeStatus: "original",
    },
  },
  {
    id: "mario-balotelli-2019-marseille",
    kind: "image",
    image: marioBalotelli2019,
    alt: "Mario Balotelli at Olympique de Marseille in January 2019 with a small topknot.",
    objectPosition: "50% 43%",
    provenance: {
      origin: "system",
      licenseType: "licensed",
      creator: "Bigmatbasket",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      attribution: "Bigmatbasket, CC BY-SA 4.0, via Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_OM_(cropped).jpg",
      originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Mario_Balotelli_OM_%28cropped%29.jpg",
      rightsEvidenceUrl: "https://commons.wikimedia.org/wiki/File:Mario_Balotelli_OM_(cropped).jpg#Licensing",
      rightsBasis: "Wikimedia Commons file record identifies this crop as CC BY-SA 4.0.",
      jurisdiction: "France",
      identifier: "Mario Balotelli OM (cropped)",
      derivativeStatus: "cropped",
    },
  },
];
