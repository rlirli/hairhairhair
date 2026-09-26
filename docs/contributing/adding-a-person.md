# Add a person

Create one JSON record per entity under `src/content/`. See the [content model](../content-model.md) for paths, ID references, schemas, and validation.

1. Add `people/<id>.json` with a stable ID and unique slug. Keep biographical claims concise and sourced.
2. Add `natural-profiles/<id>.json` when there is defensible evidence for natural hair traits. Record provenance and uncertainty for each trait; do not infer a precise subtype from a styled image.
3. Add each photograph to `assets/people/` and create a `media/<id>.json` record with the matching `asset` path, alt text, credit, source, and reuse-rights evidence.
4. Add one `appearances/<id>.json` per dated event. Point it to the person ID, media ID, and hairstyle IDs visible in the photograph. Use an existing hairstyle ID only when it is a reasonable match.
5. Run `npm run validate:content`; it checks record schemas, references, IDs, and image files.

Do not add a photograph with unclear reuse rights or a license that disallows the site's intended use. Keep source photographs distinct from generated hairstyle examples, and do not describe a generated model as a real person's appearance.
