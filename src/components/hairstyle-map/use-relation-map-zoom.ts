import { select } from "d3-selection";
import "d3-transition";
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import { useCallback, useEffect, useRef } from "react";

export function useRelationMapZoom(dragNodes = true, maxScale = 2) {
  const svgRef = useRef<SVGSVGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const behaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const world = worldRef.current;
    if (!svg || !world) return;

    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.65, maxScale])
      .clickDistance(dragNodes ? 0 : 3)
      .filter((event) => {
        if (event.type === "mousedown") {
          return !event.button && (!dragNodes || !(event.target as Element).closest(".relation-node"));
        }
        return !event.ctrlKey || event.type === "wheel";
      })
      .on("zoom", (event) => {
        world.setAttribute("transform", event.transform.toString());
      });

    behaviorRef.current = behavior;
    const selection = select(svg);
    selection.call(behavior);
    selection.on("dblclick.zoom", null);

    return () => {
      selection.interrupt().on(".zoom", null);
      behaviorRef.current = null;
    };
  }, [dragNodes, maxScale]);

  const setZoom = useCallback((transform: ZoomTransform, durationMs = 0) => {
    const svg = svgRef.current;
    const behavior = behaviorRef.current;
    if (!svg || !behavior) return;

    const selection = select(svg).interrupt();
    if (
      Number.isFinite(durationMs) &&
      durationMs > 0 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      selection.transition().duration(durationMs).call(behavior.transform, transform);
    } else {
      selection.call(behavior.transform, transform);
    }
  }, []);
  const resetZoom = useCallback((durationMs = 0) => setZoom(zoomIdentity, durationMs), [setZoom]);

  return { svgRef, worldRef, resetZoom, setZoom };
}
