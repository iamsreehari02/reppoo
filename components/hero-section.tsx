"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { TextH1, TextP } from "@/components/typography";
import type { BackendHero } from "@/lib/api/hero";

interface HeroSectionProps {
  hero: BackendHero | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // If no hero data, show loading or return early
  if (!hero) {
    return (
      <section className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading hero data...</p>
        </div>
      </section>
    );
  }

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-headline", {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.from(".hero-subtitle", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
        });
        gsap.from(".hero-ctas", {
          opacity: 0,
          y: 16,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
        gsap.from(".hero-social", {
          opacity: 0,
          y: 12,
          duration: 0.5,
          delay: 0.15,
          ease: "power2.out",
        });
        gsap.from(".hero-center-img", {
          opacity: 0,
          y: 48,
          scale: 0.92,
          duration: 0.75,
          delay: 0.05,
          ease: "power2.out",
        });
        gsap.fromTo(
          ".hero-left-img",
          { opacity: 0, x: -56, rotation: -14 },
          {
            opacity: 1,
            x: 0,
            rotation: -4,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
          },
        );
        gsap.fromTo(
          ".hero-right-img",
          { opacity: 0, x: 56, rotation: 14 },
          {
            opacity: 1,
            x: 0,
            rotation: 4,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
          },
        );
      }, containerRef);
      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [] },
  );

  // ✅ Only use actual data from backend, NO FALLBACKS
  const title = hero.title || "";
  const subtitle = hero.subtitle || "";
  const userCountText = hero.userCount
    ? hero.userCount.toLocaleString("en-US") + " Happy Users"
    : null;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24 md:pb-32"
      style={{
        background:
          "linear-gradient(165deg, #FAFAFA 0%, #F9F9F9 35%, #F8F8F8 70%, #F7F7F7 100%)",
      }}
      aria-label="Hero"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="relative flex min-h-[260px] flex-col items-center justify-center gap-4 md:min-h-[300px] md:flex-row md:items-center md:gap-0">
          <div
            className="hero-left-img order-1 flex justify-center md:order-1 md:mr-[-20px] md:flex-1 md:justify-end md:translate-y-8 lg:mr-[-28px]"
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(112, 217, 255, 0.55)) drop-shadow(0 32px 64px rgba(112, 217, 255, 0.35))",
            }}
          >
            <div className="relative w-[200px] md:w-[220px] lg:w-[260px]">
              <Image
                src={hero.image1Url || "/hero-left.png"}
                alt=""
                width={260}
                height={320}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 768px) 200px, 260px"
              />
            </div>
          </div>

          <div className="hero-center-img order-3 flex justify-center md:order-2 md:flex-1 md:justify-center">
            <div className="relative w-[200px] drop-shadow-2xl md:w-[240px] lg:w-[280px]">
              <Image
                src={hero.image2Url || "/hero-center.png"}
                alt=""
                width={280}
                height={400}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 768px) 200px, 280px"
              />
            </div>
          </div>

          <div
            className="hero-right-img order-2 flex justify-center md:order-3 md:ml-[-20px] md:flex-1 md:justify-start md:translate-y-8 lg:ml-[-28px]"
            style={{
              filter:
                "drop-shadow(0 20px 40px rgba(255, 229, 170, 0.6)) drop-shadow(0 32px 64px rgba(255, 229, 170, 0.4))",
            }}
          >
            <div className="relative w-[200px] md:w-[220px] lg:w-[260px]">
              <Image
                src={hero.image3Url || "/hero-right.png"}
                alt=""
                width={260}
                height={320}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 768px) 200px, 260px"
              />
            </div>
          </div>
        </div>

        {userCountText && (
          <div className="hero-social relative z-30 mt-6 flex flex-wrap items-center justify-center gap-3">
            <Image
              src="/users.png"
              alt=""
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              sizes="120px"
            />
            <span className="text-sm font-medium text-neutral-600">
              {userCountText}
            </span>
          </div>
        )}

        <div className="relative ">
          <div
            className="pointer-events-none absolute bottom-full left-1/2 z-20 w-full -translate-x-1/2 md:w-[280px] lg:w-[320px]"
            style={{
              height: "180px",
              background:
                "linear-gradient(to top, #F8F8F8 0%, #F8F8F8 18%, #F8F8F8 24%, rgba(248,248,248,0.98) 32%, rgba(248,248,248,0.92) 42%, rgba(248,248,248,0.82) 54%, rgba(248,248,248,0.68) 66%, rgba(248,248,248,0.5) 78%, rgba(248,248,248,0.25) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
            aria-hidden
          />

          <div
            className="relative z-10 px-4 py-8 text-center md:py-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(248,248,248,0) 0%, rgba(248,248,248,0.35) 6%, rgba(248,248,248,0.72) 14%, rgba(248,248,248,0.92) 22%, #F8F8F8 28%, #F8F8F8 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
            }}
          >
            <TextH1 className="hero-headline">{title}</TextH1>
            <TextP className="hero-subtitle mx-auto mt-4 max-w-xl">
              {subtitle}
            </TextP>
            <div className="hero-ctas mt-8">
              <AppDownloadButtons label={"Download Now"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
