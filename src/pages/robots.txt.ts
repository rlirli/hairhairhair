import type { APIRoute } from "astro";
export const GET: APIRoute = () =>
  new Response(
    "User-agent: *\nAllow: /\nDisallow: /schemas/\nDisallow: /prompts/\nDisallow: /workflows/\nDisallow: /content/\nSitemap: https://hairhairhair.hair/sitemap-index.xml\n",
    {
      headers: { "Content-Type": "text/plain" },
    },
  );
