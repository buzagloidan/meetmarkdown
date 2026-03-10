"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SplitPane } from "@/components/shared/SplitPane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { exportAsPdf, exportAsDocx } from "@/lib/export-utils";
import { ChevronDown, Download } from "lucide-react";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-4 text-muted-foreground text-sm">Loading preview...</div> }
);

const SAMPLE = `# Hello, MeetMarkdown!

Write markdown on the left, see the preview on the right.

## Mermaid Diagrams

\`\`\`mermaid
flowchart TD
  A[Start] --> B{Is it markdown?}
  B -- Yes --> C[Render it]
  B -- No --> D[Skip it]
  C --> E[Done]
\`\`\`

## Tables

| Name   | Role     | Status |
|--------|----------|--------|
| Alice  | Dev      | ✅     |
| Bob    | Designer | ✅     |

## Code

\`\`\`ts
const greeting = (name: string) => \`Hello, \${name}!\`;
console.log(greeting("world"));
\`\`\`
`;

export function EditorClient() {
  const [content, setContent] = useState(SAMPLE);

  useEffect(() => {
    const stored = sessionStorage.getItem("hero-markdown");
    if (stored) {
      setContent(stored);
      sessionStorage.removeItem("hero-markdown");
    }
  }, []);
  const contentRef = useRef(content);
  contentRef.current = content;
  const [dlOpen, setDlOpen] = useState(false);
  const dlRef = useRef<HTMLDivElement>(null);
  // Mobile tab: "editor" | "preview"
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dlRef.current && !dlRef.current.contains(e.target as Node)) {
        setDlOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newValue = content.substring(0, start) + "  " + content.substring(end);
        setContent(newValue);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + 2;
        });
      }
    },
    [content]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        import("@/lib/prettier-format").then(({ formatMarkdown }) => {
          formatMarkdown(content).then(setContent).catch(console.error);
        });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [content]);

  const toolbar = (
    <div className="flex items-center justify-between px-4 py-2 border-b gap-2 flex-wrap">
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            import("@/lib/prettier-format").then(({ formatMarkdown }) => {
              formatMarkdown(content).then(setContent).catch(console.error);
            });
          }}
        >
          Format <span className="hidden sm:inline">(⌘⇧F)</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setContent("")}>
          Clear
        </Button>
        {/* Mobile tabs */}
        <div className="flex lg:hidden rounded-md border overflow-hidden ml-2">
          <button
            onClick={() => setMobileTab("editor")}
            className={`px-3 py-1 text-sm transition-colors ${mobileTab === "editor" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            Edit
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`px-3 py-1 text-sm transition-colors ${mobileTab === "preview" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <CopyButton text={content} />
        {/* Download dropdown */}
        <div className="relative" ref={dlRef}>
          <button
            onClick={() => setDlOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
          {dlOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 w-40 rounded-md border bg-popover shadow-md py-1">
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                onClick={() => {
                  const blob = new Blob([contentRef.current], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "document.md"; a.click();
                  URL.revokeObjectURL(url);
                  setDlOpen(false);
                }}
              >
                Markdown (.md)
              </button>
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                onClick={() => { exportAsPdf(contentRef.current); setDlOpen(false); }}
              >
                PDF (.pdf)
              </button>
              <button
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                onClick={() => { exportAsDocx(contentRef.current, "document"); setDlOpen(false); }}
              >
                Word (.docx)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
      {toolbar}

      {/* Desktop: split pane */}
      <div className="hidden lg:flex flex-1 min-h-0">
        <SplitPane
          className="flex-1"
          left={
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full resize-none bg-background font-mono text-sm p-4 outline-none border-r"
              placeholder="Write markdown here..."
              spellCheck={false}
            />
          }
          right={<MarkdownPreview content={content} />}
        />
      </div>

      {/* Mobile: tab layout */}
      <div className="flex lg:hidden flex-1 min-h-0">
        {mobileTab === "editor" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full resize-none bg-background font-mono text-sm p-4 outline-none"
            placeholder="Write markdown here..."
            spellCheck={false}
          />
        ) : (
          <div className="w-full h-full overflow-auto">
            <MarkdownPreview content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
