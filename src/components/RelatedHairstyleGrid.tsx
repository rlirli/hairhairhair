import RelatedHairstyleHoverCard, { type RelatedHairstyleHoverCardItem } from "./RelatedHairstyleHoverCard";

interface Props {
  items: RelatedHairstyleHoverCardItem[];
  size: "small" | "medium";
  className: string;
  horizontalScroll?: boolean;
}

export default function RelatedHairstyleGrid({ items, size, className, horizontalScroll = false }: Props) {
  return (
    <div
      className={className}
      role={horizontalScroll ? "region" : undefined}
      aria-label={horizontalScroll ? "Related hairstyle previews" : undefined}
      tabIndex={horizontalScroll ? 0 : undefined}
    >
      {items.map((item) => (
        <RelatedHairstyleHoverCard key={item.href} {...item} size={size} horizontalScroll={horizontalScroll} />
      ))}
    </div>
  );
}
