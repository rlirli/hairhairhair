# Directory filters

The `/people/` and `/hairstyles/` directories share the React island in `src/components/DirectoryFilters.tsx`. Radix Popover handles viewport collision, focus, outside dismissal, and Escape; the local shadcn-style wrappers keep its appearance consistent with the site.

Selection and matching rules live in `src/lib/directory-filters.ts` so their behavior can be tested without a browser. Values within one filter are OR-matched; active filters are AND-matched. A major hair type is checked when all of its displayed subtypes are selected, indeterminate when only some are selected, and unchecked when none are selected. Activating a checked or indeterminate major type clears its subtypes; activating an unchecked one selects every subtype.

The filter island changes card visibility in place. It does not sort or replace the server-rendered cards, and cards with missing profile values simply fail an active filter on that dimension.
