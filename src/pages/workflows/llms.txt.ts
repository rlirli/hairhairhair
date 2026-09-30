import type { APIRoute } from "astro";

const workflowFiles = [
  "appearance-to-catalog.workflow.md",
  "catalog-expansion.workflow.md",
  "hairstyle-publication.workflow.md",
  "person-to-hairstyles.workflow.md",
];

export const GET: APIRoute = ({ url }) => {
  const origin = import.meta.env.PROD ? "https://hairhairhair.hair" : url.origin;
  const lines = [
    "# HairHairHair standalone workflows",
    "",
    ...workflowFiles.map((file) => `- ${origin}/workflows/${file}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
