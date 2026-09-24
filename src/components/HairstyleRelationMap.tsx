import type { PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/hairstyle-relation-map.css";

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

const nodeRadius = 36;

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
  const svgRef = useRef<SVGSVGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const dragRef = useRef<{
    index: number;
    pointerId: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const suppressNodeClickRef = useRef<string | null>(null);
  const panRef = useRef<{ pointerId: number; x: number; y: number; tx: number; ty: number } | null>(null);
  const positionsRef = useRef<PositionedStyle[]>([]);
  const pendingPositionsRef = useRef<PositionedStyle[] | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const viewportRef = useRef({ x: 0, y: 0, scale: 1 });
  const [dimensions, setDimensions] = useState({ width: 860, height: 630 });
  const [positions, setPositions] = useState<PositionedStyle[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [connectedOnly, setConnectedOnly] = useState(false);
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 });

  const idToIndex = useMemo(() => new Map(styles.map((style, index) => [style.id, index])), [styles]);
  const links = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<[number, number]> = [];
    styles.forEach((style, source) => {
      style.relatedStyleIds.forEach((id) => {
        const target = idToIndex.get(id);
        if (target === undefined || target === source) return;
        const key = [style.id, id].sort().join("|");
        if (seen.has(key)) return;
        seen.add(key);
        result.push([source, target]);
      });
    });
    return result;
  }, [idToIndex, styles]);

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
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = svg.getBoundingClientRect();
      const px = ((event.clientX - rect.left) * dimensions.width) / rect.width;
      const py = ((event.clientY - rect.top) * dimensions.height) / rect.height;
      const current = viewportRef.current;
      const scale = Math.max(0.65, Math.min(2, current.scale * (event.deltaY < 0 ? 1.08 : 0.92)));
      viewportRef.current = {
        scale,
        x: px - ((px - current.x) * scale) / current.scale,
        y: py - ((py - current.y) * scale) / current.scale,
      };
      paintViewport(viewportRef.current);
      setViewport(viewportRef.current);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [dimensions.height, dimensions.width]);

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

  const selected = styles.find((style) => style.id === selectedId);
  const related = selected?.relatedStyleIds.map((id) => styles[idToIndex.get(id) ?? -1]).filter(Boolean) ?? [];
  const queryMatch = (style: RelationMapStyle) =>
    !query || style.name.toLowerCase().includes(query.trim().toLowerCase());
  const hasConnection = (style: RelationMapStyle) => style.relatedStyleIds.some((id) => idToIndex.has(id));
  const isShown = (style: RelationMapStyle) => queryMatch(style) && (!connectedOnly || hasConnection(style));

  function point(event: PointerEvent<SVGElement>) {
    const rect = svgRef.current!.getBoundingClientRect();
    const scaleX = dimensions.width / rect.width,
      scaleY = dimensions.height / rect.height;
    return {
      x: ((event.clientX - rect.left) * scaleX - viewport.x) / viewport.scale,
      y: ((event.clientY - rect.top) * scaleY - viewport.y) / viewport.scale,
    };
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      const drag = dragRef.current;
      const { index } = drag;
      if (!drag.moved) {
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 3) return;
        drag.moved = true;
        setSelectedId(positionsRef.current[index]?.id ?? null);
        suppressNodeClickRef.current = positionsRef.current[index]?.id ?? null;
      }
      const position = point(event);
      positionsRef.current = positionsRef.current.map((node, i) =>
        i === index ? { ...node, ...position, vx: 0, vy: 0 } : node,
      );
      pendingPositionsRef.current = positionsRef.current;
      if (dragFrameRef.current === null) {
        dragFrameRef.current = requestAnimationFrame(() => {
          if (pendingPositionsRef.current) paintPositions(pendingPositionsRef.current);
          pendingPositionsRef.current = null;
          dragFrameRef.current = null;
        });
      }
    } else if (panRef.current?.pointerId === event.pointerId) {
      const pan = panRef.current;
      viewportRef.current = {
        ...viewportRef.current,
        x: pan.tx + event.clientX - pan.x,
        y: pan.ty + event.clientY - pan.y,
      };
      paintViewport(viewportRef.current);
    }
  }

  function onPointerUp(event: PointerEvent<SVGSVGElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      const drag = dragRef.current;
      dragRef.current = null;
      if (dragFrameRef.current !== null) cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
      pendingPositionsRef.current = null;
      if (drag.moved) {
        const next = relax(positionsRef.current, links, dimensions.width, dimensions.height, 170);
        positionsRef.current = next;
        setPositions(next);
      }
    }
    if (panRef.current?.pointerId === event.pointerId) {
      panRef.current = null;
      setViewport(viewportRef.current);
    }
  }

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

  function paintViewport(next: { x: number; y: number; scale: number }) {
    worldRef.current?.setAttribute("transform", `translate(${next.x} ${next.y}) scale(${next.scale})`);
  }

  function reset() {
    setSelectedId(null);
    setQuery("");
    setConnectedOnly(false);
    viewportRef.current = { x: 0, y: 0, scale: 1 };
    setViewport(viewportRef.current);
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
        <label className="relation-filter">
          <input checked={connectedOnly} onChange={(event) => setConnectedOnly(event.target.checked)} type="checkbox" />
          <span>Connected styles</span>
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
            onPointerDown={(event) => {
              if ((event.target as Element).closest(".relation-node")) return;
              panRef.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                tx: viewport.x,
                ty: viewport.y,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            ref={svgRef}
            role="group"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            <g ref={worldRef} transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}>
              <defs>
                {styles.map((style) => (
                  <clipPath clipPathUnits="userSpaceOnUse" id={`${style.id}-map-clip`} key={`${style.id}-map-clip`}>
                    <circle cx="0" cy="0" r={nodeRadius} />
                  </clipPath>
                ))}
              </defs>
              <g aria-hidden="true">
                {links.map(([source, target]) => (
                  <line
                    className="relation-edge"
                    key={`${source}-${target}`}
                    x1={positions[source]?.x ?? 0}
                    y1={positions[source]?.y ?? 0}
                    x2={positions[target]?.x ?? 0}
                    y2={positions[target]?.y ?? 0}
                  />
                ))}
              </g>
              {positions.map((style, index) => (
                <g
                  aria-label={style.name}
                  aria-pressed={selectedId === style.id}
                  className={[
                    "relation-node",
                    selectedId === style.id && "is-selected",
                    connectedOnly && !hasConnection(style) && "is-hidden",
                    (!queryMatch(style) ||
                      (selectedId !== null &&
                        selectedId !== style.id &&
                        !styles[idToIndex.get(selectedId)!]?.relatedStyleIds.includes(style.id))) &&
                      "is-dimmed",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={style.id}
                  onClick={() => {
                    if (suppressNodeClickRef.current === style.id) {
                      suppressNodeClickRef.current = null;
                      return;
                    }
                    setSelectedId((current) => (current === style.id ? null : style.id));
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId((current) => (current === style.id ? null : style.id));
                    }
                  }}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    suppressNodeClickRef.current = null;
                    dragRef.current = {
                      index,
                      pointerId: event.pointerId,
                      startX: event.clientX,
                      startY: event.clientY,
                      moved: false,
                    };
                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  role="button"
                  tabIndex={0}
                  transform={`translate(${style.x} ${style.y})`}
                >
                  <circle
                    className={
                      style.transparentBackground ? "relation-image-backdrop is-transparent" : "relation-image-backdrop"
                    }
                    r={nodeRadius}
                  />
                  <image
                    clipPath={`url(#${style.id}-map-clip)`}
                    height={nodeRadius * 2}
                    href={style.imageSrc}
                    preserveAspectRatio="xMidYMid slice"
                    width={nodeRadius * 2}
                    x={-nodeRadius}
                    y={-nodeRadius}
                  />
                  <circle className="relation-node-ring" r={nodeRadius} />
                  <text className="relation-node-label" y={nodeRadius + 19}>
                    {style.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          <div className="relation-map-footer">
            <button className="relation-reset focus-ring" onClick={reset} type="button">
              Reset map
            </button>
            <span aria-hidden="true">|</span>
            <span className="relation-map-hint">Drag a style · scroll to zoom · drag the background to pan</span>
          </div>
          <div className="relation-map-count">
            {styles.filter(isShown).length} of {styles.length} styles <span aria-hidden="true">·</span> {links.length}{" "}
            connections
          </div>
        </div>

        <aside aria-live="polite" className="relation-detail">
          {selected ? (
            <>
              <div className="relation-detail-main">
                <img
                  alt={selected.imageAlt}
                  className={`relation-detail-image${selected.transparentBackground ? "is-transparent" : ""}`}
                  src={selected.imageSrc}
                />
                <div className="relation-detail-copy">
                  <p className="relation-kind">{selected.kindLabel}</p>
                  <h2>{selected.name}</h2>
                  <p className="relation-summary">{selected.summary}</p>
                  <a className="relation-profile-link focus-ring" href={selected.href}>
                    Explore this hairstyle <span aria-hidden="true">↗</span>
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
                        <span aria-hidden="true">↗</span>
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
              <span aria-hidden="true">✳</span>
              <p>Select a hairstyle to see its connections.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
