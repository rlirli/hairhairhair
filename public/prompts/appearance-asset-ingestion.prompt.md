# Appearance asset ingestion

**Task.** Review supplied appearance-photo candidates for rights; ingest only when verifiable permission allows every intended use at no monetary license cost.

**Input.** Person ID, candidate event/photo/source details, intended uses, and image files when available.

**Contracts.** Use `src/content/schemas/appearance.schema.json`, `media.schema.json`, and `source.schema.json` in the active checkout, or the linked [Appearance](https://hairhairhair.hair/schemas/appearance.schema.json), [Media](https://hairhairhair.hair/schemas/media.schema.json), and [Source](https://hairhairhair.hair/schemas/source.schema.json) schemas. Results follow [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use the connected `hairhairhair-content` MCP at the active checkout to read/write only the supplied person's scoped Appearance, Source, and Media records; add an eligible image with `content_add_image`. Web: use supplied full records and applicable schemas; return proposed records and attach only actual supplied assets. A web proposal is not persisted.

**Instructions.** Verify asset identity, rights holder, authoritative license/permission, all intended uses, attribution, and other terms. Withhold an image if a required fact is missing, ambiguous, costly, or incompatible. Preserve event/date evidence and URLs. Include a reported hairstyle only if a source explicitly states it for this appearance. Do not inspect the photo to classify hair or browse the hairstyle catalog. For local changes use dry-run, review, then apply. Report ingestion only when MCP confirms it.

**Result.** Return per-candidate decisions and rights evidence in `findings`. Include only actual raw persisted records or web proposals; list only actual files attached/added in `assets`. Follow the linked result schema and state applied status truthfully.
