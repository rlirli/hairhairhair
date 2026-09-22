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
            className={`aspect-square w-full border border-ink/25 object-cover transition group-hover:border-orange ${transparentBackground ? "bg-ivory dark:bg-[#25231f]" : ""} ${size === "small" ? "rounded-xl" : "rounded-2xl"}`}
          />
          <h3
            className={`truncate font-display tracking-[-.03em] group-hover:text-orange ${size === "small" ? "mt-2 text-lg" : "mt-3 text-2xl"}`}
          >
            {name}
          </h3>
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-xs font-black tracking-[.14em] text-orange uppercase">{kindLabel}</p>
        <p className="mt-1 font-display text-xl">{name}</p>
        <p className="mt-2 text-sm leading-5">{summary}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
