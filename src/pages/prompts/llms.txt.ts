import type { APIRoute } from "astro";

export const prerender = import.meta.env.PROD;

const workflowFiles = [
  "appearance-to-catalog.workflow.md",
  "catalog-expansion.workflow.md",
  "hairstyle-publication.workflow.md",
  "person-to-hairstyles.workflow.md",
];
const promptFiles = [
  "appearance-asset-ingestion.prompt.md",
  "appearance-hair-observation.prompt.md",
  "hair-observation-catalog-match.prompt.md",
  "hairstyle-catalog-gap-scan.prompt.md",
  "hairstyle-example-creation.prompt.md",
  "hairstyle-guide-research.prompt.md",
  "hairstyle-imagery.prompt.md",
  "hairstyle-stub-selection.prompt.md",
  "person-appearance-discovery.prompt.md",
  "person-profile-research.prompt.md",
];
const styleFiles = ["hairstyle-imagery-style.md"];
const schemaFiles = Object.keys(import.meta.glob("../../content/schemas/*.json"))
  .map((path) => path.split("/").at(-1)!)
  .sort();

export const GET: APIRoute = ({ url }) => {
  const origin = import.meta.env.PROD ? "https://hairhairhair.hair" : url.origin;
  const promptUrl = (path: string) => `${origin}/prompts/${path}`;
  const workflowLines = workflowFiles.map((filename) => `- ${origin}/workflows/${filename}`);
  const lines = [
    "# HairHairHair LLM content prompts and workflows",
    "",
    "Task prompts are independently invokable. Workflow files combine task prompts and guide orchestrator decisions.",
    "",
    `## Workflows (${origin}/workflows/llms.txt)`,
    ...(workflowLines.length ? workflowLines : ["- No workflow files found."]),
    "",
    "## Standalone task prompts",
    ...promptFiles.map((filename) => `- ${promptUrl(filename)}`),
    "",
    "## Shared style references",
    ...styleFiles.map((filename) => `- ${promptUrl(filename)}`),
    "",
    "## Shared schemas",
    ...schemaFiles.map((filename) => `- ${origin}/schemas/${filename}`),
    `- ${origin}/schemas/content-task-result.schema.json`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
