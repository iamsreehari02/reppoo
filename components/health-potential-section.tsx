"use client";

import Image from "next/image";
import { TextH2, TextP } from "@/components/typography";
import { CommonButton } from "@/components/common/button";
import { Clock, MoreVertical } from "lucide-react";
import type { HealthPotentialSection as HealthPotentialSectionType } from "@/lib/api/health-potential";

const PREVIOUS_TASKS = [
  { title: "Loom UI Design System", duration: "1:20:35" },
  { title: "Loom UI / UX Designer", duration: "1:45:35" },
];

interface HealthPotentialSectionProps {
  healthPotential: HealthPotentialSectionType | null;
}

export function HealthPotentialSection({
  healthPotential,
}: HealthPotentialSectionProps) {
  return (
    <section className="overflow-x-hidden bg-[#FCFCFD] px-6 py-12 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0">
          <TextH2 className="mb-6 text-left sm:mb-8">
            {healthPotential?.title ||
              "Maximizing Your Health Potential Together"}
          </TextH2>
          <TextP className="mb-3 text-left text-black">
            {healthPotential?.subtitle || "Smart Nutrition Planning"}
          </TextP>
          <TextP className="mb-6 text-left max-w-md sm:mb-8">
            {healthPotential?.description ||
              "Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized."}
          </TextP>
          <CommonButton className="rounded-full">Read More</CommonButton>
        </div>

        <div className="min-w-0 rounded-2xl bg-gray p-4 shadow-lg sm:p-6">
          <div className="min-w-0 rounded-2xl bg-white p-4 sm:p-6">
            <div className="mb-4 flex min-w-0 items-center justify-between gap-2 rounded-lg bg-white sm:mb-6">
              <div className="flex min-w-0 shrink items-center gap-2">
                <Image
                  src="/timer.svg"
                  alt=""
                  width={23}
                  height={23}
                  className="size-5 shrink-0 sm:size-[23px]"
                />
                <TextP className="truncate text-black text-sm sm:text-base">
                  Time Tracker
                </TextP>
              </div>
              <button
                type="button"
                className="shrink-0 flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Clock className="size-3.5 sm:size-4" />
                History
              </button>
            </div>

            {/* Current task / timer block */}
            <div className="mb-4 flex min-w-0 items-center gap-3 rounded-xl bg-gray p-4 sm:mb-6 sm:gap-4 sm:p-5">
              <div className="min-w-0 flex-1 flex flex-col gap-1 overflow-hidden">
                <p
                  className="truncate text-xs font-medium text-neutral-700 sm:text-sm"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  Design System
                </p>
                <span
                  className="text-2xl font-bold tracking-tight text-neutral-800 sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  10:34
                  <span className="text-[#2075FF]">:00</span>
                </span>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full transition-opacity hover:opacity-90 flex items-center justify-center"
                aria-label="Play"
              >
                <Image
                  src="/playButton.svg"
                  alt=""
                  width={60}
                  height={60}
                  className="size-12 sm:size-14 md:size-16"
                />
              </button>
            </div>

            <p
              className="pb-3 text-sm font-semibold text-neutral-700 sm:pb-4"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Previous Tasks
            </p>
            <ul className="space-y-1">
              {PREVIOUS_TASKS.map((task, i) => (
                <li
                  key={i}
                  className="flex min-w-0 items-center gap-2 rounded-lg bg-white/60 sm:gap-3 "
                >
                  <div className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center bg-gray sm:h-10 sm:w-10">
                    <Image
                      src="/loomIcon.svg"
                      alt=""
                      width={23}
                      height={23}
                      className="size-5 shrink-0 sm:size-6"
                    />
                  </div>

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-neutral-800 sm:text-base">
                      {task.title}
                    </p>
                    <p className="truncate text-xs text-neutral-500 sm:text-sm">
                      {task.duration}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded p-1 text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-700"
                    aria-label="More options"
                  >
                    <MoreVertical className="size-4 sm:size-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
