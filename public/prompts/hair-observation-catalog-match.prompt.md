# Hair observation catalog match

**Task ID.** `hair-observation-catalog-match`

**Goal.** Match an image-grounded observation to the closest supported hairstyle concept in the supplied catalog.

**Input.** An Appearance ID and observation, the relevant current Appearance fields, and a catalog complete enough to check for duplicates.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json). Propose the Appearance with `hairstyleId` and `catalogMatchReasoning` when a reliable match exists. If a distinct, well-supported concept is absent, propose a minimal hairstyle stub. Otherwise leave the link absent. Explain the match, distinctness, uncertainty, and catalog coverage in `findings`.

**Compare.** Use the visual description as primary evidence; treat candidate titles as hints. Compare cut, shape, and styling—not color, identity, event, or presumed natural traits. Prefer a close existing record, including a stub. Claim uniqueness only when the supplied catalog is complete enough to establish it. Preserve unrelated Appearance fields.
