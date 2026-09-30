# Draft implementation plan: orchestrated content workflows

**Status:** Implementation in progress.
**Purpose:** Define independent, reusable LLM workflow files whose outputs can be chained by an orchestrator without giving a workflow authority to invoke another workflow or commit repository changes.

## Decisions captured

- Every workflow is an independent entry point. An orchestrator may start with any one of them.
- A workflow performs only its named task. It returns results and a `NEXT` recommendation; the orchestrator decides whether to load that workflow, ask the user, commit, or stop.
- `NEXT` recommendations use “Unless instructed otherwise” language. An explicit instruction to stop or skip follow-ups takes precedence.
- `observations[].hairstyleId` is optional. An Appearance can be committed before its hairstyle is matched; a later workflow run may add the link. Content validation warns when an observation has no hairstyle link, but does not fail for that omission.
- `guidePublicationStatus` has `stub`, `draft`, and `published` values. A stub is research-pending and may contain any hairstyle fields, all optional except the stable `id` and lifecycle status. A draft is a complete guide that is not online. A published guide is eligible for public rendering.
- Rights and license review are part of `APPEARANCE_ASSET_INGESTION`; they are not a separate workflow. An asset without a verified license that allows the intended use at no monetary license cost is not ingested.
- The generated-hairstyle imagery direction is a style reference, not a workflow prompt. It is in `public/prompts/hairstyle-imagery-style.md`.
- `public/prompts/llms.txt` is served by a request-aware Astro endpoint at `/prompts/llms.txt`.

## Workflow files and responsibilities

All workflow prompts should share a compact structure: `PURPOSE`, `INPUT`, relevant schema/data-model guidance, `RULES`, `INSTRUCTIONS`, `OUTPUT`, and `NEXT`. A prompt must define unfamiliar record concepts, link its authoritative schemas, and include a small example where it emits or edits structured records. Workflow prompts do not link to one another except in `NEXT`; `HAIRSTYLE_EXAMPLE_CREATION` may reuse the image brief in `hairstyle-imagery.prompt.md` rather than duplicating it.

| Workflow | Responsibility | `NEXT` recommendation, unless instructed otherwise |
|---|---|---|
| `PERSON_PROFILE_RESEARCH` | Research the person and supported natural-profile facts. Keep uncertain or undocumented traits explicitly unverified. | `PERSON_APPEARANCE_DISCOVERY` |
| `PERSON_APPEARANCE_DISCOVERY` | Find appearances, dates, event context, photograph sources, and any source claims specifically about the hair at that appearance. Do not inspect the hairstyle catalog. | `APPEARANCE_ASSET_INGESTION` |
| `APPEARANCE_ASSET_INGESTION` | Verify image rights and license terms, ingest only qualifying image assets, and preserve appearance metadata and source claims. A no-cost license may still require attribution or other terms; record those terms. | `APPEARANCE_HAIR_OBSERVATION` |
| `APPEARANCE_HAIR_OBSERVATION` | Analyze the image without reading the internal hairstyle catalog. Produce a visual description and, when useful, ranked general hairstyle-title candidates. | `HAIR_OBSERVATION_CATALOG_MATCH` |
| `HAIR_OBSERVATION_CATALOG_MATCH` | Compare the catalog-independent observation with catalog entries. Link a fitting entry or create a minimal hairstyle stub, then explain the decision. | Recommend that the orchestrator commit the match result before it starts `HAIRSTYLE_STUB_FILL`. |
| `HAIRSTYLE_STUB_FILL` | Find existing stubs and return the set that can be researched. Do not write research into the guide itself. | `HAIRSTYLE_GUIDE_RESEARCH` for each selected stub |
| `HAIRSTYLE_GUIDE_RESEARCH` | Research one hairstyle, complete its guide and compatibility data, and publish when the evidence and required content are sufficient. Preserve it as a stub if it is not yet complete. | `HAIRSTYLE_EXAMPLE_CREATION`, recommended 1–3 times based on visual variability |
| `HAIRSTYLE_EXAMPLE_CREATION` | Create one generated example for one supplied hairstyle using the shared visual direction; register its media and example records. | End; no automatic follow-up |
| `HAIRSTYLE_CATALOG_GAP_SCAN` | Review the full catalog for orthogonal coverage gaps and create minimal stubs for useful new candidates. | End after creating stubs; do not recommend automatic research |

