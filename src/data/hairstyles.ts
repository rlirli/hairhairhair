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
}

export interface PatternGuidance {
  hairstyleId: string;
  hairTypeId: string;
  note: string;
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
  url: string;
  publisher: string;
  reviewedAt: string;
}

export const sources: EditorialSource[] = [
  {
    id: "andis-low-taper",
    title: "Fluid Vol 1: Low Taper Fade",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=84",
    publisher: "Andis Education",
    reviewedAt: "2026-09-20",
  },
  {
    id: "andis-buzz-cut",
    title: "Soft & Subtle Buzz Cut",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=1439",
    publisher: "Andis Education",
    reviewedAt: "2026-09-20",
  },
  {
    id: "wahl-cut-guide",
    title: "STEP-BY-STEP GUIDE FOR CUTTING HAIR",
    url: "https://www.wahlpro.com/amfile/file/download/file/504/product/582/",
    publisher: "Wahl Professional",
    reviewedAt: "2026-09-20",
  },
  {
    id: "milady-natural-hair",
    title: "Milady Standard Natural Hair Care and Braiding, 2nd Edition",
    url: "https://www.milady.com/catalog/milady-standard-natural-hair-care-braiding",
    publisher: "Milady",
    reviewedAt: "2026-09-20",
  },
  {
    id: "carols-daughter-braids-twists",
    title: "Braids vs. Twists: What’s The Difference?",
    url: "https://carolsdaughter.com/blogs/beauty-blog/braids-vs-twists-what-s-the-difference",
    publisher: "Carol's Daughter",
    reviewedAt: "2026-09-20",
  },
  {
    id: "aad-traction",
    title: "Hairstyles that pull can lead to hair loss",
    url: "https://www.aad.org/public/diseases/hair-loss/causes/hairstyles",
    publisher: "American Academy of Dermatology",
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
    id: "cambridge-flattop",
    title: "flattop",
    url: "https://dictionary.cambridge.org/us/dictionary/english/flattop",
    publisher: "Cambridge Dictionary",
    reviewedAt: "2026-09-21",
  },
  {
    id: "andis-classic-clipper",
    title: "Essentials—Classic Clipper Cutting",
    url: "https://andis.com/BarberStylistEducation/VideoDetail?EduItemID=1330",
    publisher: "Andis Education",
    reviewedAt: "2026-09-21",
  },
  {
    id: "wahl-flat-top-guide",
    title: "Home Haircutting guide",
    url: "https://www.wahlpro.com/amfile/file/download/file/762/product/1818/",
    publisher: "Wahl Professional",
    reviewedAt: "2026-09-21",
  },
  {
    id: "guardian-balotelli-hair-obituary",
    title: "Mario Balotelli’s hair: an obituary 2008–2015",
    url: "https://www.theguardian.com/fashion/2015/aug/26/mario-balotellis-liverpool-milan-loan-hair-an-obituary",
    publisher: "The Guardian",
    reviewedAt: "2026-09-22",
  },
  {
    id: "mancity-balotelli-blond-bombshell",
    title: "Mario Balotelli: Blond bombshell",
    url: "https://www.mancity.com/news/first-team/first-team-news/archive/2011/november/mario-balotelli-blond-bombshell",
    publisher: "Manchester City",
    reviewedAt: "2026-09-22",
  },
];

