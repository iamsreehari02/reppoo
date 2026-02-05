"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { TextH2, TextP } from "@/components/typography";
import type { FaqSection as FaqSectionType } from "@/lib/api/FAQ";

interface FaqSectionProps {
  faqSection: FaqSectionType;
}

export function FaqSection({ faqSection }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { sectionTitle, sectionParagraph, items } = faqSection;

  return (
    <section className="bg-white px-6 py-16 md:py-20" aria-label="FAQ">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center md:mb-12 max-w-xl mx-auto">
          <TextH2 className="mb-3 ">{sectionTitle}</TextH2>
          <TextP className="text-muted-foreground mx-auto max-w-md">
            {sectionParagraph}
          </TextP>
        </div>

        <div className="border-t border-neutral-200">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.id} className="border-b border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-90"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span
                      className={`flex-1 text-lg font-medium leading-[160%] tracking-[-0.012em] transition-colors duration-200 md:text-xl ${
                        isOpen ? "text-primary" : "text-neutral-900"
                      }`}
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      {item.question}
                    </span>
                    <span className="shrink-0 text-neutral-500 transition-transform duration-200">
                      {isOpen ? (
                        <Minus className="h-5 w-5" aria-hidden />
                      ) : (
                        <Plus className="h-5 w-5" aria-hidden />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    aria-hidden={!isOpen}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p
                        className="pb-5 pr-8 text-left text-neutral-500 leading-[160%] tracking-[-0.012em]"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
