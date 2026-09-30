# Git-backed content model

The authoritative editorial records live in `src/content/`. Each entity is one JSON file named after its stable ID. JSON Schema files document and validate each record shape; `npm run validate:content` also checks cross-file IDs, compatibility criteria, and image paths. Git is the source of truth. The app loads this content at build time, and the optional local stdio MCP edits these same tracked files. There is no database layer.

```text
src/content/
  schemas/
  classification-systems/<id>.json
  hair-types/<id>.json
  hairstyles/<id>.json
  compatibility/<hairstyle-id>.json
  style-examples/<id>.json
  people/<id>.json
  appearances/<id>.json
  sources/<id>.json
  media/<id>.json
  natural-profiles/<id>.json
  assets/...
```

Classification systems and natural profiles are additional collections because the current product already has those records. `hairstyle-kinds.json` stores the display labels used by the site.

## Relationships and compatibility

Records refer to one another through stable IDs. For example, a style example refers to its media and one or more hairstyles; an appearance refers to a person, an optional photograph, and optional hairstyle observations. An observation separates a source-reported hairstyle claim (`reportedHairstyle` with `sourceId`) from an image-only `visualDescription`, optional ranked `preCatalogCandidates`, and catalog-link reasoning (`catalogMatchReasoning`). Its `hairstyleId` is optional so appearance research can be committed before catalog matching; validation warns about an absent link and passes, while a present but unknown ID is an error. A later matching run can link the observation to an existing hairstyle or a stub. An appearance observation may pin a `styleExampleId` for its representative hairstyle image. Source-verified appearances may be recorded without a reusable photo. Hairstyle indexes use a clearly labelled style-example image for those records; the photographic appearance archives continue to show only source photographs. `npm run validate:content` checks that those IDs resolve.

Hairstyles use `guidePublicationStatus`: `stub` records are research-pending and require only an `id` and status, with any other guide fields optional; `draft` records are complete but not publicly visible; `published` records are complete and eligible for public rendering. Stubs participate in identity and duplicate matching, but the site renders only published guides.

Each `compatibility/<hairstyle-id>.json` stores assessments for that hairstyle. An assessment has one or more criteria, an optional variation, a provenance, and the existing score:

```json
{
  "hairstyleId": "hairstyle-buzz-cut",
  "assessments": [
    {
      "criteria": [{ "dimension": "hair-type", "valueId": "hair-type-1" }],
      "score": 0.9,
      "provenance": "estimated"
    }
  ]
}
```

Scores retain the inclusive 0.0–1.0 scale. `null` means unknown; zero is a deliberate estimate. The current app adapter exposes the hair-type assessments through the existing `HairstyleCompatibility` API. Criteria are dimension/value pairs so a future dimension such as starting hair length can be added without changing the file layout. Adding a dimension will still require its own value records, schema/validator mapping, and app behavior before those assessments affect recommendations.

## Images

Image originals live under `src/content/assets/` and are Git tracked. Each image has a record in `media/` with an `asset` path, alt text, and provenance or rights metadata. Other records refer to media by ID rather than repeating the path. Astro imports the source files through the content adapter and continues to optimize them during the build.

## Add or update content

For hand-authored editorial updates, edit the JSON file in the matching collection and use its schema in `src/content/schemas/`. For package-based additions, prepare one payload plus its images in `inbox-hairstyles/<slug>/` or `inbox-people/<slug>/`; the package-level schemas live under `public/schemas/`. LLM task and workflow entry points are under `public/prompts/` and `public/workflows/`. Their result envelope is `{task,status,records,assets,findings?}`; consult the relevant task and workflow files for the required record fragments and image handoffs.

Run `npm run import:hairstyles` or `npm run import:people` to validate and preview a package. After reviewing the plan, add `-- --apply` to write records/assets into the appropriate `src/content/` collections and move the package into its inbox `archive/`. Import is a local Git workflow; all resulting records and assets remain Git tracked. Then run `npm run validate:content`.

LLM workflows may read public references such as `https://hairhairhair.hair/content/llms.txt`, `/content/hairstyles.json` (published-only), `/content/hair-types.json`, `/people/llms.txt`, and `/hairstyles/llms-full.txt` (published guides). Public hairstyle data cannot reveal drafts or stubs, and its record projection may omit private links or optional fields. In a local run, compare candidate concepts with the complete local MCP catalog before applying writes; reread full records and merge only intended changes, preserving unrelated fields and remapping reused IDs. Public research alone cannot establish global uniqueness. A web-only run may return proposed records and assets in chat, leaving repository reconciliation and import for later. Public references may be stale. Carry records produced earlier in a composed run as a working overlay.

Run `npm run check` and `npm run build` when changing the content adapter or record shapes.

For script and MCP management of records, linked entities, packages, and images, see [Local content MCP](content-management-mcp.md).

`src/data/content.ts` is the read adapter used by the application. The small files next to it preserve existing import paths for the UI; edit `src/content/` for editorial data, not the adapter or generated Astro output.
