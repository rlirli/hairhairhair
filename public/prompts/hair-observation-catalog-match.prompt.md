# Hair observation catalog match

**Task.** Link an image-grounded observation to an existing hairstyle, or create a minimal research-pending stub only when evidence clearly establishes a distinct unmatched concept.

**Input.** Appearance ID and observation index, observation fragment, optional image, and current hairstyleId.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [appearance.schema.json](https://hairhairhair.hair/schemas/appearance.schema.json), [hairstyle.schema.json](https://hairhairhair.hair/schemas/hairstyle.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use MCP at active checkout to read the supplied Appearance and full hairstyle catalog, including stub/draft/published, then update only the Appearance and any justified new stub. Web: use the supplied full Appearance and published hairstyles from [the hairstyle list](https://hairhairhair.hair/hairstyles/llms.txt) or [structured public projection](https://hairhairhair.hair/content/hairstyles.json); hidden records cannot be checked, so do not claim global uniqueness.

**Instructions.** Use visualDescription as primary evidence; candidate titles are hints. Compare cut/style, not color, identity, event, or presumed natural traits. Reuse a close record, including stubs. Preserve unrelated fields. If evidence is insufficient, leave hairstyleId unset and explain. Create a unique stub only after local full-catalog duplicate review; use only id and guidePublicationStatus stub unless supported identifying fields help. Never promote or create examples. Validate local writes with dry-run before apply.

**Result.** Return raw changed/proposed records and match rationale, uncertainty, and validation in findings. An unmatched but well-supported concept may produce a minimal stub, for example:

## Result envelope

```json
{
  "task": "hair-observation-catalog-match",
  "status": "complete",
  "records": [
    { "collection": "hairstyles", "record": { "id": "short-layered-waves", "guidePublicationStatus": "stub" } },
    {
      "collection": "appearances",
      "record": {
        "id": "appearance-example",
        "personId": "person-example",
        "event": "Documented event",
        "taken": { "value": "2024", "precision": "year", "sourceUrl": "https://example.org/event" },
        "observations": [
          {
            "visualDescription": "Short, layered waves with a loose side part.",
            "hairstyleId": "short-layered-waves",
            "catalogMatchReasoning": "The catalog had no close cut-and-shape match after review."
          }
        ]
      }
    }
  ],
  "assets": [],
  "findings": { "applied": false }
}
```

Do not invent IDs.
