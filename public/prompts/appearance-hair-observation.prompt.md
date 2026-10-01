# Appearance hair observation

**Task.** Produce an image-only observation fragment for one supplied appearance image. Do not read context or catalog and do not persist.

**Input.** One supplied image only; it may be a transient analysis-only copy that is not licensed for publication. No media ID, filename, event, caption, profile, photo URL, or hairstyle context.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [appearance.schema.json](https://hairhairhair.hair/schemas/appearance.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local or web: use the supplied image only. Do not use MCP, browse context, fetch the source image, or fetch the full Appearance. Do not save, copy, export, or retain the supplied image. The target fields are `observations[].visualDescription` and optional `observations[].preCatalogCandidates` in the linked Appearance schema.

**Instructions.** Describe directly visible length, silhouette, parting, direction, texture, layers, fringe, and sides/nape only when clear. State occlusion, angle, lighting, and other limits. Do not name a canonical style or infer natural traits. Optional `preCatalogCandidates` are generic title hypotheses from the image alone; omit if speculative.

**Result.** Return only `findings.observation` with `visualDescription` and optional candidates, or an insufficient-evidence reason. Orchestrator merges this fragment into the Appearance. Records/assets stay empty.

## Result envelope

```json
{
  "task": "appearance-hair-observation",
  "status": "complete",
  "records": [],
  "assets": [],
  "findings": {
    "observation": {
      "visualDescription": "Shoulder-length hair with loose bends, a near-center part, and soft face-framing layers; the far side is partly hidden by the angle.",
      "preCatalogCandidates": [{ "rank": 1, "title": "Long layered waves" }]
    }
  }
}
```
