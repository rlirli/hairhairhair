# PERSON_APPEARANCE_DISCOVERY

## PURPOSE

Find documented appearances of one person and candidate photograph sources. Capture event and date context, source provenance, and any source-stated description of the person's hair at that specific appearance. This workflow is an independent entry point.

## INPUT

- Confirmed person identity, with disambiguating details when needed.
- Optional date range, event types, source preferences, or collection limits supplied by the orchestrator.

## DATA MODEL

An **Appearance** is one documented event or dated context for the person. Discovery returns candidates for later rights review; it does not mean an image has been stored. The eventual content record follows the [Appearance schema](https://hairhairhair.hair/schemas/appearance.schema.json). A candidate result can use this shape:

```json
{
  "event": "Film premiere",
  "taken": {
    "value": "2024-05-01",
    "precision": "day",
    "sourceUrl": "https://example.org/event-report"
  },
  "photographSourceUrl": "https://example.org/photo-page",
  "reportedHairstyle": null
}
```

`reportedHairstyle` is optional and belongs only when a consulted source explicitly describes the hair at this event. Do not assign a hairstyle ID during discovery.

## RULES

- Confirm that each result depicts the requested person and corresponds to the stated event or date; keep uncertainty explicit.
- Record photograph/source URLs, source names, photographer or rights holder when identifiable, event context, date and date precision, and evidence for those details.
- Capture a hairstyle claim only when a consulted source explicitly describes the person's hair at that specific appearance. Preserve the source wording or a faithful concise paraphrase with its source URL. Do not infer a claim from captions that only identify the person or event.
- Do not inspect, search, or use the internal hairstyle catalog. Do not classify photographs or suggest catalog entries.
- Do not make a storage decision or ingest image files. Source discovery and rights qualification are distinct decisions.
- Do not create or edit content records. Return evidence for the orchestrator to review and persist.

## INSTRUCTIONS

1. Search for appearances that match the supplied identity and constraints.
2. For each candidate, verify the person, event, date, and photograph source using available evidence. Record uncertainty rather than guessing.
3. Search the source context for an explicit hairstyle statement tied to that appearance. Include it only when such a statement exists; otherwise omit the claim.
4. Return candidates with enough provenance for a later rights review. Do not treat discovery or public accessibility as permission to store or reuse an image.

## OUTPUT

Return a list of appearance candidates. Each candidate should include:

- Person identity and event/context.
- Event date when known, with precision and evidence/source URL.
- Photograph page or asset URL, source/publisher, and photographer or rights holder when identifiable.
- Optional source-reported hairstyle claim, including the supporting source URL; omit this field if no source explicitly makes the claim.
- Confidence and unresolved identity, date, event, or provenance questions.

Return `no_candidates_found` when none can be supported. Do not claim any image has been licensed, stored, or ingested.

## NEXT

Unless instructed otherwise, recommend that the orchestrator send the discovered candidates for `APPEARANCE_ASSET_INGESTION` to review rights and determine which assets qualify for ingestion. The orchestrator decides whether to load that workflow, stop, or seek more candidates.
