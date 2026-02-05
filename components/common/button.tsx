"use client";

import * as React from "react";
import { Button as UIButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CommonButtonProps extends Omit<
  React.ComponentProps<typeof UIButton>,
  "children"
> {
  /** Optional icon rendered to the left of the label. Use e.g. Lucide icon. */
  iconLeft?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Common button with optional left icon. Aligns label and icon with gap.
 * Default variant is white.
 */
function CommonButton({
  iconLeft,
  children,
  className,
  variant = "white",
  ...props
}: CommonButtonProps) {
  return (
    <UIButton
      variant={variant}
      className={cn(
        "inline-flex items-center justify-center gap-2 cursor-pointer",
        className,
      )}
      {...props}
    >
      {iconLeft ? (
        <span className="inline-flex shrink-0 [&_svg]:size-4 [&_svg]:shrink-0">
          {iconLeft}
        </span>
      ) : null}
      {children}
    </UIButton>
  );
}

export { CommonButton, buttonVariants };
