# People, appearances, and hairstyle records

Person records provide a concise, factual mini bio and a source-attributed image. They are not biography pages or a
complete career archive. Current coverage is limited to documented appearances with usable source photographs; dates
retain their recorded precision and are never inferred from upload dates.

## Data model

`Person` is separate from dated `Appearance` records. A person has typed biography and photograph sources. Each
photograph records its creator, source and original URLs, license, visible attribution, derivative status, rights
evidence, identifier, and the object position used when a face-focused crop is rendered.

An appearance connects one person to one photograph and one or more editorial hairstyle observations. Observations
describe only the visible haircut in that image. They are not evidence for a person's immutable natural hair type,
color, density, porosity, ethnicity, or exact 1A–4C subtype.

Natural profile traits are a separate, explicitly provisional record. Each trait stores its value and provenance,
status, and confidence independently so an AI prefill can later be replaced by a community correction. Missing
thickness and density remain `null` with `not-documented` provenance rather than being guessed.

The static Astro/TypeScript/Tailwind implementation uses pure data modules, relationship helpers, and locally imported
image assets. Licensed photographs show compact attribution wherever they appear, including overview cards.

## Routes and presentation

The person page has breadcrumbs, a concise expandable mini bio, a source-attributed profile image, a natural profile,
a compact newest-first appearances preview, and a compact hairstyles-worn preview in explicit editorial order.

The full appearances archive lives at `/people/{person}/appearances/`. Each appearance record presents the event,
face-focused primary photograph, hairstyle observations, global guide links, person-specific hairstyle links, and source
links. Photograph records live at `/people/{person}/photographs/{photo}/`; they present provenance and every current
appearance backlink, plus the person's hairstyle records and any published global guides that use the photograph.

The person hairstyle overview lives at `/people/{person}/hairstyles/`. Each person-specific hairstyle record at
`/people/{person}/hairstyles/{hairstyle}/` collects all matching appearance records and links to the global guide when
that guide's `guidePublicationStatus` is `published`.

Keep the bio short and factual. It is not a second editorial essay. Keep original photographs unaltered on disk and
use responsive image crops only for presentation; do not imply that a crop changes the underlying source image.

## Hairstyle guides

The global hairstyle model is a complete `Hairstyle` record with an explicit `guidePublicationStatus` of `draft` or
`published`. Draft records are retained when an observation is useful before a full guide is ready, but draft guides
are not linked as public global guide pages. A person-specific hairstyle record can still link to every observed style,
including a draft, because it documents what was recorded for that person.

Do not use a separate stub model or a generic `status` field. When a draft becomes ready, complete its normal guide
fields, set `guidePublicationStatus` to `published`, and keep the real dated appearance backlinks distinct from any
generated guide imagery.

## Verification

Verify relationship IDs, date precision, source provenance, local image targets, object-position metadata, attribution,
canonical routes, sitemap entries, and reciprocal appearance/hairstyle/photo backlinks. Run the repository check,
build, formatting check, and tests after each holistic product increment.
