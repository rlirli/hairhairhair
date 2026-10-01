# Person profile research

**Task.** Research one identified person, prepare a supported Person and Natural Profile, and find a candidate portrait that could serve as the person's profile image.

**Input.** Person name, disambiguating facts, optional existing person ID, research limits.

**Contracts.** Read the local schemas in `src/content/schemas/` in the active checkout, or these public schemas: [person.schema.json](https://hairhairhair.hair/schemas/person.schema.json), [natural-profile.schema.json](https://hairhairhair.hair/schemas/natural-profile.schema.json), [source.schema.json](https://hairhairhair.hair/schemas/source.schema.json), and [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json). `NaturalProfile` is a separate record keyed by `personId`; each trait is `{value, provenance:{source,status,confidence,note}}`. It records natural traits, not a look in a particular appearance.

**Environment.** In both local and web use, perform live web research and open reliable sources for claims that need verification. Search image sources for a portrait candidate, preferring a source with clear permission for the site's intended public use (for example, a compatible Creative Commons license or public-domain status). Local: use connected `hairhairhair-content` MCP at the active checkout to read/write only scoped Person and Natural Profile records, and use the local schemas. Do not add image files or create Media records in this task. Web: use public pages as context, then live-source research and the public schemas. Public snapshots are read-only.

**Instructions.** Verify identity. Cite sources actually consulted with title, publisher, URL, and supported facts; never invent a citation. For stable, broadly known biographical or demographic facts that are unambiguous (for example, a widely known complexion or ethnicity), high-confidence model knowledge may be used without a web citation. Mark these as model knowledge in findings/provenance rather than presenting them as source-verified. Use live sources for disputed, niche, or uncertain claims. Separate documented facts from inference. Never infer natural hair traits from styled images, dye, wigs, or extensions, and do not infer a person's identity or ethnicity from a portrait. Use schema-valid unknown values where evidence or confidence is insufficient.

Search for one candidate portrait of the identified person. Prefer an image whose source, creator, license, attribution requirements, and permission for the site's intended public use are clear. Return the candidate's image-page URL, direct image URL when available, creator/rightsholder, license/rights evidence, and why it depicts the person in `findings.profileImageCandidate`. A candidate is not permission to publish. Do not download, attach, or persist the image in this task. Do not add a photograph URL to the Person record's biography sources. Set `heroImageId` only when it already refers to an existing, confirmed Media record for this person.

Preserve existing supported data. Do not create appearances, hairstyles, media, or examples. For local writes, use `content_write_records` with `apply:false`, inspect, then apply valid changes.

Natural Profile stores hair type, subtype, natural hair color, natural skin tone, hair thickness, and hair density as separate traits. Do not invent a controlled vocabulary: use a value only when supported and meaningful under the current taxonomy. For an unknown trait use `value:null` and provenance that states it is not documented, unverified, low confidence, with a short note. Never use appearance images to infer natural traits.

If live browsing or access to reliable sources is unavailable, do not guess: return `partial` or `blocked` and explain the access limitation. If no profile portrait with clear public-use permission is found, return the best candidate and its rights uncertainty; do not block the supported Person or Natural Profile records.

**Result.** Put schema-shaped Person and Natural Profile records in `records`. In `findings`, separate source-supported facts from model-knowledge facts; include `profileImageCandidate` with its rights status, or `null` if none was found, and state applied status. Do not list a candidate portrait in `assets` unless an actual image file was attached or added by an explicitly authorized task. Example shape (illustrative only; never reuse the ID or claim the facts):

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
