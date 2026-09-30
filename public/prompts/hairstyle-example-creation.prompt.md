# Hairstyle example creation

**Task.** Create one style-example record for a supplied hairstyle and already-generated image. Do not generate another image.

**Input.** Hairstyle ID, generated PNG, real media ID/record, and optional title/caption requirements.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [style-example.schema.json](https://hairhairhair.hair/schemas/style-example.schema.json), [media.schema.json](https://hairhairhair.hair/schemas/media.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use MCP at active checkout to read the target and write only the example; use `content_add_image` only if supplied local image/media is not already stored. Web: use supplied full records and published public references; return a proposal only.

**Instructions.** Stop if target is stub or lacks a clear visual target. Confirm image matches hairstyle and media ID exists. Fill every required field from style-example schema; use unique IDs and factual descriptions. Do not infer natural subtype. Locally dry-run and inspect with `content_write_record(s)` before applying. Do not duplicate media.

**Result.** Return raw example record and any media/asset records only if actually stored or proposed with a truthful path; report validation and applied state in findings.

## Result envelope

```json
{
  "task": "hairstyle-example-creation",
  "status": "complete",
  "records": [
    {
      "collection": "style-examples",
      "record": {
        "id": "short-layered-waves-example",
        "hairstyleIds": ["short-layered-waves"],
        "imageId": "short-layered-waves-example-image",
        "title": "Short layered waves",
        "caption": "A short layered cut styled in loose waves.",
        "patternDescription": "Loose, defined waves with visible layering.",
        "lengthDescription": "Short length, ending around the jaw."
      }
    }
  ],
  "assets": [],
  "findings": { "applied": false }
}
```
