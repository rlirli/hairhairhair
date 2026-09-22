import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export interface RelatedHairstyleHoverCardItem {
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
}

interface Props extends RelatedHairstyleHoverCardItem {
  size: "small" | "medium";
}

export default function RelatedHairstyleHoverCard({
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
  size,
}: Props) {
  return (
    <HoverCard openDelay={180} closeDelay={120}>
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
            className={`truncate font-display tracking-[-.03em] group-hover:text-orange ${size === "small" ? "mt-2 text-lg" : "mt-3 text-2xl"}`}
          >
            {name}
          </h3>
          {subtypeLabels.length > 0 && <p className="mt-1 truncate text-xs text-ink/60">{subtypeLabels.join(" · ")}</p>}
        </a>
      </HoverCardTrigger>
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
