import * as React from "react";
import { cn } from "@/lib/utils";

/** Section headings: Manrope 600, 48px, line-height 120%, letter-spacing -2%, center */
export function TextH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-center font-semibold leading-[120%] tracking-[-0.02em] text-neutral-900",
        "text-3xl md:text-4xl lg:text-[48px]",
        className,
      )}
      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      {...props}
    />
  );
}