The next-workflow text is a handoff recommendation, not an invocation. A workflow must not load another workflow file, call it as a tool, or make the orchestration decision on the caller’s behalf. The orchestrator - not the current workflow - controls the handoff.

### Recommended chains

These are default routes for an orchestrator that wants the full pipeline. They are not mandatory call graphs; any listed workflow can be invoked directly, and the orchestrator can stop at any step.

```text
PERSON_PROFILE_RESEARCH
  → PERSON_APPEARANCE_DISCOVERY
  → APPEARANCE_ASSET_INGESTION
  → APPEARANCE_HAIR_OBSERVATION
  → HAIR_OBSERVATION_CATALOG_MATCH
  → [orchestrator validates and commits]
  → HAIRSTYLE_STUB_FILL
  → HAIRSTYLE_GUIDE_RESEARCH (once per selected stub)
  → HAIRSTYLE_EXAMPLE_CREATION (1–3 per guide, as warranted)
```

```text
HAIRSTYLE_CATALOG_GAP_SCAN
  → create stub(s)
  → stop; orchestrator decides when or whether to commit and later fill them
```

```text
HAIRSTYLE_GUIDE_RESEARCH (direct entry for a named stub)
  → complete or retain the stub according to evidence
  → if guide is ready, recommend HAIRSTYLE_EXAMPLE_CREATION (1–3 times)
```

The orchestrator owns all commit decisions. When it proceeds from catalog matching to stub research, it commits the matching result and any created stubs first. This checkpoint does not require every Appearance in the current run to be matched: observations without `hairstyleId` may remain in the content collection and be matched in a later run. No `CONTENT_VALIDATE_AND_COMMIT` workflow is introduced.

## Appearance observation data model

An Appearance remains the record of a person at a particular event or date. Each item in `observations[]` represents one hairstyle observation for that Appearance. Keep four kinds of information distinct:

1. **Source-reported claim:** what a consulted source says about this person’s hairstyle at this specific Appearance. It is not an AI conclusion. Store a source ID so the claim is traceable.
2. **Visual description:** what is visibly on the person’s head in the image, derived from the image alone and without catalog terminology.
3. **Pre-catalog title candidates:** optional, ranked general hairstyle names produced without access to the internal catalog. These are hypotheses, not catalog IDs.
4. **Catalog match:** the selected hairstyle ID and the reasoning for linking it. If no current entry fits, the matching workflow creates a stub and links to that ID.

Proposed property names: `reportedHairstyle` (`description`, `sourceId`), `visualDescription`, `preCatalogCandidates` (`rank`, `title`), optional pre-match `hairstyleId`, and `catalogMatchReasoning`. `styleExampleId` remains optional and is only set when an example exists for the linked hairstyle.

The schema permits `hairstyleId` to be omitted, including on committed Appearance records. When catalog matching runs, it links an existing entry or creates a stub and links that. Missing links are allowed to remain for later work; no separate match-status field is needed.

`APPEARANCE_ASSET_INGESTION` stores a source-reported claim only when a source explicitly makes one and records its source link. `APPEARANCE_HAIR_OBSERVATION` writes the image-only description and ranked candidates; it must not read the catalog or appearance context for its image analysis. `HAIR_OBSERVATION_CATALOG_MATCH` writes the canonical ID and match reasoning.

### Proposed `appearance.schema.json` change

```diff
@@ observations.items
-        "required": ["hairstyleId", "note"],
         "properties": {
-          "hairstyleId": { "type": "string" },
+          "reportedHairstyle": {
+            "type": "object",
+            "required": ["description", "sourceId"],
+            "properties": {
+              "description": { "type": "string", "minLength": 1 },
+              "sourceId": { "type": "string" }
+            },
+            "additionalProperties": false
+          },
+          "visualDescription": { "type": "string", "minLength": 1 },
+          "preCatalogCandidates": {
+            "type": "array",
+            "items": {
+              "type": "object",
+              "required": ["rank", "title"],
+              "properties": {
+                "rank": { "type": "integer", "minimum": 1 },
+                "title": { "type": "string", "minLength": 1 }
+              },
+              "additionalProperties": false
+            }
+          },
+          "hairstyleId": { "type": "string" },
           "styleExampleId": { "type": "string" },
-          "note": { "type": "string" }
+          "catalogMatchReasoning": { "type": "string", "minLength": 1 }
         },
```

