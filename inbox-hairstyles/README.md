# Hairstyle package inbox

Use this gitignored folder to stage one hairstyle package per subfolder. Each package needs a `payload.json` and every PNG named in its `media[].fileName`. The folder name must match `hairstyle.slug`. Follow the [public hairstyle-package.schema.json schema](https://hairhairhair.hair/schemas/hairstyle-package.schema.json).

Run `npm run import:hairstyles` to preview packages. Run `npm run import:hairstyles -- --apply` to import valid packages; imported folders move to `archive/`.

## Prompt for ChatGPT

Copy the prompt below into a ChatGPT web session with web research and image generation available.

```text
Create one complete hairstyle package for hairhairhair.hair. Use web research and image generation. Follow the required sequence below.

## SCHEMA

1. Fetch and read the authoritative JSON Schema: https://hairhairhair.hair/schemas/hairstyle-package.schema.json
2. Make the final payload conform to that schema exactly. Do not add fields the schema does not allow. If you cannot open the schema URL, stop and ask me to provide it; do not guess its structure.

## COLLECTION REVIEW AND STYLE SELECTION

3. Open and review the existing hairstyle collection at https://hairhairhair.hair/hairstyles, including its hairstyle descriptions and example images. Use it to understand which cuts, techniques, hair textures, and visual presentations are already represented. If the page cannot be accessed, ask me for help; do not pretend you reviewed it.
4. Choose a clearly identifiable hairstyle that adds useful coverage to the collection. It should be complementary to existing entries while remaining a distinct hairstyle or a materially distinct variation.
5. Choose a fictional adult model who is visually complementary to the existing example models. Consider diversity in skin tone, gender presentation, age, hair texture, and portrait angle. Avoid repeating the collection's most common visual presentation. Show the hair clearly; do not imply that appearance alone establishes a precise natural hair subtype.
6. Evaluate whether any existing hairstyle IDs are meaningfully related. Internal hairstyle IDs are not visibly displayed on the website. Use the repository's hairstyle data file at https://github.com/rlirli/hairhairhair/blob/main/src/data/hairstyles.ts to check exact IDs and slugs. Related links are optional: use an empty relatedStyleIds array when no direct relationship helps users. Do not add links merely because two hairstyles complement each other.


## RESEARCH — COMPLETE THIS BEFORE IMAGE GENERATION

7. Research the selected hairstyle extensively on the web before generating an image. Open and verify the sources themselves. Prefer reliable, independent sources with relevant expertise or first-hand documentation. Research the hairstyle's defining features, terminology, variations, consultation guidance, and practical considerations. Support factual claims with sources; do not invent history, an inventor, or an origin date. Omit inventedAt and inventor unless reliable sources verify them.
8. Record the sources you actually consulted in the payload's sources array, with each source's exact title, publisher, direct URL, a unique kebab-case ID, and today's date as reviewedAt. Make sourceIds match those IDs. Do not fabricate titles, URLs, publishers, or research findings. If a detail cannot be verified, leave it out or describe it cautiously.
9. Add hair-type compatibility estimates. Hair Type 1 Straight, Type 2 Wavy, Type 3 Curly, Type 4 Coily. Base them on research and editorial reasoning; if direct evidence is unavailable, estimate how fully the defining features can be achieved through ordinary cutting and styling while preserving natural straight/curl pattern. Score 0 = not achievable; 1 = fully achievable; use intermediate values proportionally. Add subtype scores only for meaningful differences, set provenance to "estimated", and do not leave compatibility empty solely because sources lack scores.
10. Finish the research and settle the hairstyle's defining look before moving on to image generation.


## IMAGE GENERATION

11. Only after completing the collection review and research, generate one original square PNG image for a style example. The image must have a genuinely transparent RGBA background with clean alpha edges; do not bake in a white, ivory, studio, or checkerboard background.
12. Use understated contemporary editorial portrait photography: a fictional adult, soft neutral light, realistic hair strands and natural skin texture, simple cream clothing, and a shoulder-up composition. Keep the entire hairstyle silhouette visible with space around it. Choose a three-quarter or other angle that makes the haircut's distinguishing shape easy to assess. Avoid celebrity likenesses, text, logos, watermarks, jewelry, hats, and distracting props. The model and angle should add visual variety relative to the collection.
13. Save or attach the generated image as a PNG named exactly as specified by media[].fileName. Use the filename stem as media[].id and provenance.promptKey, and use background "transparent". Keep the image separate from the JSON; do not embed or base64-encode it.


## FINAL OUTPUT

14. Re-open and validate the final payload against the full JSON Schema at https://hairhairhair.hair/schemas/hairstyle-package.schema.json. Return the complete payload as exactly one fenced `json` code block; do not split it across blocks or offer it as a JSON file download. Include all schema-required fields. Ensure the hairstyle ID and slug are unique, the output folder name equals the slug, every example's imageId matches a media id, every source reference resolves, and all IDs use the schema's format. Set guidePublicationStatus to "draft" unless I explicitly ask for "published".
15. Provide the PNG as a separate downloadable image attachment. Preserve the complete image-generation prompt verbatim in imagePrompts and match its mediaId to the generated image's media id.
16. Finish your response with this folder listing, replacing the placeholders with the actual names. Include every generated PNG filename and `payload.json`; put nothing after the listing, but with a clear instruction to the user to place the files as displayed.
    inbox-hairstyles/
        <slug>/
            payload.json
            <media[].fileName>
```
