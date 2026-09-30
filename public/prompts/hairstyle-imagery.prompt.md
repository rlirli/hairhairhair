# Hairstyle imagery

**Task.** Generate one original PNG for a supplied existing hairstyle. Do not create a style-example record.

**Input.** Hairstyle ID or supplied target description, optional view/variation.

**Contracts.** Local schemas: `src/content/schemas/` in the active checkout. Public schemas: [media.schema.json](https://hairhairhair.hair/schemas/media.schema.json). The result envelope is [content-task-result.schema.json](https://hairhairhair.hair/schemas/content-task-result.schema.json).

**Environment.** Local: read the supplied hairstyle through the connected `hairhairhair-content` MCP at the active checkout, generate the PNG, then register it with `content_add_image`; use the returned media record and repository-relative asset path. Web: use the supplied target or a published hairstyle from [the content index](https://hairhairhair.hair/content/llms.txt); return the actual PNG attachment and a proposed Media record in chat without claiming storage. Give the proposal a stable repository-relative path under `assets/hairstyles/` matching its attached filename, and label that path as proposed. Follow the shared [hairstyle imagery style](https://hairhairhair.hair/prompts/hairstyle-imagery-style.md) (local file: `public/prompts/hairstyle-imagery-style.md`). Report an exact local path only when the image tool provides one.

**Instructions.** Stop if target is stub or visually unclear. Generate square PNG following shared style. Verify alpha channel and transparent pixels. Use a fictional adult; preserve defining shape. Locally register image/media using `content_add_image` with actual absolute file path and truthful alt/provenance; dry-run before apply. Web mode returns attachment only; do not invent asset path or claim storage. Do not create example.

**Result.** Attach the PNG. Return any actually created raw media record and list only actual delivered file in assets; report transparency, local path if known, and applied state.

## Result envelope

```json
{
  "task": "hairstyle-imagery",
  "status": "complete",
  "records": [
    {
      "collection": "media",
      "record": {
        "id": "short-layered-waves-example-image",
        "kind": "image",
        "alt": "Illustration of a short layered wave haircut on a fictional adult model",
        "asset": "assets/hairstyles/short-layered-waves-example.png",
        "transparentBackground": true,
        "provenance": {
          "origin": "ai-generated",
          "creator": "image-generation model",
          "derivativeStatus": "original",
          "aiGeneration": { "provider": "image-generation model", "promptKey": "hairstyle-imagery" }
        }
      }
    }
  ],
  "assets": [{ "mediaId": "short-layered-waves-example-image", "fileName": "short-layered-waves-example.png" }],
  "findings": { "transparentBackgroundVerified": true, "applied": false }
}
```
