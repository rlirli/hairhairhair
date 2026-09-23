export type Selection = ReadonlySet<string>;

export interface HierarchicalOption {
  id: string;
  children: readonly string[];
}

export function groupState(selected: Selection, children: readonly string[]): boolean | "indeterminate" {
  const count = children.filter((id) => selected.has(id)).length;
  if (count === 0) return false;
  if (count === children.length) return true;
  return "indeterminate";
}

export function toggleGroup(selected: Selection, children: readonly string[]): Set<string> {
  const next = new Set(selected);
  if (groupState(selected, children) !== false) {
    for (const id of children) next.delete(id);
  } else {
    for (const id of children) next.add(id);
  }
  return next;
}

export function toggleOption(selected: Selection, id: string): Set<string> {
  const next = new Set(selected);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function selectedValues(selected: Selection, groups: readonly HierarchicalOption[] = []): Set<string> {
  const values = new Set(selected);
  for (const group of groups) {
    if (groupState(selected, group.children) === true) values.add(group.id);
    else values.delete(group.id);
  }
  return values;
}

export function matchesFilters(
  cardValues: Readonly<Record<string, readonly string[]>>,
  selections: Readonly<Record<string, Selection>>,
  groupsByFilter: Readonly<Record<string, readonly HierarchicalOption[]>> = {},
): boolean {
  return Object.entries(selections).every(([filter, selected]) => {
    if (selected.size === 0) return true;
    const chosen = selectedValues(selected, groupsByFilter[filter]);
    return (cardValues[filter] ?? []).some((value) => chosen.has(value));
  });
}
