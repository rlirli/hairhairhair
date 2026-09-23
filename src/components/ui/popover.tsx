import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";

import { cn } from "../../lib/utils";

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "end",
  side = "bottom",
  sideOffset = 8,
  collisionPadding = 12,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
  align?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["align"];
  side?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["side"];
  sideOffset?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["sideOffset"];
  collisionPadding?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["collisionPadding"];
}) {
  return (
    <PopoverPrimitive.Portal keepMounted>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={({ open }) => cn("z-50", !open && "hidden")}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "grid max-h-[var(--available-height)] w-max max-w-[min(16rem,var(--available-width))] gap-2 overflow-y-auto rounded-xl border border-ink/20 bg-ivory p-3 text-ink shadow-lg outline-none",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
