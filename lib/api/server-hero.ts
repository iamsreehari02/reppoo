import type { BackendHero } from "./hero";
import { getBaseURL } from "./config";

interface HeroResponse {
  success: boolean;
  data: BackendHero;
}

/** Server-only: fetches hero from your backend for SSR / initial render. */
export async function getHeroServer(): Promise<BackendHero | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/content/hero`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: HeroResponse = await res.json();
    if (!data?.success || !data?.data) return null;

    return data.data;
  } catch (error) {
    console.error("Failed to fetch hero:", error);
    return null;
  }
}
