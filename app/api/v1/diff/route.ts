import { NextRequest } from "next/server";
import { diffMarkdown } from "@/lib/diff";
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

    const { original, modified } = JSON.parse(body);
    if (!original || typeof original !== "string" || !modified || typeof modified !== "string") {
      return json({ error: "Missing required fields: original, modified" }, 400);
    }

    const diff = diffMarkdown(original, modified);
    return json({ diff });
  } catch {
    return json({ error: "Internal server error." }, 500);
  }
}
