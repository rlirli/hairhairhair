# Hairstyle guide and examples

Use this workflow to fill a hairstyle stub or prepare a researched guide and visual examples.

## Tasks

| Task                                | Public prompt                                                                                        | Local path                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Select stubs                        | [hairstyle-stub-selection](https://hairhairhair.hair/prompts/hairstyle-stub-selection.prompt.md)     | `public/prompts/hairstyle-stub-selection.prompt.md`   |
| Research a guide                    | [hairstyle-guide-research](https://hairhairhair.hair/prompts/hairstyle-guide-research.prompt.md)     | `public/prompts/hairstyle-guide-research.prompt.md`   |
| Generate imagery and register media | [hairstyle-imagery](https://hairhairhair.hair/prompts/hairstyle-imagery.prompt.md)                   | `public/prompts/hairstyle-imagery.prompt.md`          |
| Create a style example              | [hairstyle-example-creation](https://hairhairhair.hair/prompts/hairstyle-example-creation.prompt.md) | `public/prompts/hairstyle-example-creation.prompt.md` |

## Orchestration

- Start from a named style, or run stub selection when the user asks to work through existing stubs. Selection produces a worklist; research each selected style in its own fresh isolated subagent.
- Reconcile local work against the complete MCP catalog. Public hairstyle references include published guides only, so web ChatGPT cannot see local drafts or stubs. In web mode, return proposed records and assets in chat; do not claim persistence.
- A stub remains a stub while required guide information is incomplete or unsupported. Publication requires user scope and a sufficiently complete, evidenced guide. A complete guide intentionally held back from publication is a draft.
- When examples are in scope, generate one to three images according to the hairstyle’s visual variability. Run the imagery task first; it returns a PNG and media record (register the media through active-checkout MCP in local mode). Then pass that actual image and media record to the example task, which creates the style-example record without generating another image.
- In web mode, return the actual PNG attachment and proposed media/style-example JSON in chat. In local mode, apply scoped writes through the active-checkout MCP. The orchestrator preserves the task outputs as a working overlay and decides when to persist and commit.

## NEXT

The orchestrator may continue from research to imagery and then example creation when examples are authorized, or return the guide result. Do not trigger follow-up tasks unless instructed otherwise.
