"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CommonButton } from "@/components/common/button";

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#F9F9F9]/85 backdrop-blur-md supports-backdrop-filter:bg-[#F9F9F9]/80">
      <div className="flex h-14 w-full max-w-7xl mx-auto items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={125}
            height={34}
            className="h-8 w-auto"
          />
        </Link>
        <CommonButton
          type="button"
          onClick={() =>
            window.open(
              "https://reppoo-admin.onrender.com",
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          Admin login
        </CommonButton>
      </div>
    </header>
  );
}
