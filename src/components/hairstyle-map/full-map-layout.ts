import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";
import type { RelationLink } from "./relation-graph";

export const fullMapLabelLineHeight = 14;

export function fullMapLabelLines(name: string) {
  const lines: string[] = [];
  let line = "";
  for (const word of name.split(" ")) {
    if (line && line.length + word.length + 1 > 18) {
      lines.push(line);
      line = "";
    }
    line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

export interface MapPoint {
  x: number;
  y: number;
}
interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
interface LayoutNode extends SimulationNodeDatum {
  x: number;
  y: number;
  styleIndex: number;
  clearance: number;
}
interface LayoutLink {
  source: LayoutNode;
  target: LayoutNode;
}
interface LayoutGroup {
  nodes: LayoutNode[];
  bounds: Bounds;
}

export function mapBounds(
  points: readonly MapPoint[],
  labels: readonly string[][],
  radius: number,
  indices: readonly number[],
): Bounds {
  const bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
  for (const index of indices) {
    const { x, y } = points[index];
    const lines = labels[index];
    const halfWidth = Math.max(radius, ...lines.map((line) => line.length * 3.6));
    bounds.left = Math.min(bounds.left, x - halfWidth);
    bounds.right = Math.max(bounds.right, x + halfWidth);
    bounds.top = Math.min(bounds.top, y - radius);
    bounds.bottom = Math.max(bounds.bottom, y + radius + lines.length * fullMapLabelLineHeight + 4);
  }
  return bounds;
}

function orientation(a: MapPoint, b: MapPoint, c: MapPoint) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function layoutScore(nodes: readonly LayoutNode[], links: readonly RelationLink[]) {
  let score = 0;
  for (let i = 0; i < links.length; i++) {
    const [a, b] = links[i];
    score += Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) / 180;
    for (let j = 0; j < i; j++) {
      const [c, d] = links[j];
      if (a === c || a === d || b === c || b === d) continue;
      if (
        orientation(nodes[a], nodes[b], nodes[c]) * orientation(nodes[a], nodes[b], nodes[d]) < 0 &&
        orientation(nodes[c], nodes[d], nodes[a]) * orientation(nodes[c], nodes[d], nodes[b]) < 0
      )
        score += 6;
    }
  }
  return score;
}

export function layoutMapGroups(labels: string[][], links: readonly RelationLink[], radius: number): LayoutGroup[] {
  const neighbors = labels.map(() => [] as number[]);
  for (const [source, target] of links) {
    neighbors[source].push(target);
    neighbors[target].push(source);
  }
  const ordered = neighbors.map((_, i) => i).sort((a, b) => neighbors[b].length - neighbors[a].length);
  const seen = new Set<number>();
  const groups: LayoutGroup[] = [];
  for (const start of ordered) {
    if (seen.has(start)) continue;
    const indices = [start];
    seen.add(start);
    for (const index of indices) {
      for (const neighbor of neighbors[index]) {
        if (seen.has(neighbor)) continue;
        seen.add(neighbor);
        indices.push(neighbor);
      }
    }

    let best: LayoutNode[] = [];
    let bestScore = Infinity;
    const orders =
      indices.length > 3
        ? [indices, [...indices].reverse(), [...indices].sort((a, b) => neighbors[b].length - neighbors[a].length)]
        : [indices];
    for (const order of orders) {
      const localIndices = new Map(order.map((styleIndex, index) => [styleIndex, index]));
      const localLinks: RelationLink[] = links.flatMap(([a, b]) => {
        const source = localIndices.get(a);
        const target = localIndices.get(b);
        return source !== undefined && target !== undefined ? [[source, target]] : [];
      });
      const nodes = order.map((styleIndex): LayoutNode => {
        const lines = labels[styleIndex];
        const width = Math.max(radius, ...lines.map((line) => line.length * 3.6));
        return {
          styleIndex,
          x: NaN,
          y: NaN,
          clearance: Math.hypot(width, radius + lines.length * fullMapLabelLineHeight + 4) + 5,
        };
      });
      const simulation = forceSimulation(nodes)
        .stop()
        .force(
          "link",
          forceLink<LayoutNode, LayoutLink>(
            localLinks.map(([source, target]) => ({ source: nodes[source], target: nodes[target] })),
          ).distance(({ source, target }) => source.clearance + target.clearance + 18),
        )
        .force("charge", forceManyBody<LayoutNode>().strength(-360))
        .force("x", forceX<LayoutNode>(0).strength(0.035))
        .force("y", forceY<LayoutNode>(0).strength(0.035))
        .force("collision", forceCollide<LayoutNode>((node) => node.clearance).iterations(4));
      simulation.tick(220);
      const score = layoutScore(nodes, localLinks);
      if (score < bestScore) {
        best = nodes;
        bestScore = score;
      }
    }
    groups.push({
      nodes: best,
      bounds: mapBounds(
        best,
        best.map((node) => labels[node.styleIndex]),
        radius,
        best.map((_, i) => i),
      ),
    });
  }
  return groups.sort((a, b) => b.nodes.length - a.nodes.length);
}

export function fitFullMap(groups: readonly LayoutGroup[], viewport: { width: number; height: number }) {
  const aspect = viewport.width / viewport.height;
  const gap = 34;
  function pack(vertical: boolean) {
    const positions: MapPoint[] = [];
    const shelves: Array<{ groups: LayoutGroup[]; length: number; thickness: number }> = [];
    const lengthOf = ({ bounds }: LayoutGroup) => (vertical ? bounds.right - bounds.left : bounds.bottom - bounds.top);
    const thicknessOf = ({ bounds }: LayoutGroup) =>
      vertical ? bounds.bottom - bounds.top : bounds.right - bounds.left;
    const maxLength = Math.max(0, ...groups.map(lengthOf));

    for (const group of groups) {
      const length = lengthOf(group);
      const thickness = thicknessOf(group);
      let shelf = shelves.at(-1);
      if (!shelf || shelf.length + gap + length > maxLength) {
        shelf = { groups: [], length: 0, thickness: 0 };
        shelves.push(shelf);
      }
      if (shelf.groups.length) shelf.length += gap;
      shelf.groups.push(group);
      shelf.length += length;
      shelf.thickness = Math.max(shelf.thickness, thickness);
    }

    const span = shelves.reduce((sum, shelf) => sum + shelf.thickness + gap, 0);
    const contentWidth = vertical ? maxLength + gap : span;
    const contentHeight = vertical ? span : maxLength + gap;
    const width = Math.max(viewport.width, contentWidth, contentHeight * aspect);
    const height = width / aspect;
    let cursor = ((vertical ? height : width) - span + gap) / 2;
    for (const shelf of shelves) {
      let offset = ((vertical ? width : height) - shelf.length) / 2;
      for (const group of shelf.groups) {
        const { nodes, bounds } = group;
        const mid = cursor + (shelf.thickness - thicknessOf(group)) / 2;
        for (const node of nodes) {
          positions[node.styleIndex] = {
            x: node.x - bounds.left + (vertical ? offset : mid),
            y: node.y - bounds.top + (vertical ? mid : offset),
          };
        }
        offset += lengthOf(group) + gap;
      }
      cursor += shelf.thickness + gap;
    }
    return { positions, width, height };
  }
  const stacked = pack(true);
  const sideBySide = pack(false);
  return stacked.width < sideBySide.width ? stacked : sideBySide;
}
