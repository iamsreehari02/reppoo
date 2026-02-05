"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { Testimonial } from "@/types/content";

const BOTTOM_VISIBLE_COUNT = 3;

const CARD_ANIM = {
  out: { opacity: 0, y: -16, duration: 0.28, ease: "power2.in" as const },
  in: {
    opacity: 0,
    y: 20,
    to: { opacity: 1, y: 0 },
    duration: 0.35,
    ease: "power2.out" as const,
    delay: 0.04,
  },
};

const AVATAR_PLACEHOLDER_COLOR = "#D4A574";

function AvatarPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ backgroundColor: AVATAR_PLACEHOLDER_COLOR }}
      aria-hidden
    />
  );
}

const DEFAULT_TAGLINE = "Empowered by AI Wellness Journeys";

export function TestimonialsCarousel({
  list,
  tagline,
}: {
  list: Testimonial[];
  tagline?: string;
}) {
  const displayTagline = tagline ?? DEFAULT_TAGLINE;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const testimonial = list[currentIndex];
  const hasMultiple = list.length > 1;

  const runInAnimation = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: CARD_ANIM.in.opacity, y: CARD_ANIM.in.y },
      {
        ...CARD_ANIM.in.to,
        duration: CARD_ANIM.in.duration,
        ease: CARD_ANIM.in.ease,
        delay: CARD_ANIM.in.delay,
        onComplete: () => {
          isTransitioning.current = false;
        },
      },
    );
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentIndex || isTransitioning.current || !hasMultiple)
        return;
      isTransitioning.current = true;
      const el = cardRef.current;
      if (!el) {
        setCurrentIndex(nextIndex);
        isTransitioning.current = false;
        return;
      }
      gsap.to(el, {
        opacity: CARD_ANIM.out.opacity,
        y: CARD_ANIM.out.y,
        duration: CARD_ANIM.out.duration,
        ease: CARD_ANIM.out.ease,
        onComplete: () => {
          setCurrentIndex(nextIndex);
          requestAnimationFrame(() => {
            requestAnimationFrame(runInAnimation);
          });
        },
      });
    },
    [currentIndex, hasMultiple, runInAnimation],
  );

  const goPrev = () =>
    goToIndex((currentIndex - 1 + list.length) % list.length);
  const goNext = () => goToIndex((currentIndex + 1) % list.length);

  // Subtle entrance for the initial card
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
      },
    );
  }, []);

  // Keep refs array length in sync with list
  itemRefs.current = itemRefs.current.slice(0, list.length);

  // Scroll only the bottom strip horizontally so the active card is in view (don't scroll the page)
  useEffect(() => {
    const el = itemRefs.current[currentIndex];
    const strip = stripRef.current;
    if (!el || !strip) return;
    const stripRect = strip.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const scrollTarget =
      strip.scrollLeft +
      (elRect.left - stripRect.left) -
      stripRect.width / 2 +
      elRect.width / 2;
    strip.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  }, [currentIndex]);

  if (!list.length) return null;
  if (!testimonial) return null;

  return (
    <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col gap-6 pb-2 sm:gap-8 sm:pb-3 md:gap-10 md:pb-4">
      {/* Main card row: left arrow + card + right arrow */}
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 md:gap-4">
        {/* Left arrow */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasMultiple}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none sm:h-12 sm:w-12 md:h-14 md:w-14"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
        </button>

        {/* Main testimonial card – animated content on change */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-lg text-center sm:p-6 md:p-8 min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-center">
          <div
            ref={cardRef}
            className="flex flex-col justify-center min-w-0"
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              className="mb-4 wrap-break-word text-center text-base leading-[160%] tracking-[-0.012em] text-neutral-900 sm:mb-6 sm:text-lg md:text-xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <AvatarPlaceholder className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14" />
              <div className="min-w-0 flex-1 text-left md:flex-initial">
                <p
                  className="break-words font-semibold text-neutral-900 text-sm sm:text-base"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {testimonial.author}
                  {testimonial.role ? `, ${testimonial.role}` : ""}
                </p>
                <p
                  className="break-words text-xs text-neutral-500 sm:text-sm"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {displayTagline}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goNext}
          disabled={!hasMultiple}
          aria-label="Next testimonial"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none sm:h-12 sm:w-12 md:h-14 md:w-14"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
        </button>
      </div>

      {/* Bottom: selector cards – scrollable strip so 4th+ slide into view when active */}
      <div className="hidden w-full min-w-0 min-h-[72px] items-stretch gap-2 sm:flex sm:min-h-[80px] sm:gap-3 md:min-h-[88px] md:gap-4">
        {/* Spacer to align with left arrow */}
        <div className="w-10 shrink-0 sm:w-12 md:w-14" aria-hidden />
        {/* Scrollable strip: all cards in a row; when 4+, strip scrolls so active is in view */}
        <div
          ref={stripRef}
          className="flex min-h-[72px] min-w-0 flex-1 items-center gap-1.5 overflow-x-auto overflow-y-hidden sm:min-h-[80px] sm:gap-2 md:min-h-[88px] md:gap-3 scroll-smooth py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {list.map((t, i) => {
            const isSelected = i === currentIndex;
            const isScrollableStrip = list.length > BOTTOM_VISIBLE_COUNT;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onClick={() => goToIndex(i)}
                className={`flex gap-1.5 rounded-xl px-2 py-2 shadow-md transition-all sm:gap-2 sm:px-3 sm:py-2.5 md:gap-3 md:px-4 md:py-3 ${
                  isScrollableStrip
                    ? "shrink-0 min-w-[100px] sm:min-w-[120px] md:min-w-[140px]"
                    : "min-w-0 flex-1"
                } ${
                  isSelected
                    ? "bg-white opacity-100"
                    : "bg-white/50 opacity-50 hover:opacity-70"
                }`}
              >
                <AvatarPlaceholder className="h-8 w-8 shrink-0 rounded-full sm:h-9 sm:w-9 md:h-10 md:w-10" />
                <div className="min-w-0 flex-1 overflow-hidden text-left">
                  <p
                    className="truncate text-xs font-medium text-neutral-900 sm:text-sm md:text-base"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="truncate text-[10px] text-neutral-500 sm:text-xs md:text-sm"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    {t.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {/* Spacer to align with right arrow */}
        <div className="w-10 shrink-0 sm:w-12 md:w-14" aria-hidden />
      </div>
    </div>
  );
}
