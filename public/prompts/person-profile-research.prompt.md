# Person profile research

**Task.** Research one identified person and prepare supported Person and Natural Profile records.

**Input.** Person name, disambiguating facts, optional existing person ID, research limits.

**Contracts.** Read the local schemas in `src/content/schemas/` in the active checkout, or these public schemas: [person.schema.json](https://hairhairhair.hair/schemas/person.schema.json), [natural-profile.schema.json](https://hairhairhair.hair/schemas/natural-profile.schema.json), [source.schema.json](https://hairhairhair.hair/schemas/source.schema.json), and [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json). `NaturalProfile` is a separate record keyed by `personId`; each trait is `{value, provenance:{source,status,confidence,note}}`. It records natural traits, not a look in a particular appearance.

**Environment.** In both local and web use, perform live web research and open reliable, preferably authoritative sources; the site's public mirrors and model memory are not research evidence. Local: use connected `hairhairhair-content` MCP at the active checkout to read/write only scoped Person and Natural Profile records, and use the local schemas. Web: use public pages as context, then live-source research and the public schemas. Public snapshots are read-only.

**Instructions.** Verify identity; cite sources actually consulted with title, publisher, URL, and supported facts. Separate documented facts from inference. Never infer natural hair or skin traits from styled images, stereotypes, dye, wigs, or extensions. Use schema-valid unknown/unverified values (including low confidence) where evidence is absent or conflicting. Preserve existing supported data. Do not create appearances, hairstyles, media, or examples. For local writes, use `content_write_records` with `apply:false`, inspect, then apply valid changes.

Natural Profile stores hair type, subtype, natural hair color, natural skin tone, hair thickness, and hair density as separate traits. Do not invent a controlled vocabulary: use a value only when supported and meaningful under the current taxonomy. For an unknown trait use `value:null` and provenance that states it is not documented, unverified, low confidence, with a short note. Never use appearance images to infer natural traits.

If live browsing or access to reliable sources is unavailable, do not guess: return `partial` or `blocked` and explain the access limitation.

**Result.** Put schema-shaped Person and Natural Profile records in `records`, with evidence, uncertainty, and applied state in `findings`. Example shape (illustrative only; never reuse the ID or claim the facts):

```json
{
  "task": "person-profile-research",
  "status": "partial",
  "records": [
    {
      "collection": "people",
      "record": {
        "id": "person-example",
        "slug": "example-person",
        "name": "Example Person",
        "description": "A documented public figure.",
        "sources": [{ "kind": "biography", "url": "https://example.org/person" }]
      }
    },
    {
      "collection": "natural-profiles",
      "record": {
        "id": "natural-profile-example",
        "personId": "person-example",
        "hairTypeId": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        },
        "hairSubtypeId": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        },
        "naturalHairColor": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        },
        "naturalSkinTone": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        },
        "hairThickness": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        },
        "hairDensity": {
          "value": null,
          "provenance": {
            "source": "not-documented",
            "status": "unverified",
            "confidence": "low",
            "note": "No reliable source located."
          }
        }
      }
    }
  ],
  "assets": [],
  "findings": { "applied": false }
}
```

Never invent IDs or claim unconfirmed writes.
