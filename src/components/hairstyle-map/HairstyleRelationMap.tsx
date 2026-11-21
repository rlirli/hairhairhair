import { drag } from "d3-drag";
import { select } from "d3-selection";
import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/hairstyle-relation-map.css";
import RelationMapNode, { RELATION_MAP_BASE_SIZE } from "./RelationMapNode";
import { getRelationLinks } from "./relation-graph";
import { useRelationMapZoom } from "./useRelationMapZoom";

export interface RelationMapStyle {
  id: string;
  name: string;
  summary: string;
  kindLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  transparentBackground: boolean;
  relatedStyleIds: string[];
}

interface Props {
  styles: RelationMapStyle[];
}

interface PositionedStyle extends RelationMapStyle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface DragSubject extends PositionedStyle {
  index: number;
}

const nodeRadius = RELATION_MAP_BASE_SIZE / 2;

function relax(nodes: PositionedStyle[], links: Array<[number, number]>, width: number, height: number, ticks = 230) {
  const placed = nodes.map((node) => ({ ...node }));
  for (let tick = 0; tick < ticks; tick++) {
    const alpha = 1 - tick / (ticks + 20);
    for (const node of placed) {
      node.vx += (width / 2 - node.x) * 0.0008 * alpha;
      node.vy += (height / 2 - node.y) * 0.0008 * alpha;
    }
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i],
          b = placed[j];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 1;
        const repel = Math.min(1.25, 1700 / (distance * distance)) * alpha;
        const fx = (dx / distance) * repel,
          fy = (dy / distance) * repel;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
        if (distance < 112) {
          const push = (112 - distance) * 0.012 * alpha;
          a.vx -= (dx / distance) * push;
          a.vy -= (dy / distance) * push;
          b.vx += (dx / distance) * push;
          b.vy += (dy / distance) * push;
        }
      }
    }
    for (const [sourceIndex, targetIndex] of links) {
      const source = placed[sourceIndex],
        target = placed[targetIndex];
      const dx = target.x - source.x,
        dy = target.y - source.y;
      const distance = Math.hypot(dx, dy) || 1;
      const force = (distance - 158) * 0.0024 * alpha;
      source.vx += (dx / distance) * force;
      source.vy += (dy / distance) * force;
      target.vx -= (dx / distance) * force;
      target.vy -= (dy / distance) * force;
    }
    for (const node of placed) {
      node.vx *= 0.86;
      node.vy *= 0.86;
      node.x = Math.max(52, Math.min(width - 52, node.x + node.vx));
      node.y = Math.max(62, Math.min(height - 34, node.y + node.vy));
    }
  }
  return placed;
}

