"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { Loader2, Link2 } from "lucide-react";

export function UrlToMarkdownClient() {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function convert() {
    const trimmed = url.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      // Jina AI Reader: prepend r.jina.ai to any URL → returns clean markdown directly
      const jinaUrl = `https://r.jina.ai/${trimmed}`;
      const res = await fetch(jinaUrl, {
        headers: { Accept: "text/plain" },
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      const markdown = await res.text();
      if (!markdown.trim()) throw new Error("No content returned for this URL");
      setOutput(markdown);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && convert()}
          placeholder="https://example.com/article"
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={convert} disabled={loading || !url.trim()} className="gap-2 shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
          Fetch & Convert
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Extracts clean article content from any public URL. Works best with news articles, blogs, and documentation pages.
      </p>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Markdown output</label>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <DownloadButton content={output} filename="page.md" mimeType="text/markdown" />
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 resize-none rounded-lg border bg-muted/30 font-mono text-sm p-3 outline-none"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
