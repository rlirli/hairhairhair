import { describe, expect, it } from "vitest";
import { getFocusedGraph, valueAtDegree } from "../../src/components/hairstyle-map/relation-graph";

const styles = [
  { id: "target", relatedStyleIds: ["first", "missing"] },
  { id: "first", relatedStyleIds: ["target", "second", "first"] },
  { id: "incoming", relatedStyleIds: ["target", "first"] },
  { id: "second", relatedStyleIds: ["incoming", "third"] },
  { id: "third", relatedStyleIds: ["second"] },
  { id: "isolated", relatedStyleIds: [] },
];

describe("focused hairstyle graph", () => {
  it("leaves only the target at depth zero", () => {
    const graph = getFocusedGraph(styles, "target", 0);
    expect(graph.nodes).toEqual([{ style: styles[0], degree: 0, parent: null }]);
    expect(graph.links).toEqual([]);
  });

  it("includes incoming links and keeps connections among visible styles without duplicates", () => {
    const graph = getFocusedGraph(styles, "target", 2);
    expect(graph.nodes.map(({ style, degree }) => [style.id, degree])).toEqual([
      ["target", 0],
      ["first", 1],
      ["incoming", 1],
      ["second", 2],
    ]);
    expect(graph.links.map((edge) => edge.map((index) => graph.nodes[index].style.id).sort())).toEqual([
      ["first", "target"],
      ["first", "second"],
      ["incoming", "target"],
      ["first", "incoming"],
      ["incoming", "second"],
    ]);
  });

  it("reuses the last configured value at deeper degrees and uses defaults for empty arrays", () => {
    expect(valueAtDegree([1, 0.8, 0.2], 4, 1)).toBe(0.2);
    expect(valueAtDegree(["label-only"], 3, "image-and-label")).toBe("label-only");
    expect(valueAtDegree([], 1, 0.8)).toBe(0.8);
  });
});
