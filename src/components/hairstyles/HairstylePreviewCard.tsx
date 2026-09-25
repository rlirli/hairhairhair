import type { MediaProvenance } from "../../types";
import PhotoAttribution from "../shared/PhotoAttribution";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export interface HairstylePreviewCardItem {
  href: string;
  imageSrc: string;
  imageSrcSet: string;
  imageAlt: string;
  imageSizes: string;
  kindLabel: string;
  name: string;
  summary: string;
  compatibleLabels?: string[];
  subtypeLabels?: string[];
  photoAttribution: MediaProvenance;
}

interface Props extends HairstylePreviewCardItem {
  size: "small" | "medium";
}

export default function HairstylePreviewCard({
  href,
  imageSrc,
  imageSrcSet,
  imageAlt,
  imageSizes,
  kindLabel,
  name,
  summary,
  compatibleLabels = [],
  subtypeLabels = [],
  photoAttribution,
  size,
}: Props) {
  return (
    <HoverCard openDelay={180} closeDelay={120}>
      <div className="relative min-w-0">
        <HoverCardTrigger asChild>
          <a href={href} className="focus-ring group block min-w-0">
            <img
              src={imageSrc}
              srcSet={imageSrcSet}
              sizes={imageSizes}
              loading="lazy"
              alt={imageAlt}
              className={`aspect-square w-full border border-ink/25 bg-hairstyle-image-bg object-cover transition group-hover:border-orange ${size === "small" ? "rounded-xl" : "rounded-2xl"}`}
            />
            <h3
              className={`truncate font-display tracking-[-.03em] group-hover:text-orange ${size === "small" ? "mt-1 text-lg" : "mt-2 text-2xl"}`}
            >
              {name}
            </h3>
            {subtypeLabels.length > 0 && (
              <p className="mt-1 truncate text-xs text-ink/60">{subtypeLabels.join(" · ")}</p>
            )}
          </a>
        </HoverCardTrigger>
        <PhotoAttribution provenance={photoAttribution} density="compact" className="bottom-[2.5rem]" />
      </div>
      <HoverCardContent>
        <p className="text-xs font-black tracking-[.14em] text-orange uppercase">{kindLabel}</p>
        <p className="mt-1 font-display text-xl">{name}</p>
        <p className="mt-2 text-sm leading-5">{summary}</p>
        {compatibleLabels.length > 0 && (
          <div className="mt-3 border-t border-ink/20 pt-3">
            <p className="text-[.65rem] font-black tracking-[.12em] text-ink/60 uppercase">Compatible</p>
            <p className="mt-1 text-sm leading-5">{compatibleLabels.join(", ")}</p>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
