import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;

const hits = new Map<string, number[]>();

function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = hits.get(ip) ?? [];
  const windowStart = now - WINDOW_MS;

  const recent = timestamps.filter((t) => t > windowStart);
  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    hits.set(ip, recent);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { allowed: true };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export function checkRateLimit(req: NextRequest): NextResponse | null {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429, headers: { ...corsHeaders, "Retry-After": String(retryAfter) } }
    );
  }
  return null;
}

export function checkSize(body: string): NextResponse | null {
  if (body.length > 100_000) {
    return json({ error: "Input exceeds 100KB limit." }, 413);
  }
  return null;
}
