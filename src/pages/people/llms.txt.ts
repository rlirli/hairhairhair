import type { APIRoute } from "astro";
import { hairstyles } from "../../data/hairstyles";
import { naturalProfiles } from "../../data/natural-profiles";
import { appearances, people } from "../../data/people";

const siteOrigin = "https://hairhairhair.hair";

export const GET: APIRoute = () => {
  const stylesById = new Map(hairstyles.map((style) => [style.id, style]));
  const profilesByPerson = new Map(naturalProfiles.map((profile) => [profile.personId, profile]));
  const lines = [
    "# People collection — compact reference",
    "",
    `Browse people: ${siteOrigin}/people/`,
    `Hairstyle IDs and summaries: ${siteOrigin}/hairstyles/llms.txt`,
    "",
    "Natural hair type, color, and skin tone are visual editorial estimates unless their provenance says otherwise.",
    "",
  ];

  for (const person of people) {
    const profile = profilesByPerson.get(person.id);
    const personAppearances = appearances
      .filter((appearance) => appearance.personId === person.id)
      .sort((a, b) => a.taken.value.localeCompare(b.taken.value));
    lines.push(
      `## ${person.name}`,
      `- ID: ${person.id}`,
      `- Slug: ${person.slug}`,
      `- Page: ${siteOrigin}/people/${person.slug}/`,
      `- Description: ${person.description}`,
    );
    if (profile) {
      lines.push(
        `- Natural hair type: ${profile.hairTypeId.value ?? "uncertain"}${profile.hairSubtypeId.value ? `; subtype ${profile.hairSubtypeId.value}` : ""} (confidence: ${profile.hairTypeId.provenance.confidence})`,
        `- Natural hair color: ${profile.naturalHairColor.value ?? "uncertain"} (confidence: ${profile.naturalHairColor.provenance.confidence})`,
        `- Natural skin tone: ${profile.naturalSkinTone.value ?? "uncertain"} (confidence: ${profile.naturalSkinTone.provenance.confidence})`,
      );
    }
    if (person.sources.length)
      lines.push(`- Sources: ${person.sources.map((source) => `${source.kind}: ${source.url}`).join("; ")}`);
    if (personAppearances.length) {
      lines.push("- Recorded hairstyle appearances:");
      for (const appearance of personAppearances) {
        const observed = appearance.observations
          .map(
            (item) =>
              `${item.hairstyleId}${stylesById.has(item.hairstyleId) ? ` (${stylesById.get(item.hairstyleId)?.name})` : ""}`,
          )
          .join(", ");
        lines.push(`  - ${appearance.taken.value}: ${appearance.event} — ${observed}`);
      }
    }
    lines.push("");
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
