"use client";

import { useMemo } from "react";
import { TextH2, TextP } from "@/components/typography";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import type { Testimonial as ApiTestimonial } from "@/lib/api/testimonials";
import type { TestimonialPage } from "@/lib/api/testimonials";
import type { Testimonial as UiTestimonial } from "@/types/content";

const SECTION_BG = "#F4F5F6";

interface TestimonialsSectionProps {
  testimonials: ApiTestimonial[] | null;
  testimonialPage: TestimonialPage | null;
}

export function TestimonialsSection({
  testimonials,
  testimonialPage,
}: TestimonialsSectionProps) {
  const list: UiTestimonial[] = useMemo(() => {
    if (!testimonials?.length) return [];
    return testimonials
      .filter((t) => t.isActive)
      .sort((a, b) => a.order - b.order)
      .map((t) => ({
        id: t._id,
        author: t.name,
        role: t.role,
        quote: t.testimonialText,
      }));
  }, [testimonials]);

  const sectionTitle =
    testimonialPage?.title ?? "Our Users Feel the Transformation";
  const sectionParagraph =
    testimonialPage?.subtitle ??
    "Real Stories from People Empowered by Personalized Wellness";
  const tagline = "Testimonials";

  if (!list.length) return null;

  return (
    <section
      className="overflow-x-hidden px-6 py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl min-w-0">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <TextH2 className="mb-3 max-w-2xl mx-auto text-2xl sm:text-3xl md:text-4xl">
            {sectionTitle}
          </TextH2>
          <TextP className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            {sectionParagraph}
          </TextP>
        </div>

        <TestimonialsCarousel list={list} tagline={tagline} />
      </div>
    </section>
  );
}
