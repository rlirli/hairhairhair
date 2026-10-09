# Hairstyle catalog expansion

Use this route to identify missing coverage and research selected concepts.

## Tasks

1. [Hairstyle catalog gap scan](../prompts/hairstyle-catalog-gap-scan.prompt.md)
2. [Hairstyle guide research](../prompts/hairstyle-guide-research.prompt.md)

## Orchestration

- The gap scan returns candidates; it does not require every candidate to be researched. Research concepts that fit the request or are selected from the worklist.
- Check proposed gaps against the most complete available catalog before treating them as unique.
- Keep incomplete concepts as stubs. Research results are proposals; the orchestrator reconciles and applies them.

## Next

Return the gap report or continue to guide research for in-scope candidates.
