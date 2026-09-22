# Add a person

This checklist describes the current static-data workflow for a person with at least one source-attributed appearance.

## Mandatory

1. In `src/data/people.ts`, add a `Person` with a unique stable ID and slug, a concise description, source links, and a `heroImageId`.
2. Add each local photograph to `src/assets/people/`. Preserve the original file and record its creator, source and original URLs, license, attribution, rights evidence, derivative status, and crop position in `personPhotographs`.
3. In `src/data/people-media.ts`, add a static import and a filename-to-image entry for every photograph.
4. In `src/data/people.ts`, add each dated `Appearance`. Its `personId` and `imageId` must resolve, and every hairstyle observation must use an existing hairstyle ID. The current tests require every registered person photograph to be used by an appearance.
5. In `src/data/people-relations.ts`, add the person's desired editorial hairstyle order to `personHairstyleOrder` so observed hairstyle previews and detail routes are produced.
6. Update the person-count, ordering, and global appearance-date fixtures in `tests/people.test.mjs`. These manual fixtures are part of the current test suite.
7. Run `npm run format:check`, `npm run check`, `npm run build`, then `npm test`.

## Optional

- Add a `NaturalProfile` in `src/data/natural-profiles.ts`. The person page omits the table when no profile exists; do not infer undocumented traits.
- Add a research note under `docs/research/people/` when source selection or rights decisions need an audit trail.
- Add more appearances and photographs after the first complete record; follow the same provenance requirements for each one.
