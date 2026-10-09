# Hairstyle guide research

**Task ID.** `hairstyle-guide-research`

**Goal.** Research one named hairstyle or existing stub and return an evidence-supported guide proposal.

**Input.** A hairstyle ID or narrowly defined concept, current guide and related records when available, and any scope or source preferences.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json) with proposed hairstyle, source, and compatibility records as supported. Include source titles, publishers, URLs, reviewed dates, evidence for guide claims, status recommendation (`stub`, `draft`, or `published`), unresolved gaps, and rationale in `findings`.

**Judgment.** Use sources actually consulted; do not invent origins, inventors, or citations. Preserve stable IDs and distinguish the target from related styles. Keep unsupported or incomplete guides as stubs. Recommend publication only when required fields are coherent, supported, and reader-ready. Do not create imagery or examples.
