import * as React from "react";
import { cn } from "@/lib/utils";

/** Body/paragraph: Manrope 500, 18px, line-height 160%, letter-spacing -1.2%, center */
export function TextP({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-center text-lg leading-[160%] tracking-[-0.012em] text-neutral-600",
        className
      )}
      style={{
        fontFamily: "var(--font-manrope), sans-serif",
        fontWeight: 500,
      }}
      {...props}
    />
  );
}
