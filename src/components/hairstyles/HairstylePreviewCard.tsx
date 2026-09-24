import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export interface HairstylePreviewCardItem {
  href: string;
  imageSrc: string;
  imageSrcSet: string;
  imageAlt: string;
  transparentBackground: boolean;
  imageSizes: string;
  kindLabel: string;
  name: string;
  summary: string;
  compatibleLabels?: string[];
  subtypeLabels?: string[];
  photoAttribution?: {
    creator: string;
    sourceUrl: string;
    licenseName: string;
    licenseUrl: string;
  };
}

interface Props extends HairstylePreviewCardItem {
  size: "small" | "medium";
  horizontalScroll?: boolean;
}

export default function HairstylePreviewCard({
  href,
  imageSrc,
  imageSrcSet,
  imageAlt,
  transparentBackground,
  imageSizes,
  kindLabel,
  name,
  summary,
  compatibleLabels = [],
  subtypeLabels = [],
  photoAttribution,
  size,
  horizontalScroll = false,
}: Props) {
  return (
    <HoverCard openDelay={180} closeDelay={120}>
      <div
        className={`relative min-w-0 ${horizontalScroll ? "w-[min(72vw,14rem)] shrink-0 lg:w-[calc((100%_-_3.75rem)/6)]" : ""}`}
      >
        <HoverCardTrigger asChild>
          <a href={href} className="focus-ring group block min-w-0">
            <img
              src={imageSrc}
              srcSet={imageSrcSet}
              sizes={imageSizes}
              loading="lazy"
              alt={imageAlt}
              className={`aspect-square w-full border border-ink/25 object-cover transition group-hover:border-orange ${transparentBackground ? "bg-hairstyle-image-bg" : ""} ${size === "small" ? "rounded-xl" : "rounded-2xl"}`}
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
        {photoAttribution && (
          <div
            className="absolute inset-x-0 bottom-[2.5rem] z-10 bg-black/75 px-2 py-1.5 text-[.68rem] leading-[1.2] text-white"
            role="note"
            aria-label="Photo attribution"
          >
            <span>{photoAttribution.creator}</span> ·{" "}
            <a
              className="focus-ring underline decoration-white/70 underline-offset-2"
              href={photoAttribution.licenseUrl}
              target="_blank"
              rel="noreferrer"
            >
              {photoAttribution.licenseName}
            </a>{" "}
            ·{" "}
            <a
              className="focus-ring underline decoration-white/70 underline-offset-2"
              href={photoAttribution.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              source
            </a>
          </div>
        )}
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
