import { NextRequest } from "next/server";
import { htmlToMarkdown } from "@/lib/html-to-markdown";
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

    const { html } = JSON.parse(body);
    if (!html || typeof html !== "string") {
      return json({ error: "Missing required field: html" }, 400);
    }

    const result = htmlToMarkdown(html);
    return json({ result });
  } catch {
    return json({ error: "Internal server error." }, 500);
  }
}
