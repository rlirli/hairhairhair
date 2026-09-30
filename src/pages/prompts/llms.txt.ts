import type { APIRoute } from "astro";

export const prerender = import.meta.env.PROD;

const workflowFiles = [
  "person-profile-research.md",
  "person-appearance-discovery.md",
  "appearance-asset-ingestion.md",
  "appearance-hair-observation.md",
  "hair-observation-catalog-match.md",
  "hairstyle-stub-fill.md",
  "hairstyle-guide-research.md",
  "hairstyle-example-creation.md",
  "hairstyle-catalog-gap-scan.md",
];

export const GET: APIRoute = ({ url }) => {
  const origin = import.meta.env.PROD ? "https://hairhairhair.hair" : url.origin;
  const promptUrl = (path: string) => `${origin}/prompts/${path}`;
  const workflowLines = workflowFiles.map((filename) => `- ${promptUrl(`workflows/${filename}`)}`);
  const lines = [
    "# HairHairHair LLM content workflow files",
    "",
    "These files define independently invokable content workflows. The orchestrator decides whether to follow each workflow's NEXT recommendation.",
    "",
    "## Workflows",
    ...workflowLines,
    "",
    "## Shared imagery resources",
    `- Hairstyle image package prompt: ${promptUrl("hairstyle-imagery.prompt.md")}`,
    `- Hairstyle imagery visual direction: ${promptUrl("hairstyle-imagery-style.md")}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
