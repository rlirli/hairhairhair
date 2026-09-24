# Directory filters

The `/people/` and `/hairstyles/` directories share the React island in `src/components/shared/DirectoryFilters.tsx`. Radix Popover handles viewport collision, focus, outside dismissal, and Escape; the local shadcn-style wrappers keep its appearance consistent with the site.

Selection and matching rules live in `src/lib/directory-filters.ts` so their behavior can be tested without a browser. Values within one filter are OR-matched; active filters are AND-matched. A major hair type is checked when all of its displayed subtypes are selected, indeterminate when only some are selected, and unchecked when none are selected. Activating a checked or indeterminate major type clears its subtypes; activating an unchecked one selects every subtype.

Both directories render their cards as list items. Each page owns the `data-directory-item` marker and its `data-filter-*` values on the `<li>`, so filtering hides or shows the complete list entry without coupling filter metadata to reusable card components. The shared island updates the `data-directory-results` status and shows the `data-directory-empty` message when no items match; the message sits outside the `<ul>` so its children remain list items only.

The filter island changes item visibility in place. It does not sort or replace the server-rendered items, and items with missing profile values simply fail an active filter on that dimension.
