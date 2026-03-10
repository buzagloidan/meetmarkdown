"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { SplitPane } from "@/components/shared/SplitPane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { DownloadButton } from "@/components/shared/DownloadButton";

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

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
      <div className="flex items-center justify-between px-4 py-2 border-b gap-2 flex-wrap">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              import("@/lib/prettier-format").then(({ formatMarkdown }) => {
                formatMarkdown(content).then(setContent).catch(console.error);
              });
            }}
          >
            Format (⌘⇧F)
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setContent("")}>
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <CopyButton text={content} />
          <DownloadButton content={content} filename="document.md" mimeType="text/markdown" />
        </div>
      </div>
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
  );
}
