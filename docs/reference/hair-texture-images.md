# Hair texture images

The subtype cards on `/hair-types/1/` through `/hair-types/4/` use twelve generated macro swatches in `src/content/assets/hair-types/`, named `type-1a.png` through `type-4c.png`. They use a common dark-brown hair color, soft lighting, and full-bleed framing so the strand geometry is the focus. Each swatch matches the corresponding subtype description in `src/content/hair-types/`.

| Type | A                            | B                           | C                                                |
| ---- | ---------------------------- | --------------------------- | ------------------------------------------------ |
| 1    | Nearly linear strands        | Gentle body with broad arcs | Occasional visible bends                         |
| 2    | Loose, shallow S-waves       | More defined S-waves        | Strong S-waves that can approach a loose curl    |
| 3    | Wide, open spirals           | Compact, springy spirals    | Tight, rounded corkscrews                        |
| 4    | Small, defined rounded coils | Compact angular bends       | Very tight, less visibly defined coils and bends |

`src/components/hair-types/Pattern.astro` selects these images by pattern and subtype. The cards include subtype-specific alt text drawn from the catalog descriptions. The individual strand illustrations on `/hair-types/` are separate from these macro images.

The home page uses one broad texture reference per type. The Type 3 and Type 4 filenames in this original set contain opposite textures, so the component intentionally crosses those two assignments.

- Type 1 (straight): `src/content/assets/hair-types/type-1-straight.png`
- Type 2 (wavy): `src/content/assets/hair-types/type-2-wavy.png`
- Type 3 (curly): `src/content/assets/hair-types/type-4-coily.png`
- Type 4 (coily): `src/content/assets/hair-types/type-3-curly.png`

The swatches illustrate representative patterns. Hair can show more than one pattern on the same head.
