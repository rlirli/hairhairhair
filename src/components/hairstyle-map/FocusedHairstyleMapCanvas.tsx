import { useEffect, useRef, useState } from "react";
import "../../styles/hairstyle-relation-map.css";
import type { RelationLink } from "./relation-graph";
import RelationMapNode, { relationMapLabelWidth, type RelationMapNodeDisplay } from "./RelationMapNode";
import { useRelationMapZoom } from "./useRelationMapZoom";

export interface FocusedRelationNode {
  id: string;
  name: string;
  href: string;
  degree: number;
  parent: number | null;
  radius: number;
  display: RelationMapNodeDisplay;
  imageSrc?: string;
  transparentBackground?: boolean;
}

interface Props {
  nodes: FocusedRelationNode[];
  links: RelationLink[];
  className?: string;
}

const fullTurn = 2 * Math.PI;

function positionNodes(nodes: FocusedRelationNode[]) {
  const positions: Array<{ x: number; y: number; angle: number }> = [{ x: 0, y: 0, angle: -Math.PI / 2 }];
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
    const parentAngle = positions[parent].angle;
    const sameParent = ring.every((index) => nodes[index].parent === parent);
    const clustered = degree > 1 && sameParent;
    const spacing = clustered ? 2 * Math.asin(Math.min(1, clearance / (2 * orbit))) : fullSpacing;
    const startAngle = clustered ? parentAngle - (spacing * (ring.length - 1)) / 2 : parentAngle;
    ring.forEach((index, offset) => {
      const angle = startAngle + spacing * offset;
      positions[index] = { x: Math.cos(angle) * orbit, y: Math.sin(angle) * orbit, angle };
    });
  }

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

export default function FocusedHairstyleMapCanvas({ nodes, links, className }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { svgRef, worldRef, resetZoom } = useRelationMapZoom(false);
  const [viewport, setViewport] = useState({ width: 320, height: 320 });
  const { positions, width, height } = positionNodes(nodes);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(([{ contentRect }]) => {
      setViewport({ width: contentRect.width, height: contentRect.height });
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const viewWidth = Math.max(width, viewport.width);
  const viewHeight = Math.max(height, viewport.height);
  return (
    <div className={["relation-explorer", "relation-focused", className].filter(Boolean).join(" ")}>
      <div className="relation-canvas" ref={canvasRef}>
        <svg
          aria-label={`Hairstyle connections for ${nodes[0].name}`}
          className="relation-svg"
          ref={svgRef}
          role="group"
          viewBox={`${-viewWidth / 2} ${-viewHeight / 2} ${viewWidth} ${viewHeight}`}
        >
          <g ref={worldRef}>
            <g aria-hidden="true">
              {links.map(([source, target]) => (
                <line
                  className={`relation-edge ${source === 0 || target === 0 ? "is-related" : "is-dimmed"}`}
                  key={`${source}-${target}`}
                  x1={positions[source].x}
                  y1={positions[source].y}
                  x2={positions[target].x}
                  y2={positions[target].y}
                />
              ))}
            </g>
            {nodes.map((node, index) => (
              <a
                aria-label={node.name}
                className={index === 0 ? "relation-node is-selected" : "relation-node"}
                href={node.href}
                key={node.id}
              >
                <g transform={`translate(${positions[index].x} ${positions[index].y})`}>
                  <RelationMapNode {...node} />
                </g>
              </a>
            ))}
          </g>
        </svg>
        <div className="relation-map-footer">
          <button className="relation-reset focus-ring" onClick={resetZoom} type="button">
            Reset map
          </button>
        </div>
      </div>
    </div>
  );
}
