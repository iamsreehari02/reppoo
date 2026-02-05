import * as React from "react";
import { cn } from "@/lib/utils";

/** Hero main heading: Manrope 600, 64px, line-height 110%, letter-spacing -3%, center */
export function TextH1({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-center font-semibold leading-[110%] tracking-[-0.03em] text-neutral-900",
        "text-[40px] md:text-[56px] lg:text-[64px]",
        className
      )}
      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      {...props}
    />
  );
}
