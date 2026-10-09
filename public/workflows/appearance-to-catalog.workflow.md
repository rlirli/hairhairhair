# Appearance observation and catalog match

Use this route to describe hair in an appearance image and optionally connect the observation to a hairstyle concept.

## Tasks

1. [Appearance hair observation](../prompts/appearance-hair-observation.prompt.md)
2. [Hair observation catalog match](../prompts/hair-observation-catalog-match.prompt.md)

## Orchestration

- The observer receives only the image. Do not include its filename, caption, source, person, event, or catalog context.
- Run matching only after the observation is returned. Give the matcher the observation and a catalog adequate to assess reuse or a distinct gap.
- Merge any proposed observation or match into the existing Appearance without replacing unrelated fields. An unlinked observation is valid when evidence is insufficient.
- Results are proposals; the orchestrator handles record reconciliation and persistence.

## Next

If the request includes completing a new stub, continue to stub selection or guide research. Otherwise return the observation and match result.
