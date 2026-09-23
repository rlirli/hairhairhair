import type { APIRoute } from "astro";
export const GET: APIRoute = () =>
  new Response("User-agent: *\nAllow: /\nDisallow: /schemas/\nSitemap: https://hairhairhair.hair/sitemap-index.xml\n", {
    headers: { "Content-Type": "text/plain" },
  });
