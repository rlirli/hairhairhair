import { useId } from "react";

export const RELATION_MAP_BASE_SIZE = 72;
export type RelationMapNodeDisplay = "image-and-label" | "image-only" | "label-only";

interface Props {
  name: string;
  imageSrc?: string;
  transparentBackground?: boolean;
  radius: number;
  display?: RelationMapNodeDisplay;
}

export default function RelationMapNode({
  name,
  imageSrc,
  transparentBackground,
  radius,
  display = "image-and-label",
}: Props) {
  const clipId = `relation-map-clip-${useId()}`;

  if (display === "label-only") {
    const width = relationMapLabelWidth(name);
    return (
      <>
        <rect
          className="relation-label-backdrop relation-node-ring"
          x={-width / 2}
          y={-12}
          width={width}
          height={24}
          rx={6}
        />
        <text className="relation-node-label" y={4}>
          {name}
        </text>
      </>
    );
  }

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <circle r={radius} />
        </clipPath>
      </defs>
      <circle
        className={transparentBackground ? "relation-image-backdrop is-transparent" : "relation-image-backdrop"}
        r={radius}
      />
      {imageSrc && (
        <image
          clipPath={`url(#${clipId})`}
          height={radius * 2}
          href={imageSrc}
          preserveAspectRatio="xMidYMid slice"
          width={radius * 2}
          x={-radius}
          y={-radius}
        />
      )}
      <circle className="relation-node-wash" r={radius} />
      <circle className="relation-node-ring" r={radius} />
      {display === "image-and-label" && (
        <text className="relation-node-label" y={radius + 14}>
          {name}
        </text>
      )}
    </>
  );
}

export function relationMapLabelWidth(name: string) {
  return Math.max(44, name.length * 6.5 + 14);
}
