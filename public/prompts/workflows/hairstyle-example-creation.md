# HAIRSTYLE_EXAMPLE_CREATION

## PURPOSE

Create one original visual example for one specified hairstyle, then register its image media and example records in the content collection. The image depicts a fictional adult model and illustrates the hairstyle rather than a real person.

## INPUT

- The hairstyle record ID.
- Optional angle, model-presentation, or variation requirements from the orchestrator.
- Access to the content-management MCP and image-generation capability.

## DATA MODEL AND IMAGE BRIEF

Read these contracts before writing records:

- [Hairstyle schema](https://hairhairhair.hair/schemas/hairstyle.schema.json)
- [Media schema](https://hairhairhair.hair/schemas/media.schema.json)
- [Style-example schema](https://hairhairhair.hair/schemas/style-example.schema.json)

Use the **IMAGE GENERATION** section of the [hairstyle imagery prompt](https://hairhairhair.hair/prompts/hairstyle-imagery.prompt.md) as the image-generation brief. Apply only that section to the supplied hairstyle; this workflow's one-example scope, record schemas, and MCP write procedure remain authoritative. Do not repeat or replace the image brief with a second art direction.

The records link together by ID. This fragment shows the relationship; use unique real IDs and fill every required schema field:

```json
{
  "media": {
    "id": "hairstyle-example-image",
    "kind": "image",
    "alt": "A fictional adult with the specified hairstyle",
    "asset": "assets/hairstyles/hairstyle-example-image.png",
    "transparentBackground": true,
    "provenance": { "origin": "ai-generated" }
  },
  "styleExample": {
    "id": "example-hairstyle-id",
    "hairstyleIds": ["hairstyle-id"],
    "imageId": "hairstyle-example-image",
    "title": "Example view",
    "caption": "A concise factual caption.",
    "patternDescription": "Visible pattern description.",
    "lengthDescription": "Visible length description."
  }
}
```

## RULES

- Read the target hairstyle record and enough related context to understand its defining visual features. Do not broaden the task into researching or editing the guide.
- If the target record is a stub or its defining visual target is too unclear to depict faithfully, stop and report what is missing; do not guess or publish an example.
- Follow the linked image brief. Verify the delivered file really has transparency before setting `transparentBackground: true`; do not infer a precise natural hair subtype from the generated model's appearance.
- Register the image as original AI-generated media and provide accurate alt text. Create one style-example record linked to the target hairstyle and new media ID. Keep IDs unique and all cross-references valid.
- Use the content-management MCP’s dry-run, inspect the proposed records and asset, then apply the validated write. Do not commit or push.
- Do not create more than one example in this run. The orchestrator may invoke this workflow again for another example.

## INSTRUCTIONS

1. Fetch the hairstyle record and confirm it is complete enough to guide an image. Identify its defining and optional features.
2. Follow the linked prompt's **IMAGE GENERATION** section using the supplied hairstyle and variation requirements. Inspect the generated asset and confirm its transparency.
3. Create unique media and style-example IDs. Add the image asset and media record, then create one style-example record linked to the target hairstyle and media. Populate factual title, caption, pattern, and length descriptions consistent with the image and guide.
4. Preview the complete change set through the content-management MCP, resolve validation failures, and apply it. Report the created IDs, asset path, transparency verification, and validation result.

## OUTPUT

Return the hairstyle ID, example ID, media ID, asset path, a brief description of the generated image, confirmation of actual transparency inspection, validation result, and whether writes were applied. Do not claim a commit.

## NEXT

Unless instructed otherwise, report completion and end this workflow. The orchestrator decides whether to request another example or take another action.
