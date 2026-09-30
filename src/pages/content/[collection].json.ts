import type { APIRoute, GetStaticPaths } from "astro";
import { publishedHairstyles } from "../../data";
import { hairSubtypes, hairTypes } from "../../data/hair-types";

const collections = ["hairstyles", "hair-types"] as const;
export const getStaticPaths: GetStaticPaths = () => collections.map((collection) => ({ params: { collection } }));

export const GET: APIRoute = ({ params }) => {
  const collection = params.collection;
  if (!collections.includes(collection as (typeof collections)[number]))
    return new Response("Not found", { status: 404 });
  if (collection === "hairstyles") {
    const published = publishedHairstyles;
    const publicIds = new Set(published.map((style) => style.id));
    const records = published.map((style) => ({
      id: style.id,
      slug: style.slug,
      name: style.name,
      kind: style.kind,
      summary: style.summary,
      intro: style.intro,
      variations: style.variations,
      consultation: style.consultation,
      considerations: style.considerations,
      sourceIds: style.sourceIds,
      relatedStyleIds: style.relatedStyleIds.filter((id) => publicIds.has(id)),
      guidePublicationStatus: "published" as const,
    }));
    return jsonResponse(collection, records);
  }
  return jsonResponse("hair-types", [...hairTypes, ...hairSubtypes]);
};

function jsonResponse(collection: string, records: unknown[]) {
  return new Response(`${JSON.stringify({ collection, records }, null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
