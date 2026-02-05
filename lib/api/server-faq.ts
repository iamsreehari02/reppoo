import type { FaqSection } from "./FAQ";
import { getBaseURL } from "./config";

/** Server-only: fetches FAQ section from backend for SSR. */
export async function getFaqSectionServer(): Promise<FaqSection | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/faq`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success || !json?.data) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch FAQ section:", error);
    return null;
  }
}
