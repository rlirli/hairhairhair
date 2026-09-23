import * as PopoverPrimitive from "@radix-ui/react-popover";
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
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        avoidCollisions
        collisionPadding={12}
        className={cn(
          "z-50 max-h-[var(--radix-popover-content-available-height)] w-max max-w-[min(16rem,var(--radix-popover-content-available-width))] overflow-y-auto rounded-xl border border-ink/20 bg-ivory p-3 text-ink shadow-lg outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
