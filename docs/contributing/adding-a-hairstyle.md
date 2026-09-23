# Add a hairstyle

This checklist describes the current repository contract. A published hairstyle needs at least one style example. Compatibility information may remain unknown.

Each published hairstyle automatically receives `/hairstyles/:slug/examples/`, an individual `/hairstyles/:slug/examples/:exampleId/` page for every style example, `/hairstyles/:slug/appearances/`, and `/hairstyles/:slug/related-hairstyles/`. The detail page previews up to six related hairstyles and dated appearances in horizontal strips, then links to the full collections. The archive pages retain all entries in wrapping grids. Appearance dates are enhanced into the viewer's browser locale while retaining an ISO-date fallback. Example cards link to their detail pages; each example detail page links back to the hairstyle and its examples archive. Keep appearance associations attached to dated, sourced records in the people data; do not use a generated hairstyle illustration as a celebrity appearance.

The detail-page style notes resolve broad and subtype hair-type compatibility from `src/data/hairstyle-compatibility.ts`. Each of the twelve subtype marks represents the resolved score for that subtype, including inherited major-type estimates; unknown scores stay visibly distinct from zero. These editorial estimates describe how closely the defining features can be achieved through ordinary cutting and styling while preserving natural curl pattern, assuming sufficient length. They are not personal suitability scores, promises, or listing eligibility. Source-backed `inventedAt` and `inventor` rows are shown only when supplied, with their source links.

The hairstyle detail page keeps collection separators as thin hairlines and presents reviewed sources in muted text. Source review dates retain an ISO server-rendered fallback and are formatted in the viewer's browser locale using UTC to avoid shifting the calendar date.

## Mandatory

1. In `src/data/hairstyles.ts`, add the `Hairstyle` record and any `EditorialSource` records it cites. Use unique, stable IDs and a unique slug. Preserve the source's exact `title`; use optional `displayTitle` for a distinct, neutral website label when needed.
2. In the same file, add at least one `StyleExample` record. Each `imageId` must resolve to hairstyle media, and each example must include the new hairstyle ID.
3. If the hairstyle has related styles, add both directions of every relationship in `relatedStyleIds`.
4. Add every referenced image under `src/assets/hairstyles/`. The current collection uses PNG files.
5. In `src/data/media.ts`, statically import each image and add its `HairstyleMedia` record. Keep the media ID, filename, and `StyleExample.imageId` aligned.
6. For generated images, record the prompts in `docs/media/hairstyle-image-prompts.md` and keep each `promptKey` aligned with the media record.
7. Run `npm run sort:hairstyles`.
8. Run `npm run verify`. The integrity tests derive the expected media and routes from the content data and asset directories; do not add parallel bookkeeping lists.

Set `guidePublicationStatus` to `draft` until the hairstyle page is ready. Draft hairstyles may be referenced by appearance observations but do not get a public hairstyle page.

## Optional

- **Recommended:** Link the hairstyle to compatible hair-types. Add compatibility estimates in `src/data/hairstyle-compatibility.ts` only where there is a defensible judgment. The score answers: “How fully can the hairstyle’s defining features be achieved on this hair type through ordinary cutting and styling, while keeping its natural curl pattern?” Assume sufficient hair length. A missing score is unknown (`null`), not zero. Scores from 0 to 1 are editorial estimates, not popularity measurements or promises. A subtype inherits its parent's score unless an explicit subtype score overrides it; the listing threshold is defined by `MIN_COMPATIBILITY_FOR_LISTING`. Broad parent scores include all three subtypes. Do not infer estimates from the archived `HairTypeSpecificHairstyleAdvice` notes. Variant-specific overrides are reserved for future use.
- Add more style examples and their media records when they show a materially different interpretation.
- Add source-backed `inventedAt` or `inventor` data. Omit either field when no reliable source is available, and include its `sourceId` in the hairstyle's `sourceIds`.
- Add a focused research note under `docs/research/hairstyles/` when the existing research does not support the new hairstyle.
- Connect a real person's dated appearance separately in the people data. A person record is not required for a general hairstyle.
