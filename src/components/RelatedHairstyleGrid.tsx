import RelatedHairstyleHoverCard, { type RelatedHairstyleHoverCardItem } from "./RelatedHairstyleHoverCard";

interface Props {
  items: RelatedHairstyleHoverCardItem[];
  size: "small" | "medium";
  className: string;
}

export default function RelatedHairstyleGrid({ items, size, className }: Props) {
  return (
    <div className={className}>
      {items.map((item) => (
        <RelatedHairstyleHoverCard key={item.href} {...item} size={size} />
      ))}
    </div>
  );
}
