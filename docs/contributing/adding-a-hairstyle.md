# Add a hairstyle

This checklist describes the current repository contract. A published hairstyle guide needs at least one style example and at least one reviewed major-hair-type association.

Each published guide automatically receives `/hairstyles/:slug/examples/` and `/hairstyles/:slug/appearances/` pages. The guide previews up to four style examples and six dated appearance photographs, with a “More” link to each complete collection. Keep appearance associations attached to dated, sourced records in the people data; do not use a generated hairstyle illustration as a celebrity appearance.

## Mandatory

1. In `src/data/hairstyles.ts`, add the `Hairstyle` record and any `EditorialSource` records it cites. Use unique, stable IDs and a unique slug.
2. In the same file, add at least one `StyleExample` record. Each `imageId` must resolve to hairstyle media, and each example must include the new hairstyle ID.
3. Add `PatternGuidance` only for major hair types that the repository material supports. A published guide needs at least one row, but it does not need a row for every type. The detail page lists Types 1–4 and shows where a reviewed note exists. An absent row means the catalog has no reviewed association recorded; it is not a suitability score and does not prove that a person cannot wear the style.
4. If the hairstyle has related styles, add both directions of every relationship in `relatedStyleIds`.
5. Add every referenced image under `src/assets/hairstyles/`. The current collection uses PNG files.
6. In `src/data/media.ts`, statically import each image and add its `HairstyleMedia` record. Keep the media ID, filename, and `StyleExample.imageId` aligned.
7. For generated images, record the prompts in `docs/media/hairstyle-image-prompts.md` and keep each `promptKey` aligned with the media record.
8. Run `npm run verify`. The integrity tests derive the expected media and routes from the content data and asset directories; do not add parallel bookkeeping lists.

Set `guidePublicationStatus` to `draft` until the complete guide is ready. Draft hairstyles may be referenced by appearance observations but do not get a public global guide page.

## Optional

- Add more style examples and their media records when they show a materially different interpretation.
- Add source-backed `inventedAt` or `inventor` data. Omit either field when no reliable source is available, and include its `sourceId` in the hairstyle's `sourceIds`.
- Add a focused research note under `docs/research/hairstyles/` when the existing research does not support the new guide.
- Connect a real person's dated appearance separately in the people data. A person record is not required for a general hairstyle guide.
