import HairstylePreviewCard, { type HairstylePreviewCardItem } from "./HairstylePreviewCard";
import { cn } from "../../lib/utils";

interface Props {
  items: HairstylePreviewCardItem[];
  size: "small" | "medium";
  className: string;
  horizontalScroll?: boolean;
}

export default function HairstyleGrid({ items, size, className, horizontalScroll = false }: Props) {
  return (
    <ul
      className={cn(className)}
      aria-label={horizontalScroll ? "Related hairstyle previews" : undefined}
      tabIndex={horizontalScroll ? 0 : undefined}
    >
      {items.map((item) => (
        <li
          key={item.href}
          className={cn(
            "min-w-0",
            horizontalScroll && "w-[min(72vw,14rem)] shrink-0 lg:w-[calc((100%_-_3.75rem)/6)]",
          )}
        >
          <HairstylePreviewCard {...item} size={size} />
        </li>
      ))}
    </ul>
  );
}
