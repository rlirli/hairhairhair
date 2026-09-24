import { Fragment, type ReactNode } from "react";
import type { MediaProvenance } from "../../data/media-types";
import { cn } from "../../lib/utils";

interface Props {
  provenance: MediaProvenance;
  density: "compact" | "default";
  className?: string;
}

export default function PhotoAttribution({ provenance, density, className }: Props) {
  if (provenance.licenseType !== "licensed") return null;

  const creator = provenance.creator || provenance.attribution;
  const isCompact = density === "compact";
  const textClass = isCompact
    ? "absolute inset-x-0 bottom-0 z-10 bg-black/75 px-2 py-1.5 text-[.68rem] leading-[1.2] text-white"
    : "mt-3 text-sm leading-5";
  const parts: ReactNode[] = [];
  if (creator) parts.push(creator);
  if (provenance.licenseUrl) {
    parts.push(
      <a
        className={cn("focus-ring underline", isCompact && "decoration-white/70 underline-offset-2")}
        href={provenance.licenseUrl}
        target="_blank"
        rel="noreferrer"
      >
        {provenance.licenseName || "License"}
      </a>,
    );
  } else if (provenance.licenseName) {
    parts.push(provenance.licenseName);
  }
  if (provenance.sourceUrl) {
    parts.push(
      <a
        className={cn("focus-ring underline", isCompact && "decoration-white/70 underline-offset-2")}
        href={provenance.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        Source
      </a>,
    );
  }
  if (provenance.derivativeStatus && provenance.derivativeStatus !== "original") {
    parts.push(provenance.derivativeStatus);
  }
  if (isCompact && provenance.identifier) parts.push(provenance.identifier);
  if (parts.length === 0) return null;

  const content = parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 && " · "}
      {part}
    </Fragment>
  ));

  return isCompact ? (
    <div className={cn(textClass, className)} data-photo-attribution role="note" aria-label="Photo attribution">
      {content}
    </div>
  ) : (
    <p className={cn(textClass, className)} data-photo-attribution>
      {content}
    </p>
  );
}
