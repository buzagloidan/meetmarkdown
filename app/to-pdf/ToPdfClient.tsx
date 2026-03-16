"use client";

import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/shared/ShareButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { Printer } from "lucide-react";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-4 text-muted-foreground text-sm">Loading preview...</div> }
);

const SAMPLE = `# My Document

A clean, printable document generated from markdown.

## Introduction

Write your content here and click **Print / Save as PDF** when ready.

## Key Points

- All formatting is preserved
- Code blocks are syntax highlighted
- Tables render cleanly

## Summary

| Section | Status |
|---------|--------|
| Intro   | ✅ Done |
| Body    | ✅ Done |
| Closing | ✅ Done |
`;

const PRINT_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    font-family: "Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 15px; line-height: 1.7; color: #1a1a1a;
    max-width: 780px; margin: 0 auto; padding: 2cm 2.5cm;
  }
  h1,h2,h3,h4,h5,h6 { line-height: 1.3; margin-top: 1.5em; margin-bottom: 0.5em; }
  h1 { font-size: 2em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2em; }
  p { margin: 0.75em 0; }
  a { color: #2563eb; }
  code { background: #f3f4f6; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.875em; font-family: monospace; }
  pre { background: #f3f4f6; padding: 1em; border-radius: 6px; overflow-x: auto; }
  pre code { background: none; padding: 0; font-size: 0.85em; }
  blockquote { border-left: 4px solid #e5e7eb; margin: 0; padding: 0.5em 1em; color: #6b7280; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #e5e7eb; padding: 0.5em 0.75em; text-align: left; }
  th { background: #f9fafb; font-weight: 600; }
  tr:nth-child(even) td { background: #fafafa; }
  img { max-width: 100%; }
  @media print { body { padding: 0; } a { color: #1a1a1a; } }
`;

export function ToPdfClient() {
  const [content, setContent] = useState(SAMPLE);
  useSharedContent(useCallback((v: string) => setContent(v), []));
  // Ref so handlePrint always reads the latest content regardless of closure timing
  const contentRef = useRef(content);
  contentRef.current = content;

  async function handlePrint() {
    const latest = contentRef.current;

    const [{ markdownToHtml }, mermaidModule] = await Promise.all([
      import("@/lib/markdown-to-html"),
      import("mermaid"),
    ]);
    const mermaid = mermaidModule.default;
    mermaid.initialize({ startOnLoad: false, theme: "default" });

    let bodyHtml = await markdownToHtml(latest);

    // Replace mermaid code blocks with rendered SVGs
    // SVG comes from mermaid.render() — library output, not user-supplied HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyHtml, "text/html");
    const mermaidBlocks = doc.querySelectorAll("code.language-mermaid");
    for (const block of mermaidBlocks) {
      const code = block.textContent ?? "";
      const id = `mermaid-pdf-${Math.random().toString(36).slice(2)}`;
      try {
        const { svg } = await mermaid.render(id, code.trim());
        const wrapper = doc.createElement("div");
        wrapper.style.textAlign = "center";
        wrapper.style.margin = "1.5em 0";
        wrapper.innerHTML = svg; // mermaid library SVG output — not user input
        const svgEl = wrapper.querySelector("svg");
        if (svgEl) {
          svgEl.style.background = "transparent";
          const bgRect = svgEl.querySelector(":scope > rect:first-child");
          if (bgRect) bgRect.setAttribute("fill", "transparent");
        }
        block.closest("pre")?.replaceWith(wrapper);
      } catch {
        // Leave as code block if render fails
      }
    }
    bodyHtml = doc.body.innerHTML;

    const katexCdn = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" crossorigin="anonymous">`;
    const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title>${katexCdn}<style>${PRINT_STYLES}</style></head><body>${bodyHtml}</body></html>`;

    // Blob URL approach: opens a proper full document — no blank-window quirks
    const blob = new Blob([fullHtml], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    const win = window.open(blobUrl, "_blank");
    if (!win) { URL.revokeObjectURL(blobUrl); return; }

    win.addEventListener("afterprint", () => {
      win.close();
      URL.revokeObjectURL(blobUrl);
    });
    // Wait for the document to load before triggering print
    win.addEventListener("load", () => {
      win.focus();
      win.print();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Write your document, then use <strong>Print / Save as PDF</strong> to export.
          <span className="ml-1 inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            100% client-side — your content never leaves your browser
          </span>
        </p>
        <div className="flex gap-2">
          <ShareButton path="/to-pdf" content={content} />
          <Button onClick={handlePrint} className="gap-2" size="lg">
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-280px)] min-h-[500px]">
        <div className="flex flex-col min-h-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Editor
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-h-0 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col min-h-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Preview
          </div>
          <div className="flex-1 min-h-0 rounded-lg border overflow-auto bg-background">
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
