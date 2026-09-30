# Add a hairstyle

For a complete package import, prepare one folder under `inbox-hairstyles/<slug>/` with `payload.json` and its PNG images. The public [hairstyle package schema](../../public/schemas/hairstyle-package.schema.json) describes that package contract. This importer remains separate from the LLM task-result envelope; for task-based editorial work, see [hairstyle-publication](../../public/workflows/hairstyle-publication.workflow.md). See the [content model](../content-model.md) for collections, relationships, and image handling.

1. Put the hairstyle record in `hairstyle`, citations in `sources`, examples in `styleExamples`, generated image metadata in `media`, prompts in `imagePrompts`, and assessments in `compatibility`.
2. Use stable unique IDs and ensure all referenced source, hairstyle, variation, hair-type, media, and example IDs resolve. In the lifecycle model, use `stub` for incomplete research, `draft` for a complete guide intentionally held back, and `published` for a complete, sufficiently supported guide approved for readers.
3. Add one PNG next to `payload.json` for each media record. Each image must be used by one style example and have a corresponding prompt.
4. Keep compatibility scores on the existing 0.0–1.0 scale; use `null` for unknown and zero for an intentional estimate. Currently, imports accept `dimension: "hair-type"` with a valid major type or subtype ID.
5. Run `npm run import:hairstyles` to validate and preview. Review the listed outputs, then run `npm run import:hairstyles -- --apply` to write content records and assets and archive the package. Finish with `npm run validate:content`.

Compatibility estimates describe how fully the defining features can be achieved through ordinary cutting and styling while preserving the natural curl pattern, assuming sufficient length. They are not personal-suitability scores, promises, or measures of popularity. A missing assessment means unknown. The listing threshold remains in application code as `MIN_COMPATIBILITY_FOR_LISTING`.

This package importer expects each included image to support a style example. The separate research task may complete and publish a guide before optional example imagery is ready; when an example is deferred, the workflow can finish without inventing an image or blocking a sufficiently complete guide. Related hairstyle IDs should identify a useful editorial relationship; add a reverse link when the relationship is intended to be reciprocal. Do not invent an origin date or inventor without a reliable source.
