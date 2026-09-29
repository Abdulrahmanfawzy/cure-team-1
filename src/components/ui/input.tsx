import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full  placeholder:text-app-neutral placeholder:text-sm min-w-0 font-montserrat  rounded-lg border border-app-neutral bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
