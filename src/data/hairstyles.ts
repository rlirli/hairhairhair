import type { EditorialSource, Hairstyle, StyleExample } from "../types";

export const kindLabels = {
  cut: "Cut",
  "finishing-technique": "Finishing technique",
  "styling-technique": "Styling technique",
} as const;

export const sources: EditorialSource[] = [
  {
    id: "aad-alopecia-self-care",
    title: "Hair loss types: Alopecia areata self-care",
    url: "https://www.aad.org/public/diseases/hair-loss/types/alopecia/self-care",
    publisher: "American Academy of Dermatology",
    reviewedAt: "2026-09-25",
  },
  {
    id: "aad-how-to-shave",
    title: "Hair removal: How to shave",
    url: "https://www.aad.org/public/everyday-care/skin-care-basics/hair/how-to-shave",
    publisher: "American Academy of Dermatology",
    reviewedAt: "2026-09-25",
  },
  {
    id: "aad-remove-unwanted-hair",
    title: "6 ways to remove unwanted hair",
    url: "https://www.aad.org/public/everyday-care/skin-care-basics/hair/remove-unwanted-hair",
    publisher: "American Academy of Dermatology",
    reviewedAt: "2026-09-25",
  },
  {
    id: "aad-traction",
    title: "Hairstyles that pull can lead to hair loss",
    url: "https://www.aad.org/public/diseases/hair-loss/causes/hairstyles",
    publisher: "American Academy of Dermatology",
    reviewedAt: "2026-09-20",
  },
  {
    id: "allure-iconic-beauty-trends",
    title: "25 Most Iconic Beauty Trends of All Time",
    url: "https://www.allure.com/gallery/most-iconic-beauty-trends",
    publisher: "Allure",
    reviewedAt: "2026-09-24",
  },
  {
    id: "allure-protective-styles-history",
    title: "Protective Styles Are the Armor Black Women Have Worn for Centuries",
    url: "https://www.allure.com/story/protective-styles-meaning-history-michaela-angela-davis",
    publisher: "Allure",
    reviewedAt: "2026-09-24",
  },
  {
    id: "allure-rachel-haircut-history",
    title: '"The Rachel" Is the Best Worst Haircut I\'ve Had',
    url: "https://www.allure.com/story/the-rachel-haircut-history",
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
    id: "american-salon-beauty-icon",
    title: "Ode to a Beauty Icon",
    url: "https://www.americansalon.com/news/ode-to-a-beauty-icon",
    publisher: "American Salon",
    reviewedAt: "2026-09-24",
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
    id: "beauty-interviews-allen-edwards",
    title: "Allen Edwards — Beauty Interviews",
    url: "https://beautyinterviews.com/interview-with-allen-edwards/",
    publisher: "Beauty Interviews",
    reviewedAt: "2026-09-24",
  },
  {
    id: "british-vogue-70s-summer-haircuts",
    title: "These ’70s Haircuts Have Become Summer’s Most Sought-After Styles",
    url: "https://www.vogue.co.uk/article/70s-summer-haircuts",
    publisher: "British Vogue",
    reviewedAt: "2026-09-24",
  },
  {
    id: "british-vogue-quant-sassoon",
    title: "The Iconic Geometric Haircut Mary Quant Championed",
    url: "https://www.vogue.co.uk/beauty/article/vidal-sassoon-haircut-mary-quant",
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
    id: "catholic-encyclopedia-celtic-rite",
    title: "The Celtic Rite",
    url: "https://www.newadvent.org/cathen/03493a.htm",
    publisher: "The Catholic Encyclopedia / New Advent",
    reviewedAt: "2026-09-25",
  },
  {
    id: "catholic-encyclopedia-tonsure",
    title: "Tonsure",
    url: "https://www.newadvent.org/cathen/14779a.htm",
    publisher: "The Catholic Encyclopedia / New Advent",
    reviewedAt: "2026-09-25",
  },
  {
    id: "davines-90s-long-bob-2026",
    title: "The 90s Long Bob: How to Get & Style the 90s Lob",
    url: "https://ca.davines.com/blogs/news/90s-long-bob",
    publisher: "Davines Canada",
    reviewedAt: "2026-09-25",
  },
  {
    id: "dreadlockulture-freeform-locs",
    title: "What Are Freeform Locs?",
    url: "https://dreadlockulture.com/what-are-freeform-locs/",
    publisher: "DreadlocKulture",
    reviewedAt: "2026-09-24",
  },
  {
    id: "encyclopedia-com-tonsure",
    title: "Tonsure",
    url: "https://www.encyclopedia.com/philosophy-and-religion/christianity/christianity-general/tonsure",
    publisher: "Encyclopedia.com",
    reviewedAt: "2026-09-25",
  },
  {
    id: "essence-knotless-braids",
    title: "Inside The Mystifying World Of Knotless Braids",
    url: "https://www.essence.com/beauty/knotless-braids-summer-protective-styles/",
    publisher: "Essence",
    reviewedAt: "2026-09-22",
  },
  {
    id: "glamour-long-bob-style-2026",
    title: "How To Style A Long Bob So It Always Looks Phenomenal",
    url: "https://www.glamourmagazine.co.uk/gallery/how-to-style-a-long-bob",
    publisher: "Glamour UK",
    reviewedAt: "2026-09-25",
  },
  {
    id: "glamour-modern-rachel",
    title: "Everyone’s Getting the ‘Modern Rachel Haircut’ Right Now",
    url: "https://www.glamour.com/story/modern-rachel-haircut",
    publisher: "Glamour",
    reviewedAt: "2026-09-24",
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
    id: "haircom-hime-cut",
    title: "The Centuries-Old Hime Cut Is Now Trending: Here’s How to Make It Work for You",
    url: "https://www.hair.com/hime-cut.html",
    publisher: "Hair.com by L'Oréal",
    reviewedAt: "2026-09-25",
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
    id: "hji-five-point-sassoon-cut",
    title: "The Five Point - An Iconic Sassoon Cut",
    url: "https://hji.co.uk/the-five-point-sassoon-cut",
    publisher: "Hairdressers Journal International",
    reviewedAt: "2026-09-24",
  },
  {
    id: "latimes-fawcett-generation-x",
    title: "Farrah Fawcett: forever Generation X's favorite pinup",
    url: "https://www.latimes.com/fashion/alltherage/la-ig-farrah26-2009jun26-story.html",
    publisher: "Los Angeles Times",
    reviewedAt: "2026-09-24",
  },
  {
    id: "latimes-hair-like-theirs",
    title: "Hair Like Theirs",
    url: "https://www.latimes.com/archives/la-xpm-1997-jul-24-ls-15600-story.html",
    publisher: "Los Angeles Times",
    reviewedAt: "2026-09-24",
  },
  {
    id: "latimes-legacy-vidal-sassoon",
    title: "The Legacy of Vidal Sassoon",
    url: "https://www.latimes.com/archives/la-xpm-1999-dec-12-tm-42981-story.html",
    publisher: "Los Angeles Times",
    reviewedAt: "2026-09-24",
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
    id: "met-heian-court-woman",
    title: "Dish in Shape of Japanese Court Woman",
    url: "https://www.metmuseum.org/art/collection/search/46509",
    publisher: "The Metropolitan Museum of Art",
    reviewedAt: "2026-09-25",
  },
  {
    id: "milady-natural-hair",
    title: "Milady Standard Natural Hair Care and Braiding, 2nd Edition",
    url: "https://www.milady.com/catalog/milady-standard-natural-hair-care-braiding",
    publisher: "Milady",
    reviewedAt: "2026-09-20",
  },
  {
    id: "nmaahc-black-is-beautiful",
    title: "Black is Beautiful: The Emergence of Black Culture and Identity in the 60s and 70s",
    url: "https://nmaahc.si.edu/explore/stories/black-beautiful-emergence-black-culture-and-identity-60s-and-70s",
    publisher: "National Museum of African American History and Culture",
    reviewedAt: "2026-09-24",
  },
  {
    id: "nmaahc-strands-of-inspiration",
    title: "Strands of Inspiration: Exploring Black Identities through Hair",
    url: "https://nmaahc.si.edu/explore/stories/strands-of-inspiration",
    publisher: "National Museum of African American History and Culture",
    reviewedAt: "2026-09-24",
  },
  {
    id: "olivia-garden-flipped-bob",
    title: "Flirty Flipped Out Bob",
    url: "https://store.oliviagarden.com/blogs/get-the-look/flirtyflippedfoutbob",
    publisher: "Olivia Garden",
    reviewedAt: "2026-09-25",
  },
  {
    id: "oxford-flat-top",
    title: "flat-top",
    url: "https://www.oxfordlearnersdictionaries.com/us/definition/english/flat-top",
    publisher: "Oxford Learner’s Dictionaries",
    reviewedAt: "2026-09-21",
  },
  {
    id: "sassoon-academy-heritage",
    title: "Vidal Sassoon Heritage | The Story Behind Sassoon Academy",
    url: "https://academy.sassoon-global.com/heritage.html",
    publisher: "Sassoon Academy",
    reviewedAt: "2026-09-24",
  },
  {
    id: "smithsonian-afro-sheen",
    title: "Johnson's Afro Sheen Blowout Kit for the Natural",
    url: "https://americanhistory.si.edu/ar/collections/object/nmah_209542",
    publisher: "National Museum of American History",
    reviewedAt: "2026-09-24",
  },
  {
    id: "smithsonian-black-hair-identity",
    title: "It’s More Than “Just” Hair: Revitalization of Black Identity",
    url: "https://folklife.si.edu/magazine/black-hair-identity",
    publisher: "Smithsonian Center for Folklife and Cultural Heritage",
    reviewedAt: "2026-09-24",
  },
  {
    id: "smithsonian-dread-history",
    title: "Dread History: The African Diaspora, Ethiopianism, and Rastafari",
    url: "https://www.smithsonianeducation.org/migrations/rasta/pic07.html",
    publisher: "Smithsonian Institution",
    reviewedAt: "2026-09-24",
  },
  {
    id: "smithsonian-look-talk-play",
    title: "Look, Talk, Play",
    url: "https://americanhistory.si.edu/sites/default/files/file-uploader/Look_Talk_Play.pdf",
    publisher: "National Museum of American History",
    reviewedAt: "2026-09-24",
  },
  {
    id: "smithsonian-nathaniel-mathis",
    title: "Nathaniel Mathis Collection of Barbering and Beauty Culture",
    url: "https://www.si.edu/object/archives/sova-nmah-ac-0641",
    publisher: "Smithsonian Institution",
    reviewedAt: "2026-09-24",
  },
  {
    id: "tresemme-side-part-lob",
    title: "Side Part Lob",
    url: "https://www.tresemme.com/us/en/look-book/side-part-lob.html",
    publisher: "TRESemmé",
    reviewedAt: "2026-09-25",
  },
  {
    id: "vogue-aniston-hair-products",
    title: "The Hair Products Jennifer Aniston Swears By, According to Her Longtime Pros",
    url: "https://www.vogue.com/article/jennifer-aniston-hair-products-color-styling-routine",
    publisher: "Vogue",
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
  {
    id: "washington-post-jose-eber-1979",
    title: "Short Cut to Celebrity",
    url: "https://www.washingtonpost.com/archive/lifestyle/1979/02/17/short-cut-to-celebrity/0dba282e-fdca-4660-9f33-58e08126555a/",
    publisher: "The Washington Post",
    reviewedAt: "2026-09-24",
  },
  {
    id: "yokohama-belle-hime-cut",
    title: "姫カットとは？顔型別の似合わせ・最新スタイル・魅力を解説",
    url: "https://www.ybe.ac.jp/archives/1661",
    publisher: "横浜ベルエポック美容専門学校",
    reviewedAt: "2026-09-25",
  },
];

export const hairstyles: Hairstyle[] = [
  {
    id: "hairstyle-bald",
    slug: "bald",
    name: "Bald / clean-shaven head",
    kind: "cut",
    summary:
      "An intentionally hairless scalp produced by shaving visible scalp hair down to skin level, leaving the head shape and scalp itself as the defining silhouette.",
    intro: [
      "A clean-shaven head removes visible scalp hair rather than shaping the remaining hair into a particular length or texture.",
      "Because shaving cuts hair at the skin surface rather than changing the follicle, the clean bald finish is temporary and visible regrowth can appear quickly.",
      "The look is independent of natural curl pattern, density and hair color once the hair has been shaved sufficiently close.",
      "This entry describes an intentionally shaved hairstyle. Naturally occurring baldness or medically caused hair loss may produce a visually similar scalp but is not itself a haircut.",
    ],
    variations: [
      {
        id: "bald-close-electric",
        name: "Close electric shave",
        description:
          "Uses an electric shaver to leave an almost hairless appearance while potentially retaining a faint trace of extremely short stubble.",
      },
      {
        id: "bald-razor-smooth",
        name: "Razor-smooth shave",
        description:
          "Removes hair extremely close to the skin for the least visible stubble and smoothest scalp appearance.",
      },
    ],
    consultation: {
      intro:
        "The main choices are how close the scalp should be shaved, how often the look will be maintained, and how sensitive the scalp is to repeated shaving.",
      questions: [
        "Do you want a razor-smooth scalp or is extremely short electric-shaver stubble acceptable?",
        "How frequently are you prepared to shave to keep visible regrowth minimal?",
        "Does your scalp tend to develop razor irritation, bumps or ingrown hairs?",
        "Are there scars, moles, bumps or other areas the barber should work around carefully?",
        "Do you also want the sideburn and neckline areas removed completely so the scalp transitions cleanly into the face and neck?",
      ],
      sampleRequest:
        "“I want my head completely clean-shaven with no visible hair left on the scalp. Keep the finish even from the forehead through the crown and nape, and use a method that gives me the closest comfortable shave without irritating my skin.”",
    },
    considerations: [
      "The clean-shaven result is temporary because shaving removes hair at the skin surface rather than preventing future growth.",
      "Visible stubble may return quickly, so maintaining a consistently smooth appearance can require frequent shaving.",
      "Repeated shaving can cause cuts, razor burn, irritation or ingrown hairs, particularly when shaving too closely or against the direction of growth.",
      "A completely exposed scalp receives more direct ultraviolet exposure than a scalp covered by hair, so sun protection becomes more important.",
      "Scalp shape, scars, pigmentation, moles and other skin features become considerably more visible once the hair is removed.",
      "Natural hair type does not meaningfully constrain the finished appearance because the defining style removes the visible hair itself.",
    ],
    sourceIds: ["aad-alopecia-self-care", "aad-how-to-shave", "aad-remove-unwanted-hair"],
    relatedStyleIds: ["hairstyle-buzz-cut"],
    guidePublicationStatus: "published",
  },
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
    relatedStyleIds: ["hairstyle-five-point-cut"],
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
    relatedStyleIds: [
      "hairstyle-bald",
      "hairstyle-flat-top",
      "hairstyle-monastic-tonsure",
      "hairstyle-taper-fade",
      "hairstyle-twists",
    ],
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
    relatedStyleIds: [
      "hairstyle-natural-afro",
      "hairstyle-patterned-mohawk",
      "hairstyle-sculpted-spherical-afro",
      "hairstyle-thin-mohawk",
      "hairstyle-top-knot",
    ],
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
    id: "hairstyle-farrah-fawcett-cut",
    slug: "farrah-fawcett-cut",
    name: "Farrah Fawcett cut",
    kind: "cut",
    summary:
      "A long, extensively layered haircut shaped into large face-opening feathers, with elevated volume around the crown and sides and lower sections that sweep away from the face.",
    intro: [
      "Allen Edwards recalled beginning Farrah Fawcett's transformation in 1974, when she arrived with largely one-length hair. He progressively introduced long layering as fuller, more mobile hair was becoming fashionable.",
      "The hairstyle became inseparable from its blow-dried finish: shorter layers around the face are directed backward and outward, creating broad feathered sections beside the cheeks and temples, while longer layers continue the movement through the shoulders.",
      "Edwards also associated the look with a blow-curl method in which most of the hair was dried first and the ends were then shaped with smaller brushes. That styling approach helped turn the layered cut into the expansive winged silhouette associated with Fawcett.",
      "The historical attribution is not completely uncontested. José Eber later styled Fawcett extensively and contemporary reporting documents him changing and maintaining her hair; some later accounts credit Eber with the famous feathered look. The 1974 Edwards account is nevertheless the earliest specific creation narrative located for the layered cut.",
    ],
    variations: [
      {
        id: "farrah-fawcett-cut-classic-winged",
        name: "Classic winged Farrah",
        description:
          "Uses pronounced face-framing layers, substantial side volume and strongly outward-directed feathering to create the broad 1970s silhouette.",
      },
      {
        id: "farrah-fawcett-cut-soft-feathered",
        name: "Soft feathered Farrah",
        description:
          "Keeps the long layered construction and outward movement but reduces crown height and separates the feathers less dramatically.",
      },
    ],
    consultation: {
      intro:
        "Separate the underlying layer structure from the blowout: agree on overall length, where the shortest face frame begins, how much weight is removed through the sides, and how strongly the finished hair should sweep away from the face.",
      questions: [
        "How much overall length do you want to retain below the shoulders?",
        "Where should the shortest face-framing layer begin: around the cheekbone, jaw, or lower?",
        "How dramatic should the outward feathering around the temples and cheeks be?",
        "Do you want substantial crown and side volume or a softer contemporary interpretation?",
        "Are you willing to use a blow-dryer and round brush regularly to produce the classic winged shape?",
      ],
      sampleRequest:
        "“I want a long Farrah-style feathered cut with lots of movement, shorter layers beginning around my cheekbones, longer layers through the shoulders, and enough layering around the sides that I can blow-dry them back and away from my face into large soft wings.”",
    },
    considerations: [
      "The haircut alone does not automatically produce the familiar silhouette; directional blow-drying is a major part of the classic result.",
      "The face-framing sections need enough length to sweep backward rather than falling like a short fringe.",
      "Dense hair can support substantial feathered volume, but excessive bulk may need controlled weight removal so the layers separate rather than forming one heavy mass.",
      "Very fine or low-density hair can lose fullness if the layering is too aggressive, particularly through the lower perimeter.",
      "Straight hair generally needs styling to create the curved feathering, while gently wavy hair often supplies useful natural body for the shape.",
      "Increasing curl tightness makes the canonical large, smooth feathered panels progressively harder to maintain while preserving the natural curl pattern.",
      "The attribution to Allen Edwards is historically disputed because José Eber also styled Fawcett and has been credited with versions of her signature hair.",
    ],
    sourceIds: [
      "american-salon-beauty-icon",
      "beauty-interviews-allen-edwards",
      "latimes-fawcett-generation-x",
      "latimes-hair-like-theirs",
      "washington-post-jose-eber-1979",
    ],
    relatedStyleIds: ["hairstyle-long-layered-cut", "hairstyle-short-feathered-shag"],
    guidePublicationStatus: "published",
    inventedAt: { year: 1974, precision: "year", sourceId: "beauty-interviews-allen-edwards" },
    inventor: { name: "Allen Edwards", sourceId: "beauty-interviews-allen-edwards" },
  },
  {
    id: "hairstyle-five-point-cut",
    slug: "five-point-cut",
    name: "Five Point Cut",
    kind: "cut",
    summary:
      "Vidal Sassoon's short geometric 1963 cut, defined by two deliberate points at the sides and three at the nape, with blunt precision and length increasing from the short back toward the face.",
    intro: [
      "Vidal Sassoon created the Five Point in 1963 as part of his new architectural approach to haircutting. Sassoon Academy connects the method to his interest in Bauhaus design: removing the superfluous and making the cut itself determine how the hair falls rather than relying on rollers, back-combing or heavy setting products.",
      "The five points are structural rather than decorative. Sassoon described the shape as covering the whole head, with two points at the sides and three through the nape, fitted to bone structure and the natural contours of the hair.",
      "The nape is cut short and the shape gradually lengthens toward the face. Blunt ends preserve visual density and make the geometric outline legible, while the underlying precision was intended to let the hair move and then fall back into its designed shape.",
    ],
    variations: [],
    consultation: {
      intro:
        "The Five Point is a highly specific geometric cut, so agree on the five-point perimeter, fringe, side length and degree of graduation rather than requesting only a short bob.",
      questions: [
        "Do you want the classic Five Point geometry with two pronounced side points and three distinct points through the nape?",
        "Where should the two side points land relative to the cheekbone, jaw and ears?",
        "How short should the central nape area be while retaining enough length to form the three rear points?",
        "Should the fringe read as a strong blunt geometric line or be adapted slightly around the face?",
        "How close to the original crisp Sassoon finish do you want the cut to remain when worn in your natural texture?",
      ],
      sampleRequest:
        "“I'd like a classic Vidal Sassoon Five Point: short and graduated through the nape, two strong points at the sides, three defined points through the back, blunt dense edges and a precise geometric fringe. I want the shape fitted to my head rather than turned into a generic A-line bob.”",
    },
    considerations: [
      "The five-point perimeter is the defining feature. If the side and nape points disappear, the result can read as a generic geometric or graduated bob instead.",
      "The original concept depends heavily on precision cutting and head shape; Sassoon described it as one of his hardest cuts to execute.",
      "Straight hair exposes the designed lines most clearly. Increasing natural wave, curl or coil progressively softens and interrupts the crisp five-point outline.",
      "The cut is short at the nape and longer toward the face, so shrinkage and natural movement should be assessed before establishing the final dry perimeter.",
      "Because small amounts of growth visibly soften geometric points, maintaining the original graphic shape generally requires relatively frequent reshaping.",
      "Straightening a naturally curly or coily texture can reproduce more of the graphic finish, but the compatibility estimates here intentionally assess the hairstyle while preserving the natural curl pattern.",
    ],
    sourceIds: [
      "british-vogue-quant-sassoon",
      "hji-five-point-sassoon-cut",
      "latimes-legacy-vidal-sassoon",
      "sassoon-academy-heritage",
    ],
    relatedStyleIds: ["hairstyle-blunt-bob"],
    guidePublicationStatus: "published",
    inventedAt: { year: 1963, precision: "year", sourceId: "sassoon-academy-heritage" },
    inventor: { name: "Vidal Sassoon", sourceId: "sassoon-academy-heritage" },
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
    id: "hairstyle-hime-cut",
    slug: "hime-cut",
    name: "Hime cut",
    kind: "cut",
    summary:
      "A long Japanese haircut defined by sharply separated blunt side sections around cheek-to-jaw length, contrasted against substantially longer hair behind them.",
    intro: [
      "The Hime cut creates its identity through abrupt differences in length rather than blended face framing. Short, dense side panels sit beside the face while the rear hair remains much longer.",
      "A straight-across fringe commonly accompanies the classic version, but the shorter side sections are the more essential structural feature; modern versions can omit the fringe while retaining the recognizable stepped silhouette.",
      "The hairstyle is associated historically with Japanese court-hair traditions extending back to the Heian period. Modern sources connect it with practices in which selected hair near the sides of the face was cut shorter while the remaining hair continued to grow long.",
      "The name Hime cut is a later label meaning princess cut; it should not be interpreted as evidence that one identifiable historical person invented the hairstyle.",
    ],
    variations: [
      {
        id: "hime-cut-classic-fringe",
        name: "Classic Hime with blunt fringe",
        description:
          "Combines long straight rear hair with cheek-to-jaw-length blunt side panels and a straight fringe across the forehead.",
      },
      {
        id: "hime-cut-no-fringe",
        name: "Fringe-free Hime",
        description:
          "Keeps the abrupt blunt side sections and long rear lengths while opening the forehead with a center or near-center part.",
      },
      {
        id: "hime-cut-long-side-panels",
        name: "Long-panel Hime",
        description:
          "Places the blunt side sections closer to jaw or upper-neck length for a softer step while retaining a clear separation from the long rear hair.",
      },
    ],
    consultation: {
      intro:
        "The key choices are the exact length, width and density of the short side panels, whether a fringe is included, and how starkly the short sections should contrast with the long rear hair.",
      questions: [
        "Should the blunt side panels end around the cheekbone, jaw, or slightly below the jaw?",
        "How wide should each short side section be when viewed from the front?",
        "Do you want a straight blunt fringe, a lighter fringe, or no dedicated fringe?",
        "Should the side panels form a very hard horizontal edge or be softened slightly at the ends?",
        "Will you usually wear the long rear hair straight enough for the stepped geometry to remain clearly visible?",
      ],
      sampleRequest:
        "“I want a Hime cut with long straight hair at the back, dense blunt side sections ending around my jaw, and a very clear step between those panels and the long lengths. Keep the lines sharp rather than blending them into ordinary face-framing layers.”",
    },
    considerations: [
      "The side panels are the defining element; blending them gradually into the rear length can make the result read as ordinary face framing instead of a Hime cut.",
      "Small amounts of growth noticeably change the position of the blunt side edge, so those panels need more frequent trimming than the long rear lengths.",
      "Straight hair displays the stepped geometry most clearly. Waves and curls can soften or visually fragment the horizontal line.",
      "Using frequent heat to maintain a pin-straight finish can increase damage risk, particularly on previously lightened or heavily colored hair.",
      "Very fine hair may produce thinner-looking side panels, while dense hair can create a more graphic and substantial block of short hair beside the face.",
      "Bleached or highly processed hair should be assessed for condition before combining repeated straightening with a highly polished Hime finish.",
    ],
    sourceIds: ["haircom-hime-cut", "met-heian-court-woman", "yokohama-belle-hime-cut"],
    relatedStyleIds: ["hairstyle-sleek-long-cut"],
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
    relatedStyleIds: [
      "hairstyle-farrah-fawcett-cut",
      "hairstyle-sleek-long-cut",
      "hairstyle-the-rachel",
      "hairstyle-wolf-cut",
    ],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-monastic-tonsure",
    slug: "monastic-tonsure",
    name: "Monastic tonsure",
    kind: "cut",
    summary:
      "A family of historically religious haircuts in which selected areas of the scalp are deliberately shaved or closely cut to create a symbolic clerical or monastic pattern.",
    intro: [
      "Tonsure refers to deliberate removal or close cutting of scalp hair as a religious marker. In Christian history, several visually distinct forms developed rather than one universal haircut.",
      "The Roman or St. Peter form leaves a ring of hair around a shaved crown. The Eastern or St. Paul form removes the hair across the whole head. The Celtic or St. John form removes the front portion of the hair, historically described in Britain as shaving the area in front of a line running from ear to ear.",
      "The names associated with Peter, Paul and John are traditional labels rather than verified inventor attributions. Historical sources explicitly note that the different forms cannot securely claim apostolic origin.",
      "Because the geometry is created by shaving or cutting selected areas rather than by exploiting a particular curl pattern, the basic forms can be produced on any natural hair type.",
    ],
    variations: [
      {
        id: "monastic-tonsure-celtic",
        name: "Celtic / St. John tonsure",
        description:
          "Removes the hair across the front portion of the head, historically described as shaving forward of an ear-to-ear boundary while leaving hair behind it.",
      },
      {
        id: "monastic-tonsure-eastern",
        name: "Eastern / St. Paul tonsure",
        description:
          "Removes or closely cuts the hair across the entire scalp rather than preserving a crown or rear section.",
      },
      {
        id: "monastic-tonsure-roman",
        name: "Roman / St. Peter tonsure",
        description:
          "Shaves the crown while retaining a continuous ring or corona of hair around the sides and back of the head.",
      },
    ],
    consultation: {
      intro:
        "A tonsure request must identify the historical form first because Roman, Celtic and Eastern tonsures create fundamentally different scalp patterns.",
      questions: [
        "Which form do you want: Roman crown, Celtic front-shaved, or Eastern fully shorn?",
        "For a Roman tonsure, how wide should the remaining ring of hair be?",
        "For a Celtic tonsure, where should the ear-to-ear transition between shaved and retained hair sit?",
        "Should the shaved area be razor-smooth or left with very short visible stubble?",
        "How long should any retained hair remain, and should its perimeter be sharply defined or softer?",
      ],
      sampleRequest:
        "“I want a Roman-style monastic tonsure: shave the crown clean while leaving a continuous, clearly defined ring of short hair around the sides and back. Keep the ring even in width and make the contrast with the shaved crown obvious.”",
    },
    considerations: [
      "The three historical forms should not be treated as interchangeable styling variations because each removes hair from a different part of the scalp.",
      "A Roman tonsure depends on a continuous surviving ring of hair; natural balding patterns can therefore affect how faithfully that geometry can be reproduced.",
      "The Celtic form is historically less familiar today and can easily be mistaken for an accidental or fantasy shave pattern unless the front-to-back division is deliberate and clearly defined.",
      "The Eastern form can look visually similar to an ordinary shaved or bald head even though its historical meaning and context are different.",
      "Visible regrowth quickly softens the boundary between shaved and retained sections, so sharply defined tonsures require regular maintenance.",
      "The hairstyle has strong religious and historical associations; using the name accurately is preferable to treating every partially shaved head as a tonsure.",
    ],
    sourceIds: ["catholic-encyclopedia-celtic-rite", "catholic-encyclopedia-tonsure", "encyclopedia-com-tonsure"],
    relatedStyleIds: ["hairstyle-buzz-cut"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-natural-afro",
    slug: "natural-afro",
    name: "Natural afro",
    kind: "cut",
    summary:
      "A full natural Afro that lets dense curls or coils expand outward into a broad rounded silhouette while preserving visible texture and a softer, less geometrically controlled perimeter.",
    intro: [
      "The natural afro uses the hair's own curl or coil structure to create substantial volume around the head rather than relying on straightening or a tightly controlled geometric outline.",
      "Its silhouette is usually broadly rounded, but the perimeter can remain organic: individual curl clusters, slight asymmetry and natural variation in density are compatible with the look.",
      "Afros became especially visible during the natural-hair and Black-is-Beautiful movements of the 1960s and 1970s, when wearing Black hair in its natural texture acquired strong cultural and political significance.",
      "Afro picks and other wide-toothed tools can lift hair away from the scalp and increase volume while keeping the natural texture present. The result does not need to be trimmed into the near-perfect sphere associated with a more heavily sculpted Afro.",
    ],
    variations: [
      {
        id: "natural-afro-full-volume",
        name: "Full-volume natural afro",
        description:
          "Uses greater retained length and picking for a larger silhouette without forcing the perimeter into a precise geometric sphere.",
      },
      {
        id: "natural-afro-soft-rounded",
        name: "Soft rounded natural afro",
        description:
          "Creates a broadly rounded silhouette while preserving visible texture, natural perimeter variation and moderate asymmetry.",
      },
    ],
    consultation: {
      intro:
        "Agree on overall size, how much natural irregularity to preserve, and whether the perimeter should be lightly shaped or allowed to follow the hair's natural distribution.",
      questions: [
        "How large do you want the finished Afro to appear relative to your head and shoulders?",
        "Should the outline be softly rounded or intentionally left more irregular and organic?",
        "How much length do you want to retain through the crown, sides and lower perimeter?",
        "Do you want the curl or coil clusters to remain visibly defined, or should the hair be picked out more fully for volume?",
        "Should the stylist correct noticeable asymmetry or preserve more of the natural growth pattern?",
      ],
      sampleRequest:
        "“I want a full natural Afro with a soft rounded shape, but not a perfectly sculpted sphere. Keep the natural texture visible, retain plenty of volume, and only refine the perimeter enough that the overall silhouette feels intentional.”",
    },
    considerations: [
      "This style prioritizes natural texture and volume over a mathematically controlled outline, so some perimeter irregularity is part of the intended result.",
      "Picking increases volume and can reduce the visual definition of individual curls or coils, so the desired balance between definition and expansion should be discussed.",
      "Shrinkage can substantially change the apparent length and diameter of the finished Afro, so shaping should be assessed on dry hair in its intended worn state.",
      "Greater density and tighter curl or coil patterns generally make it easier to support a large self-sustaining silhouette without the hair collapsing downward.",
      "Looser curl patterns can still form rounded natural Afros, but they may hang more and create less radial volume than tighter coils.",
      "Periodic trimming can maintain an intentional overall shape without converting the style into a highly sculpted spherical Afro.",
    ],
    sourceIds: [
      "nmaahc-black-is-beautiful",
      "nmaahc-strands-of-inspiration",
      "smithsonian-afro-sheen",
      "smithsonian-black-hair-identity",
    ],
    relatedStyleIds: ["hairstyle-cropped-afro"],
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
    id: "hairstyle-sculpted-spherical-afro",
    slug: "sculpted-spherical-afro",
    name: "Sculpted spherical afro",
    kind: "cut",
    summary:
      "A full Afro deliberately picked outward and trimmed into a dense, near-spherical silhouette with a controlled circular perimeter.",
    intro: [
      "The sculpted spherical afro is a specific full-Afro silhouette rather than simply any rounded natural style. Substantial coily length is lifted away from the scalp and distributed outward so the hair forms a broad three-dimensional mass around the head.",
      "The defining feature is geometric control of the outer silhouette. The perimeter is shaped toward an almost circular profile from the front and a rounded volume from the side, rather than following every irregularity of the natural growth pattern.",
      "Afros became especially prominent in the United States during the Black-is-Beautiful and Black Power era of the late 1960s and 1970s, when wearing natural Black hair at visible scale carried strong cultural significance.",
      "Afro picks and related wide-toothed tools help lift and separate dense coily hair outward. The final spherical appearance then depends on both that expansion and careful trimming of the outer surface.",
      "“Sculpted spherical afro” is an editorial label used in this collection to distinguish this highly geometric full Afro from shorter cropped Afros and softer, more naturally irregular rounded Afros.",
    ],
    variations: [
      {
        id: "sculpted-spherical-afro-perfect-round",
        name: "Near-perfect sphere",
        description: "Maximizes symmetry and trims the outer perimeter toward an almost continuous circular outline.",
      },
      {
        id: "sculpted-spherical-afro-soft-round",
        name: "Soft spherical shape",
        description:
          "Retains the broad spherical mass while allowing slightly more natural irregularity at the outer edge.",
      },
    ],
    consultation: {
      intro:
        "The key decisions are overall diameter, how close to a true sphere the silhouette should be, how much natural surface texture remains visible, and how much length must be retained to support the desired volume.",
      questions: [
        "How large should the finished Afro read relative to your head and shoulders?",
        "Do you want an almost mathematically round silhouette or a softer rounded shape?",
        "Should the sides and crown carry equal visual radius, or should the top remain slightly higher?",
        "How much natural irregularity should remain visible around the perimeter?",
        "How frequently are you willing to pick, reshape and trim the style to maintain the spherical outline?",
      ],
      sampleRequest:
        "“I want a large sculpted Afro with a nearly spherical silhouette. Keep enough length and density to build real outward volume, pick it evenly from the scalp, and trim the perimeter into a controlled round shape rather than a short cropped Afro.”",
    },
    considerations: [
      "The spherical silhouette depends on sufficient density and shrinkage resistance to support hair outward from the scalp rather than letting it collapse or hang.",
      "Picking changes the visible curl definition by separating and expanding the hair, so this style intentionally prioritizes silhouette over individually defined coils.",
      "The geometric perimeter requires periodic reshaping because uneven growth gradually disrupts the sphere.",
      "The style should be assessed in its fully picked-out dry state before perimeter trimming because shrinkage and expansion can change the final dimensions substantially.",
      "Very tight, dense coils are especially effective because they can maintain a large unsupported rounded mass. Looser patterns increasingly need manipulation or structural assistance and may still fail to reproduce the defining sphere.",
      "This entry describes the sculpted result rather than claiming every full Afro must be perfectly symmetrical; natural Afros also exist with softer and more irregular silhouettes.",
    ],
    sourceIds: [
      "nmaahc-strands-of-inspiration",
      "smithsonian-black-hair-identity",
      "smithsonian-look-talk-play",
      "smithsonian-nathaniel-mathis",
    ],
    relatedStyleIds: ["hairstyle-cropped-afro"],
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
    relatedStyleIds: ["hairstyle-farrah-fawcett-cut", "hairstyle-the-rachel", "hairstyle-wolf-cut"],
    guidePublicationStatus: "published",
  },
  {
    id: "hairstyle-side-parted-flipped-lob",
    slug: "side-parted-flipped-lob",
    name: "Side-parted flipped lob",
    kind: "cut",
    summary:
      "A shoulder- to collarbone-length long bob worn with a deep side part, soft crown lift, and ends styled to turn outward.",
    intro: [
      "A lob is a longer bob, commonly worn around collarbone length. This version pairs that length with a deep side part and a smooth, rounded blowout, then turns the ends outward for a clear flicked finish.",
      "The side part shifts the balance of the front sections and can add a fuller sweep across the crown. Keep the outline near one length or use only light blending so the look stays a lob rather than becoming a heavily layered shag.",
      "The flipped ends are a styling finish as much as a cut detail. A round brush or flatiron can curve the tips outward; the strength of the flick can range from a soft bend to a more pronounced turn.",
    ],
    variations: [
      {
        id: "side-parted-flipped-lob-pronounced-flick",
        name: "Pronounced flipped lob",
        description:
          "Uses a stronger outward curve through the ends and more visible lift at the crown while retaining the clean lob perimeter.",
      },
      {
        id: "side-parted-flipped-lob-soft-flick",
        name: "Soft flipped lob",
        description:
          "Keeps the collarbone-length outline and deep side part, with only a small outward turn at the tips for a restrained finish.",
      },
    ],
    consultation: {
      intro:
        "Agree on the finished length and the parting first, then describe how much crown lift, layering, and outward bend you want in the styled result.",
      questions: [
        "Should the perimeter land at the shoulders or closer to the collarbone?",
        "Where do you naturally part your hair, and how deep should the side part sit?",
        "Would you prefer a mostly one-length outline or light layers for movement?",
        "Should the ends turn outward subtly or form a more pronounced flick?",
        "How often are you comfortable using a round brush or hot tool to recreate the smooth flipped finish?",
      ],
      sampleRequest:
        "“I’d like a collarbone-length lob with a deep side part, soft lift at the crown, and a clean outline. Please keep the layers light and show me how the ends look with a subtle outward flip that I can recreate with a round brush.”",
    },
    considerations: [
      "The recognizable flip usually needs a round-brush blowout or hot-tool styling; the cut alone will not hold the same smooth outward curve on every texture.",
      "Use heat protection and moderate heat when repeatedly shaping the ends with a dryer, hot brush, or flatiron.",
      "Straight and gently wavy hair can show the smooth side sweep and defined flipped tips with less reshaping. Curlier and coiler patterns change the silhouette when worn naturally, so discuss whether the goal is a natural-texture variation or a heat-styled finish.",
      "The parting, crown volume, and strength of the end flip can be adjusted independently; making every layer strongly feathered can shift the look toward a more extensively layered style.",
      "A very deep part or high crown lift may need more daily styling to keep its intended balance as the hair grows.",
    ],
    sourceIds: [
      "davines-90s-long-bob-2026",
      "glamour-long-bob-style-2026",
      "olivia-garden-flipped-bob",
      "tresemme-side-part-lob",
    ],
    relatedStyleIds: ["hairstyle-the-rachel"],
    guidePublicationStatus: "draft",
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
    relatedStyleIds: ["hairstyle-hime-cut", "hairstyle-long-layered-cut"],
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
    id: "hairstyle-the-rachel",
    slug: "the-rachel",
    name: "The Rachel",
    kind: "cut",
    summary:
      "A shoulder-skimming, heavily layered 1990s cut with pronounced face framing, rounded volume and a blow-dried finish that turns individual layers into visible curved sections around the face and neck.",
    intro: [
      "The Rachel emerged in 1994 after hairstylist Chris McMillan cut Jennifer Aniston’s hair during the first year of Friends. The version seen on Aniston became a mass-copied 1990s hairstyle and took its name from her character, Rachel Green.",
      "Its structure sits between a bob and a mid-length shag: the overall length stays near the shoulders while numerous shorter layers build shape around the face and through the upper sections. The classic finish exaggerates those layers with lift and curved ends rather than pressing them flat.",
      "McMillan has been clear that he did not invent the general idea of a mid-length layered shag. He recalled earlier related cuts on model Beri Smither, later adapted a similar idea for Cameron Diaz, and then cut the version on Aniston that became known specifically as The Rachel.",
      "The haircut and its styling are tightly linked. The canonical look relies on a round-brush blowout to separate and bend the layers, so an unstyled version can look substantially less like the familiar 1990s silhouette.",
    ],
    variations: [
      {
        id: "the-rachel-classic",
        name: "Classic Rachel",
        description:
          "Keeps the shoulder-skimming length, conspicuous face-framing layers, fuller crown and strongly curved blowout associated with the mid-1990s version.",
      },
      {
        id: "the-rachel-reduced-crown",
        name: "Reduced-crown Rachel",
        description:
          "Retains the layered face frame and rounded ends but uses less lift through the crown for a flatter, more contemporary silhouette.",
      },
    ],
    consultation: {
      intro:
        "The key decisions are finished length, where the shortest face-framing layer begins, how much layering is carried through the crown and back, and how much daily blow-drying you are willing to do.",
      questions: [
        "Should the finished perimeter sit at the jaw, just above the shoulders, or brush the shoulders?",
        "Where should the shortest face-framing layer start: around the cheekbone, mouth, or jaw?",
        "Do you want the fuller 1990s crown shape or a lower-volume modern interpretation?",
        "How strongly should the lower layers flick outward versus curve inward around the face?",
        "Will you routinely use a round-brush blowout, or should the cut also work acceptably with your natural texture and minimal styling?",
      ],
      sampleRequest:
        "“I want a classic Rachel-style cut around shoulder length, with lots of rounded face-framing layers starting near my cheekbones, visible layering through the crown and sides, and enough length at the bottom for the ends to flick outward when I blow-dry it.”",
    },
    considerations: [
      "The recognizable shape comes from both cutting and styling; without lift and directional bending at the ends, the same layers can read as a more generic mid-length layered cut.",
      "The classic finish is maintenance-heavy compared with a wash-and-go cut because the separate curved sections are usually created with a blow-dryer and round brush.",
      "Regular reshaping helps preserve the distinction between the shorter face frame and the longer perimeter as the haircut grows.",
      "Straight and gently wavy hair can display the rounded layer pattern with relatively ordinary styling. Stronger curls and coils substantially change the silhouette when their natural pattern is preserved.",
      "Dense hair may need careful weight management so the upper layers create movement rather than excessive width, while very fine or sparse hair can lose visual density if too many short layers are added.",
      "The original 1990s version used considerable volume through the upper head; lowering crown volume produces a more contemporary interpretation without changing the basic layered concept.",
    ],
    sourceIds: [
      "allure-iconic-beauty-trends",
      "allure-rachel-haircut-history",
      "glamour-modern-rachel",
      "vogue-aniston-hair-products",
    ],
    relatedStyleIds: [
      "hairstyle-long-layered-cut",
      "hairstyle-short-feathered-shag",
      "hairstyle-side-parted-flipped-lob",
    ],
    guidePublicationStatus: "published",
    inventedAt: { year: 1994, precision: "year", sourceId: "allure-iconic-beauty-trends" },
    inventor: { name: "Chris McMillan", sourceId: "allure-iconic-beauty-trends" },
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

export const styleExamples: StyleExample[] = [
  {
    id: "bald-mongolian-elder-woman",
    hairstyleIds: ["hairstyle-bald"],
    imageId: "bald-mongolian-elder-woman",
    title: "Clean-shaven head on elderly woman",
    caption:
      "A fictional Mongolian woman in her late 90s wearing a fully clean-shaven scalp, showing how the style leaves the natural head shape completely visible.",
    patternDescription:
      "No visible hair pattern remains because the scalp is shaved to skin level; the model's underlying natural hair subtype is intentionally unspecified.",
    lengthDescription: "Bald, with visible scalp hair removed to skin level across the entire head.",
  },
  {
    id: "bald-young-white-man",
    hairstyleIds: ["hairstyle-bald"],
    imageId: "bald-young-white-man",
    title: "Clean-shaven head on young man",
    caption:
      "A fictional white man in his mid-20s wearing a completely shaved head with an even scalp finish and no visible hairstyle perimeter.",
    patternDescription:
      "No visible hair pattern remains because the scalp is shaved to skin level; the model's underlying natural hair subtype is intentionally unspecified.",
    lengthDescription:
      "Bald, with scalp hair removed evenly to skin level from the hairline through the crown and nape.",
  },
  {
    id: "farrah-fawcett-cut-black",
    hairstyleIds: ["hairstyle-farrah-fawcett-cut"],
    imageId: "farrah-fawcett-cut-black",
    title: "Black-haired feathered Farrah cut",
    caption:
      "A fictional Indian woman in her 20s wearing long black hair in a Farrah-style feathered cut with broad face-opening layers and outward-flipped lower sections.",
    patternDescription:
      "Presented with a Type 1C-to-2A-like blow-dried finish that gives the black hair enough body for the large feathered sections; the image does not establish the fictional model's natural hair subtype.",
    lengthDescription:
      "Long, extending below the shoulders, with shorter graduated face-framing layers beginning around the cheekbones and progressively longer feathered sections through the sides and lower lengths.",
  },
  {
    id: "farrah-fawcett-cut-classic-feathered",
    hairstyleIds: ["hairstyle-farrah-fawcett-cut"],
    imageId: "farrah-fawcett-cut-classic-feathered",
    title: "Classic feathered Farrah cut",
    caption:
      "A fictional blonde woman wearing long, highly layered hair with broad face-opening feathers, elevated side volume and outward-flipped lower sections.",
    patternDescription:
      "Presented with a Type 1C-to-2A-like blow-dried finish that supplies enough body for the large feathered sections; the image does not establish the fictional model's natural hair subtype.",
    lengthDescription:
      "Long, extending below the shoulders, with progressively shorter layers around the face and upper sides.",
  },
  {
    id: "five-point-cut-geometric-black",
    hairstyleIds: ["hairstyle-five-point-cut"],
    imageId: "five-point-cut-geometric-black",
    title: "Black Five Point Cut in profile",
    caption:
      "A fictional younger adult woman with light-tan skin wearing a glossy black Five Point Cut, photographed from a stronger side angle to make the short sculpted nape and pointed front perimeter easier to read.",
    patternDescription:
      "Presented with a smooth straight Type 1B-like finish in jet-black hair so the geometric outline and directional length change remain highly legible; the image does not establish the fictional model's natural hair subtype.",
    lengthDescription:
      "Short and compact through the nape, with the perimeter progressively lengthening toward pronounced pointed sections beside the face.",
  },
  {
    id: "five-point-cut-geometric-dark",
    hairstyleIds: ["hairstyle-five-point-cut"],
    imageId: "five-point-cut-geometric-dark",
    title: "Dark geometric Five Point Cut",
    caption:
      "A fictional adult woman wearing a dark, glossy interpretation of the Five Point, with a strong geometric fringe, short shaped back and pointed side perimeter.",
    patternDescription:
      "Presented with a smooth straight Type 1B-like finish so the geometric perimeter remains clearly visible; the image does not establish the fictional model's natural hair subtype.",
    lengthDescription:
      "Short, with the back finishing above the jaw and the perimeter lengthening toward pointed sections beside the face.",
  },
  {
    id: "hime-cut-dark-red",
    hairstyleIds: ["hairstyle-hime-cut"],
    imageId: "hime-cut-dark-red",
    title: "Dark red classic Hime cut",
    caption:
      "A fictional Korean woman in her 20s wearing a classic Hime cut in medium-dark red, with blunt bangs, jaw-length side panels and substantially longer straight hair behind them.",
    patternDescription:
      "Presented with a smooth Type 1B-like straight finish so the abrupt blunt steps remain highly legible; the image does not establish the fictional model's natural subtype.",
    lengthDescription:
      "Long overall, with rear hair extending well below the shoulders and dense blunt side sections ending around the jaw.",
  },
  {
    id: "hime-cut-platinum-blonde",
    hairstyleIds: ["hairstyle-hime-cut"],
    imageId: "hime-cut-platinum-blonde",
    title: "Platinum blonde fringe-free Hime cut",
    caption:
      "A fictional Korean woman in her 30s wearing a platinum blonde Hime cut with a center part, blunt jaw-length side panels and long straight rear lengths.",
    patternDescription:
      "Presented with a Type 1A-like straight finish that emphasizes the sharp separation between the short panels and long hair; the image does not establish the fictional model's natural subtype.",
    lengthDescription:
      "Long overall, with the main lengths falling below the shoulders while the front side panels terminate in a dense blunt line near the jaw.",
  },
  {
    id: "monastic-tonsure-celtic",
    hairstyleIds: ["hairstyle-monastic-tonsure"],
    imageId: "monastic-tonsure-celtic",
    title: "Celtic front-shaved tonsure",
    caption:
      "A fictional young fair-skinned man wearing a Celtic-style tonsure with the front portion of the scalp shaved and longer hair retained behind the transition.",
    patternDescription:
      "The retained hair is shown with a loose wavy texture; the defining feature is the placement of the shaved front section rather than the curl pattern.",
    lengthDescription:
      "The front and upper-forward scalp are shaved closely, while substantially longer hair remains behind the ear-to-ear transition.",
  },
  {
    id: "monastic-tonsure-roman",
    hairstyleIds: ["hairstyle-monastic-tonsure"],
    imageId: "monastic-tonsure-roman",
    title: "Roman crown tonsure",
    caption:
      "A fictional older white man wearing a Roman-style tonsure with a cleanly shaved crown surrounded by a continuous ring of short hair.",
    patternDescription:
      "The retained hair is presented with a straight-to-slightly-wavy texture, but the tonsure geometry itself does not depend on a particular natural hair type.",
    lengthDescription:
      "The crown is shaved to skin level while a short, even ring of hair remains around the sides and rear of the head.",
  },
  {
    id: "natural-afro-deep-skin-man",
    hairstyleIds: ["hairstyle-natural-afro"],
    imageId: "natural-afro-deep-skin-man",
    title: "Natural afro on deep-brown skin",
    caption:
      "A fictional Black man in his early 40s with very deep brown skin wearing a full natural Afro with visible coily texture, broad rounded volume and a softly irregular perimeter.",
    patternDescription:
      "Presented with a dense Type 4A-like coily texture whose curl clusters remain visible throughout the silhouette; the image should not be treated as evidence of a real person's natural subtype.",
    lengthDescription:
      "Medium-to-long coily length expanded outward from the scalp into substantial rounded volume while retaining an organic, non-spherical outer edge.",
  },
  {
    id: "natural-afro-rounded-coily",
    hairstyleIds: ["hairstyle-natural-afro"],
    imageId: "natural-afro-rounded-coily",
    title: "Soft rounded natural afro",
    caption:
      "A fictional Black woman wearing a full natural Afro with visible coily texture, broad rounded volume and an intentionally organic perimeter.",
    patternDescription:
      "Presented with a Type 4A-like coily texture whose visible curl clusters remain part of the silhouette; the image should not be treated as evidence of a real person's natural subtype.",
    lengthDescription:
      "Medium-to-long coily length expanded outward from the scalp into substantial volume around the crown, sides and lower perimeter.",
  },
  {
    id: "sculpted-spherical-afro-classic",
    hairstyleIds: ["hairstyle-sculpted-spherical-afro"],
    imageId: "sculpted-spherical-afro-classic",
    title: "Large sculpted spherical afro",
    caption:
      "A fictional Black woman wearing a large, dense Afro picked outward and shaped into a controlled near-spherical silhouette.",
    patternDescription:
      "Generated with a dense Type 4C-like coily texture whose tight pattern supports substantial picked-out volume; the image should not be treated as evidence of a real person's natural subtype.",
    lengthDescription:
      "Substantial coily length expanded outward from the scalp, creating a large silhouette extending well beyond the head in every direction.",
  },
  {
    id: "sculpted-spherical-afro-older-man",
    hairstyleIds: ["hairstyle-sculpted-spherical-afro"],
    imageId: "sculpted-spherical-afro-older-man",
    title: "Sculpted spherical afro on older man",
    caption:
      "A fictional dark-skinned African man in his late 60s wearing a large, dense Afro shaped into a controlled near-spherical silhouette.",
    patternDescription:
      "Generated with a dense Type 4C-like coily texture whose tight pattern supports substantial picked-out volume; the image should not be treated as evidence of a real person's natural subtype.",
    lengthDescription:
      "Substantial coily length expanded outward from the scalp, creating a broad rounded silhouette with balanced volume through the crown, sides and lower perimeter.",
  },
  {
    id: "side-parted-flipped-lob-afro-latina-example",
    hairstyleIds: ["hairstyle-side-parted-flipped-lob"],
    imageId: "side-parted-flipped-lob-afrolatina-55",
    title: "Mature side-parted flipped lob",
    caption:
      "A fictional Afro-Latina woman in her mid-50s wears a polished shoulder-grazing lob with a pronounced side part and controlled flipped ends.",
    patternDescription: "Smooth blowout with restrained volume at the crown and outward-curved tips.",
    lengthDescription: "Shoulder-grazing lob with a compact, softly rounded outline.",
  },
  {
    id: "side-parted-flipped-lob-east-asian-example",
    hairstyleIds: ["hairstyle-side-parted-flipped-lob"],
    imageId: "side-parted-flipped-lob-east-asian-28",
    title: "Deep side part with outward flick",
    caption:
      "A fictional East Asian woman in her late 20s wears a smooth collarbone-length lob with a deep side part and outward-turned ends.",
    patternDescription: "Straight, smooth lengths with soft crown lift and a defined outward curve through the ends.",
    lengthDescription: "Collarbone-length lob with a clean perimeter and light blending.",
  },
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
  {
    id: "the-rachel-classic-layered",
    hairstyleIds: ["hairstyle-the-rachel"],
    imageId: "the-rachel-classic-layered",
    title: "Classic layered Rachel",
    caption:
      "A fictional South Asian woman in her 30s wearing a shoulder-length Rachel interpretation with pronounced rounded face framing, crown volume and outward-turning lower layers.",
    patternDescription:
      "Presented with a Type 1B-like blow-dried finish: mostly straight through the strand with enough body to hold the rounded layer pattern; the image does not establish the model’s natural hair subtype.",
    lengthDescription:
      "Medium length, with the longest sections brushing the shoulders and progressively shorter layers framing the cheeks, jaw and upper neck.",
  },
  {
    id: "the-rachel-soft-wave",
    hairstyleIds: ["hairstyle-the-rachel"],
    imageId: "the-rachel-soft-wave",
    title: "Rachel cut with softer wave",
    caption:
      "A fictional Black or mixed-race woman in her 50s wearing a softer Rachel interpretation with shoulder-length layering, visible face framing and restrained 1990s volume.",
    patternDescription:
      "Presented with a Type 2A-like softly waved blowout: loose bends remain visible while the round-brush styling still separates the layered silhouette; the image does not establish the model’s natural hair subtype.",
    lengthDescription:
      "Medium length around the shoulders, with shorter curved sections through the face and upper sides and flicked ends at the lower perimeter.",
  },
];
