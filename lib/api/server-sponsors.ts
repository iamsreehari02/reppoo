import type { Sponsor } from "./sponsors";
import { getBaseURL } from "./config";

/** Server-only: fetches sponsors from backend for SSR. */
export async function getSponsorsServer(): Promise<Sponsor[] | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/sponsors`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success || !Array.isArray(json?.data)) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return null;
  }
}
