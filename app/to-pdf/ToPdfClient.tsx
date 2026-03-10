"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
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

export function ToPdfClient() {
  const [content, setContent] = useState(SAMPLE);
  const printRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #print-area { display: block !important; }
          #print-area {
            position: fixed;
            inset: 0;
            padding: 2cm;
            background: white;
            color: black;
          }
        }
      `}</style>

      {/* Hidden print target */}
      <div id="print-area" ref={printRef} style={{ display: "none" }}>
        <MarkdownPreview content={content} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Write your document, then use <strong>Print / Save as PDF</strong> to export.
          </p>
          <Button onClick={handlePrint} className="gap-2" size="lg">
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-280px)] min-h-[500px]">
          <div className="flex flex-col">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Editor
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Preview
            </div>
            <div className="flex-1 rounded-lg border overflow-auto bg-background">
              <MarkdownPreview content={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
