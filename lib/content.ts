import type { SiteContent } from "@/types/content";
import { defaultContent } from "@/content/default-content";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "content", "content.json");

/**
 * Server-only: read site content from file or default.
 * Used for footer (and any other file-based content). API sections are fetched on the server via server-* modules.
 */
export async function getContent(): Promise<SiteContent> {
  try {
    if (existsSync(CONTENT_PATH)) {
      const raw = readFileSync(CONTENT_PATH, "utf-8");
      return JSON.parse(raw) as SiteContent;
    }
  } catch {
    // fallback to default
  }
  return defaultContent;
}

/**
 * Server-only: write content to file.
 * Used by API route when admin saves. Replace with backend API call when ready.
 */
export function writeContent(content: SiteContent): void {
  writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}
