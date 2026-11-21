import { drag } from "d3-drag";
import { select } from "d3-selection";
import { zoomIdentity } from "d3-zoom";
import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/hairstyle-relation-map.css";
import RelationMapNode, { RELATION_MAP_BASE_SIZE } from "./RelationMapNode";
import {
  fitFullMap,
  fullMapLabelLineHeight,
  fullMapLabelLines,
  layoutMapGroups,
  mapBounds,
  type MapPoint,
} from "./full-map-layout";
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

const nodeRadius = RELATION_MAP_BASE_SIZE / 2;
const maxZoom = 4;

export default function HairstyleRelationMap({ styles }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { svgRef, worldRef, resetZoom, setZoom } = useRelationMapZoom(true, maxZoom);
  const positionsRef = useRef<MapPoint[]>([]);
  const [viewport, setViewport] = useState({ width: 860, height: 630 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const links = useMemo(() => getRelationLinks(styles), [styles]);
  const labels = useMemo(() => styles.map((style) => fullMapLabelLines(style.name)), [styles]);
  const groups = useMemo(() => layoutMapGroups(labels, links, nodeRadius), [labels, links]);
  const layout = useMemo(() => fitFullMap(groups, viewport), [groups, viewport]);
  const [dragged, setDragged] = useState<{ layout: typeof layout; positions: MapPoint[] }>();
  const positions = dragged?.layout === layout ? dragged.positions : layout.positions;
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(([{ contentRect }]) => {
      const { width, height } = contentRect;
      if (!width || !height) return;
      setViewport((previous) =>
        previous.width === width && previous.height === height ? previous : { width, height },
      );
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    resetZoom();
  }, [layout, resetZoom]);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    let start: MapPoint | undefined;
    let moved = false;
    const behavior = drag<SVGGElement, number, MapPoint>()
      .container(() => world)
      .filter((event) => event.type === "mousedown" && !event.button)
      .subject((_event, index) => positionsRef.current[index])
      .clickDistance(3)
      .on("start", (event) => {
        start = { x: event.x, y: event.y };
        moved = false;
      })
      .on("drag", (event, index) => {
        if (!moved && start && Math.hypot(event.x - start.x, event.y - start.y) < 3) return;
        moved = true;
        setDragged((current) => {
          const points = current?.layout === layout ? current.positions : layout.positions;
          return { layout, positions: points.map((point, i) => (i === index ? { x: event.x, y: event.y } : point)) };
        });
      })
      .on("end", (_event, index) => {
        if (moved) setSelectedIndex(index);
      });
    const selection = select(world)
      .selectAll<SVGGElement, number>(".relation-node")
      .data(layout.positions.map((_, index) => index));
    selection.call(behavior);
    return () => {
      selection.on(".drag", null);
    };
  }, [layout, worldRef]);

  function neighborsOf(index: number) {
    return links.flatMap(([a, b]) => (a === index ? [b] : b === index ? [a] : []));
  }

  function selectStyle(index: number | null) {
    setSelectedIndex(index);
    if (index === null) {
      resetZoom();
      return;
    }
    const bounds = mapBounds(positions, labels, nodeRadius, [index, ...neighborsOf(index)]);
    const scale = Math.max(
      1,
      Math.min(
        maxZoom,
        layout.width / (bounds.right - bounds.left + 72),
        layout.height / (bounds.bottom - bounds.top + 72),
      ),
    );
    setZoom(
      zoomIdentity
        .translate(
          layout.width / 2 - ((bounds.left + bounds.right) * scale) / 2,
          layout.height / 2 - ((bounds.top + bounds.bottom) * scale) / 2,
        )
        .scale(scale),
    );
  }

  const selected = selectedIndex === null ? undefined : styles[selectedIndex];
  const related = selectedIndex === null ? [] : neighborsOf(selectedIndex);
  const normalizedQuery = query.trim().toLowerCase();

  function reset() {
    selectStyle(null);
    setQuery("");
    setDragged(undefined);
  }

  return (
    <div className="relation-explorer relation-full-map">
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
        <button className="relation-reset focus-ring" onClick={reset} type="button">
          Reset map
        </button>
      </div>

      <div className="relation-layout">
        <div className="relation-canvas" ref={canvasRef}>
          <svg
            aria-label="Interactive map of hairstyle connections"
            className="relation-svg"
            onClick={(event) => {
              if (selectedIndex !== null && !(event.target as Element).closest(".relation-node")) selectStyle(null);
            }}
            ref={svgRef}
            role="group"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
          >
            <g ref={worldRef}>
              <g aria-hidden="true">
                {links.map(([source, target]) => {
                  const isRelatedToSelection = source === selectedIndex || target === selectedIndex;
                  return (
                    <line
                      className={[
                        "relation-edge",
                        selectedIndex !== null && !isRelatedToSelection && "is-dimmed",
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
              {styles.map((style, index) => (
                <g
                  aria-label={style.name}
                  className={[
                    "relation-node",
                    selectedIndex === index && "is-selected",
                    (!style.name.toLowerCase().includes(normalizedQuery) ||
                      (selectedIndex !== null && selectedIndex !== index && !related.includes(index))) &&
                      "is-dimmed",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={style.id}
                  onClick={() => selectStyle(selectedIndex === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    selectStyle(selectedIndex === index ? null : index);
                  }}
                  role="button"
                  aria-pressed={selectedIndex === index}
                  tabIndex={0}
                  transform={`translate(${positions[index].x} ${positions[index].y})`}
                >
                  <RelationMapNode
                    name={style.name}
                    radius={nodeRadius}
                    imageSrc={style.imageSrc}
                    transparentBackground={style.transparentBackground}
                    labelLines={labels[index]}
                    labelLineHeight={fullMapLabelLineHeight}
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>

        <aside aria-live="polite" className={selected ? "relation-detail" : "relation-detail is-empty"}>
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
                  {related.map((index) => (
                    <li key={styles[index].id}>
                      <button className="relation-related-button" onClick={() => selectStyle(index)} type="button">
                        <img alt="" src={styles[index].imageSrc} />
                        <span>{styles[index].name}</span>
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
