import { NextRequest, NextResponse } from "next/server";
import { clearCache, getCacheInfo } from "@/lib/cache";

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

  // Get cache info before clearing
  const infoBefore = getCacheInfo();

  // Clear the cache
  const result = clearCache();

  return NextResponse.json({
    success: result.success,
    message: result.success ? "Cache cleared successfully" : "Failed to clear cache",
    clearedFiles: result.clearedFiles,
    fileCountBefore: infoBefore.files.length,
  });
}

export async function POST(request: NextRequest) {
  // Also support POST with token in header
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

  const infoBefore = getCacheInfo();
  const result = clearCache();

  return NextResponse.json({
    success: result.success,
    message: result.success ? "Cache cleared successfully" : "Failed to clear cache",
    clearedFiles: result.clearedFiles,
    fileCountBefore: infoBefore.files.length,
  });
}