The final schema should not retain the old mixed-purpose `note`. During migration, re-analyze existing images for `visualDescription`, preserve source claims only when a source actually supports them, and write match reasoning separately. Do not mechanically split a legacy note into multiple claims. Keep existing catalog links. If an existing observation has no link, leave it optional and let validation warn; a later match workflow can add a link or create a stub.

## Hairstyle record lifecycle

Extend the existing `guidePublicationStatus` field with the stub state:

- `stub`: research-pending record. It may contain any hairstyle fields; those fields are optional. Only stable `id` and `guidePublicationStatus` are required.
- `draft`: complete, publication-ready guide, not yet publicly visible.
- `published`: complete guide approved for public pages and public catalog results.

A stub can be enriched over multiple runs. Promote it to `draft` when it is a complete guide; set it to `published` when it meets the publication bar. A complete but deliberately unpublished guide stays `draft`. Never use `draft` to mean “missing research.” Stubs must be considered during duplicate checks, but must not render as public guides or be offered as completed hairstyle recommendations.

### Proposed `hairstyle.schema.json` change

```diff
@@ top-level required fields
-    "id", "slug", "name", "kind", "summary", "intro", "variations",
-    "consultation", "considerations", "sourceIds", "relatedStyleIds",
-    "guidePublicationStatus"
+    "id", "guidePublicationStatus"
@@ properties
-    "guidePublicationStatus": { "enum": ["draft", "published"] },
+    "guidePublicationStatus": { "enum": ["stub", "draft", "published"] },
@@ conditional requirements for completed guides
+  "allOf": [
+    {
+      "if": {
+        "properties": {
+          "guidePublicationStatus": { "enum": ["draft", "published"] }
+        },
+        "required": ["guidePublicationStatus"]
+      },
+      "then": {
+        "required": [
+          "slug", "name", "kind", "summary", "intro", "variations",
+          "consultation", "considerations", "sourceIds", "relatedStyleIds"
+        ]
+      }
+    }
+  ]
```

Keep all existing hairstyle properties available for every lifecycle value. For stubs, fields such as `slug`, `name`, `kind`, `summary`, `relatedStyleIds`, and guide sections may be present or absent; the schema should not impose a summary length cap or forbid those fields. Require complete guide fields for `draft` and `published`. Update TypeScript so consumers handle missing guide fields on stubs. Existing records retain their current `draft` or `published` value when the enum is expanded.

## Orchestration, persistence, and validation

- The orchestrator loads only the selected workflow file, supplies its inputs, and receives its output plus the `NEXT` recommendation.
- A user instruction such as “only collect appearances” suppresses the NEXT handoff. Do not run follow-ups merely because a file recommends one.
- The orchestrator checks workflow output, decides when to persist or commit, and reports when work stops or needs more evidence.
- When continuing from `HAIR_OBSERVATION_CATALOG_MATCH` to `HAIRSTYLE_STUB_FILL`, commit the match changes and created stubs first. Existing or newly committed observations may still lack `hairstyleId`; validation warns and passes.
- `scripts/validate-content.mjs` should validate the new Observation properties and `reportedHairstyle.sourceId`. A missing `observations[].hairstyleId` produces a warning only and must not fail validation. A non-empty unknown hairstyle ID, invalid source reference, or invalid example-to-hairstyle reference remains an error. Validate complete guide fields for `draft` and `published`; allow stub fields to be omitted.
- MCP schemas and read/write projections must accept the new fields and expose `guidePublicationStatus`; compact listings should distinguish stubs from guides.
- Update imports, types, data helpers, and appearance/hairstyle pages. Public pages must never render a stub as a complete linked guide; existing published-guide filtering remains authoritative.
- Update `docs/content-model.md`, MCP docs, prompt references, and contributing guidance alongside schema changes.