export const hairstyles: Hairstyle[] = [
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
        id: "taper-fade-low",
        name: "Low taper",
        description:
          "Keeps the transition close to the sideburns and neckline, leaving more of the sides visually intact.",
      },
      {
        id: "taper-fade-higher",
        name: "Higher taper / wider fade",
        description:
          "Moves the blend farther around the head; confirm whether your shop uses “higher taper” or “fade” for the requested service.",
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
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-twists", "hairstyle-flat-top"],
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
        id: "buzz-cut-even",
        name: "Even buzz",
        description: "Uses one overall short length for a simple, uniform silhouette.",
      },
      {
        id: "buzz-cut-textured",
        name: "Textured buzz",
        description: "Leaves enough top length for visible movement or texture while the perimeter stays close.",
      },
      {
        id: "buzz-cut-buzz-fade",
        name: "Buzz with taper or fade",
        description: "Pairs the short top with a gradually shorter perimeter around the ears, temples, or neckline.",
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
    relatedStyleIds: ["hairstyle-taper-fade", "hairstyle-twists", "hairstyle-flat-top"],
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
        id: "twists-individual",
        name: "Individual twists",
        description: "Separate sections hang away from the scalp, with size and parting determining the visual rhythm.",
      },
      {
        id: "twists-flat",
        name: "Flat twists",
        description: "Two sections are twisted along the scalp, creating a row-like, scalp-following arrangement.",
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
    sourceIds: ["milady-natural-hair", "carols-daughter-braids-twists", "aad-traction"],
    relatedStyleIds: ["hairstyle-taper-fade", "hairstyle-buzz-cut"],
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
        id: "patterned-mohawk-geometric",
        name: "Geometric sides",
        description: "Uses crisp lines or panels shaved into the sides for a graphic finish.",
      },
      {
        id: "patterned-mohawk-curved",
        name: "Curved crest",
        description: "Keeps the central strip rounded or swept rather than strictly angular.",
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
    relatedStyleIds: ["hairstyle-thin-mohawk", "hairstyle-cropped-afro", "hairstyle-top-knot"],
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
      "Dark and blond versions can read very differently: contrast, color, and texture change how wide and tall the strip appears. Treat them as variations of one cut, not separate guides.",
    ],
    variations: [
      {
        id: "thin-mohawk-dark",
        name: "Dark natural finish",
        description: "Keeps the center strip in a deep natural tone for strong silhouette contrast.",
      },
      {
        id: "thin-mohawk-blond",
        name: "Blond contrast",
        description: "Uses a lightened center strip to make the crest read brighter and more graphic.",
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
    relatedStyleIds: ["hairstyle-patterned-mohawk", "hairstyle-cropped-afro"],
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
        id: "cropped-afro-full",
        name: "Full compact crop",
        description: "Leaves enough length for a clearly rounded, textured silhouette.",
      },
      {
        id: "cropped-afro-compact",
        name: "Close crop",
        description: "Keeps the shape tighter and closer to the head while preserving visible texture.",
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
      "A cropped afro is distinct from a buzz cut by the visible textured fullness it retains; if you want a simpler uniform crop, use the Buzz cut guide.",
    ],
    sourceIds: ["guardian-balotelli-hair-obituary"],
    relatedStyleIds: ["hairstyle-patterned-mohawk", "hairstyle-thin-mohawk", "hairstyle-top-knot"],
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
        id: "top-knot-tapered",
        name: "Tapered perimeter",
        description: "Pairs the gathered crown with close, gradually shorter sides and nape.",
      },
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
    relatedStyleIds: ["hairstyle-patterned-mohawk", "hairstyle-cropped-afro"],
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
        id: "flat-top-low",
        name: "Low flat top",
        description:
          "Keeps the top plane close to the head for a restrained, compact silhouette like the selected 2011 appearance reference.",
      },
      {
        id: "flat-top-higher",
        name: "Higher top",
        description:
          "Sets the top plane farther above the scalp for a taller, more graphic shape; confirm how much daily direction or product is acceptable.",
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
      "oxford-flat-top",
      "cambridge-flattop",
      "andis-classic-clipper",
      "wahl-flat-top-guide",
      "wahl-cut-guide",
    ],
    relatedStyleIds: ["hairstyle-buzz-cut", "hairstyle-taper-fade"],
    guidePublicationStatus: "published",
  },
];

export function isPublishedGuide(hairstyle: Pick<Hairstyle, "guidePublicationStatus">): boolean {
  return hairstyle.guidePublicationStatus === "published";
}

export const publishedHairstyles = hairstyles.filter(isPublishedGuide);

