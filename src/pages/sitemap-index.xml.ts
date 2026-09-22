import type { APIRoute } from "astro";
import { hairSubtypes, hairTypes } from "../data/hair-types";
import { publishedHairstyles } from "../data/hairstyles";
import { appearances, people, personPhotographs } from "../data/people";
export const GET: APIRoute = () => {
  const urls = [
    "",
    "hair-types/",
    "hairstyles/",
    "people/",
    ...hairTypes.map((item) => `hair-types/${item.slug}/`),
    ...hairSubtypes.map((item) => `hair-types/${item.slug}/`),
    ...hairSubtypes.map((item) => `hair-types/${item.slug}/related-hairstyles/`),
    ...publishedHairstyles.map((item) => `hairstyles/${item.slug}/`),
    ...people.map((item) => `people/${item.slug}/`),
    ...people.map((item) => `people/${item.slug}/appearances/`),
    ...people.flatMap((person) =>
      personPhotographs
        .filter((photo) =>
          appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
        )
        .map((photo) => `people/${person.slug}/photographs/${photo.id}/`),
    ),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>https://hairhairhair.hair/${url}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
