import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/hairstyle-relation-map.css";
import { layoutFocusedMap, type FocusedLayoutNode } from "./focused-map-layout";
import type { RelationLink } from "./relation-graph";
import RelationMapNode from "./relation-map-node";
import { useRelationMapZoom } from "./use-relation-map-zoom";

interface FocusedRelationNode extends FocusedLayoutNode {
  id: string;
  href: string;
  imageSrc?: string;
  transparentBackground?: boolean;
}

interface Props {
  nodes: FocusedRelationNode[];
  links: RelationLink[];
  className?: string;
}

export default function FocusedHairstyleMapCanvas({ nodes, links, className }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { svgRef, worldRef, resetZoom } = useRelationMapZoom(false);
  const [viewport, setViewport] = useState({ width: 320, height: 320 });
  const { positions, width, height } = useMemo(() => layoutFocusedMap(nodes, links), [nodes, links]);

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
          <button className="relation-reset focus-ring" onClick={() => resetZoom()} type="button">
            Reset map
          </button>
        </div>
      </div>
    </div>
  );
}
