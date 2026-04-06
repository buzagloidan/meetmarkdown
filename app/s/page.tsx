"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { decodeShareContent } from "@/lib/share";
import Link from "next/link";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-8 text-gray-400 text-sm">Loading…</div> }
);

export default function StandalonePage() {
  const [content, setContent] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const decoded = decodeShareContent(window.location.hash);
    if (decoded) {
      setContent(decoded);
    } else {
      setInvalid(true);
    }
  }, []);

  if (invalid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-muted-foreground">No content found in this link.</p>
        <Link href="/editor" className="text-sm underline underline-offset-4">
          Open Editor
        </Link>
      </div>
    );
  }

  if (content === null) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <MarkdownPreview content={content} />
        <div className="mt-12 pt-6 border-t text-center">
          <Link
            href={`/editor#${window.location.hash.slice(1)}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Edit in MeetMarkdown →
          </Link>
        </div>
      </div>
    </div>
  );
}
