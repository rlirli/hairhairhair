# Hairstyle guide research

**Task.** Research and maintain one hairstyle guide; complete a stub when evidence supports it and publish only when complete and reader-ready.

**Input.** Hairstyle ID or narrowly defined concept, sources/constraints, and current date.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [hairstyle.schema.json](https://hairhairhair.hair/schemas/hairstyle.schema.json), [source.schema.json](https://hairhairhair.hair/schemas/source.schema.json), [compatibility.schema.json](https://hairhairhair.hair/schemas/compatibility.schema.json), [hair-type.schema.json](https://hairhairhair.hair/schemas/hair-type.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** In both local and web modes, perform live research and open reliable, preferably authoritative sources; model memory alone is not evidence. Local: use MCP at the active checkout to read the target, related styles, sources, examples, and compatibility, and write only scoped records. Web: published [hairstyle data](https://hairhairhair.hair/hairstyles/llms.txt), [structured projection](https://hairhairhair.hair/content/hairstyles.json), and [full references](https://hairhairhair.hair/hairstyles/llms-full.txt) are read-only context; for updates, require supplied full records and schemas. Never reconstruct filtered records.

**Instructions.** Preserve stable IDs and avoid duplicates. Record only sources actually opened with accurate title, publisher, direct URL, and reviewed date. Do not invent origins, inventors, or claims. Prepare required guide fields and compatibility for supported taxonomy. Mark editorial estimates as estimated with rationale; do not infer subtype from appearance. Keep incomplete research stub; draft means complete but intentionally withheld; publish only when complete, coherent, supported. Do not create images/examples. Locally dry-run, inspect, then apply.

If live browsing or reliable sources are unavailable, retain stub status and return `partial` or `blocked`; do not fill gaps from memory.

**Result.** Return raw changed/proposed records with evidence, compatibility, status decision, gaps, and validation in `findings`, following the linked result schema. Do not claim commits.
