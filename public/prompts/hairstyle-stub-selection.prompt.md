# Hairstyle stub selection

**Task.** Find and triage existing hairstyle stubs. Do not enrich them.

**Input.** Optional stub IDs, Appearance IDs, scope, or count limit; otherwise use full local catalog.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [hairstyle.schema.json](https://hairhairhair.hair/schemas/hairstyle.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use MCP at active checkout to read hairstyle and scoped Appearance records. Web: use [published hairstyles](https://hairhairhair.hair/content/hairstyles.json) only; to select unpublished stubs, require supplied stub records or return blocked.

**Instructions.** Include only guidePublicationStatus stub. Summarize existing ID, name, kind, description, related IDs, and Appearance links when available. Deduplicate by ID and flag likely duplicates or underidentified entries without choosing a canonical one. Do not research or edit.

**Result.** Follow the linked result schema. Return the worklist, readiness or ambiguity, and counts in `findings`; this read-only task returns no records or assets.
