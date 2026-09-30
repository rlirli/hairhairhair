# HAIR_OBSERVATION_CATALOG_MATCH

## PURPOSE

Match a catalog-independent visual hair observation to the best existing hairstyle record. If no existing record adequately describes the observation, create a hairstyle stub and link the observation to it. Record concise reasoning for the decision.

## INPUT

- An Appearance record and its observation, including the image-derived `visualDescription` and any `preCatalogCandidates` when available.
- The internal hairstyle catalog, including records in `stub`, `draft`, and `published` states.
- Content read/write access for Appearance observations and hairstyle records.

## DATA MODEL

Read the [Appearance schema](https://hairhairhair.hair/schemas/appearance.schema.json) and [Hairstyle schema](https://hairhairhair.hair/schemas/hairstyle.schema.json). `hairstyleId` links an observation to a hairstyle record regardless of publication state. A new unmatched concept is represented by a research-pending stub, for example:

```json
{
  "id": "hairstyle-short-side-part",
  "guidePublicationStatus": "stub",
  "name": "Short side part"
}
```

All fields besides `id` and `guidePublicationStatus` are optional on a stub. A match writes the ID on the observation and explains its evidence in `catalogMatchReasoning`.

If `hairstyleId` is already set, inspect the existing link first. Keep it when it is still the best fit; change it only when the supplied evidence supports a better match. Do not infer missing visual details from a candidate title.

## RULES

- Use the image-derived observation as the primary evidence. Candidate titles are search hints, not proof of a match.
- Compare observable cut structure and styling characteristics. Do not treat hair color, a person's identity, event context, or presumed natural traits as hairstyle-defining evidence.
- Consider the full catalog for duplicates and possible matches, including stubs. A stub can be the correct link even though its guide is incomplete.
- Reuse an existing record when it describes the observed hairstyle closely enough. Do not create a near-duplicate just because a record is a stub or lacks guide content.
- If no existing record fits, create a minimal stub with a stable unique `id` and `guidePublicationStatus: "stub"`. Add other hairstyle fields only when supported and useful; all such fields are optional for a stub.
- Every observation processed by this matching task must end with a valid `hairstyleId`, either retained, set to an existing record, or set to a newly created stub. This does not make the field required for other Appearance records or runs.
- Write `catalogMatchReasoning` to explain the decisive similarities, differences, and uncertainty. Keep it separate from `visualDescription` and any source-reported claim.
- Preserve unrelated observation data. Do not rewrite source claims or image-only descriptions as catalog reasoning.
- Do not publish or promote a hairstyle record. Do not create style examples or alter media.
- Do not commit changes or load another workflow. Return the proposed next step to the orchestrator.

## INSTRUCTIONS

1. Read the Appearance and target observation, then inspect the supplied image when available.
2. Search the complete internal hairstyle catalog for close fits and duplicates. Compare the observation against each plausible record using the record's available fields; do not rely on name similarity alone.
3. Select the closest existing record if the defining visible structure is a reasonable fit. Update the observation's `hairstyleId` and write `catalogMatchReasoning` describing why it fits and what remains uncertain.
4. If no existing record is a reasonable fit, create one minimal hairstyle record with `guidePublicationStatus: "stub"`. Use a stable unique ID. Add a short name, kind, description, or related style IDs only when the evidence supports those fields; do not invent researched guide content. Link the observation to this stub and explain why existing records did not fit.
5. Validate the changed record shapes and references. Report the Appearance ID, observation index or identifier, selected hairstyle ID, whether a stub was created, and any unresolved ambiguity.

## OUTPUT

Return:

- The Appearance and observation updated.
- The linked hairstyle ID and its current `guidePublicationStatus`.
- Whether an existing record was reused or a stub was created.
- `catalogMatchReasoning` and any unresolved ambiguity.
- Validation outcome and exact records changed.

Do not claim that repository changes were committed.

## NEXT

Unless instructed otherwise, recommend that the orchestrator review and commit the Appearance match and any created stubs before considering `HAIRSTYLE_STUB_FILL`.
