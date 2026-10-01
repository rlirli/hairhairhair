# LLM content pipeline implementation plan

**Status:** The initial implementation passed `npm run check` and `npm test`. Image-handling and profile-image prompt contracts are revised; checks have not been rerun for this follow-up.

## Purpose and operating model

This pipeline separates independent content tasks from reusable orchestration routes. An orchestrator may start from any task prompt or workflow, decides which work to trigger, owns persistence and commits, and may stop at any point.

- Each task lives in a standalone file under `public/prompts/*.prompt.md`. It explains the task, its own local and web environment, relevant schemas, and its result. It may link shared schemas or imagery direction. It does not depend on another task prompt.
- Workflow files under `public/workflows/*.workflow.md` compose task prompts by URL and local path. They define ordering, isolation, working overlays, stop conditions, and optional `NEXT` recommendations. The orchestrator loads and invokes each task; a workflow never invokes another workflow itself.
- Public indexes at `/prompts/llms.txt` and `/workflows/llms.txt` use the active local origin during development and `https://hairhairhair.hair` in the deployed build.
- The source lists for those indexes are maintained in `src/pages/prompts/llms.txt.ts` and `src/pages/workflows/llms.txt.ts`; adding a prompt or workflow requires updating its index list.
- Local persistence uses the content MCP attached to the active checkout. Its full catalog is authoritative for local work. Web-only work reads public references and returns proposed JSON and actual image attachments in chat; it does not claim repository writes.
- The shared result shape is defined by `/schemas/content-task-result.schema.json`: `{task,status,records,assets,findings?}`. Status is `complete`, `partial`, or `blocked`. Each record pairs an entity collection with its schema-shaped record. Assets identify an actual or proposed media ID and file name. Transient analysis images are handoff inputs, not result assets or Media records.
- Public catalog JSON is a published-only projection. It cannot reveal stubs or drafts and may omit internal fields. Web proposals must be reconciled with full local records and the complete local catalog before applying local writes.

## Standalone task prompts

| Task prompt                                | Responsibility                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `person-profile-research.prompt.md`        | Research a person and Natural Profile, use high-confidence model knowledge for unambiguous public facts, and find a candidate portrait with rights evidence. |
| `person-appearance-discovery.prompt.md`    | Find documented appearances and candidate photo sources, including separate photo and event/date URLs, without assessing reuse rights or consulting the hairstyle catalog. |
| `appearance-asset-ingestion.prompt.md`     | Decide separately whether a candidate is publishable, eligible for temporary analysis only, withheld, or needs review; persist images only for approved public reuse. |
| `appearance-hair-observation.prompt.md`    | Describe visible hair and optional ranked title hypotheses from one supplied image alone, without source, person, or catalog context; do not retain the image. |
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
  person profile research and portrait discovery
  → appearance discovery
  → independent publication-rights and temporary-analysis decisions
  → [persistent image/media only for publication-approved assets]
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

- Run each task in a fresh isolated subagent. For image observation, give the observer only the actual image and its task prompt. This may be a transient copy approved for analysis only. Withhold captions, filenames, source URLs, source claims, Appearance metadata, person facts, catalog data, and earlier analysis. The observer must not save, copy, export, or retain the image. The orchestrator merges the returned observation fragment into the full Appearance while preserving other fields.
- Keep source-reported hairstyle claims separate from visual analysis. Ingestion records only hairstyle wording that a source explicitly attributes to that Appearance. The observer describes what is visible without naming a canonical catalog style. Matching happens in a separate task after observation.
- Local tasks use the content MCP at the active checkout for relevant reads and writes. For mutations, preview with `apply: false`, inspect the proposed changes, then apply. Use `content_add_image` and persistent Media records only for images approved for public reuse. Keep an analysis-only working copy outside the repository/content tree, pass it directly to the isolated observer, and delete it after observation. Never create a Media record, persistent image file, or persisted photo URL for an analysis-only image. For a persisted image-less Appearance, `taken.sourceUrl` must point to independent non-photo event/date evidence; defer the write if no such source exists.
- Web tasks use the public indexes and published-only records at `https://hairhairhair.hair`, plus supplied complete records where required. They return proposed records and actual image attachments in chat. A web result is not persisted; absence from a published-only reference cannot establish that a concept is globally new. Do not claim that omission from repository records erases browser, tool, or model-provider logs.
- Profile research returns a portrait candidate and its source/rights evidence in findings, but does not download or persist image files. Public use still requires the publication-rights path. High-confidence model knowledge may support stable, unambiguous public facts without a fabricated citation; mark it separately from live-source findings.
- The Appearance asset-ingestion task owns source and rights review. `publishable` requires permission for every intended public use at no monetary license cost and retains required attribution/terms. `analysis-only` is separate: it does not require a public-reuse license, but only proceeds when lawful access and the applicable analysis policy permit temporary automated analysis. Explicit prohibitions, reservations, unlawful access, or unresolved material uncertainty produce `withhold` or `needs-review`; they never trigger a handoff to the observer.
- The imagery style reference at `public/prompts/hairstyle-imagery-style.md` describes one image’s visual treatment, including a genuinely transparent background. It is a style reference, not a task prompt.

