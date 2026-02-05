import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://172.20.10.9:4000";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/hero`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Backend fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
