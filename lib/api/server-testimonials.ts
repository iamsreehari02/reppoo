import type { Testimonial, TestimonialPage } from "./testimonials";
import { getBaseURL } from "./config";

/** Server-only: fetches testimonials list from backend for SSR. */
export async function getTestimonialsServer(): Promise<Testimonial[] | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/testimonials`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success || !Array.isArray(json?.data)) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return null;
  }
}

/** Server-only: fetches testimonial page (title/subtitle) from backend for SSR. */
export async function getTestimonialPageServer(): Promise<TestimonialPage | null> {
  try {
    const base = getBaseURL() || "http://localhost:4000";
    const res = await fetch(`${base}/api/testimonial-page`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.success || !json?.data) return null;
    return json.data;
  } catch (error) {
    console.error("Failed to fetch testimonial page:", error);
    return null;
  }
}
