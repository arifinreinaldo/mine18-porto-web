import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const expectedToken = process.env.CACHE_CLEAR_TOKEN;

  // Validate token
  if (!expectedToken) {
    return NextResponse.json(
      { error: "Cache clear token not configured" },
      { status: 500 }
    );
  }

  if (token !== expectedToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Optionally clear specific tags
  const tag = request.nextUrl.searchParams.get("tag");

  try {
    if (tag && ["profile", "socials", "portfolio", "skills"].includes(tag)) {
      // Next.js 16 requires a cacheLife profile as second argument
      revalidateTag(tag, "max");
      return NextResponse.json({
        success: true,
        message: `Cache cleared for tag: ${tag}`,
        revalidated: [tag],
      });
    }

    // Clear all data caches
    revalidateTag("all-data", "max");

    return NextResponse.json({
      success: true,
      message: "All caches cleared successfully",
      revalidated: ["profile", "socials", "portfolio", "skills"],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear cache", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const token =
    request.headers.get("x-cache-token") ||
    request.nextUrl.searchParams.get("token");
  const expectedToken = process.env.CACHE_CLEAR_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "Cache clear token not configured" },
      { status: 500 }
    );
  }

  if (token !== expectedToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    revalidateTag("all-data", "max");

    return NextResponse.json({
      success: true,
      message: "All caches cleared successfully",
      revalidated: ["profile", "socials", "portfolio"],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear cache", details: String(error) },
      { status: 500 }
    );
  }
}
