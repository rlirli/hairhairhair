import type { APIRoute } from "astro";
import { getPublishedHairstylesByIds, kindLabels, publishedHairstyles } from "../../data";
import { sources } from "../../data/hairstyles";

const siteOrigin = "https://hairhairhair.hair";

function renderHairstyle(style: (typeof publishedHairstyles)[number]): string {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const lines = [
    `## ${style.name}`,
    "",
    `- ID: \`${style.id}\``,
    `- Slug: \`${style.slug}\``,
    `- Kind: ${kindLabels[style.kind]}`,
    `- Page: ${siteOrigin}/hairstyles/${style.slug}/`,
    "",
    style.summary,
    "",
    "### Overview",
    "",
    ...style.intro.flatMap((paragraph) => [paragraph, ""]),
  ];

  if (style.variations.length > 0) {
    lines.push("### Variations", "");
    for (const variation of style.variations) {
      lines.push(`- **${variation.name}** (ID: \`${variation.id}\`): ${variation.description}`);
    }
    lines.push("");
  }

  lines.push("### Barber consultation", "", style.consultation.intro, "", "Questions to discuss:", "");
  for (const question of style.consultation.questions) lines.push(`- ${question}`);
  lines.push("", `Sample request: ${style.consultation.sampleRequest}`, "");

  if (style.considerations.length > 0) {
    lines.push("### Considerations", "");
    for (const consideration of style.considerations) lines.push(`- ${consideration}`);
    lines.push("");
  }

  const related = getPublishedHairstylesByIds(style.relatedStyleIds);
  if (related.length > 0) {
    lines.push("### Related hairstyles", "");
    for (const relatedStyle of related) {
      lines.push(
        `- [${relatedStyle.name}](${siteOrigin}/hairstyles/${relatedStyle.slug}/) (ID: \`${relatedStyle.id}\`)`,
      );
    }
    lines.push("");
  }

  const styleSources = style.sourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source): source is (typeof sources)[number] => Boolean(source));
  if (styleSources.length > 0) {
    lines.push("### Sources", "");
    for (const source of styleSources) {
      lines.push(`- [${source.title}](${source.url}) — ${source.publisher}; reviewed ${source.reviewedAt}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

export const GET: APIRoute = () => {
  const content = [
    "# Hairstyle collection",
    "",
    "> Full text profiles for published hairstyles in the hairhairhair.hair collection. Entries include IDs, descriptions, consultation guidance, related styles, and sources.",
    "",
    ...publishedHairstyles.map(renderHairstyle),
  ].join("\n\n");

  return new Response(`${content}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
