# LLM content pipeline implementation plan

**Status:** Implementation is complete and verified with `npm run check` and `npm test`.

## Purpose and operating model

This pipeline separates independent content tasks from reusable orchestration routes. An orchestrator may start from any task prompt or workflow, decides which work to trigger, owns persistence and commits, and may stop at any point.

- Each task lives in a standalone file under `public/prompts/*.prompt.md`. It explains the task, its own local and web environment, relevant schemas, and its result. It may link shared schemas or imagery direction. It does not depend on another task prompt.
- Workflow files under `public/workflows/*.workflow.md` compose task prompts by URL and local path. They define ordering, isolation, working overlays, stop conditions, and optional `NEXT` recommendations. The orchestrator loads and invokes each task; a workflow never invokes another workflow itself.
- Public indexes at `/prompts/llms.txt` and `/workflows/llms.txt` use the active local origin during development and `https://hairhairhair.hair` in the deployed build.
- The source lists for those indexes are maintained in `src/pages/prompts/llms.txt.ts` and `src/pages/workflows/llms.txt.ts`; adding a prompt or workflow requires updating its index list.
- Local persistence uses the content MCP attached to the active checkout. Its full catalog is authoritative for local work. Web-only work reads public references and returns proposed JSON and actual image attachments in chat; it does not claim repository writes.
- The shared result shape is defined by `/schemas/content-task-result.schema.json`: `{task,status,records,assets,findings?}`. Status is `complete`, `partial`, or `blocked`. Each record pairs an entity collection with its schema-shaped record. Assets identify an actual or proposed media ID and file name.
- Public catalog JSON is a published-only projection. It cannot reveal stubs or drafts and may omit internal fields. Web proposals must be reconciled with full local records and the complete local catalog before applying local writes.

## Standalone task prompts

| Task prompt                                | Responsibility                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `person-profile-research.prompt.md`        | Research a person and supported Natural Profile traits from live reliable sources.                                                               |
| `person-appearance-discovery.prompt.md`    | Find documented appearances and photo sources without assessing reuse rights or consulting the hairstyle catalog.                                |
| `appearance-asset-ingestion.prompt.md`     | Verify reuse terms and ingest only assets whose intended use is permitted at no monetary license cost; retain source-reported hairstyle context. |
| `appearance-hair-observation.prompt.md`    | Describe visible hair and optional ranked title hypotheses from the image alone, without source, person, or catalog context.                     |
| `hair-observation-catalog-match.prompt.md` | Compare an observation with the catalog, link a suitable record, or create and link a stub when a distinct missing concept is well supported.    |
| `hairstyle-stub-selection.prompt.md`       | Find and triage existing stubs without enriching them.                                                                                           |
| `hairstyle-guide-research.prompt.md`       | Research and update one hairstyle guide, retaining stub status while required information is incomplete.                                         |
| `hairstyle-imagery.prompt.md`              | Generate a transparent-background PNG and register its media record locally, or return the PNG and proposed media record in web mode.            |
| `hairstyle-example-creation.prompt.md`     | Create a style-example record for an existing generated image and media record; it does not generate imagery.                                    |
| `hairstyle-catalog-gap-scan.prompt.md`     | Find orthogonal catalog gaps and create minimal stubs only after reviewing the full local catalog.                                               |

Every task prompt is directly usable on its own. Research tasks require live source lookup; model memory alone is not evidence. Schema and shared style links are allowed. Task prompts do not link to other task prompts.

## Workflow compositions and call chains

A workflow describes a useful route, not a mandatory call graph. Any individual task can also be an entry point. Its `NEXT` section recommends what the orchestrator can do unless the invocation says otherwise.

```text
person-to-hairstyles.workflow.md
  person profile research
  → appearance discovery
  → asset ingestion and rights review
  → image-only hair observation
  → catalog matching
  → [orchestrator decides whether to commit]
  → optional stub selection
  → optional guide research
  → optional imagery generation and media registration
  → optional style-example creation
```

```text
appearance-to-catalog.workflow.md
  image-only hair observation
  → catalog matching
  → return the match, a justified stub proposal, or an unlinked observation
  → [orchestrator decides whether to continue or commit]
```

```text
hairstyle-publication.workflow.md
  named guide or stub selection
  → guide research
  → [if examples are in scope] imagery generation and media registration
  → style-example creation using that image and media record
```

```text
catalog-expansion.workflow.md
  scan for orthogonal gaps against the full local catalog
  → create minimal stub proposals
  → stop; orchestrator decides whether to commit or later request guide research
```

