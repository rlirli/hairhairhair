# Add a hairstyle

This checklist describes the current repository contract. Published hairstyle guides currently require exactly two style examples and guidance for all four numbered hair types.

## Mandatory

1. In `src/data/hairstyles.ts`, add the `Hairstyle` record and any `EditorialSource` records it cites. Use unique, stable IDs and a unique slug.
2. In the same file, add exactly two `StyleExample` records. Each `imageId` must resolve to hairstyle media, and each example must include the new hairstyle ID.
3. In the same file, add one `PatternGuidance` row for each numbered hair type (`hair-type-1` through `hair-type-4`).
4. If the hairstyle has related styles, add both directions of every relationship in `relatedStyleIds`.
5. Add every referenced image under `src/assets/hairstyles/`. The current collection uses PNG files.
6. In `src/data/media.ts`, statically import each image and add its `HairstyleMedia` record. Keep the media ID, filename, and `StyleExample.imageId` aligned.
7. For generated images, record the prompts in `docs/media/hairstyle-image-prompts.md` and keep each `promptKey` aligned with the media record.
8. Run `npm run verify`. The integrity tests derive the expected media and routes from the content data and asset directories; do not add parallel bookkeeping lists.

Set `guidePublicationStatus` to `draft` until the complete guide is ready. Draft hairstyles may be referenced by appearance observations but do not get a public global guide page.

## Optional

- Add a focused research note under `docs/research/hairstyles/` when the existing research does not support the new guide.
- Connect a real person's dated appearance separately in the people data. A person record is not required for a general hairstyle guide.
