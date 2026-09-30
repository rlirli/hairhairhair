import type { APIRoute, GetStaticPaths } from "astro";

type JsonSchema = Record<string, unknown>;

const schemas = import.meta.glob<JsonSchema>("../../content/schemas/*.json", {
  eager: true,
  import: "default",
});

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(schemas).map(([filePath, schema]) => ({
    params: { schema: filePath.split("/").at(-1)!.replace(/\.json$/, "") },
    props: { schema },
  }));

export const GET: APIRoute = ({ props }) =>
  new Response(`${JSON.stringify(props.schema, null, 2)}\n`, {
    headers: { "Content-Type": "application/schema+json; charset=utf-8" },
  });