## Content data contracts

### Appearance observations

Each `appearances[].observations[]` item keeps four information sources distinct:

1. `reportedHairstyle`: optional source claim, containing a description and traceable `sourceId`; populated only when the source explicitly describes the person’s hair at that Appearance.
2. `visualDescription`: optional image-only account of visible hair features.
3. `preCatalogCandidates`: optional ranked title hypotheses produced without access to the catalog.
4. `hairstyleId` and `catalogMatchReasoning`: optional catalog link and its rationale, produced by matching.

`styleExampleId` remains optional and may only point to an example associated with the linked hairstyle. `hairstyleId` remains optional: a missing link can be completed later. Validation warns about an absent link but does not fail for it. A known, clearly distinct concept absent from the catalog receives a stub and link when matching is performed; an uncertain match may remain unlinked.

The source claim is captured during asset review, visual description and title hypotheses during image-only observation, and catalog link and reasoning during catalog matching. An analysis-only image URL is transient workflow context and is not written into Appearance, Source, or Media records. Use an independent non-photo URL for an Appearance's required event/date source.

### Image-use lanes and portrait discovery

Image discovery and image handling are separate. Profile research searches for a candidate portrait and reports its image page, direct image URL when available, creator/rightsholder, license evidence, and uncertainty in `findings.profileImageCandidate`. It does not download the image, create Media, or set `heroImageId` to an unpersisted image. The asset-ingestion task makes two independent decisions:

- `publishable`: verified permission allows all intended site uses without a monetary license fee. The orchestrator may add the image and Media record, preserving attribution and terms.
- `analysis-only`: temporary automated analysis is permitted under the applicable access and analysis policy, though public reuse is not. The orchestrator uses a transient copy outside the content tree, passes only the image to the observer, deletes the copy after observation, and persists no Media, image file, or photo URL.

If analysis is prohibited or materially uncertain, do not fetch or hand off the image. Do not promise that removing a URL from repository records erases browser, tool, or provider logs. If a source photo is the only evidence for an Appearance's event/date, do not persist that Appearance without an independent non-photo source.

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

### Image and profile research acceptance cases

- A high-confidence, unambiguous public fact available from model knowledge is recorded as model knowledge without a fabricated citation; disputed or uncertain facts still require live-source research or remain unknown.
- Profile research returns a candidate portrait with source and rights status in findings, but creates no Media record or image asset. It does not claim that discovery grants publication permission.
- A candidate with a publication license that covers all intended use follows the persistent asset path and retains required attribution.
- A lawfully accessible candidate approved for analysis only is passed as an image-only transient handoff. The observer receives no photo URL or contextual metadata; no image file, Media record, or original photo URL is persisted; the temporary copy is deleted after observation.
- A candidate with an explicit applicable reservation/prohibition, unlawful access, or unresolved material analysis-rights question is not fetched or handed off. No photo URL is written to content records.
- An image-less Appearance may be persisted only with an independent event/date source URL. The original photo URL is never substituted for that source URL in the analysis-only path.
- The pipeline makes no claim that source URLs or image copies are removed from external tool/provider logs; the no-persistence guarantee applies to repository content and generated records.

## Verification history

- `npm run check`: content validation passed for 388 records and Astro reported zero errors, warnings, or hints.
- `npm test`: production build completed with 351 pages; 9 component tests and 5 content tests passed.
- Build-output inspection confirmed that `/content/hairstyles.json` contains published records only, prompt and workflow files are emitted for direct requests, and `robots.txt` disallows indexing while allowing the site generally. These results predate the image-handling prompt revision; no checks have been run for this follow-up.
