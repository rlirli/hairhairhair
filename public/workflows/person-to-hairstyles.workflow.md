# Person to hairstyle records

Use this route to connect a person's documented appearances to hairstyle concepts. It is a flexible path, not a mandatory checklist.

## Tasks

| Task | Prompt |
| --- | --- |
| Person profile research | [person-profile-research](../prompts/person-profile-research.prompt.md) |
| Appearance discovery | [person-appearance-discovery](../prompts/person-appearance-discovery.prompt.md) |
| Image-use review | [appearance-asset-ingestion](../prompts/appearance-asset-ingestion.prompt.md) |
| Image-only observation | [appearance-hair-observation](../prompts/appearance-hair-observation.prompt.md) |
| Catalog match | [hair-observation-catalog-match](../prompts/hair-observation-catalog-match.prompt.md) |
| Optional stub selection | [hairstyle-stub-selection](../prompts/hairstyle-stub-selection.prompt.md) |
| Optional guide research | [hairstyle-guide-research](../prompts/hairstyle-guide-research.prompt.md) |
| Optional imagery | [hairstyle-imagery](../prompts/hairstyle-imagery.prompt.md) |
| Optional style example | [hairstyle-example-creation](../prompts/hairstyle-example-creation.prompt.md) |

## Orchestration

- Profile research and appearance discovery may start in either order. Their findings can overlap: combine evidence, profile facts, appearance leads, and candidate portraits into one working dossier; do not discard useful facts because another task could also have found them.
- Review each candidate's `analysis` and `publication` results independently. Only `analysis: allowed` proceeds to observation; publication `needs-review` does not block it. Only `publication: allowed` permits a persistent public image. A review status blocks only the action on its own axis.
- The observer receives the image alone. After observation, pass the fragment and the relevant catalog to matching. Merge returned fields with existing records, preserving unrelated information.
- Stub selection, guide research, imagery, and examples are optional. Continue only when the request includes them or they are needed to meet it. An example uses an already-generated image.
- Task results are proposed outputs. The orchestrator combines, checks, and applies them using the available content environment; report what could not be applied.

## Next

After matching, return the person/appearance results or continue to a requested catalog or guide follow-up. An absent hairstyle link is a valid result when the evidence or catalog is insufficient.
