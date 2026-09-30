# Create a hairstyle package

Create one complete hairstyle package for hairhairhair.hair. Research the hairstyle, prepare the guide and compatibility records, and generate one original example image. Perform only this requested package task; do not commit or push repository changes.

## SCHEMA AND OUTPUT CONTRACT

1. Fetch and read the authoritative hairstyle package JSON Schema from `https://hairhairhair.hair/schemas/hairstyle-package.schema.json`. Also consult the current schemas for any nested record types exposed by the package contract.
2. Make the final payload conform exactly to the authoritative package schema. Do not add fields the schema disallows. If the schema URL cannot be opened, stop and ask the user to provide it; do not guess its structure.
3. Return the complete package as exactly one fenced `json` code block. Do not split it across blocks or offer it as a JSON file download. Include every generated image with the package as required by the schema and include the complete image-generation prompt verbatim in `imagePrompts` when that field is supported.

## COLLECTION REVIEW AND SELECTION

4. Open and review the existing hairstyle collection at `https://hairhairhair.hair/hairstyles`, including descriptions and example images. Use it to avoid duplicates and find useful coverage. If the collection cannot be reviewed, ask for help rather than claiming it was reviewed.
5. Select a clearly identifiable hairstyle that adds useful coverage while remaining distinct from existing entries. Check exact existing IDs and slugs in the repository's hairstyle data at `https://github.com/rlirli/hairhairhair/blob/main/src/data/hairstyles.ts` before proposing related-style links. Related links are optional; use an empty array when no direct relationship helps readers.
6. Do not claim that a stub is a complete guide. The lifecycle values are `stub`, `draft`, and `published`: a stub is research-pending and may have only stable identity and status; a draft is a complete guide intentionally not public; a published guide is complete, sufficiently supported, and suitable for public readers. Do not use draft to mean incomplete research.

## RESEARCH

7. Research the selected hairstyle before image generation. Open and verify the sources themselves. Prefer reliable independent sources with relevant expertise or first-hand documentation. Research the defining features, terminology, variations, consultation guidance, and practical considerations. Do not invent an origin, inventor, date, or other unsupported fact; omit `inventedAt` and `inventor` unless reliable sources verify them.
8. Record only sources actually consulted, with exact title, publisher, direct URL, unique kebab-case ID, and today's `reviewedAt` date. Make source references resolve and support the claims they accompany. Do not fabricate titles, URLs, publishers, or findings. If a detail cannot be verified, omit it or describe it cautiously.
9. Add hair-type compatibility assessments for Type 1 Straight, Type 2 Wavy, Type 3 Curly, and Type 4 Coily where required by the schema. Base them on research and editorial reasoning. Where direct evidence is unavailable, estimate how fully ordinary cutting and styling can achieve the defining features while preserving natural pattern; mark estimated provenance and explain the rationale. Add subtype distinctions only when meaningful; do not imply a precise natural subtype from a model's appearance.
10. Prepare and validate the complete guide and compatibility information before generating the example. Publish only when evidence and required content are sufficient. Use `draft` only for a complete guide intentionally held back from public release. If research is insufficient, preserve or return a `stub` only if the package schema permits that status and its reduced fields; otherwise stop and explain the schema limitation instead of fabricating completeness.

## IMAGE GENERATION

11. Generate one original square PNG style-example image after the guide's visual target is established. It must depict a fictional adult, not a celebrity or identifiable real person.
12. The individual image is a contemporary editorial shoulder-up portrait. Make the hair the clear subject: show the full silhouette with breathing room and choose a front, profile, or three-quarter view that makes the defining cut or styling detail easy to assess. Use soft neutral light, natural-looking color, realistic hair strands and skin texture, and quiet solid clothing. Keep the selected hairstyle faithful to the guide; do not add dramatic details that change its defining shape.
13. The background must be genuinely transparent RGBA, with clean alpha edges that retain fine hair strands. Do not use a white, ivory, colored, studio, scenic, or checkerboard background. Inspect that the delivered image actually has an alpha channel and transparent pixels; regenerate or stop if it does not.
14. Include the generated image as an original AI-generated media asset and associate its media record with the style-example record. Ensure the example links to the selected hairstyle and its image media ID. Include truthful alt text and set a transparent-background field only after verifying transparency. Avoid text, logos, watermarks, jewelry, hats, and distracting props.

## FINAL VALIDATION

15. Re-open and validate the complete payload against the full authoritative package schema. Ensure IDs and slug are unique and schema-valid; the output folder name equals the slug; every example's image ID matches a media ID; every source and related-style reference resolves; and compatibility records satisfy the current schema. Do not claim success if validation fails.
16. Return exactly one fenced `json` code block containing the complete valid package. Include the image-generation prompt verbatim in `imagePrompts` when supported. Do not claim to have written, committed, or published repository files unless the package workflow actually performed those actions through an authorized content tool.
