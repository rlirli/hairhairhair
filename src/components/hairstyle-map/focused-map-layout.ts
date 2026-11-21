import { forceCollide, forceLink, forceRadial, forceSimulation } from "d3-force";
import type { RelationLink } from "./relation-graph";
import { relationMapLabelWidth, type RelationMapNodeDisplay } from "./relation-map-node";

export interface FocusedLayoutNode {
  name: string;
  degree: number;
  parent: number | null;
  radius: number;
  display: RelationMapNodeDisplay;
}

const fullTurn = 2 * Math.PI;

export function layoutFocusedMap(nodes: readonly FocusedLayoutNode[], links: readonly RelationLink[]) {
  const seed = [{ x: 0, y: 0, angle: -Math.PI / 2, orbit: 0 }];
  const rings = new Map<number, number[]>();
  nodes.forEach(({ degree }, index) => {
    if (degree === 0) return;
    const ring = rings.get(degree) ?? [];
    ring.push(index);
    rings.set(degree, ring);
  });

  let orbit = 0;
  let previousRadius = nodes[0]?.radius ?? 0;
  for (const [degree, ring] of rings) {
    const radius = Math.max(...ring.map((i) => nodes[i].radius));
    const clearance = Math.max(
      64,
      radius * 2 + 12,
      ...ring.map((i) => (nodes[i].display === "image-only" ? 0 : relationMapLabelWidth(nodes[i].name))),
    );
    const fullSpacing = fullTurn / ring.length;
    const minimumOrbit = ring.length > 1 ? clearance / (2 * Math.sin(fullSpacing / 2)) : 0;
    orbit = Math.max(orbit + previousRadius + radius + 43, minimumOrbit);
    previousRadius = radius;

    // Keep children near their parent when a ring branches from a single hairstyle.
    const parent = nodes[ring[0]].parent ?? 0;
    const parentAngle = seed[parent].angle;
    const sameParent = ring.every((index) => nodes[index].parent === parent);
    const clustered = degree > 1 && sameParent;
    const spacing = clustered ? 2 * Math.asin(Math.min(1, clearance / (2 * orbit))) : fullSpacing;
    const startAngle = clustered ? parentAngle - (spacing * (ring.length - 1)) / 2 : parentAngle;
    ring.forEach((index, offset) => {
      const angle = startAngle + spacing * offset;
      seed[index] = { x: Math.cos(angle) * orbit, y: Math.sin(angle) * orbit, angle, orbit };
    });
  }

  const positions = nodes.map(({ name, radius, display }, index) => ({
    ...seed[index],
    clearance: Math.max(
      radius + (display === "image-and-label" ? 17 : 5),
      display === "image-only" ? 0 : relationMapLabelWidth(name) / 2 + 4,
    ),
    fx: index === 0 ? 0 : null,
    fy: index === 0 ? 0 : null,
  }));
  type Node = (typeof positions)[number];
  type Link = { source: Node; target: Node };
  forceSimulation(positions)
    .stop()
    .force("radial", forceRadial<Node>((node) => node.orbit).strength(0.6))
    .force("collide", forceCollide<Node>((node) => node.clearance).iterations(4))
    .force(
      "link",
      forceLink<Node, Link>(
        links.map(([source, target]) => ({
          source: positions[source],
          target: positions[target],
        })),
      )
        .distance(({ source, target }) =>
          Math.max(Math.abs(source.orbit - target.orbit), source.clearance + target.clearance + 12),
        )
        .strength(0.12),
    )
    .tick(180);

  const width =
    2 *
    Math.max(
      ...nodes.map((node, i) => {
        const label = node.display === "image-only" ? 0 : relationMapLabelWidth(node.name) / 2;
        return Math.abs(positions[i].x) + Math.max(node.radius, label) + 10;
      }),
    );
  const height =
    2 *
    Math.max(
      ...nodes.map(
        (node, i) => Math.abs(positions[i].y) + node.radius + (node.display === "image-and-label" ? 19 : 0) + 12,
      ),
    );
  return { positions, width, height };
}
