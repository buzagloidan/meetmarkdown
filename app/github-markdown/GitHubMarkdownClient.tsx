"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { Loader2, Github, FileText, Printer, Code } from "lucide-react";
import { toast } from "sonner";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-4 text-muted-foreground text-sm">Loading preview...</div> }
);

type ViewMode = "preview" | "source";

/** Convert a GitHub URL to its raw content URL */
function toRawUrl(input: string): string | null {
  const trimmed = input.trim();

  // Already a raw URL
  if (trimmed.startsWith("https://raw.githubusercontent.com/")) return trimmed;

  // GitHub blob URL: https://github.com/{owner}/{repo}/blob/{branch}/{path}
  const blobMatch = trimmed.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/
  );
  if (blobMatch) {
    const [, owner, repo, rest] = blobMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${rest}`;
  }

  // GitHub tree-less URL: https://github.com/{owner}/{repo}/{branch}/{path}.md
  // (less common but some people share these)

  // Plain repo URL with README: https://github.com/{owner}/{repo}
  const repoMatch = trimmed.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/
  );
  if (repoMatch) {
    const [, owner, repo] = repoMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`;
  }

  return null;
}

function extractFilename(url: string): string {
  const parts = url.split("/");
  const last = parts[parts.length - 1];
  return last || "document.md";
}

function extractRepoInfo(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

export function GitHubMarkdownClient() {
  const [url, setUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [filename, setFilename] = useState("document.md");
  const [repoInfo, setRepoInfo] = useState<string | null>(null);

  useSharedContent(useCallback((v: string) => {
    // Shared content could be a URL or markdown content
    if (v.startsWith("http")) {
      setUrl(v);
    } else {
      setMarkdown(v);
    }
  }, []));

  async function fetchMarkdown() {
    const rawUrl = toRawUrl(url);
    if (!rawUrl) {
      setError("Please enter a valid GitHub URL (e.g. https://github.com/owner/repo/blob/main/README.md)");
      return;
    }

    setLoading(true);
    setError("");
    setMarkdown("");

    try {
      const res = await fetch(rawUrl);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("File not found. Check the URL and make sure the repository is public.");
        }
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const text = await res.text();
      if (!text.trim()) throw new Error("The file appears to be empty.");
      setMarkdown(text);
      setFilename(extractFilename(rawUrl));
      setRepoInfo(extractRepoInfo(url));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleExportPdf() {
    const { exportAsPdf } = await import("@/lib/export-utils");
    await exportAsPdf(markdown);
  }

  async function handleExportHtml() {
    const { markdownToHtml } = await import("@/lib/markdown-to-html");
    const html = await markdownToHtml(markdown);
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename.replace(/\.md$/, ".html");
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("HTML downloaded");
  }

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchMarkdown()}
              placeholder="https://github.com/owner/repo/blob/main/README.md"
              className="w-full rounded-lg border bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>
          <Button onClick={fetchMarkdown} disabled={loading || !url.trim()} className="gap-2 shrink-0" size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            Fetch & Render
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "Astro", url: "https://github.com/withastro/astro/blob/main/packages/astro/README.md" },
            { label: "Tailwind CSS", url: "https://github.com/tailwindlabs/tailwindcss/blob/main/README.md" },
            { label: "Vite", url: "https://github.com/vitejs/vite/blob/main/README.md" },
          ].map((ex) => (
            <button
              key={ex.label}
              onClick={() => { setUrl(ex.url); }}
              className="text-xs px-2.5 py-1 rounded-full border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {ex.label}
            </button>
          ))}
          <span className="text-xs text-muted-foreground self-center">Try an example</span>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Content area */}
      {markdown && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {repoInfo && (
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filename}</span>
                  {" from "}
                  <a
                    href={`https://github.com/${repoInfo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    {repoInfo}
                  </a>
                </span>
              )}

              {/* View toggle */}
              <div className="flex rounded-lg border p-0.5">
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === "preview"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode("source")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === "source"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Source
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <ShareButton path="/github-markdown" content={url} />
              <CopyButton text={markdown} />
              <DownloadButton content={markdown} filename={filename} mimeType="text/markdown" />
              <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExportHtml}>
                <Code className="h-3.5 w-3.5" />
                HTML
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExportPdf}>
                <Printer className="h-3.5 w-3.5" />
                PDF
              </Button>
            </div>
          </div>

          {/* Rendered content */}
          <div className="rounded-lg border bg-background overflow-hidden">
            {viewMode === "preview" ? (
              <div className="min-h-[500px] max-h-[calc(100vh-380px)] overflow-auto">
                <MarkdownPreview content={markdown} />
              </div>
            ) : (
              <pre className="p-4 text-sm font-mono overflow-auto min-h-[500px] max-h-[calc(100vh-380px)] whitespace-pre-wrap">
                {markdown}
              </pre>
            )}
          </div>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground text-center">
            Files are fetched directly from GitHub to your browser. Nothing is uploaded to our servers.
          </p>
        </div>
      )}
    </div>
  );
}
