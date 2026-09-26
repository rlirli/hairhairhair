# Add a hairstyle

Create one JSON file per record under `src/content/`. See the [content model](../content-model.md) for the collection map, relationship conventions, and image handling.

1. Add `hairstyles/<id>.json` with a unique stable ID and slug. Keep `guidePublicationStatus` as `draft` until its page is ready.
2. Add each researched citation to `sources/<id>.json`, then reference its ID from `sourceIds` (including any origin or inventor source).
3. Add at least one `style-examples/<id>.json` for a published guide. Reference the hairstyle ID and a media ID.
4. Put original images in `assets/hairstyles/` and add `media/<id>.json` with the relative asset path, useful alt text, and provenance. Keep the media ID aligned with the example's `imageId`.
5. Add compatibility assessments to `compatibility/<hairstyle-id>.json` only where an estimate is defensible. Keep scores on the existing 0.0–1.0 scale; use `null` for unknown and zero for an intentional estimate. Use `dimension: "hair-type"` with a valid major type or subtype ID.
6. Run `npm run validate:content`. Run `npm run check` and `npm run build` when changing schemas, data shapes, or the data adapter.

Compatibility estimates describe how fully the defining features can be achieved through ordinary cutting and styling while preserving the natural curl pattern, assuming sufficient length. They are not personal-suitability scores, promises, or measures of popularity. A missing assessment means unknown. The listing threshold remains in application code as `MIN_COMPATIBILITY_FOR_LISTING`.

A published hairstyle needs a style example. Related hairstyle IDs should identify a useful editorial relationship; add a reverse link when the relationship is intended to be reciprocal. Do not invent an origin date or inventor without a reliable source.
