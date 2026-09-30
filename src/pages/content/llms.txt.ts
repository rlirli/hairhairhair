import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
  const origin = import.meta.env.PROD ? "https://hairhairhair.hair" : url.origin;
  const lines = [
    "# HairHairHair public content references",
    "",
    "These references describe published, publicly rendered content. They exclude unpublished hairstyle stubs and drafts.",
    "",
    `- Published hairstyle records: ${origin}/content/hairstyles.json`,
    `- Public hair type taxonomy: ${origin}/content/hair-types.json`,
    `- Hairstyle guides and summaries: ${origin}/hairstyles/llms.txt`,
    `- Full published hairstyle guides: ${origin}/hairstyles/llms-full.txt`,
    `- People directory: ${origin}/people/llms.txt`,
    ...[
      "hairstyle",
      "compatibility",
      "person",
      "appearance",
      "natural-profile",
      "source",
      "media",
      "style-example",
      "hair-type",
      "classification-system",
    ].map((name) => `- ${name} schema: ${origin}/schemas/${name}.schema.json`),
    `- Prompt and workflow index: ${origin}/prompts/llms.txt`,
    `- Portable task result schema: ${origin}/schemas/content-task-result.schema.json`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