export const patternGuidance: PatternGuidance[] = [
  {
    hairstyleId: "hairstyle-taper-fade",
    hairTypeId: "hair-type-1",
    note: "A taper can keep a straight top clean and graphic; ask how much perimeter contrast you want against the mostly linear fall.",
  },
  {
    hairstyleId: "hairstyle-taper-fade",
    hairTypeId: "hair-type-2",
    note: "A taper can preserve visible wave on top; discuss whether the blend should follow the wave’s volume or keep the sides flatter.",
  },
  {
    hairstyleId: "hairstyle-taper-fade",
    hairTypeId: "hair-type-3",
    note: "Leave enough top length for the curl shape you want to wear, and ask how the blend will look as curls spring back after cutting.",
  },
  {
    hairstyleId: "hairstyle-taper-fade",
    hairTypeId: "hair-type-4",
    note: "The perimeter can be shaped while the coily top stays full or patterned; show the desired height and explain whether the edge should be soft or crisp.",
  },
  {
    hairstyleId: "hairstyle-buzz-cut",
    hairTypeId: "hair-type-1",
    note: "A short even cut can read very uniform; discuss scalp visibility, growth direction, and whether a little extra top length is preferred.",
  },
  {
    hairstyleId: "hairstyle-buzz-cut",
    hairTypeId: "hair-type-2",
    note: "Wave may flatten or add movement as length changes; ask whether the top should show that movement or be kept close and even.",
  },
  {
    hairstyleId: "hairstyle-buzz-cut",
    hairTypeId: "hair-type-3",
    note: "A buzz can reveal curl as texture at longer settings or read more even when shorter; decide by the intended silhouette, not a curl label.",
  },
  {
    hairstyleId: "hairstyle-buzz-cut",
    hairTypeId: "hair-type-4",
    note: "Coily texture can change apparent length through shrinkage; ask for a small test area and agree on the final visual length before going shorter.",
  },
  {
    hairstyleId: "hairstyle-twists",
    hairTypeId: "hair-type-1",
    note: "Temporary twists may need enough length and a setting plan to hold; discuss section size, direction, and how long the set should last.",
  },
  {
    hairstyleId: "hairstyle-twists",
    hairTypeId: "hair-type-2",
    note: "Wave can add movement to twists or loosen a temporary set; ask whether the goal is visible wave, stretched length, or a tighter wrapped shape.",
  },
  {
    hairstyleId: "hairstyle-twists",
    hairTypeId: "hair-type-3",
    note: "Curl can make twists look springier or shorter after release; agree on part size and whether the finished twists should be elongated or compact.",
  },
  {
    hairstyleId: "hairstyle-twists",
    hairTypeId: "hair-type-4",
    note: "Coily hair often gives twists strong shape and shrinkage; discuss stretch, moisture, parting, and comfortable tension rather than assuming one required method.",
  },
  {
    hairstyleId: "hairstyle-flat-top",
    hairTypeId: "hair-type-1",
    note: "A flat plane can read clean and compact, but straighter hair may fall rather than stand; assess growth direction, length, and the styling or hold needed for the intended height.",
  },
  {
    hairstyleId: "hairstyle-flat-top",
    hairTypeId: "hair-type-2",
    note: "Wave may soften the plane or add movement as it grows; agree on the intended height, direction, and amount of daily styling.",
  },
  {
    hairstyleId: "hairstyle-flat-top",
    hairTypeId: "hair-type-3",
    note: "Curl can change the apparent height and crispness of the plane; use a reference and ask how much length and hold will keep the desired outline.",
  },
  {
    hairstyleId: "hairstyle-flat-top",
    hairTypeId: "hair-type-4",
    note: "Coily texture can support a strong silhouette while still changing with shrinkage and growth direction; confirm the plane and side finish without treating the hair type as a guarantee.",
  },
  {
    hairstyleId: "hairstyle-patterned-mohawk",
    hairTypeId: "hair-type-1",
    note: "Straight hair can make shaved patterns and the central crest read sharply; discuss hold and growth direction before choosing height.",
  },
  {
    hairstyleId: "hairstyle-patterned-mohawk",
    hairTypeId: "hair-type-2",
    note: "Wave can soften the crest or add movement; agree on whether the pattern should stay graphic or follow the natural bend.",
  },
  {
    hairstyleId: "hairstyle-patterned-mohawk",
    hairTypeId: "hair-type-3",
    note: "Curl can widen the visual crest through volume; leave enough length to preserve the chosen shape without treating curl as a limitation.",
  },
  {
    hairstyleId: "hairstyle-patterned-mohawk",
    hairTypeId: "hair-type-4",
    note: "Coily texture can support a strong crest and crisp pattern, while shrinkage and density affect the final width and height.",
  },
  {
    hairstyleId: "hairstyle-thin-mohawk",
    hairTypeId: "hair-type-1",
    note: "A narrow strip can fall without product on straight hair; confirm the desired direction and the shortest comfortable side finish.",
  },
  {
    hairstyleId: "hairstyle-thin-mohawk",
    hairTypeId: "hair-type-2",
    note: "Wave can make a thin strip look fuller or less even; use a side reference to agree on the intended silhouette.",
  },
  {
    hairstyleId: "hairstyle-thin-mohawk",
    hairTypeId: "hair-type-3",
    note: "Curl changes apparent strip width and height; discuss whether the crest should stay compact or be left longer for lift.",
  },
  {
    hairstyleId: "hairstyle-thin-mohawk",
    hairTypeId: "hair-type-4",
    note: "Coily texture can keep a narrow crest visibly upright; plan around shrinkage, density, and the contrast created by close sides.",
  },
  {
    hairstyleId: "hairstyle-cropped-afro",
    hairTypeId: "hair-type-1",
    note: "A cropped afro is a shape choice rather than a straight-texture default; a stylist can discuss the texture or styling needed to create fullness.",
  },
  {
    hairstyleId: "hairstyle-cropped-afro",
    hairTypeId: "hair-type-2",
    note: "Wave may make a compact crop read softer or flatter; agree on the rounded outline and the amount of visible movement.",
  },
  {
    hairstyleId: "hairstyle-cropped-afro",
    hairTypeId: "hair-type-3",
    note: "Curl can create a rounded cropped silhouette with visible spring; assess the dry length and how much shrinkage to leave.",
  },
  {
    hairstyleId: "hairstyle-cropped-afro",
    hairTypeId: "hair-type-4",
    note: "Coily texture makes the compact rounded shape especially sensitive to shrinkage, density, and edge choice; agree on the dry result.",
  },
  {
    hairstyleId: "hairstyle-top-knot",
    hairTypeId: "hair-type-1",
    note: "Straight hair may need more length or a secure tie to keep a compact knot; discuss placement and perimeter contrast.",
  },
  {
    hairstyleId: "hairstyle-top-knot",
    hairTypeId: "hair-type-2",
    note: "Wave can add looseness and volume around the knot; decide whether the finish should stay smooth or visibly textured.",
  },
  {
    hairstyleId: "hairstyle-top-knot",
    hairTypeId: "hair-type-3",
    note: "Curl changes the gathered length and knot size; plan placement with the hair in its usual dry state and keep tension comfortable.",
  },
  {
    hairstyleId: "hairstyle-top-knot",
    hairTypeId: "hair-type-4",
    note: "Coily hair may shrink substantially before gathering; discuss stretch, tie tension, and how much natural texture should remain visible.",
  },
];

