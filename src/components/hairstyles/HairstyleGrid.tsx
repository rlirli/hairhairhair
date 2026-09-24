import HairstylePreviewCard, { type HairstylePreviewCardItem } from "./HairstylePreviewCard";

interface Props {
  items: HairstylePreviewCardItem[];
  size: "small" | "medium";
  className: string;
  horizontalScroll?: boolean;
}

export default function HairstyleGrid({ items, size, className, horizontalScroll = false }: Props) {
  return (
    <div
      className={className}
      role={horizontalScroll ? "region" : undefined}
      aria-label={horizontalScroll ? "Related hairstyle previews" : undefined}
      tabIndex={horizontalScroll ? 0 : undefined}
    >
      {items.map((item) => (
        <HairstylePreviewCard key={item.href} {...item} size={size} horizontalScroll={horizontalScroll} />
      ))}
    </div>
  );
}
