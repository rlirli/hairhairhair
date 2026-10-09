# LLM content task system

This note defines where instructions belong. The public task prompts and workflows are the working contracts; schemas define record shape.

## Put each kind of detail in one place

- **Task prompt:** the task's goal, inputs, domain-specific judgment, and required output. Keep it independent of a particular model, tool, repository path, or storage adapter.
- **Workflow:** which tasks fit together, what information passes between them, which steps depend on earlier results, and when follow-up is optional.
- **Schema:** exact field names, types, and required record structure. Do not copy large schema examples into every prompt.
- **Orchestrator:** chooses tasks based on the user's scope, merges overlapping findings, reconciles IDs and existing records, validates proposals, handles environment-specific persistence, and reports applied versus unapplied changes.

Every prompt returns the shared `content-task-result` shape: `task`, `status`, `records`, `assets`, and optional `findings`. Records are proposed content, not proof of persistence. `complete`, `partial`, and `blocked` describe the result, not the storage operation. List only actual generated or supplied assets.

## Shared evidence rules

- Keep source-backed facts, high-confidence model knowledge, and uncertainty distinct. Cite sources actually consulted; do not fabricate citations. High-confidence, unambiguous general facts may be recorded as `model-knowledge` without a source. For an unknown profile trait, use `null` and explain the evidence gap.
- `naturalSkinTone` describes complexion. Do not infer complexion or natural hair traits from an appearance image.
- Person research and appearance discovery may uncover overlapping facts. Each may return useful cross-cutting findings; the orchestrator combines them instead of enforcing an artificial boundary.
- Keep photo evidence separate from independent event/date evidence. A photo source alone is not the event/date source for an image-less Appearance.

## Image-use decisions

The asset review returns two independent decisions for each candidate:

| Axis | Values | Controls |
| --- | --- | --- |
| `analysis` | `allowed`, `needs-review`, `prohibited` | Whether the temporary image-only observation may proceed. |
| `publication` | `allowed`, `needs-review`, `not-permitted` | Whether the image may become a persistent public asset. |

A decision on one axis does not decide the other. `analysis: allowed` permits observation even if publication is `needs-review` or `not-permitted`. `publication: allowed` permits image persistence even if analysis is separately not allowed. An unresolved analysis decision pauses analysis; an unresolved publication decision pauses only image publication. The plain-language label `analysis-only` means analysis is allowed while publication is not permitted; when publication is still under review, say so explicitly rather than collapsing the two states.

For image observation, supply only the image. Keep captions, filename, source URL, event, identity, profile, prior analysis, and catalog out of the observer's input. The observer returns an observation fragment; the orchestrator associates it with the right Appearance afterward.

## Applying results

- In a local content environment, reconcile proposals against full existing records, validate relationships, and apply only the scoped changes. In a public web-only environment, use published data as an incomplete reference and return proposals without claiming persistence.
- The environment adapter owns image registration and record writes. Claim an asset or record was saved only when that adapter confirms it.
- If analysis is allowed but publication is not allowed or still under review, keep the source image transient and out of persistent media and photo-source records. Remove the temporary copy after observation.

## Maintaining the setup

Keep prompts short enough to state the task contract and its material judgment rules. Put shared policy here instead of repeating it. Keep workflow prose to routing and data boundaries. Add examples only when they resolve a real ambiguity. When adding or renaming a public prompt or workflow, update its index in `src/pages/prompts/llms.txt.ts` or `src/pages/workflows/llms.txt.ts`.
