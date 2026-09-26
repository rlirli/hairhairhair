# Hair texture images

The home page and subtype cards share one generated close-up image per broad hair type:

- Type 1 (straight): `src/assets/hair-types/type-1-straight.png`
- Type 2 (wavy): `src/assets/hair-types/type-2-wavy.png`
- Type 3 (curly): `src/assets/hair-types/type-4-coily.png` (spiral curls)
- Type 4 (coily): `src/assets/hair-types/type-3-curly.png` (compact coils)

`src/components/hair-types/Pattern.astro` selects the matching image from the pattern field in `src/data/hair-types.ts`. The original Type 3 and Type 4 asset filenames contain opposite textures, so the component intentionally crosses those two source assignments. The subtype cards reuse their parent type's close-up as a broad texture reference; the individual A, B, and C strand illustrations on `/hair-types/` remain separate. These illustrative images do not diagnose or establish an individual's natural hair type.
