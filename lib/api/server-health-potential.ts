import type { HealthPotentialSection } from "./health-potential";
import { getBaseURL } from "./config";

/** Server-only: fetches health potential section from backend for SSR. */
export async function getHealthPotentialServer(): Promise<HealthPotentialSection | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/health-potential`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success || !json?.data) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch health potential:", error);
    return null;
  }
}
