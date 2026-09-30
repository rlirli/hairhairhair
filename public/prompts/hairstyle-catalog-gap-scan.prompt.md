# Hairstyle catalog gap scan

**Task.** Find useful catalog coverage gaps and create minimal stubs only for clearly distinct concepts.

**Input.** Optional scope or coverage goals; default to the full local catalog.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [hairstyle.schema.json](https://hairhairhair.hair/schemas/hairstyle.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use MCP at active checkout to read the full catalog including all statuses; create only justified stubs. Web: use the published [hairstyle list](https://hairhairhair.hair/hairstyles/llms.txt) or [structured public projection](https://hairhairhair.hair/content/hairstyles.json); disclose that unpublished records were not reviewed.

**Instructions.** Compare guides, drafts, and stubs locally. A stub needs unique stable id and guidePublicationStatus stub; add supported identifying fields only when useful. A gap is a meaningful distinction in cut, shape, length, or styling, not color, wording, or celebrity. Flag likely duplicates; do not merge or edit existing records. Dry-run and review local writes before applying.

**Result.** Return raw stubs and distinctness rationale, excluded candidates, scope, and validation in findings.

## Result envelope

```json
{
  "task": "hairstyle-catalog-gap-scan",
  "status": "complete",
  "records": [
    {
      "collection": "hairstyles",
      "record": {
        "id": "short-layered-waves",
        "guidePublicationStatus": "stub",
        "name": "Short layered waves",
        "kind": "cut"
      }
    }
  ],
  "assets": [],
  "findings": { "distinctness": "Short layered shape absent from reviewed catalog.", "applied": false }
}
```
