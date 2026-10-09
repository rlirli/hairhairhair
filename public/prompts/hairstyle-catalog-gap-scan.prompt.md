# Hairstyle catalog gap scan

**Task ID.** `hairstyle-catalog-gap-scan`

**Goal.** Identify useful hairstyle concepts missing from the supplied catalog.

**Input.** The catalog and optional coverage goals or scope.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json). In `findings`, list candidate gaps, distinctness rationale, likely duplicates, excluded candidates, and catalog coverage limits. For a clearly distinct, useful gap, include a minimal proposed hairstyle stub in `records`.

**Compare.** Consider cut, shape, length, or styling technique. A different color, name, celebrity, or phrasing alone is not a new concept. Do not edit or merge existing records. Claim a gap only to the extent the supplied catalog supports it.
