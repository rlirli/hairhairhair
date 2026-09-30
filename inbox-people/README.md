# People staging

Each subfolder is one person package. Put its complete JSON payload in `payload.json` and the referenced photographs beside that file. The public package contract is [`person-package.schema.json`](../public/schemas/person-package.schema.json).

The payload has top-level `person`, `naturalProfile`, `photographs`, and `appearances` entries. Source-verified appearances may omit `imageId` when no reusable photo is available; observations may select a matching `styleExampleId` for the hairstyle index and may omit `hairstyleId` until catalog matching is complete. Observations keep source claims (`reportedHairstyle`), image-only descriptions (`visualDescription`), pre-catalog name candidates, and catalog reasoning in separate fields. Missing hairstyle links produce a content-validation warning, not a failure. The importer resolves supplied IDs, writes the linked JSON records, and copies photographs into `src/content/`.

For LLM-assisted work, see [`person-to-hairstyles.workflow.md`](../public/workflows/person-to-hairstyles.workflow.md). Leave the hairstyle link absent when evidence is insufficient, or create a minimal stub for a recognized missing catalog concept.

Run `npm run import:people` to validate and preview the import. Add `-- --apply` only after reviewing the plan; applied packages are moved to `archive/`. See [Add a person](../docs/contributing/adding-a-person.md) for field guidance.