export const styleExamples: StyleExample[] = [
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
    id: "style-example-thin-mohawk-dark",
    hairstyleIds: ["hairstyle-thin-mohawk"],
    imageId: "thin-mohawk-dark",
    title: "Dark narrow mohawk",
    caption: "Notice how the dark center strip keeps the silhouette focused against close sides.",
    patternDescription: "A narrow upright strip provides the only concentrated height through the top.",
    lengthDescription: "The sides are kept close while the center retains short styling length.",
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
    id: "style-example-cropped-afro-full",
    hairstyleIds: ["hairstyle-cropped-afro"],
    imageId: "cropped-afro-full",
    title: "Full compact cropped afro",
    caption: "Notice the rounded silhouette and visible coily texture through the top and sides.",
    patternDescription: "The shape stays compact but full enough for texture to define the outline.",
    lengthDescription: "Short textured length remains through the crown; assess the result after dry shrinkage.",
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
    id: "style-example-top-knot-curly",
    hairstyleIds: ["hairstyle-top-knot"],
    imageId: "top-knot-curly",
    title: "Curly top knot",
    caption: "Notice the natural curl remaining visible through the compact gathered shape.",
    patternDescription: "Texture gives the knot a fuller, softer outline than a smooth pulled-back finish.",
    lengthDescription: "The gathered shape depends on enough dry length and comfortable tension through the crown.",
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
];

export function getHairstyle(slug: string): Hairstyle | undefined {
  return hairstyles.find((hairstyle) => hairstyle.slug === slug);
}

export function getExamplesForHairstyle(id: string): StyleExample[] {
  return styleExamples.filter((example) => example.hairstyleIds.includes(id));
}

export function getGuidanceForHairstyle(id: string): PatternGuidance[] {
  return patternGuidance.filter((guidance) => guidance.hairstyleId === id);
}

export function getPublishedHairstylesForHairType(hairTypeId: string): Hairstyle[] {
  const ids = new Set(
    patternGuidance.filter((guidance) => guidance.hairTypeId === hairTypeId).map((guidance) => guidance.hairstyleId),
  );
  return publishedHairstyles.filter((hairstyle) => ids.has(hairstyle.id));
}
