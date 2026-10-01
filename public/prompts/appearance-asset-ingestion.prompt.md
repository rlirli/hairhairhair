# Appearance asset ingestion

**Task.** Review supplied appearance-photo candidates for two separate purposes: public reuse of the image, and temporary image-only analysis. A missing publication license does not by itself prohibit temporary analysis.

**Input.** Person ID, candidate event/photo/source details, intended publication uses, the applicable analysis jurisdiction/policy when known, and image files or image payloads when available. Keep the candidate photo URL distinct from any independent event/date source URL.

**Contracts.** Use `src/content/schemas/appearance.schema.json`, `media.schema.json`, and `source.schema.json` in the active checkout, or the linked [Appearance](https://hairhairhair.hair/schemas/appearance.schema.json), [Media](https://hairhairhair.hair/schemas/media.schema.json), and [Source](https://hairhairhair.hair/schemas/source.schema.json) schemas. Results follow [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: use the connected `hairhairhair-content` MCP at the active checkout to read/write only the supplied person's scoped Appearance, Source, and Media records. Use `content_add_image` only for an image approved for public reuse. Web: use supplied full records and applicable schemas; return proposed records and attach only actual supplied assets. A web proposal is not persisted.

**Instructions.** Make an independent decision for each candidate and return one of these dispositions:

- `publishable`: An authoritative license or permission allows every intended public use at no monetary license cost. Verify attribution, adaptation/cropping, territory, duration, and other terms. Only this path may create a persistent Media record or image asset.
- `analysis-only`: Public-reuse permission is absent or costly, but temporary automated analysis is permitted under the supplied jurisdiction/policy. Check that access is lawful and that no applicable express TDM/AI reservation, access restriction, or contract term prohibits the intended analysis. Do not treat the absence of a publication license as a reason by itself to withhold analysis. If legal eligibility is unclear, report `needs-review`; do not assert that the use is lawful.
- `withhold`: Analysis and publication are prohibited, or access is not lawful. Do not fetch, copy, or hand off the image.
- `needs-review`: A material rights or access fact cannot be established. Do not fetch or hand off the image until the orchestrator resolves the uncertainty.

For `analysis-only`, use only a transient working copy supplied to this task or fetched by the orchestrator for the authorized analysis. Keep it outside `src/content/assets`, do not call `content_add_image`, do not create a Media record, and delete the temporary copy after the observer returns. The orchestrator—not this task—passes the image directly to a fresh hair-observation task with only the image and that prompt. The observer must not receive the photo URL, filename, caption, event, person, or source claims.

An `analysis-only` Appearance may be persisted without `imageId` if its event and date have independent evidence. Use the non-photo event/date source URL for `taken.sourceUrl`; never store the analyzed photo's URL in the Appearance, a Source record, or Media metadata. If the photo is the only event/date evidence, do not persist the Appearance until an independent source is found. A withheld or needs-review photo URL must not be copied into persistent content. Do not claim that omitting a URL from repository records erases browser, tool, or provider logs.

Preserve source-provided hairstyle context only when a source explicitly states it for this appearance, and keep it separate from image-only observation. Do not classify hair here or browse the hairstyle catalog. For local writes, preview changes with `apply:false`, inspect, then apply; for analysis-only, write only the source-backed Appearance/Source records and never an image or Media record. Report writes only when MCP confirms them.

**Result.** Return per-candidate disposition, rights evidence, uncertainty, and any transient analysis handoff candidate key in `findings`. For `publishable`, include actual persisted/proposed Appearance, Source, and Media records and list only files actually attached/added in `assets`. For `analysis-only`, an Appearance has no `imageId`, there is no Media record or image asset, and the analyzed image URL is absent from persistent records. For `withhold` or `needs-review`, create no image handoff and no image-related record. Follow the linked result schema and state applied status truthfully.
