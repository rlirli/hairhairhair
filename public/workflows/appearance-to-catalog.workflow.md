# Appearance observation and catalog match

Use this workflow to describe hair in an existing Appearance and, when supported, connect it to a hairstyle record.

## Tasks

| Task                         | Public prompt                                                                                                | Local path                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Observe visible hair         | [appearance-hair-observation](https://hairhairhair.hair/prompts/appearance-hair-observation.prompt.md)       | `public/prompts/appearance-hair-observation.prompt.md`    |
| Match observation to catalog | [hair-observation-catalog-match](https://hairhairhair.hair/prompts/hair-observation-catalog-match.prompt.md) | `public/prompts/hair-observation-catalog-match.prompt.md` |

## Orchestration

- Run each task in a fresh isolated subagent. The observation task receives only the image and its prompt; withhold Appearance context, source claims, profile facts, catalog data, and prior analysis.
- Preserve the observation/match boundary. The observation task describes visible hair without naming or consulting catalog entries. Only after it returns may the orchestrator provide its observation fragment and catalog references to the separate match task.
- Keep the target Appearance ID and observation index in orchestrator state. Merge the observation fragment into the full Appearance without overwriting its other properties. An absent `hairstyleId` is valid when evidence is insufficient; a recognized concept missing from the catalog can result in a proposed stub.
- In local work, read and write through the content MCP for the active checkout, reconciling against the complete catalog before applying a match or stub. In web ChatGPT, use only published public projections and return proposed JSON in chat; they do not include private drafts or stubs and are not a complete local baseline. Do not claim persistence in web mode.
- The orchestrator chooses whether to persist or commit a merged result before starting dependent follow-up work. Neither task owns that decision.

## NEXT

The orchestrator may continue with stub selection and guide research when the user’s scope includes completing newly proposed stubs; otherwise return the observation and match outcome. Do not start follow-up tasks unless instructed otherwise.
