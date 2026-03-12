"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { Loader2, RefreshCw } from "lucide-react";

const SAMPLE = `<h1>Hello World</h1>
<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>
<h2>Features</h2>
<ul>
  <li>Clean conversion</li>
  <li>Preserves <a href="https://example.com">links</a></li>
  <li>Handles tables</li>
</ul>
<table>
  <tr><th>Name</th><th>Role</th></tr>
  <tr><td>Alice</td><td>Developer</td></tr>
  <tr><td>Bob</td><td>Designer</td></tr>
</table>`;

export function HtmlToMarkdownClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useSharedContent(useCallback((v: string) => setInput(v), []));

  async function convert() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const TurndownService = (await import("turndown")).default;
      // @ts-expect-error - turndown-plugin-gfm types not available
      const { gfm } = await import("turndown-plugin-gfm");
      const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
      td.use(gfm);
      setOutput(td.turndown(input));
    } catch {
      try {
        const TurndownService = (await import("turndown")).default;
        const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
        setOutput(td.turndown(input));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Conversion failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">HTML input</label>
            <div className="flex gap-2">
              <ShareButton path="/html-to-markdown" content={input} />
              <Button variant="ghost" size="sm" onClick={() => { setInput(SAMPLE); setOutput(""); }}>
                Load example
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}>
                Clear
              </Button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE}
            className="w-full h-80 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Markdown output</label>
            <div className="flex gap-2">
              {output && <CopyButton text={output} />}
              {output && (
                <DownloadButton content={output} filename="output.md" mimeType="text/markdown" />
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Markdown will appear here..."
            className="w-full h-80 resize-none rounded-lg border bg-muted/30 font-mono text-sm p-3 outline-none"
            spellCheck={false}
          />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">Error: {error}</p>}
      <Button onClick={convert} disabled={loading || !input.trim()} size="lg" className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        Convert to Markdown
      </Button>
    </div>
  );
}
