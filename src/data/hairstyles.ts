export interface HairstyleVariation {
  id: string;
  name: string;
  description: string;
}

export interface HairstyleConsultation {
  intro: string;
  questions: string[];
  sampleRequest: string;
}

export interface HairstyleOriginDate {
  year: number;
  precision: "year" | "decade";
  sourceId: string;
}

export interface HairstyleInventor {
  name: string;
  sourceId: string;
}

export interface Hairstyle {
  id: string;
  slug: string;
  name: string;
  kind: "cut" | "finishing-technique" | "styling-technique";
  summary: string;
  intro: string[];
  variations: HairstyleVariation[];
  consultation: HairstyleConsultation;
  considerations: string[];
  sourceIds: string[];
  relatedStyleIds: string[];
  guidePublicationStatus: "draft" | "published";
  inventedAt?: HairstyleOriginDate;
  inventor?: HairstyleInventor;
}

export interface StyleExample {
  id: string;
  hairstyleIds: string[];
  imageId: string;
  title: string;
  caption: string;
  patternDescription: string;
  lengthDescription: string;
}

export interface EditorialSource {
  id: string;
  title: string;
  displayTitle?: string;
  url: string;
  publisher: string;
  reviewedAt: string;
}

export const sources: EditorialSource[] = [
  {
    id: "aad-traction",
    title: "Hairstyles that pull can lead to hair loss",
    url: "https://www.aad.org/public/diseases/hair-loss/causes/hairstyles",
    publisher: "American Academy of Dermatology",
    reviewedAt: "2026-09-20",
  },
  {
    id: "allure-protective-styles-history",
    title: "Protective Styles Are the Armor Black Women Have Worn for Centuries",
    url: "https://www.allure.com/story/protective-styles-meaning-history-michaela-angela-davis",
    publisher: "Allure",
    reviewedAt: "2026-09-24",
  },
  {
    id: "allure-shag-haircut-ideas",
    title: "31 Cute Shag Haircut Ideas for Any Length and Texture — See Photos",
    url: "https://www.allure.com/gallery/shag-haircut-ideas-trend",
    publisher: "Allure",
    reviewedAt: "2026-09-24",
  },
  {
    id: "allure-wolf-cut-2026",
    title: "The Wolf Cut Won't Ever Go Out of Style",
    url: "https://www.allure.com/story/wolf-cut-trend-haircut-tips-2026",
    publisher: "Allure",
    reviewedAt: "2026-09-22",
  },
  {
    id: "andis-buzz-cut",
    title: "Soft & Subtle Buzz Cut",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=1439",
    publisher: "Andis Education",
    reviewedAt: "2026-09-20",
  },
  {
    id: "andis-classic-clipper",
    title: "Essentials—Classic Clipper Cutting",
    displayTitle: "Essentials - Classic Clipper Cutting",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=1330",
    publisher: "Andis Education",
    reviewedAt: "2026-09-21",
  },
  {
    id: "andis-low-taper",
    title: "Fluid Vol 1: Low Taper Fade",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=84",
    publisher: "Andis Education",
    reviewedAt: "2026-09-20",
  },
  {
    id: "british-vogue-70s-summer-haircuts",
    title: "These ’70s Haircuts Have Become Summer’s Most Sought-After Styles",
    url: "https://www.vogue.co.uk/article/70s-summer-haircuts",
    publisher: "British Vogue",
    reviewedAt: "2026-09-24",
  },
  {
    id: "cambridge-flattop",
    title: "flattop",
    url: "https://dictionary.cambridge.org/us/dictionary/english/flattop",
    publisher: "Cambridge Dictionary",
    reviewedAt: "2026-09-21",
  },
  {
    id: "carols-daughter-braids-twists",
    title: "Braids vs. Twists: What’s The Difference?",
    url: "https://carolsdaughter.com/blogs/beauty-blog/braids-vs-twists-what-s-the-difference",
    publisher: "Carol's Daughter",
    reviewedAt: "2026-09-20",
  },
  {
    id: "carols-daughter-knotless-braids",
    title: "What Are Knotless Braids? A Complete Guide to Installation and Care",
    url: "https://carolsdaughter.com/blogs/beauty-blog/what-are-knotless-braids",
    publisher: "Carol's Daughter",
    reviewedAt: "2026-09-22",
  },
  {
    id: "dreadlockulture-freeform-locs",
    title: "What Are Freeform Locs?",
    url: "https://dreadlockulture.com/what-are-freeform-locs/",
    publisher: "DreadlocKulture",
    reviewedAt: "2026-09-24",
  },
  {
    id: "essence-knotless-braids",
    title: "Inside The Mystifying World Of Knotless Braids",
    url: "https://www.essence.com/beauty/knotless-braids-summer-protective-styles/",
    publisher: "Essence",
    reviewedAt: "2026-09-22",
  },
  {
    id: "guardian-balotelli-hair-obituary",
    title: "Mario Balotelli’s hair: an obituary 2008–2015",
    url: "https://www.theguardian.com/fashion/2015/aug/26/mario-balotellis-liverpool-milan-loan-hair-an-obituary",
    publisher: "The Guardian",
    reviewedAt: "2026-09-22",
  },
  {
    id: "haircom-blunt-bob",
    title: "Blunt Bob With Bangs: 19 Ways To Own The Look",
    url: "https://www.hair.com/blunt-bob-with-bangs.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-22",
  },
  {
    id: "haircom-classic-men",
    title: "The Trendiest Classic Hairstyles For Men To Try",
    url: "https://www.hair.com/classic-hairstyles-for-men.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-curtain-hairstyle",
    title: "This Iconic ‘90s Look For Men Is Making A Serious Comeback On Tik Tok",
    url: "https://www.hair.com/e-boy-curtain-hairstyle.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-face-framing-layers",
    title: "35 Face-Framing Layers Ideas That’ll Have You Gunning It to the Salon",
    url: "https://www.hair.com/face-framing-layers.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-feathered-hair",
    title: "Feathered Hair Is Back: Here’s How To Pull It Off",
    url: "https://www.hair.com/feathered-hair.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-layered-hair",
    title: "Why You Need to Try Layered Hair + 15 Gorgeous Styles To Inspire Your Next Chop",
    url: "https://www.hair.com/layered-hair.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-low-maintenance-men",
    title: "18 Trending Low Maintenance Haircuts For Men",
    url: "https://www.hair.com/low-maintenance-haircuts-for-men.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-short-haircuts-older-women",
    title: "9 Short Cuts And Styles For Older Women That Look Totally Polished",
    url: "https://www.hair.com/short-haircuts-for-older-women.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-type-1b",
    title: "1B Hair: What Is It and How to Care For It",
    url: "https://www.hair.com/1b-hair.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-24",
  },
  {
    id: "haircom-wolf-cut",
    title: "What You Need To Know About The Wolf Cut Hair Trend",
    url: "https://www.hair.com/wolf-cut-hair.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-22",
  },
  {
    id: "mancity-balotelli-blond-bombshell",
    title: "Mario Balotelli: Blond bombshell",
    url: "https://www.mancity.com/news/first-team/first-team-news/archive/2011/november/mario-balotelli-blond-bombshell",
    publisher: "Manchester City",
    reviewedAt: "2026-09-22",
  },
  {
    id: "menshealth-barber-haircuts",
    title: "Get the Perfect Barber Haircut: How to Talk to Your Barber",
    url: "https://www.menshealth.com/grooming/a42363964/how-to-ask-barber-for-haircuts/",
    publisher: "Men's Health",
    reviewedAt: "2026-09-24",
  },
  {
    id: "menshealth-french-crop",
    title: "The 10 Best Summer Hairstyles for Men",
    url: "https://www.menshealth.com/grooming/a27079237/summer-hairstyles-for-men/",
    publisher: "Men's Health",
    reviewedAt: "2026-09-24",
  },
  {
    id: "milady-natural-hair",
    title: "Milady Standard Natural Hair Care and Braiding, 2nd Edition",
    url: "https://www.milady.com/catalog/milady-standard-natural-hair-care-braiding",
    publisher: "Milady",
    reviewedAt: "2026-09-20",
  },
  {
    id: "oxford-flat-top",
    title: "flat-top",
    url: "https://www.oxfordlearnersdictionaries.com/us/definition/english/flat-top",
    publisher: "Oxford Learner’s Dictionaries",
    reviewedAt: "2026-09-21",
  },
  {
    id: "smithsonian-dread-history",
    title: "Dread History: The African Diaspora, Ethiopianism, and Rastafari",
    url: "https://www.smithsonianeducation.org/migrations/rasta/pic07.html",
    publisher: "Smithsonian Institution",
    reviewedAt: "2026-09-24",
  },
  {
    id: "vogue-cher-hair-2014",
    title: "Elizabeth Olsen's New Miu Miu Campaign: Why We Are Obsessed with Her 1970s Cher Hair",
    url: "https://www.vogue.com/article/elizabeth-olsens-new-miu-miu-campaign-why-we-are-obsessed-with-her-1970s-cher-hair",
    publisher: "Vogue",
    reviewedAt: "2026-09-24",
  },
  {
    id: "vogue-emrata-bangs-2024",
    title: "EmRata's New Bangs Are What Dreams Are Made Of",
    url: "https://www.vogue.com/article/emratas-new-bangs-2024",
    publisher: "Vogue",
    reviewedAt: "2026-09-24",
  },
  {
    id: "vogue-germany-liquid-hair",
    title: "Liquid Hair: So bekommen Sie ultraglänzendes Haar wie Kim Kardashian, Jennifer Lopez & Co.",
    url: "https://www.vogue.de/beauty/artikel/liquid-hair-glaenzendes-haar-kim-kardashian-jennifer-lopez",
    publisher: "Vogue Germany",
    reviewedAt: "2026-09-24",
  },
  {
    id: "vogue-india-volumising-haircuts-straight-hair",
    title: "10 volumising haircuts to try for straight hair, according to experts",
    url: "https://www.vogue.in/content/10-volumising-haircuts-to-try-for-straight-hair-according-to-experts",
    publisher: "Vogue India",
    reviewedAt: "2026-09-24",
  },
  {
    id: "wahl-cut-guide",
    title: "STEP-BY-STEP GUIDE FOR CUTTING HAIR",
    displayTitle: "Step-by-step hair cutting",
    url: "https://www.wahlpro.com/amfile/file/download/file/504/product/582/",
    publisher: "Wahl Professional",
    reviewedAt: "2026-09-20",
  },
  {
    id: "wahl-flat-top-guide",
    title: "Home Haircutting guide",
    displayTitle: "Home haircutting",
    url: "https://www.wahlpro.com/amfile/file/download/file/762/product/1818/",
    publisher: "Wahl Professional",
    reviewedAt: "2026-09-21",
  },
];

