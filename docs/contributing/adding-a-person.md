# Add a person

This checklist describes the current static-data workflow for a person with at least one source-attributed appearance.

## Mandatory

1. In `src/data/people.ts`, add a `Person` with a unique stable ID and slug, a concise description, source links, and a `heroImageId`.
2. Add each local photograph to `src/assets/people/`. Preserve the original file and record its creator, source and original URLs, license, attribution, rights evidence, derivative status, and crop position in `personPhotographs`.
3. In `src/data/people-media.ts`, add a static import and a filename-to-image entry for every photograph.
4. In `src/data/people.ts`, add each dated `Appearance`. Its `personId` and `imageId` must resolve, and every hairstyle observation must use an existing hairstyle ID. The current tests require every registered person photograph to be used by an appearance.
5. In `src/data/people-relations.ts`, add the person's desired editorial hairstyle order to `personHairstyleOrder` so observed hairstyle previews and detail routes are produced.
6. Run `npm run verify`. The integrity tests derive people, photographs, appearances, and routes from the content data and asset directories; do not add parallel bookkeeping fixtures.

The person page shows up to six recent appearance cards and six hairstyle cards in separate horizontal strips. The person appearance and hairstyle archives retain every recorded entry in wrapping grids.

Licensed-photo cards show the recorded creator, one linked license label, a source-record link, the supplied work identifier/title, and a visible change note such as “cropped” when applicable. Public-domain cards omit attribution text; the individual photograph record retains its full provenance. Keep the structured creator, license, source, rights, identifier, and derivative metadata accurate so both compact credits and detail records can be rendered from the same source data.

## Optional

- Add a `NaturalProfile` in `src/data/natural-profiles.ts` only when there is enough evidence for at least one natural trait. Keep `hairTypeId` at the broad numbered type, and set `hairSubtypeId` to `null` unless the exact lettered subtype is supported. A documented subtype must belong to the broad type. Use the shared provenance helpers rather than adding person-specific helper functions. The profile powers the directory filters and hair-type people sections; the person page omits the table when no profile exists and hides null traits. Do not infer undocumented values.
- Add a research note under `docs/research/people/` when source selection or rights decisions need an audit trail.
- Add more appearances and photographs after the first complete record; follow the same provenance requirements for each one.
