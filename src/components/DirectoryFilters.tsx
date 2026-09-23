import * as React from "react";

import {
  groupState,
  matchesFilters,
  toggleGroup,
  toggleOption,
  type HierarchicalOption,
} from "../lib/directory-filters";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options?: FilterOption[];
  parents?: Array<FilterOption & { children: FilterOption[] }>;
}

interface Props {
  groups: FilterGroup[];
  cardSelector: string;
  dataAttributes: Record<string, string>;
  resultsSelector: string;
  emptySelector: string;
  itemLabel: string;
  pluralItemLabel: string;
}

const toHierarchy = (group: FilterGroup): HierarchicalOption[] =>
  (group.parents ?? []).map((parent) => ({ id: parent.id, children: parent.children.map((child) => child.id) }));

export default function DirectoryFilters({
  groups,
  cardSelector,
  dataAttributes,
  resultsSelector,
  emptySelector,
  itemLabel,
  pluralItemLabel,
}: Props) {
  const [selections, setSelections] = React.useState<Record<string, Set<string>>>({});
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  React.useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>(cardSelector)];
    const status = document.querySelector<HTMLElement>(resultsSelector);
    const empty = document.querySelector<HTMLElement>(emptySelector);
    const groupsByFilter = Object.fromEntries(groups.map((group) => [group.key, toHierarchy(group)]));
    let visible = 0;

    for (const card of cards) {
      const values = Object.fromEntries(
        groups.map((group) => {
          const attribute = dataAttributes[group.key];
          return [group.key, (attribute ? (card.dataset[attribute] ?? "") : "").split(",").filter(Boolean)];
        }),
      );
      const matches = matchesFilters(values, selections, groupsByFilter);
      card.classList.toggle("hidden", !matches);
      if (matches) visible += 1;
    }

    if (status) status.textContent = `${visible} ${visible === 1 ? itemLabel : pluralItemLabel} shown`;
    if (empty) empty.classList.toggle("hidden", visible !== 0);
  }, [cardSelector, dataAttributes, emptySelector, groups, itemLabel, resultsSelector, selections]);

  const updateOption = (key: string, id: string) => {
    setSelections((current) => ({ ...current, [key]: toggleOption(current[key] ?? new Set(), id) }));
  };
  const updateGroup = (key: string, children: FilterOption[]) => {
    setSelections((current) => ({
      ...current,
      [key]: toggleGroup(
        current[key] ?? new Set(),
        children.map((child) => child.id),
      ),
    }));
  };

  return (
    <div className="flex justify-end gap-3 text-xs font-normal text-muted sm:gap-5">
      {groups.map((group) => {
        const selected = selections[group.key] ?? new Set<string>();
        const plainOptions = group.options ?? [];
        const nestedOptions = group.parents ?? [];
        const optionLabels = new Map([
          ...plainOptions.map((option) => [option.id, option.label] as const),
          ...nestedOptions.flatMap((parent) => parent.children.map((option) => [option.id, option.label] as const)),
        ]);
        const selectedLabels = [...selected]
          .map((id) => optionLabels.get(id))
          .filter((label): label is string => Boolean(label));
        const triggerLabel = selectedLabels.length === 1 ? selectedLabels[0] : group.label;
        const accessibleSelection = selectedLabels.length > 0 ? selectedLabels.join(", ") : "all options";

        return (
          <Popover
            key={group.key}
            open={openGroup === group.key}
            onOpenChange={(open) => setOpenGroup(open ? group.key : null)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className="focus-ring flex cursor-pointer items-center gap-1 whitespace-nowrap uppercase"
                aria-label={`${group.label} filter, selected: ${accessibleSelection}`}
                aria-expanded={openGroup === group.key}
                onClick={() => setOpenGroup((current) => (current === group.key ? null : group.key))}
              >
                <span>{triggerLabel}</span>
                <span aria-hidden="true" className="relative -top-0.75">
                  ⌄
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              aria-label={`${group.label} options`}
              className="grid gap-2 text-sm font-normal text-ink/70"
            >
              {plainOptions.map((option) => (
                <label key={option.id} className="flex cursor-pointer items-start gap-2">
                  <Checkbox
                    aria-label={option.label}
                    checked={selected.has(option.id)}
                    onCheckedChange={() => updateOption(group.key, option.id)}
                  />
                  <span className="min-w-0">{option.label}</span>
                </label>
              ))}
              {nestedOptions.map((parent) => (
                <React.Fragment key={parent.id}>
                  <label className="flex cursor-pointer items-start gap-2">
                    <Checkbox
                      aria-label={parent.label}
                      checked={groupState(
                        selected,
                        parent.children.map((child) => child.id),
                      )}
                      onCheckedChange={() => updateGroup(group.key, parent.children)}
                    />
                    <span className="min-w-0">{parent.label}</span>
                  </label>
                  <div className="ml-6 grid gap-2 border-l border-ink/15 pl-3">
                    {parent.children.map((option) => (
                      <label key={option.id} className="flex cursor-pointer items-start gap-2">
                        <Checkbox
                          aria-label={option.label}
                          checked={selected.has(option.id)}
                          onCheckedChange={() => updateOption(group.key, option.id)}
                        />
                        <span className="min-w-0">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
