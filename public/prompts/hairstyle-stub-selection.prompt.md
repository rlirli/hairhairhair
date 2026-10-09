# Hairstyle stub selection

**Task ID.** `hairstyle-stub-selection`

**Goal.** Identify and prioritize existing hairstyle stubs for further research without changing them.

**Input.** Optional stub IDs, Appearance links, scope, or count; otherwise the supplied stub list.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json) with no records or assets. In `findings`, return a deduplicated worklist with each stub's ID, name, kind, description, related styles and Appearance links when available; add priority, readiness, ambiguity, and likely-duplicate notes.

**Limit.** Include only records marked `stub`. Do not research, edit, merge, or choose a canonical record among likely duplicates. State when the supplied list is incomplete.
