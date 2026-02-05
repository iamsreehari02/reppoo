export function getBaseURL(): string {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";
  return typeof url === "string" ? url.trim().replace(/\/$/, "") : "";
}
