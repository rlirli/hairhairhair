# Git-backed content model

The authoritative editorial records live in `src/content/`. Each entity is one JSON file named after its stable ID. JSON Schema files document and validate each record shape; `npm run validate:content` also checks cross-file IDs, compatibility criteria, and image paths. Git is the source of truth. The app currently loads this content at build time; there is no database or MCP layer in this increment.

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

Records refer to one another through stable IDs. For example, a style example refers to its media and one or more hairstyles; an appearance refers to a person, a photograph, and observed hairstyles. `npm run validate:content` checks that those IDs resolve.

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

1. Edit or add the JSON file in the matching collection. Use the corresponding schema in `src/content/schemas/` as the record contract.
2. Keep related records connected by IDs. Add media metadata and its asset together when introducing an image.
3. Run `npm run validate:content`; fix schema errors, unresolved IDs, duplicate relations, or missing assets before committing.
4. Run `npm run check` and `npm run build` when changing the content adapter or record shapes.

`src/data/content.ts` is the read adapter used by the application. The small files next to it preserve existing import paths for the UI; edit `src/content/` for editorial data, not the adapter or generated Astro output.
