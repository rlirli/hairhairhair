# Add a hairstyle

Prepare one package folder under `inbox-hairstyles/<slug>/` with a `payload.json` and its PNG images. The public [hairstyle package schema](../../public/schemas/hairstyle-package.schema.json) describes the complete top-level payload. See the [content model](../content-model.md) for the collection map, relationship conventions, and image handling.

1. Put the hairstyle record in `hairstyle`, citations in `sources`, examples in `styleExamples`, generated image metadata in `media`, prompts in `imagePrompts`, and assessments in `compatibility`.
2. Use stable unique IDs and ensure all referenced source, hairstyle, variation, hair-type, media, and example IDs resolve. Keep `guidePublicationStatus` as `draft` until its page is ready.
3. Add one PNG next to `payload.json` for each media record. Each image must be used by one style example and have a corresponding prompt.
4. Keep compatibility scores on the existing 0.0–1.0 scale; use `null` for unknown and zero for an intentional estimate. Currently, imports accept `dimension: "hair-type"` with a valid major type or subtype ID.
5. Run `npm run import:hairstyles` to validate and preview. Review the listed outputs, then run `npm run import:hairstyles -- --apply` to write content records and assets and archive the package. Finish with `npm run validate:content`.

Compatibility estimates describe how fully the defining features can be achieved through ordinary cutting and styling while preserving the natural curl pattern, assuming sufficient length. They are not personal-suitability scores, promises, or measures of popularity. A missing assessment means unknown. The listing threshold remains in application code as `MIN_COMPATIBILITY_FOR_LISTING`.

A published hairstyle needs a style example. Related hairstyle IDs should identify a useful editorial relationship; add a reverse link when the relationship is intended to be reciprocal. Do not invent an origin date or inventor without a reliable source.
