# APPEARANCE_ASSET_INGESTION

## PURPOSE

Review candidate appearance photographs, verify source and usage rights, ingest only qualifying image assets, and prepare accurate appearance metadata. Rights and source checks are part of this workflow.

## INPUT

- Confirmed person identity.
- Candidate appearance and photograph source information.
- Intended uses for the asset, including public display and any other known uses.
- Available storage and content-record interfaces, as supplied by the orchestrator.

## DATA MODEL

Use the [Appearance schema](https://hairhairhair.hair/schemas/appearance.schema.json), [Media schema](https://hairhairhair.hair/schemas/media.schema.json), and [Source schema](https://hairhairhair.hair/schemas/source.schema.json). An Appearance stores the event and date evidence. Media stores the accepted image asset and its rights/provenance. `reportedHairstyle` is a source claim, while `visualDescription` is reserved for later image-only analysis. Example observation fragment:

```json
{
  "reportedHairstyle": {
    "description": "The source calls the look a short side-parted cut.",
    "sourceId": "source-event-article"
  }
}
```

Omit that property when the source makes no specific hairstyle claim. This workflow does not set `visualDescription`, `preCatalogCandidates`, `hairstyleId`, or `catalogMatchReasoning`.

## RULES

- Ingest a photograph only when a verifiable license or permission allows every intended use at no monetary license cost. A merely accessible image, an unclear rights statement, or a license that does not permit an intended use does not qualify.
- Verify the license at an authoritative source where possible. Record the license name/version, rights evidence URL, relevant terms, attribution requirements, and any other conditions such as share-alike.
- If the license is missing, ambiguous, costly, or incompatible with intended use, do not ingest the image file. Return the reason and evidence; do not imply that this prevents retaining non-infringing factual event metadata where the application permits it.
- Preserve accurate source attribution and original source/asset URLs. Do not strip required credit or license information.
- Preserve event, date, and provenance metadata with its source and uncertainty.
- Preserve a reported hairstyle claim only when a source explicitly makes that claim about this specific appearance. Include the source reference. Do not infer or add a source claim from the image.
- A source-reported claim is distinct from visual analysis. Do not inspect the image to describe, classify, or name the hairstyle.
- The decision to ingest depends on rights and intended use, not on whether a hairstyle can be seen or identified.
- Do not inspect the internal hairstyle catalog. Do not create hairstyle records or classify hair.
- Use only the persistence capabilities explicitly provided by the orchestrator. Do not commit repository changes.

## INSTRUCTIONS

1. Verify the candidate source, asset identity, rights holder, license or permission, and intended-use compatibility.
2. Record the rights evidence and all required attribution and license terms. If any required point cannot be verified, withhold the image asset from ingestion.
3. For a qualifying asset, ingest the image and associate it with the correct person and appearance using the provided content interfaces.
4. Preserve event/context, date and precision, photograph provenance, rights metadata, and supported source-reported hairstyle claim as separate facts. Do not add a hairstyle claim unless its source explicitly states one.
5. Return an itemized result for every candidate, including ingested or withheld status and the supporting rights evidence.

## OUTPUT

For each candidate, return:

- `status`: `ingested` or `withheld`.
- Appearance metadata and its evidence, including event/context and date precision when available.
- Photograph source URL, asset URL, photographer/rights holder, and verified license or permission details.
- Attribution text and other applicable terms that must be preserved.
- Optional source-reported hairstyle description and source reference, only when explicitly supported.
- For withheld assets, the specific rights gap or incompatibility and its evidence.
- IDs or persistence results only when returned by the supplied content interface.

Do not claim an asset was stored if the persistence interface did not confirm it.

## NEXT

Unless instructed otherwise, recommend that the orchestrator pass ingested appearance images to `APPEARANCE_HAIR_OBSERVATION` for image-only analysis. The orchestrator decides whether to load that workflow, stop, or resolve withheld assets.
