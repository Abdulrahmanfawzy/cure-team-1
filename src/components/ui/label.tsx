import * as React from "react";
import { cn } from "cn";
import { Label as LabelPrimitive } from "radix-ui";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "leading-none font-normal font-montserrat text-sm text-app-secondary  select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
