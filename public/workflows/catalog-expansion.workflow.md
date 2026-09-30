# Hairstyle catalog expansion

Use this workflow to identify useful gaps in the hairstyle catalog and, when requested, research selected candidates.

## Tasks

| Task                       | Public prompt                                                                                        | Local path                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Scan for catalog gaps      | [hairstyle-catalog-gap-scan](https://hairhairhair.hair/prompts/hairstyle-catalog-gap-scan.prompt.md) | `public/prompts/hairstyle-catalog-gap-scan.prompt.md` |
| Research a hairstyle guide | [hairstyle-guide-research](https://hairhairhair.hair/prompts/hairstyle-guide-research.prompt.md)     | `public/prompts/hairstyle-guide-research.prompt.md`   |

## Orchestration

- Run the gap scan in a fresh isolated subagent against the full local catalog when MCP is available. A web-only scan sees published public references only, so its candidates require local deduplication before creating records.
- The scan returns candidates; it does not research or create them. For each candidate the user selects, run guide research in a separate fresh isolated subagent.
- Keep scan proposals as a working overlay. Locally, reconcile proposed records with full MCP data before applying them. In web ChatGPT, return proposed JSON in chat and do not claim repository writes.
- A recognized useful concept absent from the catalog may be proposed as a stub. Research can enrich it, but publication depends on user scope and adequate evidence. The orchestrator owns persistence and commit timing.

## NEXT

The orchestrator may select candidates for guide research or return the gap report. Do not start research unless instructed otherwise.