## Prompt index and local/production URLs

The prompt index is served at `/prompts/llms.txt`. Its request-aware Astro endpoint uses the active local origin during development and `https://hairhairhair.hair` for the prerendered production response. It links to all workflow files, the hairstyle package prompt, and the style reference. The route source is `src/pages/prompts/llms.txt.ts`.

`src/pages/robots.txt.ts` disallows `/prompts/`, discouraging search indexing while leaving prompt files available for direct HTTP requests.

## Planned file tree

Legend: 🆕 new; ✏️ changed; 🗑️ deleted; ⏳ planned but not yet implemented. No file is deleted.

```text
hairhairhair/
├── docs/
│   └── plans/
│       └── 🆕 llm-content-pipeline.md                 # this draft plan
├── public/
│   └── prompts/
│       ├── 🆕 hairstyle-imagery-style.md              # visual direction only
│       ├── ✏️ hairstyle-imagery.prompt.md
│       ├── 🆕 llms.txt                                 # generated by src/pages/prompts/llms.txt.ts
│       └── workflows/
│           ├── 🆕 person-profile-research.md
│           ├── 🆕 person-appearance-discovery.md
│           ├── 🆕 appearance-asset-ingestion.md
│           ├── 🆕 appearance-hair-observation.md
│           ├── 🆕 hair-observation-catalog-match.md
│           ├── 🆕 hairstyle-stub-fill.md
│           ├── 🆕 hairstyle-guide-research.md
│           ├── 🆕 hairstyle-example-creation.md
│           └── 🆕 hairstyle-catalog-gap-scan.md
├── src/
│   ├── content/schemas/
│   │   ├── ✏️ appearance.schema.json
│   │   └── ✏️ hairstyle.schema.json
│   ├── types/
│   │   ├── ✏️ people.types.ts
│   │   └── ✏️ hairstyles.types.ts
│   ├── data/
│   │   └── ✏️ index.ts                               # resolve observations and filter published guides
│   ├── components/people/
│   │   └── ✏️ PersonHairstyleGrid.astro              # do not expose stub guides
│   └── pages/
│       ├── ✏️ people/[slug]/appearances/[appearanceId].astro
│       ├── 🆕 prompts/llms.txt.ts                    # emits the public prompt-index URL
│       └── 🆕 schemas/[schema].json.ts               # publishes authoritative content schemas
├── scripts/
│   ├── ✏️ validate-content.mjs
│   ├── ✏️ mcp-server.mjs
│   └── ✏️ import-people.mjs
├── public/schemas/person-package.schema.json          # ✏️ optional observations and separated fields
├── src/content/appearances/                           # ✏️ migrate legacy note data
└── docs/
    ├── ✏️ content-model.md
    ├── ✏️ content-management-mcp.md
    └── plans/llm-content-pipeline.md                  # 🆕 this plan

inbox-people/README.md                                 # ✏️ package guidance

[unchanged] src/pages/robots.txt.ts                    # keep /prompts/ disallowed
```

## Implementation sequence and acceptance criteria

1. Implement the observation property names and stub/full-guide schema contract shown in the schema diffs.
2. Implement and validate schemas, types, MCP projections, and cross-reference validation. Migrate existing Appearance notes without inventing source claims. Missing hairstyle links warn but do not fail; a match workflow can fill them in a later run.
3. Write the nine independent workflow files with explicit boundaries, output contracts, and orchestrator-directed `NEXT` recommendations. No file should directly invoke or commit another workflow’s work.
4. Update public rendering so stubs remain internal while published guides remain visible. Add request-aware prompt index generation and keep `/prompts/` accessible directly but excluded from indexing.
5. Reuse `hairstyle-imagery.prompt.md` as the image brief for example creation. Generate 1–3 examples only when the orchestrator invokes the example workflow.

The implementation is complete when a run can start at any workflow; each workflow returns only its scoped result and next-step recommendation; the orchestrator can stop follow-ups; missing Appearance hairstyle links produce warnings without failing validation; stub records can be incrementally enriched; stubs cannot appear as public guides; and the local and production prompt index links use their respective origins.
