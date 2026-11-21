import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";
import { useEffect, useRef } from "react";

export function useRelationMapZoom(dragNodes = true) {
  const svgRef = useRef<SVGSVGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const behaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const world = worldRef.current;
    if (!svg || !world) return;

    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.65, 2])
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
      selection.on(".zoom", null);
      behaviorRef.current = null;
    };
  }, [dragNodes]);

  function resetZoom() {
    if (svgRef.current && behaviorRef.current) {
      select(svgRef.current).call(behaviorRef.current.transform, zoomIdentity);
    }
  }

  return { svgRef, worldRef, resetZoom };
}