export default function HairstyleRelationMap({ styles }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { svgRef, worldRef, resetZoom } = useRelationMapZoom();
  const positionsRef = useRef<PositionedStyle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 860, height: 630 });
  const [positions, setPositions] = useState<PositionedStyle[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const idToIndex = useMemo(() => new Map(styles.map((style, index) => [style.id, index])), [styles]);
  const links = useMemo(() => getRelationLinks(styles), [styles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      setDimensions({ width: Math.max(500, rect.width), height: Math.max(570, rect.height) });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const columns = Math.ceil(Math.sqrt((styles.length * dimensions.width) / dimensions.height));
    const rows = Math.ceil(styles.length / columns);
    const gapX = dimensions.width / (columns + 1),
      gapY = dimensions.height / (rows + 1);
    const start = styles.map((style, index) => ({
      ...style,
      x: gapX * ((index % columns) + 1),
      y: gapY * (Math.floor(index / columns) + 1),
      vx: 0,
      vy: 0,
    }));
    const next = relax(start, links, dimensions.width, dimensions.height);
    positionsRef.current = next;
    setPositions(next);
  }, [dimensions, links, styles]);

  useEffect(() => {
    const world = worldRef.current;
    if (!world || !positions.length) return;

    let startPoint: { x: number; y: number } | null = null;
    let moved = false;
    const behavior = drag<SVGGElement, number, DragSubject>()
      .container(() => world)
      .filter((event) => event.type === "mousedown" && !event.button)
      .subject((_event, index) => {
        return { ...positionsRef.current[index]!, index };
      })
      .clickDistance(3)
      .on("start", (event) => {
        startPoint = { x: event.x, y: event.y };
        moved = false;
      })
      .on("drag", (event) => {
        if (!startPoint) return;
        if (!moved && Math.hypot(event.x - startPoint.x, event.y - startPoint.y) < 3) return;
        moved = true;
        const next = positionsRef.current.map((node, index) =>
          index === event.subject.index ? { ...node, x: event.x, y: event.y, vx: 0, vy: 0 } : node,
        );
        positionsRef.current = next;
        paintPositions(next);
      })
      .on("end", (event) => {
        startPoint = null;
        if (!moved) return;
        setSelectedId(event.subject.id);
        const next = relax(positionsRef.current, links, dimensions.width, dimensions.height, 170);
        positionsRef.current = next;
        setPositions(next);
      });

    const selection = select(world)
      .selectAll<SVGGElement, number>(".relation-node")
      .data(positions.map((_, i) => i));
    selection.call(behavior);
    return () => {
      selection.on(".drag", null);
    };
  }, [dimensions, links, positions, worldRef]);

  const selected = styles.find((style) => style.id === selectedId);
  const related = selected?.relatedStyleIds.map((id) => styles[idToIndex.get(id) ?? -1]).filter(Boolean) ?? [];
  const queryMatch = (style: RelationMapStyle) =>
    !query || style.name.toLowerCase().includes(query.trim().toLowerCase());
  function paintPositions(next: PositionedStyle[]) {
    const nodeElements = svgRef.current?.querySelectorAll<SVGGElement>(".relation-node");
    const edgeElements = svgRef.current?.querySelectorAll<SVGLineElement>(".relation-edge");
    next.forEach((node, index) => nodeElements?.[index]?.setAttribute("transform", `translate(${node.x} ${node.y})`));
    links.forEach(([source, target], index) => {
      const edge = edgeElements?.[index];
      if (!edge) return;
      edge.setAttribute("x1", String(next[source].x));
      edge.setAttribute("y1", String(next[source].y));
      edge.setAttribute("x2", String(next[target].x));
      edge.setAttribute("y2", String(next[target].y));
    });
  }

  function reset() {
    setSelectedId(null);
    setQuery("");
    resetZoom();
    const columns = Math.ceil(Math.sqrt((styles.length * dimensions.width) / dimensions.height));
    const rows = Math.ceil(styles.length / columns);
    const gapX = dimensions.width / (columns + 1),
      gapY = dimensions.height / (rows + 1);
    const next = relax(
      styles.map((style, index) => ({
        ...style,
        x: gapX * ((index % columns) + 1),
        y: gapY * (Math.floor(index / columns) + 1),
        vx: 0,
        vy: 0,
      })),
      links,
      dimensions.width,
      dimensions.height,
    );
    positionsRef.current = next;
    setPositions(next);
  }

  return (
    <div className="relation-explorer">
      <div className="relation-toolbar">
        <label className="relation-search">
          <span className="sr-only">Find a hairstyle</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a hairstyle"
            type="search"
          />
        </label>
      </div>

      <div className="relation-layout">
        <div className="relation-canvas" ref={canvasRef}>
          <svg
            aria-label="Interactive map of hairstyle connections"
            className="relation-svg"
            onClick={(event) => {
              if (!(event.target as Element).closest(".relation-node")) setSelectedId(null);
            }}
            ref={svgRef}
            role="group"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            <g ref={worldRef}>
              <g aria-hidden="true">
                {links.map(([source, target]) => {
                  const isRelatedToSelection =
                    selectedId !== null && (styles[source]?.id === selectedId || styles[target]?.id === selectedId);
                  return (
                    <line
                      className={[
                        "relation-edge",
                        selectedId !== null && !isRelatedToSelection && "is-dimmed",
                        isRelatedToSelection && "is-related",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={`${source}-${target}`}
                      x1={positions[source]?.x ?? 0}
                      y1={positions[source]?.y ?? 0}
                      x2={positions[target]?.x ?? 0}
                      y2={positions[target]?.y ?? 0}
                    />
                  );
                })}
              </g>
              {positions.map((style) => (
                <g
                  aria-label={style.name}
                  className={[
                    "relation-node",
                    selectedId === style.id && "is-selected",
                    (!queryMatch(style) ||
                      (selectedId !== null &&
                        selectedId !== style.id &&
                        !styles[idToIndex.get(selectedId)!]?.relatedStyleIds.includes(style.id))) &&
                      "is-dimmed",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={style.id}
                  onClick={() => setSelectedId((current) => (current === style.id ? null : style.id))}
                  transform={`translate(${style.x} ${style.y})`}
                >
                  <RelationMapNode
                    name={style.name}
                    radius={nodeRadius}
                    imageSrc={style.imageSrc}
                    transparentBackground={style.transparentBackground}
                  />
                </g>
              ))}
            </g>
          </svg>
          <div className="relation-map-footer">
            <button className="relation-reset focus-ring" onClick={reset} type="button">
              Reset map
            </button>
          </div>
        </div>

        <aside aria-live="polite" className="relation-detail">
          {selected ? (
            <>
              <div className="relation-detail-main">
                <img alt={selected.imageAlt} className="relation-detail-image" src={selected.imageSrc} />
                <div className="relation-detail-copy">
                  <p className="relation-kind">{selected.kindLabel}</p>
                  <h2>
                    <a className="relation-title-link focus-ring" href={selected.href}>
                      {selected.name}
                    </a>
                  </h2>
                  <p className="relation-summary">{selected.summary}</p>
                  <a className="relation-profile-link focus-ring" href={selected.href}>
                    Explore this hairstyle <span aria-hidden="true">↗︎</span>
                  </a>
                </div>
              </div>
              <h3 className="relation-related-heading">
                Connected styles <span>{related.length}</span>
              </h3>
              {related.length ? (
                <ul className="relation-related-list">
                  {related.map((style) => (
                    <li key={style.id}>
                      <button className="relation-related-button" onClick={() => setSelectedId(style.id)} type="button">
                        <img alt="" src={style.imageSrc} />
                        <span>{style.name}</span>
                        <span aria-hidden="true">↗︎</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="relation-summary">No connected styles are listed yet.</p>
              )}
            </>
          ) : (
            <div className="relation-empty">
              <span className="text-xl text-orange" aria-hidden="true">
                ✳︎
              </span>
              <p>Select a hairstyle to see its connections.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
