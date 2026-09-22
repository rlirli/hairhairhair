import type { APIRoute } from "astro";
import { hairSubtypes, hairTypes } from "../data/hair-types";
import { publishedHairstyles } from "../data/hairstyles";
import { appearances, people, personPhotographs } from "../data/people";
import { hairstylesForPerson } from "../data/people-relations";
export const GET: APIRoute = () => {
  const urls = [
    "",
    "hair-types/",
    "hairstyles/",
    "people/",
    ...hairTypes.map((item) => `hair-types/${item.slug}/`),
    ...hairSubtypes.map((item) => `hair-types/${item.slug}/`),
    ...hairTypes.flatMap((item) => [`hair-types/${item.slug}/hairstyles/`, `hair-types/${item.slug}/people/`]),
    ...hairSubtypes.flatMap((item) => [`hair-types/${item.slug}/hairstyles/`, `hair-types/${item.slug}/people/`]),
    ...publishedHairstyles.map((item) => `hairstyles/${item.slug}/`),
    ...publishedHairstyles.flatMap((item) => [
      `hairstyles/${item.slug}/examples/`,
      `hairstyles/${item.slug}/appearances/`,
    ]),
    ...people.map((item) => `people/${item.slug}/`),
    ...people.map((item) => `people/${item.slug}/appearances/`),
    ...appearances
      .map((appearance) => {
        const person = people.find((item) => item.id === appearance.personId);
        return person ? `people/${person.slug}/appearances/${appearance.id}/` : null;
      })
      .filter((url): url is string => Boolean(url)),
    ...people.map((person) => `people/${person.slug}/hairstyles/`),
    ...people.flatMap((person) =>
      hairstylesForPerson(person.id).map(({ style }) => `people/${person.slug}/hairstyles/${style.slug}/`),
    ),
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
