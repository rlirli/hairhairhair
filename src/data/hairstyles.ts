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
    id: "haircom-low-maintenance-men",
    title: "18 Trending Low Maintenance Haircuts For Men",
    url: "https://www.hair.com/low-maintenance-haircuts-for-men.html",
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
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-taper-fade"],
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
    relatedStyleIds: [],
    guidePublicationStatus: "published",
  },
];

export function isPublishedGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean {
  return hairstyle.guidePublicationStatus === "published";
}

export const publishedHairstyles = hairstyles.filter(isPublishedGuide);

export const styleExamples: StyleExample[] = [
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
