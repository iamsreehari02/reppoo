"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface SectionRevealProps {
  children: React.ReactNode;
  /** Optional: delay before animation starts (seconds) */
  delay?: number;
  /** Optional: y offset for reveal (default 36) */
  y?: number;
}

export function SectionReveal({
  children,
  delay = 0,
  y = 36,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        gsap.from(el, {
          y,
          opacity: 0,
          duration: 1.1,
          delay,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 35%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }, ref);
      return () => ctx.revert();
    },
    { dependencies: [delay, y] },
  );

  return <div ref={ref}>{children}</div>;
}
