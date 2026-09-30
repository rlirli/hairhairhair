# Person research to hairstyle records

Use this workflow for research on a person, discovery and ingestion of licensed appearance images, and optional hairstyle catalog follow-up.

## Tasks

| Task                                | Public prompt                                                                                                | Local path                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Research person profile             | [person-profile-research](https://hairhairhair.hair/prompts/person-profile-research.prompt.md)               | `public/prompts/person-profile-research.prompt.md`        |
| Discover appearances                | [person-appearance-discovery](https://hairhairhair.hair/prompts/person-appearance-discovery.prompt.md)       | `public/prompts/person-appearance-discovery.prompt.md`    |
| Review rights and ingest assets     | [appearance-asset-ingestion](https://hairhairhair.hair/prompts/appearance-asset-ingestion.prompt.md)         | `public/prompts/appearance-asset-ingestion.prompt.md`     |
| Observe visible hair                | [appearance-hair-observation](https://hairhairhair.hair/prompts/appearance-hair-observation.prompt.md)       | `public/prompts/appearance-hair-observation.prompt.md`    |
| Match observation to catalog        | [hair-observation-catalog-match](https://hairhairhair.hair/prompts/hair-observation-catalog-match.prompt.md) | `public/prompts/hair-observation-catalog-match.prompt.md` |
| Select stubs                        | [hairstyle-stub-selection](https://hairhairhair.hair/prompts/hairstyle-stub-selection.prompt.md)             | `public/prompts/hairstyle-stub-selection.prompt.md`       |
| Research a hairstyle guide          | [hairstyle-guide-research](https://hairhairhair.hair/prompts/hairstyle-guide-research.prompt.md)             | `public/prompts/hairstyle-guide-research.prompt.md`       |
| Generate imagery and register media | [hairstyle-imagery](https://hairhairhair.hair/prompts/hairstyle-imagery.prompt.md)                           | `public/prompts/hairstyle-imagery.prompt.md`              |
| Create a style example              | [hairstyle-example-creation](https://hairhairhair.hair/prompts/hairstyle-example-creation.prompt.md)         | `public/prompts/hairstyle-example-creation.prompt.md`     |

## Orchestration

- Run each task in a fresh isolated subagent. Begin with profile research or appearance discovery according to the user’s scope; profile research may recommend discovery next. Follow up only when the orchestrator chooses to.
- Discovery collects appearances and their source context without consulting the hairstyle catalog. Ingestion reviews source and license evidence before storing an asset; do not ingest assets without a qualifying license. Preserve source-provided hairstyle context as free text in Appearance metadata when present, regardless of whether the catalog has a matching style.
- For each ingested Appearance selected for analysis, run hair observation in a fresh isolated subagent with only the image and that task prompt. Exclude captions, Appearance metadata, person profile, source claims, catalog data, and prior analysis. Merge its image-only observation fragment into the full Appearance in orchestrator state, preserving unrelated fields.
- Only after observation may the orchestrator invoke catalog matching in another fresh isolated subagent. Reconcile against the full local catalog before linking or proposing a stub. Public references are published-only and omit drafts and stubs. If no reliable match is possible, an absent `hairstyleId` is valid; it may be linked in a later run. In web mode, return proposed JSON and assets in chat, and do not claim repository writes.
- In local mode, use the content MCP attached to the active checkout. When bringing web-produced changes into the repository, reread complete records, merge only intended fields, preserve private data, and reconcile IDs. The orchestrator decides when to persist or commit before any dependent phase.
- Stub selection and guide research are optional follow-ups after matching. If authorized, researched styles may proceed through imagery and example creation: generate and register the PNG/media first, then pass that image and media record to the example task. The example task does not generate another image. Web mode returns the actual image attachment and proposed records.

## NEXT

The orchestrator may continue from profile research to appearance discovery, from discovery to asset ingestion, or from ingested appearances to observation and later catalog matching, according to scope and available records. Stub research and style examples are separate optional follow-ups. Do not launch a follow-up unless instructed otherwise.
