import assert from "node:assert/strict";
import test from "node:test";

import { groupState, matchesFilters, selectedValues, toggleGroup, toggleOption } from "../src/lib/directory-filters.ts";

const typeOne = ["1a", "1b", "1c"];

test("a major-type toggle selects all children, then clears them", () => {
  const all = toggleGroup(new Set(), typeOne);
  assert.deepEqual([...all], typeOne);
  assert.equal(groupState(all, typeOne), true);
  assert.equal(selectedValues(all, [{ id: "type-1", children: typeOne }]).has("type-1"), true);
  assert.deepEqual([...toggleGroup(all, typeOne)], []);
});

test("clicking an indeterminate major type clears it; the next click selects all children", () => {
  const partial = new Set(["1b"]);
  assert.equal(groupState(partial, typeOne), "indeterminate");
  const cleared = toggleGroup(partial, typeOne);
  assert.deepEqual([...cleared], []);
  assert.deepEqual([...toggleGroup(cleared, typeOne)], typeOne);
});

test("manually selecting every subtype checks the major type", () => {
  const selected = typeOne.reduce((current, id) => toggleOption(current, id), new Set());
  assert.equal(groupState(selected, typeOne), true);
  assert.equal(selectedValues(selected, [{ id: "type-1", children: typeOne }]).has("type-1"), true);
});

test("selecting every subtype also matches a profile with only its major-type value", () => {
  const selected = new Set(typeOne);
  const groups = { hair: [{ id: "type-1", children: typeOne }] };
  assert.equal(matchesFilters({ hair: ["type-1"] }, { hair: selected }, groups), true);
  assert.equal(matchesFilters({ hair: [] }, { hair: selected }, groups), false);
});

test("filter dimensions OR their values, AND across dimensions, and ignore unknown card values", () => {
  const selected = {
    kind: new Set(["cut", "finish"]),
    hair: new Set(["1a", "2c"]),
    color: new Set(["brown"]),
  };
  const groups = { hair: [{ id: "type-1", children: ["1a", "1b", "1c"] }] };

  assert.equal(matchesFilters({ kind: ["finish"], hair: ["2c"], color: ["brown"] }, selected, groups), true);
  assert.equal(matchesFilters({ kind: ["finish"], hair: ["2c"], color: [] }, selected, groups), false);
  assert.equal(
    matchesFilters({ kind: [], hair: [], color: [] }, { kind: new Set(), hair: new Set(), color: new Set() }),
    true,
  );
});
