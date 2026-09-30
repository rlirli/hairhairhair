# PERSON_PROFILE_RESEARCH

## PURPOSE

Research one named person and produce a source-backed profile, including only natural-profile facts that are supported by reliable evidence. This workflow is an independent entry point and performs only person research.

## INPUT

- Person name and, when available, disambiguating details such as occupation or known identity.
- Optional existing person record and explicit research constraints supplied by the orchestrator.

## DATA MODEL

A **Person** record holds identity and biography. Its `sources` list contains source kinds and URLs. A separate **natural profile** records claims about the person's natural hair traits; it is not a description of a particular styled appearance. Each trait has a `value` and `provenance` that records the evidence, status, confidence, and note. Use the schemas as the field contract:

- [Person schema](https://hairhairhair.hair/schemas/person.schema.json)
- [Natural profile schema](https://hairhairhair.hair/schemas/natural-profile.schema.json)

This fragment illustrates an unknown trait. Apply this object shape to each natural-profile trait; set a value only when reliable evidence supports it:

```json
{
  "naturalHairColor": {
    "value": null,
    "provenance": {
      "source": "not-documented",
      "status": "unverified",
      "confidence": "low",
      "note": "The reviewed sources do not establish the person's natural hair color."
    }
  }
}
```

The fragment is illustrative, not a complete record. When asked to prepare content, return a `person` record and a separate `naturalProfile` record. The natural profile has its own ID and links to the person using `personId`; include every required trait field from its schema, using `null` with low-confidence unverified provenance when a trait is unknown.

## RULES

- Verify identity before associating facts with the person. Distinguish people with the same or similar names.
- Use reliable, directly relevant sources. Prefer primary sources for biographical claims where available.
- Record source title, URL, publisher/author when identifiable, access or publication date when available, and the specific facts each source supports.
- Separate documented facts from inference. Do not turn styling, dye, wigs, extensions, or a single photograph into claims about natural traits.
- Mark a natural-profile fact unverified when evidence is absent, conflicting, or insufficient. Do not fill gaps from stereotypes or visual guesswork.
- Do not create or edit appearance, hairstyle, media, or example records in this workflow.
- Return findings for the orchestrator to review and persist; do not commit repository changes.

## INSTRUCTIONS

1. Confirm the subject's identity from reliable sources.
2. Research the person's relevant biography and natural-profile facts supported by explicit evidence. Include only facts useful to the content collection.
3. For each fact, retain its source and a concise explanation of what the source establishes. Preserve uncertainty and disagreement.
4. Compare the findings with any supplied existing person record. Report proposed additions or corrections without silently overwriting existing data.
5. Return a concise result with evidence, unresolved questions, and fields that should remain unverified.

## OUTPUT

Return:

- Confirmed identity and concise biography.
- Proposed profile facts, each with evidence and confidence; explicitly identify unsupported or conflicting facts as unverified.
- Source list with enough attribution and URLs for later verification.
- Any proposed changes to an existing record, stated separately from confirmed facts.
- A clear status: `ready`, `partial`, or `unable_to_confirm_identity`.

Do not claim that findings have been persisted unless the orchestrator confirms that separately.

## NEXT

Unless instructed otherwise, recommend that the orchestrator continue with `PERSON_APPEARANCE_DISCOVERY`, supplying the confirmed identity and any useful disambiguating information. The orchestrator decides whether to load that workflow, stop, or request more research.