The orchestrator passes earlier task results forward as a working overlay so that pending records are not lost when public snapshots omit them. Before local writes, it rereads full records, reconciles IDs, and preserves fields outside the task’s scope. If it continues from catalog matching to researching created stubs, it commits the match result and stubs first. That checkpoint does not require every Appearance to have a hairstyle link.

## Task isolation, data boundaries, and environment behavior

- Run each task in a fresh isolated subagent. For image observation, give the observer only the image and its task prompt. Withhold captions, source claims, Appearance metadata, person facts, catalog data, and earlier analysis. The orchestrator merges the returned observation fragment into the full Appearance while preserving other fields.
- Keep source-reported hairstyle claims separate from visual analysis. Ingestion records only hairstyle wording that a source explicitly attributes to that Appearance. The observer describes what is visible without naming a canonical catalog style. Matching happens in a separate task after observation.
- Local tasks use the content MCP at the active checkout for relevant reads and writes. For mutations, preview with `apply: false`, inspect the proposed changes, then apply. The image task uses the MCP image tool only after a PNG is generated.
- Web tasks use the public indexes and published-only records at `https://hairhairhair.hair`, plus supplied complete records where required. They return proposed records and attached PNGs in chat. A web result is not persisted; absence from a published-only reference cannot establish that a concept is globally new.
- The Appearance asset-ingestion task owns source and license review. An image is not ingested unless evidence permits the intended use at no monetary license cost. Record attribution and other license terms.
- The imagery style reference at `public/prompts/hairstyle-imagery-style.md` describes one image’s visual treatment, including a genuinely transparent background. It is a style reference, not a task prompt.

## Content data contracts

### Appearance observations

Each `appearances[].observations[]` item keeps four information sources distinct:

1. `reportedHairstyle`: optional source claim, containing a description and traceable `sourceId`; populated only when the source explicitly describes the person’s hair at that Appearance.
2. `visualDescription`: optional image-only account of visible hair features.
3. `preCatalogCandidates`: optional ranked title hypotheses produced without access to the catalog.
4. `hairstyleId` and `catalogMatchReasoning`: optional catalog link and its rationale, produced by matching.

`styleExampleId` remains optional and may only point to an example associated with the linked hairstyle. `hairstyleId` remains optional: a missing link can be completed later. Validation warns about an absent link but does not fail for it. A known, clearly distinct concept absent from the catalog receives a stub and link when matching is performed; an uncertain match may remain unlinked.

The source claim is captured during asset ingestion, visual description and title hypotheses during image-only observation, and catalog link and reasoning during catalog matching.

### Appearance schema change

The schema permits the distinct properties below and removes the former mixed-purpose `note`. This is a summary of the implemented contract change; the authoritative schema is `src/content/schemas/appearance.schema.json`.

```diff
 observations.items
-  required: [hairstyleId, note]
-  properties: { hairstyleId, styleExampleId, note }
+  properties:
+    reportedHairstyle:
+      description: string
+      sourceId: string
+    visualDescription: string
+    preCatalogCandidates:
+      - rank: integer >= 1
+        title: string
+    hairstyleId: string              # optional catalog foreign key
+    styleExampleId: string           # optional; must match hairstyleId
+    catalogMatchReasoning: string
```

### Hairstyle lifecycle

The existing `guidePublicationStatus` field is `stub`, `draft`, or `published`.

- A stub requires only stable `id` and `guidePublicationStatus`. Every normal hairstyle field may also be present and is optional while the record is a stub.
- A draft is a complete guide intentionally held back from public pages.
- A published guide is complete and available for public rendering.

The schema requires full guide fields for drafts and published records while permitting the optional stub shape. Stub fields are not restricted by a separate summary limit.

```diff
 hairstyle.required
-  [id, slug, name, kind, summary, intro, variations,
-   consultation, considerations, sourceIds, relatedStyleIds,
-   guidePublicationStatus]
+  [id, guidePublicationStatus]

 guidePublicationStatus
-  enum: [draft, published]
+  enum: [stub, draft, published]

 conditional requirements
+  when guidePublicationStatus is draft or published:
+    require slug, name, kind, summary, intro, variations,
+            consultation, considerations, sourceIds, relatedStyleIds
```

## Public references and indexing

- `/content/llms.txt` is the entry point for public content references.
- `/content/hairstyles.json` returns a projection of published guides only and filters related-style links to published IDs.
- `/content/hair-types.json` returns the public taxonomy.
- `/people/llms.txt`, `/hairstyles/llms.txt`, and `/hairstyles/llms-full.txt` remain public entry points.
- Schemas and content-task-result schema are served under `/schemas/`.
- `robots.txt` disallows indexing of `/prompts/`, `/workflows/`, `/schemas/`, and `/content/`. Direct HTTP requests still serve those resources.

