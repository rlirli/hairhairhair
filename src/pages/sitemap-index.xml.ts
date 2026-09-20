import type { APIRoute } from 'astro';
import { hairTypes, hairFamilies } from '../data/hair-types';
export const GET: APIRoute = () => { const urls = ['', 'hair-types/', ...hairFamilies.map((item) => `hair-types/${item.slug}/`), ...hairTypes.map((item) => `hair-types/${item.slug}/`)]; return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>https://hairhairhair.hair/${url}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } }); };
