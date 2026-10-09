# Person profile research

**Task ID.** `person-profile-research`

**Goal.** Build a supported profile for one identified person and find a candidate portrait. Return appearance leads when useful; this task is not limited to biography facts.

**Input.** A name, identifying context, and any known person, profile, or appearance information.

**Return.** A standard [content task result](https://hairhairhair.hair/schemas/content-task-result.schema.json) containing proposed `people` and `natural-profiles` records. In `findings`, include evidence-backed facts, high-confidence model-knowledge facts, uncertainties, useful appearance leads, and `profileImageCandidate` with its page URL, direct image URL when available, creator, rights evidence, and depiction rationale. Records are proposals, not claims of persistence.

**Judgment.** Verify identity and use reliable sources for disputed, specific, or uncertain facts. Stable, unambiguous facts may come from high-confidence general knowledge; label them `model-knowledge` and do not invent citations. `naturalSkinTone` describes complexion; a clear high-confidence complexion may use model knowledge. Mark model-knowledge traits in provenance with `source: model-knowledge`, high confidence, and a brief note. Do not infer skin tone or natural hair traits from the candidate portrait. Use `null` with provenance when a natural trait is unknown. A portrait candidate and its rights evidence do not by themselves authorize publication.