Public data is for reference and web-mode research. It is not a replacement for the local MCP catalog during writes.

## File tree for this refactor

Legend: 🆕 new file; ✏️ changed file; 🗑️ removed file.

```text
hairhairhair/
├── docs/
│   ├── content-management-mcp.md ✏️
│   ├── content-model.md ✏️
│   ├── contributing/
│   │   ├── adding-a-hairstyle.md ✏️
│   │   └── adding-a-person.md ✏️
│   └── plans/
│       └── llm-content-pipeline.md ✏️
├── inbox-people/
│   └── README.md ✏️
├── public/
│   ├── prompts/
│   │   ├── appearance-asset-ingestion.prompt.md 🆕
│   │   ├── appearance-hair-observation.prompt.md 🆕
│   │   ├── hair-observation-catalog-match.prompt.md 🆕
│   │   ├── hairstyle-catalog-gap-scan.prompt.md 🆕
│   │   ├── hairstyle-example-creation.prompt.md 🆕
│   │   ├── hairstyle-guide-research.prompt.md 🆕
│   │   ├── hairstyle-imagery-style.md ✏️
│   │   ├── hairstyle-imagery.prompt.md ✏️
│   │   ├── hairstyle-stub-selection.prompt.md 🆕
│   │   ├── person-appearance-discovery.prompt.md 🆕
│   │   ├── person-profile-research.prompt.md 🆕
│   │   └── workflows/
│   │       ├── appearance-asset-ingestion.md 🗑️
│   │       ├── appearance-hair-observation.md 🗑️
│   │       ├── hair-observation-catalog-match.md 🗑️
│   │       ├── hairstyle-catalog-gap-scan.md 🗑️
│   │       ├── hairstyle-example-creation.md 🗑️
│   │       ├── hairstyle-guide-research.md 🗑️
│   │       ├── hairstyle-stub-fill.md 🗑️
│   │       ├── person-appearance-discovery.md 🗑️
│   │       └── person-profile-research.md 🗑️
│   ├── schemas/
│   │   └── content-task-result.schema.json 🆕
│   └── workflows/
│       ├── appearance-to-catalog.workflow.md 🆕
│       ├── catalog-expansion.workflow.md 🆕
│       ├── hairstyle-publication.workflow.md 🆕
│       └── person-to-hairstyles.workflow.md 🆕
├── scripts/
│   └── validate-content.mjs ✏️
├── src/
│   ├── data/index.ts ✏️
│   ├── pages/
│   │   ├── content/
│   │   │   ├── [collection].json.ts 🆕
│   │   │   └── llms.txt.ts 🆕
│   │   ├── hairstyles/llms.txt.ts ✏️
│   │   ├── people/llms.txt.ts ✏️
│   │   ├── people/index.astro ✏️
│   │   ├── prompts/llms.txt.ts ✏️
│   │   ├── robots.txt.ts ✏️
│   │   └── workflows/llms.txt.ts 🆕
│   └── types/people.types.ts ✏️
└── tests/
    ├── astro/import-people.test.ts ✏️
    └── content-pipeline.test.mjs 🆕
```

The data-model schema changes shown above are already present in the active branch baseline; this refactor aligns prompts, workflows, public references, documentation, and validation with them.

## Acceptance checks

The implementation is ready when:

- Every task prompt can be used by itself and ends in `.prompt.md`; only workflow files compose prompts.
- The orchestrator controls every follow-up, write, and commit. Image analysis remains isolated from sources and catalog data.
- Unlinked Appearance observations pass validation with a warning, while invalid foreign keys and example links fail.
- Web results are clearly proposals, the public raw projection contains only published hairstyle guides, and local writes use complete MCP records.
- The imagery prompt and example prompt hand off one actual PNG/media record before the example is created.
- Prompt/workflow indexes use localhost origins in development and the deployed domain in production, while robots rules discourage indexing without blocking direct requests.

## Verification

- `npm run check`: content validation passed for 388 records and Astro reported zero errors, warnings, or hints.
- `npm test`: production build completed with 351 pages; 9 component tests and 5 content tests passed.
- Build-output inspection confirmed that `/content/hairstyles.json` contains published records only, prompt and workflow files are emitted for direct requests, and `robots.txt` disallows indexing while allowing the site generally.
