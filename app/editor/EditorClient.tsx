"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SplitPane } from "@/components/shared/SplitPane";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { useSharedContent } from "@/lib/use-shared-content";
import { exportAsPdf, exportAsDocx } from "@/lib/export-utils";
import { applyCommand } from "@/lib/editor-commands";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { FocusOverlay } from "@/components/editor/FocusOverlay";
import {
  ChevronDown,
  Download,
  Columns2,
  Code2,
  Eye,
  Crosshair,
  Type,
  ArrowUpDown,
} from "lucide-react";

const MarkdownPreview = dynamic(
  () =>
    import("@/components/markdown/MarkdownPreview").then(
      (m) => m.MarkdownPreview
    ),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 text-muted-foreground text-sm">
        Loading preview...
      </div>
    ),
  }
);

const WysiwygEditor = dynamic(
  () =>
    import("@/components/editor/WysiwygEditor").then((m) => m.WysiwygEditor),
  { ssr: false }
);

const SAMPLE = `# Hello, MeetMarkdown!

Write markdown on the left, see the preview on the right.

## Math & LaTeX

Inline math: $E = mc^2$ and $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$

Display math:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

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

type ViewMode = "split" | "source" | "wysiwyg";

export function EditorClient() {
  const [content, setContent] = useState(SAMPLE);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [focusMode, setFocusMode] = useState(false);
  const [typewriterMode, setTypewriterMode] = useState(false);
  const [scrollSync, setScrollSync] = useState(true);
  const [dlOpen, setDlOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  const contentRef = useRef(content);
  contentRef.current = content;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dlRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);

  useSharedContent(useCallback((v: string) => setContent(v), []));

  useEffect(() => {
    const stored = sessionStorage.getItem("hero-markdown");
    if (stored) {
      setContent(stored);
      sessionStorage.removeItem("hero-markdown");
    }
  }, []);

  // Click outside for download dropdown
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dlRef.current && !dlRef.current.contains(e.target as Node)) {
        setDlOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Tab key + formatting shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newValue =
          content.substring(0, start) + "  " + content.substring(end);
        setContent(newValue);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + 2;
        });
        return;
      }

      if (e.metaKey || e.ctrlKey) {
        const key = e.key.toLowerCase();
        if (key === "b") {
          e.preventDefault();
          applyCommand(e.currentTarget, "bold", content, setContent);
        } else if (key === "i") {
          e.preventDefault();
          applyCommand(e.currentTarget, "italic", content, setContent);
        } else if (key === "k") {
          e.preventDefault();
          applyCommand(e.currentTarget, "link", content, setContent);
        }
      }
    },
    [content]
  );

  // Prettier format shortcut (Cmd+Shift+F)
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

  // ── Scroll Sync ──────────────────────────────────────────────
  useEffect(() => {
    if (!scrollSync || viewMode !== "split") return;
    const textarea = textareaRef.current;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    function syncScroll(source: HTMLElement, target: HTMLElement) {
      if (syncingRef.current) return;
      syncingRef.current = true;
      const max = source.scrollHeight - source.clientHeight;
      const pct = max > 0 ? source.scrollTop / max : 0;
      target.scrollTop = pct * (target.scrollHeight - target.clientHeight);
      requestAnimationFrame(() => {
        syncingRef.current = false;
      });
    }

    const onEditorScroll = () => syncScroll(textarea!, preview!);
    const onPreviewScroll = () => syncScroll(preview!, textarea!);

    textarea.addEventListener("scroll", onEditorScroll);
    preview.addEventListener("scroll", onPreviewScroll);

    return () => {
      textarea.removeEventListener("scroll", onEditorScroll);
      preview.removeEventListener("scroll", onPreviewScroll);
    };
  }, [scrollSync, viewMode]);

  // ── Typewriter Mode ──────────────────────────────────────────
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !typewriterMode || viewMode === "wysiwyg") return;

    function scrollToCenter() {
      if (!textarea) return;
      const { selectionStart, value } = textarea;
      const lines = value.substring(0, selectionStart).split("\n");
      const currentLine = lines.length - 1;
      const cs = getComputedStyle(textarea);
      const lh = parseFloat(cs.lineHeight) || 22;
      const pt = parseFloat(cs.paddingTop) || 0;
      const lineTop = pt + currentLine * lh;
      textarea.scrollTop = lineTop - textarea.clientHeight / 2;
    }

    const events = ["input", "click", "keyup"] as const;
    events.forEach((e) => textarea.addEventListener(e, scrollToCenter));

    return () => {
      events.forEach((e) => textarea.removeEventListener(e, scrollToCenter));
    };
  }, [typewriterMode, viewMode]);

  // ── Toolbar formatting command handler ───────────────────────
  const handleToolbarCommand = useCallback(
    (command: string) => {
      if (viewMode === "wysiwyg") {
        import("@/components/editor/WysiwygEditor").then(
          ({ execFormatCommand }) => {
            execFormatCommand(command);
          }
        );
      } else {
        const textarea = textareaRef.current;
        if (textarea) {
          applyCommand(textarea, command, contentRef.current, setContent);
        }
      }
    },
    [viewMode]
  );

  // ── Shared sub-components ────────────────────────────────────
  const textareaEl = (
    <div className="relative h-full">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full resize-none bg-background font-mono text-sm p-4 outline-none border-r leading-relaxed"
        placeholder="Write markdown here..."
        spellCheck={false}
      />
      {focusMode && viewMode !== "wysiwyg" && (
        <FocusOverlay textarea={textareaRef.current} />
      )}
    </div>
  );

  const previewEl = <MarkdownPreview content={content} scrollRef={previewRef} />;

  // ── Mode / toggle button helpers ─────────────────────────────
  const modeBtn = (
    mode: ViewMode,
    icon: React.ReactNode,
    label: string
  ) => (
    <button
      key={mode}
      title={label}
      onClick={() => setViewMode(mode)}
      className={`p-1.5 rounded transition-colors ${
        viewMode === mode
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {icon}
    </button>
  );

  const toggleBtn = (
    active: boolean,
    toggle: () => void,
    icon: React.ReactNode,
    label: string,
    disabled?: boolean
  ) => (
    <button
      title={label}
      onClick={toggle}
      disabled={disabled}
      className={`p-1.5 rounded transition-colors ${
        disabled
          ? "text-muted-foreground/30 cursor-not-allowed"
          : active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {icon}
    </button>
  );

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
      {/* ── Main toolbar ─────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2 border-b gap-2 flex-wrap">
        <div className="flex gap-2 items-center">
          {/* View mode selector (desktop) */}
          <div className="hidden lg:flex items-center rounded-md border overflow-hidden">
            {modeBtn(
              "split",
              <Columns2 className="h-4 w-4" />,
              "Split View"
            )}
            {modeBtn(
              "source",
              <Code2 className="h-4 w-4" />,
              "Source Only"
            )}
            {modeBtn(
              "wysiwyg",
              <Eye className="h-4 w-4" />,
              "WYSIWYG"
            )}
          </div>

          {/* Feature toggles (desktop) */}
          <div className="hidden lg:flex items-center gap-0.5 ml-1">
            {toggleBtn(
              focusMode,
              () => setFocusMode((f) => !f),
              <Crosshair className="h-4 w-4" />,
              "Focus Mode",
              viewMode === "wysiwyg"
            )}
            {toggleBtn(
              typewriterMode,
              () => setTypewriterMode((t) => !t),
              <Type className="h-4 w-4" />,
              "Typewriter Mode",
              viewMode === "wysiwyg"
            )}
            {toggleBtn(
              scrollSync,
              () => setScrollSync((s) => !s),
              <ArrowUpDown className="h-4 w-4" />,
              "Scroll Sync",
              viewMode !== "split"
            )}
          </div>

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
              className={`px-3 py-1 text-sm transition-colors ${
                mobileTab === "editor"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`px-3 py-1 text-sm transition-colors ${
                mobileTab === "preview"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <ShareButton path="/s" content={content} />
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
                    const blob = new Blob([contentRef.current], {
                      type: "text/markdown",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "document.md";
                    a.click();
                    URL.revokeObjectURL(url);
                    setDlOpen(false);
                  }}
                >
                  Markdown (.md)
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                  onClick={() => {
                    exportAsPdf(contentRef.current);
                    setDlOpen(false);
                  }}
                >
                  PDF (.pdf)
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                  onClick={() => {
                    exportAsDocx(contentRef.current, "document");
                    setDlOpen(false);
                  }}
                >
                  Word (.docx)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Formatting toolbar ───────────────────────────────── */}
      <div className="hidden lg:block">
        <EditorToolbar onCommand={handleToolbarCommand} />
      </div>

      {/* ── Desktop: editor area ─────────────────────────────── */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {viewMode === "split" && (
          <SplitPane className="flex-1" left={textareaEl} right={previewEl} />
        )}
        {viewMode === "source" && (
          <div className="flex-1">{textareaEl}</div>
        )}
        {viewMode === "wysiwyg" && (
          <div className="flex-1">
            <WysiwygEditor initialContent={content} onChange={setContent} />
          </div>
        )}
      </div>

      {/* ── Mobile: tab layout ───────────────────────────────── */}
      <div className="flex lg:hidden flex-1 min-h-0">
        {mobileTab === "editor" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full resize-none bg-background font-mono text-sm p-4 outline-none leading-relaxed"
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
