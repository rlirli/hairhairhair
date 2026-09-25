# People package inbox

Stage one person package per subfolder. Each folder needs `payload.json` plus every image filename listed in `photographs[].fileName`. The folder name must match `person.slug`.

Run `npm run import:people` to preview. Run `npm run import:people -- --apply` to import valid packages; imported folders move to `archive/`. Package structure and enums are defined by `public/schemas/person-package.schema.json`.

Natural hair type, natural hair color, and natural skin tone are required profile traits. Estimate them from the supplied photographs and record confidence. Use `null` only when the images do not support a reliable estimate. These are visual editorial estimates, not self-reported facts.

Public-domain and free licensed images are accepted. For licensed images, confirm the license permits cost-free commercial use and any crop or other derivative, then provide complete creator, license, and attribution data. Do not use non-commercial or no-derivatives licenses.

## ChatGPT prompt

```text
SCHEMA — read this first and follow it exactly:
https://hairhairhair.hair/schemas/person-package.schema.json

Create a complete person package for hairhairhair.hair. Use the public references below; do not depend on repository files or local paths.

## COLLECTION REFERENCES

1. Review the current people collection: https://hairhairhair.hair/people/llms.txt
2. Review existing hairstyles and their stable IDs: https://hairhairhair.hair/hairstyles/llms.txt
3. Use https://hairhairhair.hair/hairstyles/llms-full.txt for fuller hairstyle context when needed. For a missing but clearly distinct style, follow the `PROPOSED-` rule below.

## PERSON AND NATURAL PROFILE

Research the person and write a concise, sourced description. Inspect reliable photographs and estimate natural hair type (broad type 1–4), natural hair color, and natural skin tone. Include confidence and a short rationale for every trait. These are visual editorial estimates, not self-reported facts. Use null only when image evidence is genuinely too uncertain, with low confidence and a note. Do not infer an exact hair subtype unless the images support it. Other natural traits may be null when uncertain.

## PHOTOGRAPH AND RIGHTS

Find a clear, cost-free photograph with verifiable reuse rights. Public-domain and free licenses that permit commercial reuse and derivatives are acceptable. Do not use non-commercial or no-derivatives licenses. Verify the original file page and license before including it. Preserve the exact creator, license name and URL, attribution text, source URL, original image URL, rights evidence URL and basis, and derivative status. For licensed photos, set costFree, commercialUse, and derivativesAllowed to true. If rights are unclear, do not use the image.

## APPEARANCES

Include one or more sourced, dated appearances with event, image ID, source URL, and concise hairstyle observations. Use exact existing hairstyle IDs from the public hairstyle reference when a style matches. If a clear, materially distinct hairstyle in a photograph is missing from the catalog, set its `hairstyleId` to `PROPOSED-<kebab-case-name>` (for example, `PROPOSED-curtain-bob`) and use the note to name and describe the proposed style. The importer reports and preserves proposed labels in the archived package; it does not add them as confirmed hairstyle IDs. The hero image must be one of the included photographs, and every photograph must be used by an appearance.

## OUTPUT

Return one JSON payload conforming to the schema and each image as a separate file. Do not add fields the schema does not allow. Use the person's slug as the folder name, and name each image exactly as specified in the payload. Include source URLs you actually reviewed; do not fabricate research, dates, image credits, or licensing details.
```
