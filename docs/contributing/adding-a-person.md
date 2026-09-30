# Add a person

Prepare one package folder under `inbox-people/<slug>/` with a `payload.json` and its photographs. The public [person package schema](../../public/schemas/person-package.schema.json) describes the complete top-level payload. See the [content model](../content-model.md) for paths, ID references, and validation.

1. Put the person in `person`, the optional-trait evidence in `naturalProfile`, source photographs in `photographs`, and dated records in `appearances`. A source-verified appearance can omit `imageId` if no reusable photo is available; an observation may set `styleExampleId` to a matching catalog example for the hairstyle index.
2. Give every photograph a matching image file and media ID. Record its credit, source, license, and reuse-rights evidence; keep biographical claims concise and sourced.
3. Do not infer a precise natural hair subtype from a styled image. If using the LLM workflow, follow [person-to-hairstyles](../../public/workflows/person-to-hairstyles.workflow.md): keep image-only observation isolated from source claims and catalog context, then match separately. A known concept missing from the catalog can receive a minimal stub; defer a match when evidence is insufficient.
4. Run `npm run import:people` to validate and preview. Review the listed outputs, then run `npm run import:people -- --apply` to write content records and assets and archive the package. Finish with `npm run validate:content`.

Do not add a photograph with unclear reuse rights or a license that disallows the site's intended use. Keep source photographs distinct from generated hairstyle examples, and do not describe a generated model as a real person's appearance.
