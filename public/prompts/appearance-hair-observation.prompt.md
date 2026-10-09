# Appearance hair observation

**Task ID.** `appearance-hair-observation`

**Goal.** Describe hair visible in one supplied appearance image without using outside context.

**Input.** One image only. The observer must not receive a filename, caption, person, event, source URL, profile, or catalog entry.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json) with no records or assets. Put `visualDescription` and optional ranked `preCatalogCandidates` in `findings.observation`. If the image does not support a useful description, return the limitation instead.

**Describe.** Visible length, silhouette, part, direction, texture, layers, fringe, and sides/nape when clear. State important occlusion, angle, or lighting limits. Keep description separate from hypotheses. Do not name a canonical catalog style or infer natural hair traits. Do not retain or reproduce the image.