export const hairstyles: Hairstyle[] = [
  {
    id: "hairstyle-blunt-bob",
    slug: "blunt-bob",
    name: "Blunt bob",
    kind: "cut",
    summary: "A short bob defined by a strong, nearly single-length perimeter with little or no visible layering.",
    intro: [
      "A blunt bob creates its shape through the perimeter: the ends read as one deliberate line rather than a stack of visible layers.",
      "Jaw- and chin-length versions make the outline especially obvious, but the exact length can move slightly above or below the jaw. Natural wave, curl and coil can soften the visual line without changing the underlying cut.",
    ],
    variations: [
      {
        id: "blunt-bob-fringe",
        name: "Blunt bob with fringe",
        description: "Pairs the strong bob perimeter with a separate fringe or bang shape.",
      },
      {
        id: "blunt-bob-chin",
        name: "Chin-length blunt bob",
        description: "A compact version whose perimeter finishes around the jaw or chin.",
      },
      {
        id: "blunt-bob-curly",
        name: "Curly blunt bob",
        description: "Keeps the blunt perimeter while allowing natural curl to create movement and volume above it.",
      },
    ],
    consultation: {
      intro:
        "Agree on the finished perimeter, dry length and amount of layering before cutting; those choices determine whether the result still reads as blunt.",
      questions: [
        "Where should the perimeter sit: above the jaw, at the chin, or slightly below it?",
        "Should the line be completely one-length or include very subtle internal shaping?",
        "Will the hair usually be worn straight, wavy, curly or coily?",
        "Should the front remain level with the back or become slightly longer?",
      ],
      sampleRequest:
        "“I’d like a chin-length blunt bob with a strong single-length perimeter, no visible layers, and enough length that it still lands around my jaw when worn naturally.”",
    },
    considerations: [
      "Natural curl and coil can make an identical underlying perimeter appear less geometrically straight, so dry-state length matters.",
      "A very precise blunt edge becomes visibly softer as it grows, making maintenance frequency part of the consultation.",
      "Removing too much internal weight changes the silhouette toward a layered bob even if the outer perimeter remains short.",
    ],
    sourceIds: ["haircom-blunt-bob"],
    relatedStyleIds: [],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-buzz-cut",
    slug: "buzz-cut",
    name: "Buzz cut",
    kind: "cut",
    summary: "A clipper-led short cut whose evenness, top length, and edge finish can be adjusted to the wearer.",
    intro: [
      "“Buzz cut” names a family of short clipper cuts, not one mandatory length. A uniform pass can make the head read as one clean shape; a slightly longer top, soft edge, or taper around the ears can add contrast without turning it into a different category of service.",
      "The practical decision is the length map: same short length everywhere, a longer top, or a blended perimeter. A soft edge, sharp outline, or taper around the ears can change the character without changing the short-cut brief.",
      "Ask to confirm the approximate length before the clipper work begins. Guards and clipper settings vary by tool, so a number alone is less useful than a visible reference and a clear “same all over” or “longer on top” instruction.",
    ],
    variations: [
      {
        id: "buzz-cut-buzz-fade",
        name: "Buzz with taper or fade",
        description: "Pairs the short top with a gradually shorter perimeter around the ears, temples, or neckline.",
      },
      {
        id: "buzz-cut-even",
        name: "Even buzz",
        description: "Uses one overall short length for a simple, uniform silhouette.",
      },
      {
        id: "buzz-cut-textured",
        name: "Textured buzz",
        description: "Leaves enough top length for visible movement or texture while the perimeter stays close.",
      },
    ],
    consultation: {
      intro: "Describe the length map first, then the edge finish and whether the top should remain visibly textured.",
      questions: [
        "Do you want the same short length all over, or a longer top with a taper or fade?",
        "What approximate length feels comfortable, and can we test a small section first?",
        "Should the hairline, sideburns, and neckline stay natural or be sharply outlined?",
        "Should the top be brushed, left textured, or cut to read as an even surface?",
      ],
      sampleRequest:
        "“I want a short buzz with a little more length on top, a soft taper around the ears and neck, and a natural edge. Please show me the approximate top length before taking it shorter.”",
    },
    considerations: [
      "Head shape, hairline, growth direction, and scalp visibility affect the final silhouette; they are reasons to consult, not reasons to rule the cut out.",
      "Very short hair makes changes in length visible quickly, so agree on the first pass before asking for a closer finish.",
      "The visible result can differ between dry and damp hair and between straight, wavy, curly, and coily patterns; the cut should be assessed in the state in which it will usually be worn.",
    ],
    sourceIds: ["andis-buzz-cut", "wahl-cut-guide"],
    relatedStyleIds: ["hairstyle-flat-top", "hairstyle-taper-fade", "hairstyle-twists"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-cropped-afro",
    slug: "cropped-afro",
    name: "Cropped afro",
    kind: "cut",
    summary:
      "A short rounded shape that keeps coily texture visible while trimming the silhouette close and intentional.",
    intro: [
      "A cropped afro keeps the natural coily texture visible in a compact, rounded silhouette. It is fuller than a buzz cut while remaining short enough for a simple everyday shape.",
      "The outline can be soft and natural or more closely edged. Length should be agreed in the hair’s usual dry state because shrinkage changes the apparent height and width.",
    ],
    variations: [
      {
        id: "cropped-afro-compact",
        name: "Close crop",
        description: "Keeps the shape tighter and closer to the head while preserving visible texture.",
      },
      {
        id: "cropped-afro-full",
        name: "Full compact crop",
        description: "Leaves enough length for a clearly rounded, textured silhouette.",
      },
      {
        id: "cropped-afro-edge",
        name: "Natural or edged perimeter",
        description: "Chooses between a softer natural hairline and a more defined outline.",
      },
    ],
    consultation: {
      intro:
        "Describe the desired rounded height, shrinkage, and perimeter finish rather than relying on a generic short-cut label.",
      questions: [
        "How much rounded height should remain after the hair returns to its dry state?",
        "Should the shape stay full at the sides or taper slightly toward the perimeter?",
        "Do you want a natural edge or a more defined line-up?",
        "Would a small test section help confirm the finished length before the full cut?",
      ],
      sampleRequest:
        "“I’d like a compact cropped afro with enough length to keep the coil texture visible, a softly rounded outline, and a natural hairline rather than a sharp line-up.”",
    },
    considerations: [
      "Shrinkage can make a short crop look substantially tighter after washing or drying; assess it in the state it will usually be worn.",
      "Density and growth direction influence whether the silhouette reads round, squared, or uneven as it grows.",
      "A cropped afro is distinct from a buzz cut by the visible textured fullness it retains; if you want a simpler uniform crop, explore the Buzz cut style.",
    ],
    sourceIds: ["guardian-balotelli-hair-obituary"],
    relatedStyleIds: ["hairstyle-patterned-mohawk", "hairstyle-thin-mohawk", "hairstyle-top-knot"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-curtain-haircut",
    slug: "curtain-haircut",
    name: "Curtain haircut",
    kind: "cut",
    summary:
      "A medium-length cut built around a center or near-center part, with longer front sections falling away from the forehead to frame both sides of the face.",
    intro: [
      "The curtain haircut is defined by its split front silhouette: longer hair is parted through the center or close to it and falls to either side of the forehead.",
      "Classic versions commonly keep enough length around the front and sides to reach roughly ear level, while modern versions range from sleek and controlled to softer, more textured interpretations.",
      "The haircut is especially recognizable on straight and wavy hair, where the two front sections can form the characteristic loose C-shaped sweep.",
    ],
    variations: [
      {
        id: "curtain-haircut-classic",
        name: "Classic curtains",
        description:
          "Medium-length hair with a clear center part and smooth front sections falling symmetrically to either side.",
      },
      {
        id: "curtain-haircut-curly",
        name: "Curly curtains",
        description:
          "A curl-specific interpretation that preserves the center split and face-framing front while allowing the hair to form a fuller rounded silhouette.",
      },
      {
        id: "curtain-haircut-textured",
        name: "Textured curtains",
        description:
          "A looser version with more separation, movement and visible natural texture through the front and crown.",
      },
    ],
    consultation: {
      intro:
        "Agree on front length, part position, side length and how strongly the hair should sweep away from the face before cutting.",
      questions: [
        "Should the part sit exactly in the center or slightly off-center?",
        "Where should the front sections finish when dry: eyebrow, cheekbone, ear or lower?",
        "Should the sides remain full around the ears or be tapered shorter?",
        "Do you want a sleek classic finish or more natural texture and separation?",
        "How much daily styling are you willing to do to maintain volume and the outward sweep?",
      ],
      sampleRequest:
        "“I’d like medium-length curtains with a clean center part, enough length in front to sweep toward my cheekbones, full sides around the ears, and a soft natural bend rather than a hard-styled finish.”",
    },
    considerations: [
      "The style needs sufficient front length for the hair to divide and fall to both sides of the face.",
      "Very straight or fine hair may need blow-drying or light styling product to create lift and an outward bend instead of lying flat.",
      "Natural waves can create the curtain movement with less styling, while stronger curls increasingly produce a curl-specific interpretation rather than the sleek classic silhouette.",
      "Density affects how exposed the center part appears and how much volume the two front sections can hold.",
    ],
    sourceIds: ["haircom-curtain-hairstyle", "haircom-type-1b"],
    relatedStyleIds: [],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-flat-top",
    slug: "flat-top",
    name: "Flat top",
    kind: "cut",
    summary:
      "A short cut shaped around a visibly flat top plane, with the height and side finish chosen for the wearer.",
    intro: [
      "A flat top is defined by its visible plane: the hair is cut short and arranged so the top reads as a flat, squared surface. The plane can sit low and restrained or rise into a more graphic silhouette, while the sides and back can carry a taper or a sharper outline.",
      "Bring front and side references and name the top height, whether the plane should stay level or follow an intentional slope, and how close the sides and neckline should finish. A single front image cannot establish the back, side profile, or maintenance routine.",
      "The examples here are visual references, not a permanent hair-type assignment or a guarantee of outcome. Growth direction, hair texture, head shape, proportion, product, and styling effort all affect how the plane reads.",
    ],
    variations: [
      {
        id: "flat-top-higher",
        name: "Higher top",
        description:
          "Sets the top plane farther above the scalp for a taller, more graphic shape; confirm how much daily direction or product is acceptable.",
      },
      {
        id: "flat-top-low",
        name: "Low flat top",
        description:
          "Keeps the top plane close to the head for a restrained, compact silhouette like the selected 2011 appearance reference.",
      },
      {
        id: "flat-top-side-finish",
        name: "Tapered or outlined sides",
        description:
          "Pairs the plane with a gradual taper, short uniform sides, or a sharper outline around the temples, sideburns, and neckline.",
      },
    ],
    consultation: {
      intro:
        "Name the top height, plane direction, side length, and edge finish separately so the silhouette is clear before cutting.",
      questions: [
        "Should the top sit low and compact or rise higher for a more graphic silhouette?",
        "Should the plane read level, or should it follow an intentional slope or front-to-back direction?",
        "Do you want a taper, short uniform sides, or a sharper outline at the temples, sideburns, and neckline?",
        "Where does the hair change direction, and how much brushing or product are you willing to use to keep the top standing?",
      ],
      sampleRequest:
        "“I want a low flat top with a compact, squared plane, short graduated sides, and a natural neckline. Please show me the top height and side profile before taking it shorter, and tell me what daily styling it will need.”",
    },
    considerations: [
      "Growth direction, cowlicks, head shape, and proportion can change where the plane needs to be adjusted; assess the hair in its usual dry, worn state.",
      "Texture and length affect how easily the top stands and whether the plane reads crisp, soft, stepped, or less level as it grows out. The barber should confirm the visual goal rather than treat any pattern as an exclusion.",
      "A higher or more sharply outlined shape may require more frequent maintenance and directed styling. Agree on a little extra length first when the desired height or hold is uncertain.",
    ],
    sourceIds: [
      "andis-classic-clipper",
      "cambridge-flattop",
      "oxford-flat-top",
      "wahl-cut-guide",
      "wahl-flat-top-guide",
    ],
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-taper-fade"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-freeform-locs",
    slug: "freeform-locs",
    name: "Freeform locs",
    kind: "styling-technique",
    summary:
      "Locs allowed to develop organically with little manipulation, producing irregular sections, varied thickness, and a less uniformly maintained root structure.",
    intro: [
      "Freeform locs develop by allowing hair to tangle, mat, and lock with little manipulation rather than establishing a precise parting grid and repeatedly retwisting each section.",
      "Because the hair determines much of its own sectioning, mature freeform locs commonly vary in diameter and shape, and neighboring locs may naturally join as they develop.",
      "Locs have particular historical and spiritual significance within Rastafari, where uncombed and uncut locked hair has been worn as an expression of African identity and religious commitment. Freeform locs are not limited to Rastafari wearers, and the hairstyle should not be treated as a costume or shorthand for reggae culture.",
    ],
    variations: [
      {
        id: "freeform-locs-congo",
        name: "Joined freeform locs",
        description:
          "Allows some neighboring locs to merge into broader sections rather than routinely separating every root.",
      },
      {
        id: "freeform-locs-mature-long",
        name: "Long mature freeform locs",
        description:
          "Well-developed locs with substantial hanging length, visible differences in thickness, organic roots, and a naturally irregular overall silhouette.",
      },
      {
        id: "freeform-locs-semi-freeform",
        name: "Semi-freeform locs",
        description:
          "Preserves an organic freeform appearance while using occasional root separation or limited maintenance to influence how extensively sections join.",
      },
    ],
    consultation: {
      intro:
        "Discuss how much intervention is desired, whether naturally joining sections should be separated, and how much control the wearer wants over loc size and root structure.",
      questions: [
        "Do you want the hair to form almost entirely on its own, or should some sections be separated as they begin to join?",
        "Are you comfortable with locs developing at visibly different thicknesses and with irregular root sections?",
        "Should larger joined sections be preserved or gently separated?",
        "What finished length are you working toward, and how much shrinkage should be expected while the locs mature?",
        "Do you want to maintain a completely freeform root appearance or use occasional semi-freeform maintenance?",
      ],
      sampleRequest:
        "“I want mature freeform locs with natural irregular sectioning and varied thickness. I don't want a clean part grid or routine retwists; only separate sections occasionally if several locs start joining more than I want.”",
    },
    considerations: [
      "Freeform describes the low-manipulation locking method rather than neglect: regular cleansing and scalp care remain compatible with freeforming.",
      "The final number, thickness, and placement of locs are inherently less predictable than with deliberately sectioned starter-loc methods.",
      "Locs may join together naturally at the roots, so deciding whether and how often to separate them materially affects the mature silhouette.",
      "Tightly curled and coily hair generally locks readily with minimal intervention, while straighter textures may take longer or require more assistance to establish stable locs.",
      "Length changes during maturation because loose hair compacts as it tangles and locks, so apparent growth and hanging length do not correspond directly to unloc'd hair length.",
    ],
    sourceIds: ["allure-protective-styles-history", "dreadlockulture-freeform-locs", "smithsonian-dread-history"],
    relatedStyleIds: ["hairstyle-twists"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-french-crop",
    slug: "french-crop",
    name: "French crop",
    kind: "cut",
    summary:
      "A compact short haircut with short back and sides, a slightly longer textured top, and a short fringe deliberately styled forward over the forehead.",
    intro: [
      "The French crop is defined less by a particular fade and more by the relationship between its compact sides, textured top and forward-facing fringe.",
      "Classic versions keep the fringe short and relatively blunt, while modern versions often break up the edge with texture for a softer, less geometric finish.",
      "The top normally stays short enough to remain compact but long enough to show texture and direction rather than reading as a uniform buzz cut.",
    ],
    variations: [
      {
        id: "french-crop-classic",
        name: "Classic French crop",
        description:
          "Short back and sides with a compact textured top and a short, relatively straight fringe worn forward.",
      },
      {
        id: "french-crop-curly",
        name: "Curly French crop",
        description:
          "Adapts the compact crop and forward fringe to naturally curly hair, producing a fuller and less linear front edge.",
      },
      {
        id: "french-crop-textured",
        name: "Textured French crop",
        description:
          "Uses more separation and irregularity through the top and fringe while preserving the forward direction.",
      },
    ],
    consultation: {
      intro:
        "The main choices are fringe length and shape, top texture, side length, and whether the sides should be simply short, tapered, or faded.",
      questions: [
        "How short should the fringe sit on the forehead?",
        "Should the fringe edge look blunt and graphic or broken and textured?",
        "How much length should remain on top for texture?",
        "Should the sides and back be clipper-short, tapered, or faded?",
        "Do you want a compact natural finish or stronger separation through the top?",
      ],
      sampleRequest:
        "“I’d like a textured French crop with a short broken fringe pushed forward, about a few centimeters of texture on top, and short natural sides without taking the fade down to skin.”",
    },
    considerations: [
      "The forward fringe is a defining feature; without it, the result may read as a generic textured crop.",
      "Very straight hair may need texturizing and matte product to keep the top from appearing flat or helmet-like.",
      "Wavy hair naturally creates separation and movement through the short top.",
      "Curly hair can support the same cut geometry, but stronger curl patterns soften the straight horizontal character of the classic fringe.",
      "The haircut does not inherently require a skin fade; keeping the sides simply short or softly tapered can preserve a more balanced, less fade-dominant silhouette.",
    ],
    sourceIds: [
      "haircom-classic-men",
      "haircom-low-maintenance-men",
      "menshealth-barber-haircuts",
      "menshealth-french-crop",
    ],
    relatedStyleIds: [],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-knotless-box-braids",
    slug: "knotless-box-braids",
    name: "Knotless box braids",
    kind: "styling-technique",
    summary:
      "Individual braids that begin with natural hair at the root, with extension hair gradually fed in for a flatter, less bulky base.",
    intro: [
      "Knotless box braids use the same individual sectioning associated with box braids, but omit the extension knot at the scalp.",
      "The braider starts with the wearer’s own hair and progressively feeds in extension hair. This produces a flatter transition from scalp to braid and can reduce root tension compared with conventional knotted box braids.",
    ],
    variations: [
      {
        id: "knotless-box-braids-jumbo",
        name: "Jumbo knotless box braids",
        description: "Larger sections and thicker individual braids for a more graphic, lower-count braid pattern.",
      },
      {
        id: "knotless-box-braids-medium",
        name: "Medium knotless box braids",
        description:
          "Moderately sized individual braids balancing visible sectioning, installation time and overall braid density.",
      },
      {
        id: "knotless-box-braids-small",
        name: "Small knotless box braids",
        description: "Finer sections and narrower braids creating a denser, more flexible finished set.",
      },
    ],
    consultation: {
      intro: "Agree on braid size, finished length, parting pattern and extension weight before installation.",
      questions: [
        "How small or large should each braid be?",
        "What finished length do you want?",
        "Should the sections form a regular box grid or a softer staggered pattern?",
        "How much extension hair should be added to each braid?",
        "How light should the front and hairline sections remain?",
      ],
      sampleRequest:
        "“I’d like medium knotless box braids around mid-back length, with neat square sections, a flat natural-looking root and light tension around the hairline.”",
    },
    considerations: [
      "Knotless describes the feed-in starting technique, not a guarantee of low tension; section size, extension weight and braider technique still matter.",
      "Longer or thicker extensions add more suspended weight to each section.",
      "The natural-hair root remains more exposed than with a conventional extension knot, so new growth and frizz become visible at the base.",
      "Installation generally takes longer than conventional box braids because extension hair is introduced incrementally.",
    ],
    sourceIds: ["carols-daughter-knotless-braids", "essence-knotless-braids"],
    relatedStyleIds: [],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-long-layered-cut",
    slug: "long-layered-cut",
    name: "Long layered cut",
    kind: "cut",
    summary:
      "A long haircut that preserves substantial overall length while using graduated layers to create movement, reduce weight, and frame the face.",
    intro: [
      "A long layered cut keeps the overall silhouette distinctly long while introducing shorter sections through the interior and perimeter so the hair moves more freely than a one-length cut.",
      "Face-framing layers are shorter pieces cut strategically around the face and then graduated into the longer lengths. They can be subtle or pronounced and may exist with or without extensive layering through the rest of the hair.",
      "A common modern variation combines long layers with cheekbone-length curtain fringe or soft bangs, root volume, and a textured or softly wavy finish.",
    ],
    variations: [
      {
        id: "long-layered-cut-face-framing",
        name: "Face-framing long layers",
        description: "Uses shorter pieces around the face that gradually connect into the retained long perimeter.",
      },
      {
        id: "long-layered-cut-curtain-fringe",
        name: "Long layers with curtain fringe",
        description:
          "Pairs long graduated layers with a parted fringe that opens away from the center and blends into the face frame.",
      },
      {
        id: "long-layered-cut-soft",
        name: "Soft long layers",
        description:
          "Keeps the shortest layers relatively long and blended for movement without a strongly stepped silhouette.",
      },
    ],
    consultation: {
      intro:
        "The defining choices are retained overall length, where the shortest layers begin, how strongly the face frame is cut, and whether fringe is part of the shape.",
      questions: [
        "How much overall length do you want to keep?",
        "Where should the shortest face-framing pieces begin: cheekbone, jaw, or lower?",
        "Should the layers remain soft and blended or create more visible separation and volume?",
        "Do you want curtain bangs or no dedicated fringe?",
        "Will you usually wear the hair straight, naturally textured, or styled with waves?",
      ],
      sampleRequest:
        "“I’d like to keep the hair long, add soft layers throughout for movement, start the face-framing pieces around my cheekbones, and add a long curtain fringe that blends into the sides rather than a heavy blunt bang.”",
    },
    considerations: [
      "The shortest layer establishes much of the visible shape, so reference points such as cheekbone, jaw, collarbone, and shoulder are more useful than asking for layers generically.",
      "Face-framing layers can exist without extensive layering through the rest of the haircut, so the amount of internal layering should be discussed separately.",
      "Layers can remove weight from dense hair and create movement, but excessive layering can make fine or low-density ends appear thinner.",
      "Straight hair shows the graduation between layer lengths clearly, while waves and curls create a softer and more voluminous interpretation of the same underlying structure.",
      "Curtain fringe changes the front silhouette substantially and should be treated as an optional variation rather than a defining requirement of the long layered cut.",
    ],
    sourceIds: ["haircom-face-framing-layers", "haircom-layered-hair", "vogue-emrata-bangs-2024"],
    relatedStyleIds: ["hairstyle-sleek-long-cut", "hairstyle-wolf-cut"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-patterned-mohawk",
    slug: "patterned-mohawk",
    name: "Patterned mohawk",
    kind: "cut",
    summary: "A raised central crest paired with deliberately shaved or patterned sides.",
    intro: [
      "A patterned mohawk keeps the sides intentionally visible as design: shaved lines, geometric panels, or a shaped transition frame a central strip of longer hair.",
      "The crest can be narrow or broad, softly rounded or sharply graphic. Bring front, side, and rear references so the barber can map the pattern and explain how it will grow out.",
    ],
    variations: [
      {
        id: "patterned-mohawk-curved",
        name: "Curved crest",
        description: "Keeps the central strip rounded or swept rather than strictly angular.",
      },
      {
        id: "patterned-mohawk-geometric",
        name: "Geometric sides",
        description: "Uses crisp lines or panels shaved into the sides for a graphic finish.",
      },
      {
        id: "patterned-mohawk-soft",
        name: "Soft transition",
        description: "Blends the sides more gradually while retaining a distinct raised center.",
      },
    ],
    consultation: {
      intro: "Name the crest width, height, side pattern, and maintenance tolerance separately.",
      questions: [
        "How wide and tall should the central strip read from the front and side?",
        "Do you want hard shaved lines, a geometric panel, or a softer pattern?",
        "Should the crest stand naturally or rely on product and directed styling?",
        "How often can you refresh the shaved design as it grows out?",
      ],
      sampleRequest:
        "“I want a narrow raised crest with one curved shaved design on each side. Keep the edges crisp but leave enough length to style the crest without heavy product.”",
    },
    considerations: [
      "A pattern is a design commitment: small growth changes can soften its legibility quickly.",
      "Crest height depends on length, density, growth direction, and styling support; agree on the dry silhouette before cutting.",
      "Shaved designs are not a natural-pattern classification and should be assessed as a cut and finish choice.",
    ],
    sourceIds: ["guardian-balotelli-hair-obituary", "mancity-balotelli-blond-bombshell"],
    relatedStyleIds: ["hairstyle-cropped-afro", "hairstyle-thin-mohawk", "hairstyle-top-knot"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-short-feathered-shag",
    slug: "short-feathered-shag",
    name: "Short feathered shag",
    kind: "cut",
    summary:
      "A short layered shag built around crown lift, airy feathered sections, face framing, and a light broken perimeter around the ears and nape.",
    intro: [
      "A short feathered shag combines the layered structure of a shag with deliberately airy, feathered movement through the ends.",
      "The defining shape uses shorter layers through the crown to create lift, while the sides and perimeter break into lighter face-framing and nape pieces rather than forming a solid bob line.",
      "Feathering describes how strategically placed layers and styling create lightness, separation, and movement; it is not simply another word for layering.",
    ],
    variations: [
      {
        id: "short-feathered-shag-curly",
        name: "Curly short shag",
        description:
          "Adapts the short shag structure to curls with customized crown and face-framing layers while retaining natural curl definition.",
      },
      {
        id: "short-feathered-shag-wispy-fringe",
        name: "Short feathered shag with wispy fringe",
        description:
          "Adds a light broken fringe that connects into feathered face-framing layers around the temples and cheeks.",
      },
      {
        id: "short-feathered-shag-soft",
        name: "Soft feathered shag",
        description:
          "Keeps the crown layering blended and the perimeter airy for a softer, less choppy interpretation.",
      },
    ],
    consultation: {
      intro:
        "Agree on crown height, fringe shape, ear and nape length, and how pronounced the feathered movement should be before cutting.",
      questions: [
        "How short should the crown layers be, and how much lift do you want there?",
        "Should the fringe be wispy, fuller, side-swept, or omitted?",
        "Should the sides expose the ears or retain soft pieces around them?",
        "How much length should remain at the nape?",
        "Do you want the ends styled with a visible outward feather or left closer to their natural texture?",
      ],
      sampleRequest:
        "“I’d like a short feathered shag with airy crown layers, a soft wispy fringe, feathered pieces around my ears and cheeks, and a little length left at the nape. Keep it soft and blended rather than giving me a strongly disconnected wolf cut.”",
    },
    considerations: [
      "The haircut should show visible crown layering and a broken, lightweight perimeter; without that structure it can read as a generic short layered cut.",
      "Feathering is partly a styling result. Blow-drying or shaping the ends away from the face can make the airy layered structure more pronounced.",
      "Fine hair can benefit from strategically placed crown layers, but excessive thinning can reduce the visual density of the perimeter.",
      "Curly and coily textures can support a shag structure, but layer length should be customized for shrinkage and curl behavior rather than copied directly from a straight or wavy reference.",
      "Shorter, choppier feathered cuts generally need more frequent reshaping than longer, more uniform layers.",
    ],
    sourceIds: ["allure-shag-haircut-ideas", "haircom-feathered-hair", "haircom-short-haircuts-older-women"],
    relatedStyleIds: ["hairstyle-wolf-cut"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-sleek-long-cut",
    slug: "sleek-long-cut",
    name: "Sleek long cut",
    kind: "cut",
    summary:
      "A long, near-one-length cut with a dense clean perimeter and minimal visible layering, worn with a smooth straight finish that emphasizes length, shine, and an uninterrupted silhouette.",
    intro: [
      "The sleek long cut keeps the hair distinctly long and visually continuous from roots to ends, with little or no visible graduation through the lengths. Its strongest identifying feature is a substantial, clean perimeter rather than the movement and stepped graduation of a long layered cut.",
      "Long, center-parted, poker-straight hair became an especially recognizable fashion image in the 1970s, with Cher's long straight black hair repeatedly cited as emblematic of the era. Contemporary versions retain that uninterrupted length but often push the finish toward greater smoothness and reflectivity.",
      "The haircut and the finish should be discussed separately: the underlying cut can be maintained as a one-length or nearly one-length shape, while the sleek appearance depends on the hair's natural pattern, drying method, smoothing technique, condition, and desired level of shine.",
    ],
    variations: [
      {
        id: "sleek-long-cut-center-part",
        name: "Center-part sleek long cut",
        description:
          "Keeps a central part and an uninterrupted long silhouette, emphasizing symmetry and the clean perimeter.",
      },
      {
        id: "sleek-long-cut-liquid-finish",
        name: "Liquid-finish sleek long cut",
        description:
          "Uses a highly smooth, glossy finish with more fluid movement through the long lengths rather than the stiffer polished effect associated with short glass-hair looks.",
      },
      {
        id: "sleek-long-cut-soft-perimeter",
        name: "Soft-perimeter sleek long cut",
        description:
          "Retains the one-length visual impression but lightly softens or point-cuts the ends so the perimeter is less severe while still reading as dense and continuous.",
      },
    ],
    consultation: {
      intro:
        "Agree on retained length, perimeter density, how strictly one-length the shape should remain, parting, and the amount of daily smoothing required to achieve the intended finish.",
      questions: [
        "What finished length do you want to keep: chest, mid-back, waist, or longer?",
        "Should the bottom edge read as sharply blunt or slightly softened while still looking one-length?",
        "Do you want absolutely no visible layers, or only minimal invisible/internal weight removal?",
        "Will you usually wear a center part, side part, or switch between both?",
        "Do you want the sleek finish to follow your natural texture as closely as possible, or are you comfortable using blow-drying or heat-styling to make it straighter?",
      ],
      sampleRequest:
        "“I want to keep the hair long and make it look sleek and dense, with a clean one-length perimeter and no visible face-framing or graduated layers. Keep the center part and soften the very ends only enough that the line does not look harsh.”",
    },
    considerations: [
      "The dense perimeter is a defining part of the look. Removing too much weight or adding visible graduation can shift the result toward a long layered cut instead.",
      "A sleek finish is not produced by the haircut alone. Natural pattern, humidity, hair condition, blow-drying, heat styling, and finishing products all affect how straight and reflective the surface appears.",
      "Fine or lower-density hair can benefit visually from the strong one-length perimeter because the ends are not thinned by extensive layering.",
      "Very dense hair may feel heavy in a strict one-length shape; discreet internal weight removal can improve manageability, but it should not create obvious surface layers if the sleek uninterrupted silhouette is the goal.",
      "Frequent high-heat straightening can increase damage risk, so the desired finish and realistic maintenance routine should be discussed separately from the cut itself.",
    ],
    sourceIds: [
      "british-vogue-70s-summer-haircuts",
      "vogue-cher-hair-2014",
      "vogue-germany-liquid-hair",
      "vogue-india-volumising-haircuts-straight-hair",
    ],
    relatedStyleIds: ["hairstyle-long-layered-cut"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-taper-fade",
    slug: "taper-fade",
    name: "Taper fade",
    kind: "finishing-technique",
    summary: "A gradual blend that changes the edge and perimeter while the top keeps its chosen shape.",
    intro: [
      "A taper fade is a conversation about where the blend begins, how far it travels, and how close the shortest finish gets to the skin. A low taper can keep more of the sides and top; a higher or skin finish changes the silhouette more visibly.",
      "The phrase is not a single fixed blueprint. Bring a reference, name the sideburn and neckline finish, and describe how much length you want left on top. The same perimeter idea can be paired with waves, curls, coils, or a straight top while the top keeps its own shape.",
      "A good consultation makes the blend visible in words: where it begins, how high it rises, and whether the lowest part is shadow, very short, or skin-level. Placement and finish matter more than the label alone.",
    ],
    variations: [
      {
        id: "taper-fade-higher",
        name: "Higher taper / wider fade",
        description:
          "Moves the blend farther around the head; confirm whether your shop uses “higher taper” or “fade” for the requested service.",
      },
      {
        id: "taper-fade-low",
        name: "Low taper",
        description:
          "Keeps the transition close to the sideburns and neckline, leaving more of the sides visually intact.",
      },
      {
        id: "taper-fade-skin",
        name: "Skin or bald finish",
        description: "Takes the lowest part to skin-level appearance before blending upward.",
      },
    ],
    consultation: {
      intro: "A useful request names the placement, shortest finish, top length, and edge details separately.",
      questions: [
        "Should the taper sit only at the temples and neckline, or blend around the whole head?",
        "How low should the shortest area go: shadow, very short, or skin/bald?",
        "How much length and shape should stay on top, and should the natural pattern be left visible?",
        "What should happen to the sideburns, neckline, and any part or line-up?",
      ],
      sampleRequest:
        "“I’d like a low taper at the temples and neckline, blended but not bald, with the top left long enough to keep its natural shape. Please show me the shortest area before you finish the edges.”",
    },
    considerations: [
      "Growth direction, cowlicks, density, and the contrast between the perimeter and top can change how seamless the blend looks.",
      "A reference photo communicates placement and finish better than “make it clean”; ask the practitioner to translate it to your current length.",
      "Maintenance depends on how crisp you want the edge and how quickly your perimeter grows, not on a fixed hair-type rule.",
    ],
    sourceIds: ["andis-low-taper", "wahl-cut-guide"],
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-flat-top", "hairstyle-twists"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-thin-mohawk",
    slug: "thin-mohawk",
    name: "Thin mohawk",
    kind: "cut",
    summary: "A narrow, elongated strip of hair left through the center with close sides and a focused silhouette.",
    intro: [
      "A thin mohawk reduces the mohawk idea to a deliberately narrow center strip. The sides can be skin-close or shadowed, while the strip stays short and upright or grows into a sharper crest.",
      "Dark and blond versions can read very differently: contrast, color, and texture change how wide and tall the strip appears. Treat them as variations of one cut, not separate styles.",
    ],
    variations: [
      {
        id: "thin-mohawk-blond",
        name: "Blond contrast",
        description: "Uses a lightened center strip to make the crest read brighter and more graphic.",
      },
      {
        id: "thin-mohawk-dark",
        name: "Dark natural finish",
        description: "Keeps the center strip in a deep natural tone for strong silhouette contrast.",
      },
      {
        id: "thin-mohawk-low",
        name: "Low narrow crest",
        description: "Keeps the center close and restrained for easier everyday maintenance.",
      },
    ],
    consultation: {
      intro: "Specify the strip width, side finish, color plan, and desired height before discussing styling product.",
      questions: [
        "How narrow should the center strip be at the hairline, crown, and nape?",
        "Should the sides be skin-close, shadowed, or softly tapered?",
        "Is the center staying dark, or is a blond/lightened contrast part of the brief?",
        "Should the strip stand upright, sweep back, or stay low and textured?",
      ],
      sampleRequest:
        "“Please leave a narrow center strip, close-shave the sides without taking the skin too high, and keep the top low enough to wear with a light matte product.”",
    },
    considerations: [
      "Lightened hair needs a separate color and condition conversation; the cut alone does not determine its final tone.",
      "A narrow strip exposes growth direction and cowlicks, so a side and rear reference matters as much as the front.",
      "The contrast between center and sides is strongest immediately after the cut and softens as the sides grow.",
    ],
    sourceIds: ["guardian-balotelli-hair-obituary", "mancity-balotelli-blond-bombshell"],
    relatedStyleIds: ["hairstyle-cropped-afro", "hairstyle-patterned-mohawk"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-top-knot",
    slug: "top-knot",
    name: "Top knot",
    kind: "styling-technique",
    summary: "Longer hair gathered and secured at the crown, often paired with a shorter or tapered perimeter.",
    intro: [
      "A top knot gathers enough length at or near the crown to form a compact tied shape. The surrounding hair may remain longer or be tapered, making the perimeter part of the overall silhouette.",
      "This is a styling arrangement as much as a cut: section placement, tie tension, and the amount of loose texture left around the knot change its character.",
    ],
    variations: [
      {
        id: "top-knot-curly",
        name: "Curly knot",
        description: "Allows curl and coil to remain visible through the gathered shape and loose ends.",
      },
      {
        id: "top-knot-loose",
        name: "Loose gather",
        description: "Keeps the knot relaxed with less tension and more visible texture around the tie.",
      },
      {
        id: "top-knot-tapered",
        name: "Tapered perimeter",
        description: "Pairs the gathered crown with close, gradually shorter sides and nape.",
      },
    ],
    consultation: {
      intro:
        "Confirm the minimum length, tie position, perimeter finish, and comfortable tension before committing to the arrangement.",
      questions: [
        "Where should the knot sit: crown, high top, or farther back?",
        "Should the sides and nape stay long, taper, or be cut close?",
        "How much curl, coil, or loose texture should remain visible around the tie?",
        "What level of tension is comfortable, and how often will the style be worn?",
      ],
      sampleRequest:
        "“I want a small top knot at the crown with a low taper around the sides and nape. Keep the tie comfortable and leave the natural texture visible through the knot.”",
    },
    considerations: [
      "A knot needs enough length to gather securely; a stylist can test the placement before cutting the perimeter.",
      "Tension matters. Styles that hurt, sting, or pull should be loosened and reassessed.",
      "Curl and coil shrinkage change the apparent knot size and required length; plan with the hair in its usual worn state.",
    ],
    sourceIds: ["guardian-balotelli-hair-obituary", "mancity-balotelli-blond-bombshell"],
    relatedStyleIds: ["hairstyle-cropped-afro", "hairstyle-patterned-mohawk"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-twists",
    slug: "twists",
    name: "Two-strand twists",
    kind: "styling-technique",
    summary: "Two sections wrapped around each other, worn as a temporary set or as individual hanging twists.",
    intro: [
      "Two-strand twists are a way of arranging hair, not a claim about the wearer’s natural pattern. The look can be individual and free-hanging, worked along the scalp as a flat twist, or adapted with extensions. Part size, direction, length, and the desired amount of stretch change the result.",
      "A two-strand twist is not the same service as a flat twist, a braid, or starting and maintaining locs. Each changes the way sections are divided and secured, so name the arrangement you want rather than relying on a broad “twists” label.",
      "Rope twist is a shop-dependent phrase. Some practitioners use it for a tighter two-strand effect or for twisting each section before wrapping the pair. Show a reference and ask the stylist to explain the technique, parting, extension plan, and whether the style is intended to be temporary.",
    ],
    variations: [
      {
        id: "twists-flat",
        name: "Flat twists",
        description: "Two sections are twisted along the scalp, creating a row-like, scalp-following arrangement.",
      },
      {
        id: "twists-individual",
        name: "Individual twists",
        description: "Separate sections hang away from the scalp, with size and parting determining the visual rhythm.",
      },
      {
        id: "twists-rope",
        name: "Rope-style twists",
        description: "A tighter or more cord-like finish whose exact technique should be confirmed with the stylist.",
      },
    ],
    consultation: {
      intro: "Name the twist type, part size, length, direction, and whether extensions or a temporary set are wanted.",
      questions: [
        "Do you mean individual two-strand twists, flat twists along the scalp, or a rope-style finish?",
        "What part size, direction, and finished length should the stylist use?",
        "Are extensions wanted, and if so, what added length or weight feels manageable?",
        "Is the goal a temporary twist set, or are you discussing starter or maintained locs instead?",
      ],
      sampleRequest:
        "“I’m looking for medium individual two-strand twists with a visible part pattern, no extensions, and enough length to keep the ends neat. Please keep the tension comfortable and tell me how this differs from a flat twist.”",
    },
    considerations: [
      "Straight and wavy hair may need enough length, sectioning, or a setting approach to hold a temporary twist; that is a styling conversation, not an exclusion.",
      "Curly and coily hair can show different shrinkage, definition, and stretch after twisting; agree on whether the finished look should be shrunken, elongated, or allowed to set.",
      "Extensions, long lengths, and tight installation add weight or pull. AAD advises loosening styles that hurt, sting, crust, or visibly pull the scalp; persistent hair loss needs a dermatologist’s assessment.",
    ],
    sourceIds: ["aad-traction", "carols-daughter-braids-twists", "milady-natural-hair"],
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-freeform-locs", "hairstyle-taper-fade"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-wolf-cut",
    slug: "wolf-cut",
    name: "Wolf cut",
    kind: "cut",
    summary:
      "A heavily layered shag–mullet hybrid with shorter volume around the crown and face and more length retained toward the back.",
    intro: [
      "The wolf cut combines the abundant layering and movement of a shag with some of the front-to-back length contrast associated with a mullet.",
      "There is no single fixed wolf-cut geometry. Softer versions blend the layers heavily, while more extreme versions use stronger disconnection between the crown, sides and retained back length.",
    ],
    variations: [
      {
        id: "wolf-cut-curly",
        name: "Curly wolf cut",
        description:
          "Uses layered natural curls to create crown volume and a broader, more irregular outer silhouette.",
      },
      {
        id: "wolf-cut-medium",
        name: "Medium wolf cut",
        description:
          "A shoulder-area version with visible crown layering, face framing and longer layers through the back.",
      },
      {
        id: "wolf-cut-soft",
        name: "Soft wolf cut",
        description:
          "A more blended interpretation that sits closer to a shag, with less dramatic separation between short and long layers.",
      },
    ],
    consultation: {
      intro: "The key consultation choice is how strongly the cut should lean toward shag versus mullet.",
      questions: [
        "How much length should remain at the back?",
        "How short should the crown layers become?",
        "Should the layers blend softly or look deliberately disconnected?",
        "Do you want a fringe or face-framing pieces?",
        "Will the hair normally be worn in its natural texture or styled differently?",
      ],
      sampleRequest:
        "“I’d like a medium wolf cut with lots of crown volume and face-framing layers, but keep the transition into the longer back fairly soft rather than giving me a strong mullet.”",
    },
    considerations: [
      "The name covers a broad family of cuts, so reference images are especially important.",
      "Heavy layering removes weight and can expose differences in density more strongly than a one-length cut.",
      "Straight hair may need styling to emphasize the texture and separation that occur naturally in wavy or curly hair.",
      "Curly and coily hair can shrink substantially, so the intended dry silhouette and layer placement should be assessed in the natural state.",
    ],
    sourceIds: ["allure-wolf-cut-2026", "haircom-wolf-cut"],
    relatedStyleIds: ["hairstyle-long-layered-cut", "hairstyle-short-feathered-shag"],
    guidePublicationStatus: "published",
  },
];

export function isPublishedGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean {
  return hairstyle.guidePublicationStatus === "published";
}

export const publishedHairstyles = hairstyles.filter(isPublishedGuide);

export const styleExamples: StyleExample[] = [
  {
    id: "sleek-long-cut-blonde",
    hairstyleIds: ["hairstyle-sleek-long-cut"],
    imageId: "sleek-long-cut-blonde",
    title: "Sleek long cut on blonde straight hair",
    caption:
      "A fictional tanned white woman in her 40s wearing highlighted blonde hair in a smooth long cut with a strong continuous perimeter.",
    patternDescription:
      "Type 1B straight appearance: predominantly straight lengths with slightly more body than 1A while remaining sleek and smooth.",
    lengthDescription: "Long, extending below the shoulders to the upper chest with a full nearly one-length edge.",
  },
  {
    id: "sleek-long-cut-silver-gray",
    hairstyleIds: ["hairstyle-sleek-long-cut"],
    imageId: "sleek-long-cut-silver-gray",
    title: "Sleek long cut on silver-gray hair",
    caption:
      "A fictional white woman in her 60s wearing long silver-gray hair in a smooth, center-parted, near-one-length cut.",
    patternDescription:
      "Type 1A straight appearance: smooth straight silver-gray lengths with minimal visible wave and a continuous surface.",
    lengthDescription: "Long, falling below the shoulders with a dense softly blunted perimeter.",
  },
  {
    id: "sleek-long-cut-straight-black",
    hairstyleIds: ["hairstyle-sleek-long-cut"],
    imageId: "sleek-long-cut-straight-black",
    title: "Sleek long cut on straight black hair",
    caption:
      "A fictional East Asian woman in her 30s wearing a center-parted sleek long cut with a dense, nearly one-length perimeter.",
    patternDescription:
      "Type 1A straight appearance: very straight, smooth lengths with minimal visible bend and no visible layered graduation.",
    lengthDescription: "Long, extending well below the shoulders toward the chest with a full straight perimeter.",
  },
  {
    id: "style-example-blunt-bob-chin",
    hairstyleIds: ["hairstyle-blunt-bob"],
    imageId: "blunt-bob-chin",
    title: "Chin-length blunt bob",
    caption: "Notice the strong jaw-length perimeter and the absence of visible layering.",
    patternDescription:
      "The hair falls into one compact outer line, with the front and side lengths reading as part of the same blunt shape.",
    lengthDescription:
      "The perimeter finishes at approximately chin level; confirm the exact dry length and whether any subtle internal shaping is wanted.",
  },
  {
    id: "style-example-buzz-short",
    hairstyleIds: ["hairstyle-buzz-cut"],
    imageId: "buzz-short",
    title: "Very short even buzz",
    caption: "Notice the uniform close silhouette and the restrained edge finish.",
    patternDescription: "The cropped surface reads as one even field, with the outline doing most of the shaping work.",
    lengthDescription:
      "Short and visually even across the top and sides, with the exact guard or setting left to consultation.",
  },
  {
    id: "style-example-buzz-textured",
    hairstyleIds: ["hairstyle-buzz-cut"],
    imageId: "buzz-textured",
    title: "Longer textured buzz",
    caption: "Notice the extra top length and the movement it leaves above the short perimeter.",
    patternDescription: "Texture stays visible through the top while the sides remain shorter and cleaner.",
    lengthDescription:
      "The top is visibly longer than the sides; confirm the intended balance and edge finish with the barber.",
  },
  {
    id: "style-example-cropped-afro-compact",
    hairstyleIds: ["hairstyle-cropped-afro"],
    imageId: "cropped-afro-compact",
    title: "Close cropped afro",
    caption: "Notice the tighter rounded shape while the textured surface remains visible.",
    patternDescription: "A closer crop reduces height without turning the silhouette into a uniform buzz cut.",
    lengthDescription:
      "The shape sits close to the head with enough texture to distinguish it from a simple clipper crop.",
  },
  {
    id: "style-example-cropped-afro-full",
    hairstyleIds: ["hairstyle-cropped-afro"],
    imageId: "cropped-afro-full",
    title: "Full compact cropped afro",
    caption: "Notice the rounded silhouette and visible coily texture through the top and sides.",
    patternDescription: "The shape stays compact but full enough for texture to define the outline.",
    lengthDescription: "Short textured length remains through the crown; assess the result after dry shrinkage.",
  },
  {
    id: "style-example-curtain-haircut-straight-1b",
    hairstyleIds: ["hairstyle-curtain-haircut"],
    imageId: "curtain-haircut-straight-1b",
    title: "Classic straight curtains",
    caption:
      "Notice the clean center split, retained ear-level length and soft outward bend of the two front sections.",
    patternDescription:
      "Dense predominantly straight hair separates from the center into two smooth face-framing panels with subtle volume and a gentle C-shaped sweep.",
    lengthDescription:
      "The front reaches approximately cheekbone-to-ear level, with similar medium length through the sides and enough crown length to keep the silhouette soft rather than cropped.",
  },
  {
    id: "style-example-flat-top-coily",
    hairstyleIds: ["hairstyle-flat-top"],
    imageId: "flat-top-coily",
    title: "Low flat top with graduated sides",
    caption: "Notice the low horizontal plane and the compact transition into the shorter sides.",
    patternDescription:
      "The top reads as a restrained flat surface while the visible texture softens the edges of the silhouette.",
    lengthDescription: "A low, close shape with short graduated sides; confirm the height and finish with the barber.",
  },
  {
    id: "style-example-flat-top-straight",
    hairstyleIds: ["hairstyle-flat-top"],
    imageId: "flat-top-straight",
    title: "Compact upright flat top",
    caption: "Notice the squared corners, compact rise, and short graduated sides.",
    patternDescription: "The top forms a small upright plane with a sharper graphic outline than the low example.",
    lengthDescription:
      "Short sides support a compact upright shape; ask about the hold and maintenance needed to keep the plane visible.",
  },
  {
    id: "style-example-freeform-locs-long",
    hairstyleIds: ["hairstyle-freeform-locs"],
    imageId: "freeform-locs-long",
    title: "Long mature freeform locs",
    caption:
      "Notice the irregular root structure, naturally varied loc thickness, loose texture around the roots, and long organic silhouette.",
    patternDescription:
      "The locs emerge without a uniform parting grid and vary visibly in diameter, with loose coily texture and irregular joining around the crown and roots.",
    lengthDescription:
      "Mature locs extend well beyond the shoulders, with individual sections reaching different lengths and forming an intentionally uneven perimeter.",
  },
  {
    id: "style-example-french-crop-textured-2a",
    hairstyleIds: ["hairstyle-french-crop"],
    imageId: "french-crop-textured-2a",
    title: "Textured French crop",
    caption:
      "Notice the compact textured top, short broken fringe directed forward, and restrained sides without a dramatic skin fade.",
    patternDescription:
      "Slight natural bend creates separation through the top while the short fringe remains visibly directed toward the forehead.",
    lengthDescription:
      "The top retains a few centimeters of length for texture, while the sides and back are kept substantially shorter and the fringe finishes high on the forehead.",
  },
  {
    id: "style-example-knotless-box-braids-medium",
    hairstyleIds: ["hairstyle-knotless-box-braids"],
    imageId: "knotless-box-braids-medium",
    title: "Medium knotless box braids",
    caption: "Notice how each braid emerges flat from the section before gradually reaching its full thickness.",
    patternDescription:
      "Clean individual sections expose the scalp while each three-strand braid begins narrowly at the root and thickens subtly as extension hair is fed in.",
    lengthDescription:
      "Long braids continue beyond the shoulders; finished length and extension weight should be agreed before installation.",
  },
  {
    id: "style-example-long-layered-cut-brunette",
    hairstyleIds: ["hairstyle-long-layered-cut"],
    imageId: "long-layered-cut-brunette",
    title: "Long brunette layers with curtain fringe",
    caption:
      "Notice the retained long perimeter, shorter cheekbone-level face frame, soft graduated layers, and curtain fringe opening away from the center.",
    patternDescription:
      "Soft natural waves make the graduated layers visible through movement and separation while the front pieces curve away from the face.",
    lengthDescription:
      "The longest hair extends well below the shoulders, while shorter face-framing pieces begin around the cheekbones and connect gradually into the longer lengths.",
  },
  {
    id: "style-example-patterned-mohawk-curved",
    hairstyleIds: ["hairstyle-patterned-mohawk"],
    imageId: "patterned-mohawk-curved",
    title: "Curved patterned crest",
    caption: "Notice the raised center and the curved side design working as one silhouette.",
    patternDescription: "The central strip stays visibly higher while the shaved pattern frames its rounded edge.",
    lengthDescription:
      "The crest keeps enough length to stand above close patterned sides; exact height is a consultation choice.",
  },
  {
    id: "style-example-patterned-mohawk-geometric",
    hairstyleIds: ["hairstyle-patterned-mohawk"],
    imageId: "patterned-mohawk-geometric",
    title: "Geometric patterned crest",
    caption: "Notice the crisp geometric side detail and the narrower upright center.",
    patternDescription: "Hard side lines make the central crest read more graphic and deliberate.",
    lengthDescription:
      "Close sides contrast with a short upright center; the shaved detail will need regular refreshing.",
  },
  {
    id: "style-example-short-feathered-shag-copper",
    hairstyleIds: ["hairstyle-short-feathered-shag"],
    imageId: "short-feathered-shag-copper",
    title: "Copper short feathered shag",
    caption:
      "Notice the lifted crown, wispy fringe, airy face-framing layers, and softly feathered pieces around the ears and nape.",
    patternDescription:
      "Loose natural movement gives the short layers separation while the ends feather outward rather than collapsing into a solid perimeter.",
    lengthDescription:
      "The cut sits around ear-to-nape length, with shorter crown and fringe layers and slightly longer pieces retained around the sides and back.",
  },
  {
    id: "style-example-taper-coily",
    hairstyleIds: ["hairstyle-taper-fade"],
    imageId: "taper-coily",
    title: "Low taper with coily top",
    caption: "Notice how the close perimeter frames a full, visibly textured top.",
    patternDescription: "Compact texture sits above a gradual transition at the temples and neckline.",
    lengthDescription:
      "Short around the edges and longer through the crown, with the exact length left open for consultation.",
  },
  {
    id: "style-example-taper-wavy",
    hairstyleIds: ["hairstyle-taper-fade"],
    imageId: "taper-wavy",
    title: "Low taper with wavy top",
    caption: "Notice how the low perimeter blend leaves an open wave visible above.",
    patternDescription: "A loose wave remains through the top while the sides and neckline carry a cleaner transition.",
    lengthDescription: "The top remains long enough to show movement; the sides and neckline carry the shorter blend.",
  },
  {
    id: "style-example-thin-mohawk-blond",
    hairstyleIds: ["hairstyle-thin-mohawk"],
    imageId: "thin-mohawk-blond",
    title: "Blond contrast mohawk",
    caption: "Notice how the lightened center makes the narrow crest read brighter and taller.",
    patternDescription: "Color contrast emphasizes the strip without changing the underlying narrow cut.",
    lengthDescription: "The center remains short and directed; color and cut should be planned as separate services.",
  },
  {
    id: "style-example-thin-mohawk-dark",
    hairstyleIds: ["hairstyle-thin-mohawk"],
    imageId: "thin-mohawk-dark",
    title: "Dark narrow mohawk",
    caption: "Notice how the dark center strip keeps the silhouette focused against close sides.",
    patternDescription: "A narrow upright strip provides the only concentrated height through the top.",
    lengthDescription: "The sides are kept close while the center retains short styling length.",
  },
  {
    id: "style-example-top-knot-curly",
    hairstyleIds: ["hairstyle-top-knot"],
    imageId: "top-knot-curly",
    title: "Curly top knot",
    caption: "Notice the natural curl remaining visible through the compact gathered shape.",
    patternDescription: "Texture gives the knot a fuller, softer outline than a smooth pulled-back finish.",
    lengthDescription: "The gathered shape depends on enough dry length and comfortable tension through the crown.",
  },
  {
    id: "style-example-top-knot-tapered",
    hairstyleIds: ["hairstyle-top-knot"],
    imageId: "top-knot-tapered",
    title: "Top knot with tapered perimeter",
    caption: "Notice the gathered crown above the close, gradually shortened sides.",
    patternDescription: "The knot concentrates length at the crown while the perimeter creates a clean contrast.",
    lengthDescription:
      "Enough crown length is gathered securely; the perimeter is shorter and tapered around the ears and nape.",
  },
  {
    id: "style-example-twists-long",
    hairstyleIds: ["hairstyle-twists"],
    imageId: "twists-long",
    title: "Jaw-length individual twists",
    caption: "Notice the jaw-length silhouette, visible separation, and movement through the sections.",
    patternDescription:
      "Individual twists hang around the jaw with a clear part pattern and a rounded rope-like shape.",
    lengthDescription:
      "Discuss the section size and jaw-length finish you want, including how much shrinkage or movement to leave visible.",
  },
  {
    id: "style-example-twists-short",
    hairstyleIds: ["hairstyle-twists"],
    imageId: "twists-short",
    title: "Short individual twists",
    caption: "Notice the small hanging twists and the regular part rhythm.",
    patternDescription: "Separated two-strand sections create a compact shape with visible spacing between parts.",
    lengthDescription:
      "Shorter sections sit close to the head and can show shrinkage; part size and finished length need a consultation.",
  },
  {
    id: "style-example-wolf-cut-curly-medium",
    hairstyleIds: ["hairstyle-wolf-cut"],
    imageId: "wolf-cut-curly-medium",
    title: "Medium curly wolf cut",
    caption:
      "Notice the concentrated crown volume, shorter face-framing curls, and longer layers retained toward the nape.",
    patternDescription:
      "Defined curls make the layered silhouette fuller and rounder while the shorter crown remains distinct from the longer back.",
    lengthDescription:
      "The longest curls reach around the shoulders, with substantially shorter layers through the crown and around the face.",
  },
  {
    id: "style-example-wolf-cut-wavy-medium",
    hairstyleIds: ["hairstyle-wolf-cut"],
    imageId: "wolf-cut-wavy-medium",
    title: "Medium wavy wolf cut",
    caption: "Shorter crown and face-framing layers create volume above visibly longer, lighter ends.",
    patternDescription:
      "The silhouette expands around the crown and cheek area before narrowing into longer separated layers toward the shoulders.",
    lengthDescription:
      "Longest layers finish around the shoulders while substantially shorter layers sit through the crown and front.",
  },
];

export function getHairstyle(slug: string): Hairstyle | undefined {
  return hairstyles.find((hairstyle) => hairstyle.slug === slug);
}

export function getExamplesForHairstyle(id: string): StyleExample[] {
  return styleExamples.filter((example) => example.hairstyleIds.includes(id));
}
