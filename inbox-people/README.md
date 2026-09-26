# People staging

Each subfolder is one person package. Put its complete JSON payload in `payload.json` and the referenced photographs beside that file. The public package contract is [`person-package.schema.json`](../public/schemas/person-package.schema.json).

The payload has top-level `person`, `naturalProfile`, `photographs`, and `appearances` entries. The importer resolves and checks their IDs, writes the linked JSON records, and copies photographs into `src/content/`.

Run `npm run import:people` to validate and preview the import. Add `-- --apply` only after reviewing the plan; applied packages are moved to `archive/`. See [Add a person](../docs/contributing/adding-a-person.md) for field guidance.
