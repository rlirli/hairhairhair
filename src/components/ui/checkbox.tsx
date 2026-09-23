import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "../../lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[3px] border border-ink/40 bg-ivory text-orange outline-none focus-visible:ring-2 focus-visible:ring-orange/60 data-[state=checked]:border-orange data-[state=indeterminate]:border-orange",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <span aria-hidden="true" className="text-[.7rem] leading-none font-bold">
          {props.checked === "indeterminate" ? "−" : "✓"}
        </span>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
