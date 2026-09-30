# APPEARANCE_HAIR_OBSERVATION

## PURPOSE

Describe the hair visibly shown in one supplied appearance image, without using the hairstyle catalog or appearance context. This workflow produces an image-grounded observation, not a canonical catalog match.

## INPUT

- One image asset depicting the person at an appearance.
- Optional technical image details needed to access or inspect the supplied image.

## DATA MODEL

An observation is an item inside an Appearance record; it separates image evidence from source claims and later catalog matching. See the [Appearance schema](https://hairhairhair.hair/schemas/appearance.schema.json). This workflow returns only the image-analysis fields:

Do not accept event descriptions, source captions, person-profile facts, prior hairstyle labels, or catalog records as evidence for the observation.

## RULES

- Analyze the image alone. Do not read or search the internal hairstyle catalog, appearance context, source-reported hairstyle claims, or biographical information.
- Describe visible features rather than naming a canonical hairstyle: visible length, shape, silhouette, parting, direction, texture, layering, fringe, and sides/nape only when the image supports them.
- Separate what is visible from what is obscured or uncertain. Do not infer hidden construction, natural texture, or natural color.
- Account for image limitations such as angle, lighting, motion, occlusion, low resolution, hats, wigs, or extensions. State when a feature cannot be judged.
- Optional candidates are general hairstyle-title hypotheses generated from the image alone. Rank them from most to least plausible; do not claim they match any internal record.
- Never output `hairstyleId`, style-example IDs, or catalog-match reasoning.
- Return findings for the orchestrator to review and persist; do not commit repository changes.

## INSTRUCTIONS

1. Inspect the supplied image and confirm that the person's hair is sufficiently visible for a useful observation.
2. Write a concise `visualDescription` using only directly visible evidence. Mention useful limitations and uncertainty.
3. If the image supports useful general hairstyle-title hypotheses, return a short `preCatalogCandidates` list with sequential ranks starting at 1 and a title for each. Leave it empty when a candidate would be speculative.
4. Review the output to remove catalog terminology, source/event assumptions, unsupported claims, and any IDs.

## OUTPUT

Return one observation object:

```json
{
  "visualDescription": "A concise image-grounded description; state visible limitations.",
  "preCatalogCandidates": [
    { "rank": 1, "title": "A general hairstyle title" }
  ]
}
```

`preCatalogCandidates` is optional and may be an empty array. Do not emit any other fields. If the image cannot support a meaningful observation, return status `insufficient_visual_evidence` with a concise reason and no candidate list.

## NEXT

Unless instructed otherwise, recommend that the orchestrator pass the observation to `HAIR_OBSERVATION_CATALOG_MATCH` for comparison with the catalog. The orchestrator decides whether to load that workflow, stop, or obtain a more useful image.
