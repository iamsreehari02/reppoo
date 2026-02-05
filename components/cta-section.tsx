"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { TextH2, TextP } from "@/components/typography";

const ARC_CENTER_X = 50;
const ARC_CENTER_Y = 100; // Positioning arc base lower since container is now at top
// 3 big circles - removed smallest, added biggest on top
const RADII = [180, 250, 320];

const VIEWBOX_X = -250;
const VIEWBOX_Y = -220; // Extended more upward to show 90% of circles
const VIEWBOX_W = 600;
const VIEWBOX_H = 260;

function positionOnArc(
  centerX: number,
  centerY: number,
  radius: number,
  angleDeg: number,
) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = centerX + radius * Math.cos(rad);
  const y = centerY - radius * Math.sin(rad);
  return { x, y };
}

function toPercent(x: number, y: number) {
  return {
    left: ((x - VIEWBOX_X) / VIEWBOX_W) * 100,
    top: ((y - VIEWBOX_Y) / VIEWBOX_H) * 100,
  };
}

// Icons positioned on the bigger circles with better placement
const FLOATING_ICONS = [
  {
    src: "/files.svg",
    alt: "",
    radius: 320, // On the biggest (new top) circle
    angle: 145, // Top left
    rotate: -10,
    scale: 1.3,
  },
  {
    src: "/chat.svg",
    alt: "",
    radius: 320, // On the biggest (new top) circle
    angle: 35, // Top right
    rotate: 10,
    scale: 1.3,
  },
  {
    src: "/chats.svg",
    alt: "",
    radius: 250, // On middle circle
    angle: 165, // Left side
    rotate: -8,
    scale: 1.3,
  },
  {
    src: "/like.svg",
    alt: "",
    radius: 250, // On middle circle
    angle: 15, // Right side
    rotate: 8,
    scale: 1.3,
  },
] as const;

export function CtaSection() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const icons = iconRefs.current.filter(Boolean);
    const tweens = icons.map((el, i) => {
      if (!el) return null;
      const rotate = FLOATING_ICONS[i]?.rotate ?? 0;
      return gsap.to(el, {
        y: -10,
        rotation: rotate + 3,
        duration: 2 + i * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.25,
      });
    });

    return () => {
      tweens.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section
      className="relative overflow-x-hidden overflow-y-visible bg-white px-6 py-16 sm:py-24 md:py-36"
      aria-label="Get started"
    >
      {/* Arc container positioned higher in the section */}
      <div
        className="absolute top-0 left-1/2 z-0 w-[95%] max-w-[min(100%,100vmin)] -translate-x-1/2 overflow-visible sm:w-full"
        aria-hidden
      >
        <div
          className="relative w-full"
          style={{ paddingBottom: `${(VIEWBOX_H / VIEWBOX_W) * 100}%` }}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`${VIEWBOX_X} ${VIEWBOX_Y} ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMax meet"
            fill="none"
          >
            {RADII.map((r) => (
              <path
                key={r}
                d={`M ${ARC_CENTER_X + r} ${ARC_CENTER_Y} A ${r} ${r} 0 0 0 ${ARC_CENTER_X - r} ${ARC_CENTER_Y}`}
                stroke="currentColor"
                strokeWidth="0.35"
                strokeLinecap="round"
                className="text-neutral-200 opacity-60"
              />
            ))}
          </svg>
          {/* Icons on arcs – hidden on mobile to keep CTA clean; shown from md up */}
          {FLOATING_ICONS.map((item, i) => {
            const pos = positionOnArc(
              ARC_CENTER_X,
              ARC_CENTER_Y,
              item.radius,
              item.angle,
            );
            const pct = toPercent(pos.x, pos.y);
            return (
              <div
                key={item.src + item.radius + item.angle}
                style={{
                  position: "absolute",
                  left: `${pct.left}%`,
                  top: `${pct.top}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="pointer-events-none hidden items-center justify-center md:flex"
              >
                <div
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                  className="flex items-center justify-center rounded-xl border border-neutral-200/80 bg-white/95 shadow-lg backdrop-blur-sm h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 pointer-events-auto"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={24}
                    height={24}
                    className="size-6 shrink-0"
                    style={{ transform: `scale(${item.scale})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Central content with extra padding to ensure no overlap */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 sm:text-sm"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          Special launch offer
        </p>
        <TextH2 className="mb-3 text-neutral-900 sm:mb-4">
          Your journey to better health starts now
        </TextH2>
        <TextP className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
          Get 50% off your first 3 months when you start your trial today!
        </TextP>
        <AppDownloadButtons label="Download" />
      </div>
    </section>
  );
}
