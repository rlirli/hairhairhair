# Person appearance discovery

**Task ID.** `person-appearance-discovery`

**Goal.** Find and verify notable, dated appearances and candidate photos for one person. Return other useful person facts or profile leads encountered during the search.

**Input.** A person name or confirmed identity, optional date range or event focus, and any existing person dossier or appearance leads.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json). Put candidate appearances and cross-cutting person facts in `findings`; proposed `appearances` or `sources` records may go in `records` when supported by independent event/date evidence. For each candidate, distinguish the photo page and direct image URL from the independent event/date source. Include event, date and precision, publisher, photographer/rightsholder when known, and source-described hairstyle wording when present.

**Judgment.** Verify the person, event, and date against live sources. Do not infer a hairstyle from the photo or decide photo-use rights here. Public availability is not permission to publish or analyze an image. Mark gaps and uncertain dates instead of filling them by guesswork. Treat the profile and appearance findings as complementary; do not discard useful facts because they belong to another record type.
