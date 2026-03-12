import { NextRequest } from "next/server";
import { analyzeMarkdown } from "@/lib/word-count";
import { json, handleOptions, checkRateLimit, checkSize } from "@/lib/api-utils";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req);
  if (limited) return limited;

  try {
    const body = await req.text();
    const sizeErr = checkSize(body);
    if (sizeErr) return sizeErr;

    const { markdown } = JSON.parse(body);
    if (!markdown || typeof markdown !== "string") {
      return json({ error: "Missing required field: markdown" }, 400);
    }

    const stats = analyzeMarkdown(markdown);
    return json({ stats });
  } catch {
    return json({ error: "Internal server error." }, 500);
  }
}
