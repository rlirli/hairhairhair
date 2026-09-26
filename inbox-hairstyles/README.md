# Hairstyle staging

Each subfolder is one hairstyle package. Put its complete JSON payload in `payload.json` and its generated PNGs beside that file. The public package contract is [`hairstyle-package.schema.json`](../public/schemas/hairstyle-package.schema.json).

The payload has top-level `sources`, `hairstyle`, `styleExamples`, `compatibility`, `media`, and `imagePrompts` entries. Compatibility assessments retain the 0.0–1.0 score scale. The importer creates linked JSON records and copies the images into `src/content/`.

Run `npm run import:hairstyles` to validate and preview the import. Add `-- --apply` only after reviewing the plan; applied packages are moved to `archive/`. See [Add a hairstyle](../docs/contributing/adding-a-hairstyle.md) for field guidance.
