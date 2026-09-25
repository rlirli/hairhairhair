# Add a person

Use `inbox-people/` to stage a complete person package. The importer previews by default and applies only after every record, photograph, right, and reference passes preflight.

## Package requirements

1. Create `inbox-people/<person-slug>/payload.json` and add each named photograph beside it. The folder name must match `person.slug`.
2. Include one `person`, a required `naturalProfile`, one or more `photographs`, and one or more dated `appearances`. Give the profile values for natural hair type, natural hair color, and natural skin tone. Use image analysis to estimate these values; use `null` only when the photographs do not support a reliable estimate. Record confidence and explain uncertainty for each trait.
3. Use `hairSubtypeId.value: null` when the broad hair type is supported but an exact subtype is not. Other natural traits may be `null` when genuinely uncertain. Do not present visual estimates as self-reported facts.
4. Prefer clear, cost-free photographs with a public-domain or free license. Licensed photos are allowed when reuse and derivatives are permitted. Include creator, license name and URL, exact attribution text, source/original URLs, rights evidence and basis, and derivative status. Do not import images with unclear rights or a non-commercial/no-derivatives restriction.
5. Give each appearance a date or year, event, source URL, and hairstyle observations. Use an existing hairstyle ID when it matches. For a clearly distinct missing style, use a `PROPOSED-<kebab-case-name>` label and describe it in the note; the importer reports and keeps proposals in the archived package without adding them as confirmed IDs. The hero photo must be one of the package photographs, and every package photograph must appear in an appearance.

## Import

- `npm run import:people` previews packages and reports planned files.
- `npm run import:people -- --apply` imports all valid direct child folders and moves them to `inbox-people/archive/`.
- `npm run import:people -- --help` shows options.

The importer checks the package schema, uniqueness, dates, hairstyle references, photo files, image use, profile values, and license attribution before writing. It updates `people.ts`, `natural-profiles.ts`, and `src/assets/people/`; it does not infer or invent source data.
