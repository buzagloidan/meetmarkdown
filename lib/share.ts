import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

const VERSION = "v1";

/** Encode content into a URL-safe hash fragment */
export function encodeShareContent(content: string): string {
  return `${VERSION}=${compressToEncodedURIComponent(content)}`;
}

/** Decode content from a URL hash fragment. Returns null if invalid. */
export function decodeShareContent(hash: string): string | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const eqIdx = raw.indexOf("=");
  if (eqIdx === -1) return null;
  const version = raw.slice(0, eqIdx);
  const payload = raw.slice(eqIdx + 1);
  if (version !== VERSION || !payload) return null;
  try {
    return decompressFromEncodedURIComponent(payload);
  } catch {
    return null;
  }
}

/** Build a full shareable URL for a given path and content */
export function buildShareUrl(path: string, content: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}${path}#${encodeShareContent(content)}`;
}
