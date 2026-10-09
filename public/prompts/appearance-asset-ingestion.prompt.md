# Appearance asset review

**Task ID.** `appearance-asset-ingestion`

**Goal.** Assess each supplied photo candidate separately for temporary analysis and public image use.

**Input.** Candidate identity, photo and event/date sources, intended public uses, the applicable analysis policy or jurisdiction when known, and an image or image handoff reference when available.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json). In `findings.imageUseReview.candidates`, return one entry per candidate: `{candidateId, analysis: {status, reason, evidence}, publication: {status, reason, evidence}}`. Use a supplied candidate ID or a short stable label. For every candidate, return two independent decisions with evidence and unresolved facts:

- `analysis`: `allowed`, `needs-review`, or `prohibited`.
- `publication`: `allowed`, `needs-review`, or `not-permitted`.

`needs-review` applies only to its own decision. If analysis is `allowed`, the image may proceed to observation even when publication is `needs-review` or `not-permitted`. Only publication `allowed` supports a persistent public image. Include source-described hairstyle context only when a source explicitly ties it to that appearance. Return supported Appearance and Source record proposals only when event/date evidence is independent of the photo. Keep photo URLs and photo-source records out of proposals unless publication is `allowed`; include a Media proposal only when publication is `allowed` and the actual image asset is supplied.

**Example.** The image can be lawfully analyzed under the supplied policy, but the uploader’s authority to grant the listed license is unclear: return `analysis: allowed` and `publication: needs-review`. Observation can proceed; keep the image out of persistent public assets unless publication is cleared.

**Decision basis.** Analysis is `allowed` only when access and the supplied analysis policy permit the intended temporary visual analysis; use `needs-review` for material uncertainty and `prohibited` for a clear bar. Publication is `allowed` only when verified permission covers every intended public use and its terms; use `needs-review` when material rights evidence is unresolved and `not-permitted` when no verified permission covers the requested use or terms are incompatible. Do not treat publication uncertainty as an analysis prohibition, or the reverse. Do not invent a legal conclusion where facts are unclear.
