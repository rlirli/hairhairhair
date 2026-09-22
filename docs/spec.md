# hairhairhair V0

## Experience

The site is a small editorial field guide: a home page introduces the visual language, `/hair-types/` links the four hair-type pages and lists the 12 sub-types, and each `/hair-types/{slug}/` page provides a description, characteristics, comparison, and previous/next navigation. Hair-type pages at `/hair-types/1/` through `/hair-types/4/` group their three sub-types. The 404 page returns users home.

## Content contract

`src/data/hair-types.ts` owns the content model. It exports `classificationSystems`, `hairTypes`, `hairSubtypes`, and `getHairSubtype(slug)`. Numbered hair types carry their visible `pattern`; lettered sub-types carry `hairTypeId`, `pattern`, and `subtypeCode` alongside their descriptive content.

`src/data/natural-profiles.ts` owns optional person-level natural profile records. Every trait is a value paired with `provenance.source`, `provenance.status`, and `provenance.confidence`. A natural hair type stores a `hairTypeId` that resolves to the existing `/hair-types/{slug}/` route. Unknown thickness and density stay `null` with `not-documented` provenance; they are never inferred from a styled photograph.

## Visual system

Warm ivory, near-black ink, orange accents, butter-yellow illustration panels, oversized serif display typography, and compact uppercase labels create the editorial character. `Pattern.astro` generates reusable abstract SVG marks and labels them as simplified illustrations, not diagnostics or photos.

The theme also supports a warm charcoal/cream/copper dark palette. A keyboard-accessible header toggle persists the user's choice in local storage, defaults to the OS preference, and uses an inline head script to avoid a flash of the wrong theme. Storage failures fall back safely to the system preference.

## Delivery

Astro uses static output, trailing slashes, canonical URLs under `https://hairhairhair.hair`, a local SVG favicon, `robots.txt`, and `sitemap-index.xml`. GitHub Actions builds with `npm ci`, uploads `dist`, and deploys Pages with the required permissions and concurrency guard.
