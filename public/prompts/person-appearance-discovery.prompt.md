# Person appearance discovery

**Task.** Find documented appearances and candidate photo sources for one confirmed person. Discovery identifies candidates; it does not decide publication rights or store images.

**Input.** Confirmed identity and optional date range, event types, source preferences, or limit.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [appearance.schema.json](https://hairhairhair.hair/schemas/appearance.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** In both local and web use, search the live web and open reliable sources for documented appearances; public mirrors and model memory alone are insufficient. Local: use MCP only to confirm the supplied person's scoped record if needed; do not write. Web: public people pages may help identify leads, but verify candidates against live source pages; return findings only.

**Instructions.** Verify person, event, and date. For each candidate, capture the photo page URL, direct image URL when available, publisher, photographer/rightsholder when known, and the source evidence. Also capture an independent non-photo source URL supporting the event/date when available; this is needed if the Appearance is later persisted without the image. Keep the photo URL distinct from the event/date source URL.

Include hairstyle wording only when a source explicitly describes hair at that appearance. Do not infer it from an image. Public availability is not permission to publish or analyze an image. Do not download, attach, persist, or assess rights for candidates in this task. Do not inspect hairstyle records. The orchestrator may pass a candidate to the separate asset-review task, which decides whether it is eligible for public reuse, temporary analysis only, or neither.

If live browsing or reliable source access is unavailable, do not guess: return `partial` or `blocked`. Put candidates and uncertainties in `findings`; this read-only task returns no records or assets. A supported empty search is complete. Do not claim images are licensed, permitted for analysis, stored, or ingested.
