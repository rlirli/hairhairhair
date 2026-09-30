# HAIRSTYLE_GUIDE_RESEARCH

## PURPOSE

Research and maintain one hairstyle record using verifiable evidence. Complete a research-pending stub when possible, and publish only when the guide meets the publication bar. This workflow does not create generated example images or decide when repository changes are committed.

## INPUT

- The target hairstyle record ID, or a concise proposed hairstyle description if no record exists yet.
- Any known sources, relevant constraints, and the current date.
- Access to the content-management MCP and web research tools.

## DATA MODEL

Consult the [Hairstyle schema](https://hairhairhair.hair/schemas/hairstyle.schema.json), [Source schema](https://hairhairhair.hair/schemas/source.schema.json), [Compatibility schema](https://hairhairhair.hair/schemas/compatibility.schema.json), and [Hair-type schema](https://hairhairhair.hair/schemas/hair-type.schema.json). A complete guide contains its research fields on the hairstyle record; claims link to source records by ID. Compatibility is stored separately by hairstyle ID, and each assessment describes a hair-type criterion with a score from 0 to 1 (or `null` when unknown). `provenance: "estimated"` explicitly marks an editorial estimate, not a measured probability.

```json
{
  "hairstyleId": "hairstyle-short-side-part",
  "assessments": [
    {
      "criteria": [{ "dimension": "hair-type", "valueId": "hair-type-1" }],
      "score": 0.8,
      "provenance": "estimated"
    }
  ]
}
```

## RULES

- Read the target record and its current status before editing. Preserve its stable ID and any supported existing information.
- Inspect related records to avoid duplicating a distinct, already-covered hairstyle. Do not merge concepts solely because their names overlap.
- Research claims from the original sources. Prefer authoritative, independent sources with relevant expertise or first-hand documentation. Do not cite search snippets as evidence.
- Do not invent terminology, origins, dates, inventors, technical claims, or compatibility evidence. Omit unsupported optional claims. Add `inventedAt` or `inventor` only when reliable sources support them.
- Create source records for sources actually consulted, with accurate title, publisher, direct URL, and review date. Link guide claims through source IDs where the content model supports those links.
- Assess compatibility for all applicable hair-type records, using evidence and clearly identified editorial estimates where direct evidence is unavailable. Explain practical limits without implying that a person’s appearance establishes a precise natural hair subtype.
- `stub` means research is incomplete; it may be enriched incrementally and is not required to have a short summary or any particular subset of guide fields. Keep it `stub` when required research or guide content is missing.
- `draft` means the guide is complete but intentionally not publicly available. Use it only when the complete guide should remain unpublished.
- Set `guidePublicationStatus` to `published` when the guide is complete, coherent, sufficiently supported, and suitable for public readers. Never publish merely to clear a stub.
- Write and validate records through the connected content-management MCP. Inspect dry-run results before applying writes. Do not commit or push.
- Do not generate images or create style-example/media records in this workflow.

## INSTRUCTIONS

1. Resolve the target record. If given an ID, fetch it and inspect related styles, current sources, examples, and compatibility data. If only given a description, search the catalog for an existing concept. Do not create a duplicate. If the intended concept has no record, create a minimal `stub` with a unique stable ID before enriching it.
2. Define the hairstyle narrowly enough to distinguish it from neighboring concepts. Research its defining shape or technique, common variations, consultation considerations, and practical considerations. Keep claims proportional to the evidence and distinguish a defining feature from an optional styling choice.
3. Record only sources you opened and assessed. Verify the page supports the claim attributed to it. Use source records with stable unique IDs and current `reviewedAt` dates. Never fabricate a reference to fill a required field.
4. Prepare the complete guide fields required by the content schema: name, kind, concise summary, explanatory introduction, meaningful variations, consultation guidance, considerations, source references, and relevant related-style IDs. Preserve optional historical fields only when supported.
5. Add or update compatibility assessments for the supported hair-type taxonomy. Use the defined score range and provenance values from the current content model. If a score is editorially estimated, label it accordingly and give a brief evidence-based rationale. Do not assign arbitrary precision.
6. Decide lifecycle status from completeness and evidence. Leave insufficiently researched or incomplete records as `stub`; mark a complete intentionally unpublished guide `draft`; otherwise publish a complete, sufficiently supported guide. Validate the whole related change set and correct errors before reporting success.
7. Report the record ID and status, what changed, the strongest evidence and any unresolved limitations, compatibility coverage, validation result, and a suggested number of generated examples (one to three) based on how much the hairstyle varies in visible shape, length, texture treatment, or styling.

## OUTPUT

Return a concise result with:

- Target hairstyle ID and final `guidePublicationStatus`.
- A summary of researched guide fields and source coverage.
- Compatibility records created or updated, including which scores are estimated.
- Validation result and any remaining evidence gaps.
- Recommended count of example images (0–3); recommend zero when the guide is not complete enough to define its visual target.
- Whether any record writes were applied. Do not claim a commit.

## NEXT

Unless instructed otherwise, recommend that the orchestrator run `HAIRSTYLE_EXAMPLE_CREATION` the suggested number of times when the guide is complete and its visual target is clear. The orchestrator decides whether to proceed, stop, or commit.
