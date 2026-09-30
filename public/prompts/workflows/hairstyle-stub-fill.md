# HAIRSTYLE_STUB_FILL

## PURPOSE

Find existing hairstyle records whose `guidePublicationStatus` is `stub` and prepare a clear, deduplicated worklist for the orchestrator. This workflow discovers and triages pending records; it does not research or enrich them.

## INPUT

- Read access to the internal hairstyle catalog and its lifecycle fields.
- Optional selection criteria from the orchestrator, such as specific stub IDs, related Appearance IDs, or a maximum number of records.

## DATA MODEL

A stub is a hairstyle record with `guidePublicationStatus: "stub"`; only its stable `id` and that status are required. All guide properties remain optional until research fills them. See the [Hairstyle schema](https://hairhairhair.hair/schemas/hairstyle.schema.json). A stub may be as small as:

```json
{ "id": "hairstyle-short-side-part", "guidePublicationStatus": "stub" }
```

If no selection criteria are supplied, inspect the full catalog.

## RULES

- Include only records explicitly marked `guidePublicationStatus: "stub"`.
- Treat all other stub fields as optional. A stub may already contain useful names, descriptions, kind, related IDs, or other partial data.
- Deduplicate by stable hairstyle ID. Flag likely duplicate stubs for orchestrator review rather than merging them or inventing a canonical choice.
- Do not change records, perform hairstyle research, add sources, assess compatibility, create examples, or change publication status.
- Do not commit changes or load another workflow. Return the proposed next step to the orchestrator.

## INSTRUCTIONS

1. Read the requested catalog scope and identify every stub in that scope.
2. For each stub, summarize only the existing information needed to distinguish and research it: stable ID, available title/name, kind or description if present, related style IDs, and linked Appearance IDs if available.
3. Flag missing context, likely duplicate stubs, or records whose current information may be insufficient to disambiguate the intended hairstyle. Do not fill those gaps yourself.
4. Order the worklist using explicit orchestrator priorities first. Otherwise, put better-identified, non-duplicate stubs before ambiguous ones.
5. Return counts for stubs found, ready for research, and needing clarification or duplicate review. Make no content edits.

## OUTPUT

Return a worklist with each stub's ID, available identifying details, relevant Appearance links when available, readiness, and any ambiguity or duplicate flag. State explicitly that no records were modified.

## NEXT

Unless instructed otherwise, recommend that the orchestrator select a ready stub and start `HAIRSTYLE_GUIDE_RESEARCH` for that record. Repeat for additional selected stubs as appropriate.
