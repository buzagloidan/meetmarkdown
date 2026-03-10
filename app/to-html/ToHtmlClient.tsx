"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { Loader2, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAMPLE = `# Hello World

A paragraph with **bold** and *italic* text.

## Features

- Clean HTML output
- Syntax highlighted code blocks
- GFM table support

\`\`\`js
console.log("Hello, World!");
\`\`\`
`;

export function ToHtmlClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function convert() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { markdownToHtml } = await import("@/lib/markdown-to-html");
      const result = await markdownToHtml(input);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  }

  const fullHtml = output
    ? `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Document</title>\n</head>\n<body>\n${output}\n</body>\n</html>`
    : "";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Markdown input</label>
          <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}>
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          className="w-full h-56 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
          spellCheck={false}
        />
      </div>
      {error && <p className="text-sm text-destructive">Error: {error}</p>}
      <Button onClick={convert} disabled={loading || !input.trim()} size="lg" className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
        Convert to HTML
      </Button>
      {output && (
        <Tabs defaultValue="snippet">
          <div className="flex items-center justify-between mb-3">
            <TabsList>
              <TabsTrigger value="snippet">HTML snippet</TabsTrigger>
              <TabsTrigger value="full">Full document</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <DownloadButton content={fullHtml} filename="output.html" mimeType="text/html" />
            </div>
          </div>
          <TabsContent value="snippet">
            <pre className="rounded-lg border bg-muted/30 p-4 text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
              {output}
            </pre>
          </TabsContent>
          <TabsContent value="full">
            <pre className="rounded-lg border bg-muted/30 p-4 text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
              {fullHtml}
            </pre>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
