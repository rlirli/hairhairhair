import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

import { hairSubtypes, hairTypes } from "../../src/data/hair-types.ts";
import { getExamplesForHairstyle, publishedHairstyles } from "../../src/data/hairstyles.ts";
import { hairstylesForPerson } from "../../src/data/people-relations.ts";
import { appearances, people, personPhotographs } from "../../src/data/people.ts";

export const root = new URL("../../", import.meta.url).pathname;
export const dist = join(root, "dist");

export function htmlFiles(directory = dist) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
  });
}

export function routeFile(pathname) {
  const route = pathname.split("#")[0].split("?")[0].replace(/^\//, "").replace(/\/$/, "");
  if (!route) return join(dist, "index.html");
  return extname(route) ? join(dist, route) : join(dist, route, "index.html");
}

export function page(pathname) {
  return readFileSync(routeFile(pathname), "utf8");
}

export function attrs(markup, attribute) {
  return [...markup.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
}

export function localUrl(value) {
  return value.startsWith("/") && !value.startsWith("//");
}

export function publicRoutes() {
  const photographRoutes = people.flatMap((person) =>
    personPhotographs
      .filter((photo) =>
        appearances.some((appearance) => appearance.personId === person.id && appearance.imageId === photo.id),
      )
      .map((photo) => `/people/${person.slug}/photographs/${photo.id}/`),
  );

  return [
    "/",
    "/hair-types/",
    "/hairstyles/",
    "/hairstyle-map/",
    "/people/",
    ...hairTypes.map((type) => `/hair-types/${type.slug}/`),
    ...hairSubtypes.map((type) => `/hair-types/${type.slug}/`),
    ...hairTypes.flatMap((type) => [`/hair-types/${type.slug}/hairstyles/`, `/hair-types/${type.slug}/people/`]),
    ...hairSubtypes.flatMap((type) => [`/hair-types/${type.slug}/hairstyles/`, `/hair-types/${type.slug}/people/`]),
    ...publishedHairstyles.map((style) => `/hairstyles/${style.slug}/`),
    ...publishedHairstyles.flatMap((style) => [
      `/hairstyles/${style.slug}/examples/`,
      `/hairstyles/${style.slug}/appearances/`,
      `/hairstyles/${style.slug}/related-hairstyles/`,
    ]),
    ...publishedHairstyles.flatMap((style) =>
      getExamplesForHairstyle(style.id).map((example) => `/hairstyles/${style.slug}/examples/${example.id}/`),
    ),
    ...people.map((person) => `/people/${person.slug}/`),
    ...people.map((person) => `/people/${person.slug}/appearances/`),
    ...appearances.map((appearance) => {
      const person = people.find((item) => item.id === appearance.personId);
      if (!person) throw new Error(`Unknown person for appearance ${appearance.id}`);
      return `/people/${person.slug}/appearances/${appearance.id}/`;
    }),
    ...people.map((person) => `/people/${person.slug}/hairstyles/`),
    ...people.flatMap((person) =>
      hairstylesForPerson(person.id).map(({ style }) => `/people/${person.slug}/hairstyles/${style.slug}/`),
    ),
    ...photographRoutes,
  ];
}

export function builtHtmlRoutes() {
  return htmlFiles().map((file) => {
    const path = relative(dist, file);
    if (path === "index.html") return "/";
    if (path === "404.html") return "/404.html";
    return `/${path.replace(/\/index\.html$/, "/")}`;
  });
}
