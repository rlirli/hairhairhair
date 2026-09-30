# HAIRSTYLE_CATALOG_GAP_SCAN

## PURPOSE

Review the internal hairstyle catalog for useful, orthogonal coverage gaps and create minimal stubs for genuinely distinct hairstyle concepts that would improve the catalog.

## INPUT

- Read access to the complete internal hairstyle catalog, including stubs and guides in every publication state.
- Content write access to create hairstyle records.
- Optional catalog scope or coverage goals from the orchestrator.

## DATA MODEL

The [Hairstyle schema](https://hairhairhair.hair/schemas/hairstyle.schema.json) defines catalog records. A stub marks a useful concept that has not had its guide research completed. Its minimal valid shape is:

```json
{
  "id": "hairstyle-distinct-concept",
  "guidePublicationStatus": "stub"
}
```

IDs are stable, unique kebab-case record keys. Optional names or related IDs may be added when they help identify the candidate.

If no scope is supplied, inspect the full catalog.

## RULES

- Compare concepts across the full catalog, including existing stubs, to avoid duplicates and near-duplicates.
- Look for complementary coverage: meaningful differences in cut structure, length, silhouette, styling, or other defining characteristics. Do not equate color, celebrity identity, or a minor wording variation with a distinct hairstyle.
- Create a stub only when the concept is distinct, useful to the catalog, and not already represented.
- A new stub requires only a stable unique `id` and `guidePublicationStatus: "stub"`. Add optional fields such as name, kind, description, or related style IDs only when they can be stated clearly and help identify the candidate. Do not impose an arbitrary description-length cap.
- Do not research candidates, add sources, create guide content, assess compatibility, or generate examples.
- Do not modify existing records or merge stubs. Report suspected duplicates for later review.
- Do not commit changes or load another workflow.

## INSTRUCTIONS

1. Inspect the supplied scope or the full catalog. Review published and draft guides as well as stubs so candidate concepts are compared against the actual inventory.
2. Identify specific coverage gaps and explain why each candidate is orthogonal to the closest existing records.
3. Exclude candidates that are duplicates, unsupported distinctions, or too vague to define. Report excluded near-duplicates when they clarify the boundary.
4. For each accepted candidate, create one minimal stub with a unique stable ID and `guidePublicationStatus: "stub"`. Populate optional identifying fields only when useful and supported by the gap analysis.
5. Validate newly created records and uniqueness of IDs. Summarize candidates created, candidates excluded, possible duplicates, and any remaining coverage gaps. Do not change the new records beyond stub creation.

## OUTPUT

Return the catalog scope reviewed, each created stub's ID and populated fields, the rationale for its distinct value, excluded or duplicate candidates, and validation outcome. State that no research or examples were created.

## NEXT

End this workflow after reporting the gap scan. The orchestrator decides whether and when to commit or continue with other work.
