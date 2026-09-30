import type { APIRoute } from "astro";
import { kindLabels, publishedHairstyles } from "../../data";

export const GET: APIRoute = ({ url }) => {
  const siteOrigin = import.meta.env.PROD ? "https://hairhairhair.hair" : url.origin;
  const lines = [
    "# Hairstyle collection — compact reference",
    "",
    `Full hairstyle guides: ${siteOrigin}/hairstyles/llms-full.txt`,
    `Published hairstyle records: ${siteOrigin}/content/hairstyles.json`,
    `Browse the collection: ${siteOrigin}/hairstyles/`,
    "",
    "Each entry lists its stable ID, slug, page, type, summary, variations, and related hairstyle IDs.",
    "",
  ];

  for (const style of publishedHairstyles) {
    lines.push(
      `## ${style.name}`,
      `- ID: ${style.id}`,
      `- Slug: ${style.slug}`,
      `- Page: ${siteOrigin}/hairstyles/${style.slug}/`,
      `- Kind: ${kindLabels[style.kind]}`,
      `- Summary: ${style.summary}`,
    );
    if (style.variations.length) {
      lines.push(`- Variations: ${style.variations.map((item) => `${item.name} (ID: ${item.id})`).join("; ")}`);
    }
    if (style.relatedStyleIds.length) lines.push(`- Related hairstyle IDs: ${style.relatedStyleIds.join(", ")}`);
    lines.push("");
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
