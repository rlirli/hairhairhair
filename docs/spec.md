# hairhairhair V0

## Experience

The site is a small editorial field guide: a home page introduces the visual language, `/hair-types/` links the four family pages and lists the 12 types, and each `/hair-types/{slug}/` page provides a description, characteristics, comparison, and previous/next navigation. Family pages at `/hair-types/1/` through `/hair-types/4/` group their three subtypes. The 404 page returns users home.

## Content contract

`src/data/hair-types.ts` owns the content model. It exports `classificationSystems`, `hairTypes`, and `getHairType(slug)`. Each type has `id`, `classificationSystemId`, `code`, `slug`, `family`, `subtype`, `name`, `description`, `sortOrder`, `characteristics`, and `comparison`.

## Visual system

Warm ivory, near-black ink, orange accents, butter-yellow illustration panels, oversized serif display typography, and compact uppercase labels create the editorial character. `Pattern.astro` generates reusable abstract SVG marks and labels them as simplified illustrations, not diagnostics or photos.

## Delivery

Astro uses static output, trailing slashes, canonical URLs under `https://hairhairhair.hair`, a local SVG favicon, `robots.txt`, and `sitemap-index.xml`. GitHub Actions builds with `npm ci`, uploads `dist`, and deploys Pages with the required permissions and concurrency guard.
