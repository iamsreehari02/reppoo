"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { Sponsor } from "@/lib/api/sponsors";

interface SponsorsCarouselProps {
  sponsors: Sponsor[] | null;
}

export function SponsorsCarousel({ sponsors }: SponsorsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !sponsors?.length) return;

    const firstSet = track.firstElementChild as HTMLElement | null;
    if (!firstSet) return;

    let tween: gsap.core.Tween | null = null;

    const run = () => {
      const setWidth = firstSet.offsetWidth;
      gsap.set(track, { x: 0 });
      tween = gsap.to(track, {
        x: -setWidth,
        duration: 25,
        ease: "none",
        onComplete: () => {
          gsap.set(track, { x: 0 });
          run();
        },
      });
    };

    run();

    return () => {
      tween?.kill();
    };
  }, [sponsors]);

  if (!sponsors?.length) {
    return null;
  }

  return (
    <section className="bg-white py-8 md:py-10" aria-label="Our sponsors">
      <div className="overflow-hidden px-8 md:px-10">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-12 md:gap-16"
        >
          {[1, 2].map((set) => (
            <div
              key={set}
              className="flex shrink-0 items-center justify-center gap-12 md:gap-16"
            >
              {sponsors.map((sponsor) => (
                <div
                  key={`${set}-${sponsor._id}`}
                  className="flex h-8 w-24 shrink-0 items-center justify-center grayscale opacity-70 transition-opacity hover:opacity-100 md:h-10 md:w-28"
                  title={sponsor.name}
                >
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    width={112}
                    height={40}
                    className="h-full w-auto max-w-full object-contain"
                    sizes="112px"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
