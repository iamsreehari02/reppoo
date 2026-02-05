"use client";

import Image from "next/image";
import Link from "next/link";
import { CommonButton } from "@/components/common/button";

interface AppDownloadButtonsProps {
  /** Label for both buttons (e.g. "Download") */
  label?: string;
  /** URL for the App Store button */
  appleHref?: string;
  /** URL for the Play Store button */
  playStoreHref?: string;
  /** Optional class for the wrapper div */
  className?: string;
}

export function AppDownloadButtons({
  label = "Download",
  appleHref = "#",
  playStoreHref = "#",
  className,
}: AppDownloadButtonsProps) {
  return (
    <div
      className={
        className ?? "flex flex-wrap items-center justify-center gap-4"
      }
    >
      <Link href={appleHref}>
        <CommonButton
          iconLeft={
            <Image
              src="/appleIcon.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
          }
          className="rounded-full border-0 bg-white shadow-sm hover:bg-neutral-50"
        >
          {label}
        </CommonButton>
      </Link>
      <Link href={playStoreHref}>
        <CommonButton
          iconLeft={
            <Image
              src="/playstoreIcon.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
          }
          variant="outline"
          className="rounded-full border-0 bg-white shadow-sm hover:bg-neutral-50"
        >
          {label}
        </CommonButton>
      </Link>
    </div>
  );
}
