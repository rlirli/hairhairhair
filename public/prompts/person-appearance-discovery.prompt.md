# Person appearance discovery

**Task.** Find documented appearances and candidate photo sources for one confirmed person. Discovery does not assess rights or store images.

**Input.** Confirmed identity and optional date range, event types, source preferences, or limit.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [appearance.schema.json](https://hairhairhair.hair/schemas/appearance.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** In both local and web use, search the live web and open reliable sources for documented appearances; public mirrors and model memory alone are insufficient. Local: use MCP only to confirm the supplied person's scoped record if needed; do not write. Web: public people pages may help identify leads, but verify candidates against live source pages; return findings only.

**Instructions.** Verify person, event, and date. Capture event context, date precision, photo page/asset URL, publisher, photographer/rightsholder when known, and evidence. Include hairstyle wording only when a source explicitly describes hair at that appearance. Do not infer it from an image. Public availability is not reuse permission. Do not inspect hairstyle records.

If live browsing or reliable source access is unavailable, do not guess: return `partial` or `blocked`. Put candidates and uncertainties in `findings`; this read-only task returns no records or assets. A supported empty search is complete. Follow the linked result schema; do not claim images are licensed, stored, or ingested.
