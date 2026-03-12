"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { Loader2, Wand2 } from "lucide-react";

const PLACEHOLDER = `# My Doc

A paragraph with  extra spaces  and inconsistent     spacing.

|Name|Age|City|
|---|---|---|
|Alice|30|New York|
|Bob|25|Los Angeles|

- item 1
-  item 2
-   item 3
`;

export function FormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useSharedContent(useCallback((v: string) => setInput(v), []));

  async function format() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { formatMarkdown } = await import("@/lib/prettier-format");
      const result = await formatMarkdown(input);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Input</label>
            <div className="flex gap-2">
              <ShareButton path="/formatter" content={input} />
              <Button variant="ghost" size="sm" onClick={() => setInput("")}>
                Clear
              </Button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDER}
            className="w-full h-80 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Formatted output</label>
            <div className="flex gap-2">
              {output && <CopyButton text={output} />}
              {output && (
                <DownloadButton content={output} filename="formatted.md" mimeType="text/markdown" />
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted markdown will appear here..."
            className="w-full h-80 resize-none rounded-lg border bg-muted/30 font-mono text-sm p-3 outline-none"
            spellCheck={false}
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive">Error: {error}</p>
      )}
      <Button onClick={format} disabled={loading || !input.trim()} size="lg" className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        Format Markdown
      </Button>
    </div>
  );
}
