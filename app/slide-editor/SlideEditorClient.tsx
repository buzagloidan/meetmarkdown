"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileCode2,
  Share2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { buildShareUrl, decodeShareContent } from "@/lib/share";

// ─── Constants ────────────────────────────────────────────────────────────────

const SLIDE_W = 1280;
const SLIDE_H = 720;

// ─── Templates ───────────────────────────────────────────────────────────────

const TEMPLATES: { label: string; description: string; code: string }[] = [
  {
    label: "Clean",
    description: "Default theme, clean layout",
    code: `---
marp: true
theme: default
paginate: true
---

# My Presentation

Subtitle or author name

---

## Agenda

- Introduction
- Key points
- Conclusion

---

## Main Content

Write your content here.

> Use **bold**, _italic_, and \`code\` formatting freely.

---

## Thank You

Questions?
`,
  },
  {
    label: "Dark (Gaia)",
    description: "Gaia theme with dark invert",
    code: `---
marp: true
theme: gaia
class: invert
paginate: true
---

# Dark Presentation

Powered by Marp

---

## Key Points

1. First important point
2. Second important point
3. Third important point

---

## Code Example

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

---

<!-- _class: lead invert -->

## The End
`,
  },
  {
    label: "Uncover",
    description: "Minimal uncover theme",
    code: `---
marp: true
theme: uncover
paginate: true
---

# Clean & Minimal

*Uncover theme*

---

## Section Title

Content goes here with a clean, minimal look.

- Point A
- Point B
- Point C

---

## Two Columns

<div style="display:flex;gap:2rem">
<div>

**Left**
- Item 1
- Item 2

</div>
<div>

**Right**
- Item 3
- Item 4

</div>
</div>

---

# Thank You
`,
  },
  {
    label: "Technical",
    description: "Code-heavy slides",
    code: `---
marp: true
theme: default
paginate: true
---

# Technical Deep Dive

Presented by: Your Name

---

## Architecture Overview

\`\`\`
┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│    Backend   │
│  (Next.js)   │     │  (Node/API)  │
└──────────────┘     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │   Database   │
                     │  (Postgres)  │
                     └──────────────┘
\`\`\`

---

## Code Sample

\`\`\`typescript
interface Slide {
  id: string;
  content: string;
  theme: "default" | "gaia" | "uncover";
}

function renderSlide(slide: Slide): string {
  return \`<section>\${slide.content}</section>\`;
}
\`\`\`

---

## Results

| Metric | Before | After |
|--------|--------|-------|
| Load time | 3.2s | 0.8s |
| Bundle size | 450 KB | 120 KB |
| LCP | 4.1s | 1.2s |

---

## Next Steps

1. Deploy to production
2. Monitor metrics
3. Iterate on feedback
`,
  },
  {
    label: "Lead Slide",
    description: "Gaia lead + section layout",
    code: `---
marp: true
theme: gaia
paginate: true
---

<!-- _class: lead -->

# Big Idea

The headline that grabs attention

---

## Background

Set the context here. Why does this matter?

Explain the problem or opportunity in 2–3 sentences.

---

<!-- _class: lead -->

## Section 2

---

## Details

Go deeper on the topic.

- Supporting point with evidence
- Another supporting point
- Third point

---

<!-- _class: lead -->

# Questions?

your@email.com
`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildSrcdoc(html: string, css: string, slideIndex: number): string {
  // Marp renders each slide as <svg data-marpit-svg> inside <div class="marpit">.
  // We hide all SVGs then show only the current one.
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${css}
html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
div.marpit > svg[data-marpit-svg] { display: none !important; }
div.marpit > svg[data-marpit-svg]:nth-of-type(${slideIndex + 1}) { display: block !important; }
</style>
</head>
<body>
${html}
</body>
</html>`;
}

// ─── Component ───────────────────────────────────────────────────────────────

type Tab = "editor" | "templates";

export function SlideEditorClient() {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [renderedHtml, setRenderedHtml] = useState("");
  const [renderedCss, setRenderedCss] = useState("");
  const [slideCount, setSlideCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [rendering, setRendering] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("editor");
  const [scale, setScale] = useState(1);

  const [shareCopied, setShareCopied] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load shared content from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const decoded = decodeShareContent(hash);
    if (decoded) {
      setCode(decoded);
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Scale slide canvas to fit preview area
  useEffect(() => {
    function updateScale() {
      if (!previewRef.current) return;
      const { width, height } = previewRef.current.getBoundingClientRect();
      const padding = 48;
      const s = Math.min(
        (width - padding) / SLIDE_W,
        (height - padding) / SLIDE_H,
      );
      setScale(Math.max(0.05, s));
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (previewRef.current) ro.observe(previewRef.current);
    return () => ro.disconnect();
  }, []);

  const render = useCallback(async (source: string) => {
    if (!source.trim()) {
      setRenderedHtml("");
      setRenderedCss("");
      setSlideCount(0);
      return;
    }
    setRendering(true);
    setError("");
    try {
      const { default: Marp } = await import("@marp-team/marp-core");
      const marp = new Marp({ html: true });
      const result = marp.render(source);
      setRenderedHtml(result.html);
      setRenderedCss(result.css);
      const count = (result.html.match(/<svg[^>]+data-marpit-svg/g) ?? []).length;
      setSlideCount(count);
      setCurrentSlide((s) => Math.min(s, Math.max(0, count - 1)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Render error");
      setRenderedHtml("");
      setRenderedCss("");
      setSlideCount(0);
    } finally {
      setRendering(false);
    }
  }, []);

  // Debounced render on code change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => render(code), 450);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, render]);

  function prevSlide() {
    setCurrentSlide((s) => Math.max(0, s - 1));
  }
  function nextSlide() {
    setCurrentSlide((s) => Math.min(slideCount - 1, s + 1));
  }

  function exportHtml() {
    if (!renderedHtml) {
      toast.error("Nothing to export");
      return;
    }
    const full = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Presentation</title>
<style>
${renderedCss}
html, body { margin: 0; padding: 0; }
</style>
</head>
<body>
${renderedHtml}
</body>
</html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML presentation downloaded");
  }

  function exportMarkdown() {
    const blob = new Blob([code], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown downloaded");
  }

  const srcdoc =
    renderedHtml
      ? buildSrcdoc(renderedHtml, renderedCss, currentSlide)
      : "";

  const hasSlides = !!renderedHtml && !error;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b bg-background flex-shrink-0 flex-wrap gap-y-2">
        {/* Slide navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0 || !hasSlides}
            title="Previous slide"
            className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 py-1 text-xs font-mono text-muted-foreground min-w-[4.5rem] text-center tabular-nums">
            {hasSlides ? `${currentSlide + 1} / ${slideCount}` : "— / —"}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= slideCount - 1 || !hasSlides}
            title="Next slide"
            className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Share + Export buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (!code.trim()) { toast.error("Nothing to share"); return; }
              const url = buildShareUrl("/slide-editor", code);
              if (url.length > 100_000) { toast.error("Content too large to share via URL"); return; }
              try {
                await navigator.clipboard.writeText(url);
                setShareCopied(true);
                toast.success("Share link copied to clipboard");
                setTimeout(() => setShareCopied(false), 2000);
              } catch { toast.error("Could not copy to clipboard"); }
            }}
            disabled={!code.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {shareCopied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {shareCopied ? "Copied!" : "Share"}
          </button>
          <button
            onClick={exportMarkdown}
            disabled={!code.trim()}
            title="Download .md file"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileCode2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save .md</span>
          </button>
          <button
            onClick={exportHtml}
            disabled={!hasSlides}
            title="Download self-contained HTML presentation"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            Export HTML
          </button>
        </div>
      </div>

      {/* ── Main split ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left panel: editor / templates */}
        <div className="flex flex-col w-full lg:w-[420px] lg:flex-shrink-0 border-r overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b bg-muted/30">
            {(["editor", "templates"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
                  activeTab === t
                    ? "border-b-2 border-primary text-foreground -mb-px bg-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Editor */}
          {activeTab === "editor" && (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 resize-none font-mono text-sm p-3 outline-none bg-background focus:ring-1 focus:ring-ring h-48 lg:h-full"
              spellCheck={false}
              placeholder={"---\nmarp: true\n---\n\n# My Slide"}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const el = e.currentTarget;
                  const start = el.selectionStart;
                  const end = el.selectionEnd;
                  const next =
                    code.slice(0, start) + "  " + code.slice(end);
                  setCode(next);
                  requestAnimationFrame(() => {
                    el.selectionStart = el.selectionEnd = start + 2;
                  });
                }
              }}
            />
          )}

          {/* Templates */}
          {activeTab === "templates" && (
            <div className="flex-1 overflow-y-auto p-2 grid grid-cols-1 gap-1">
              {TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => {
                    setCode(t.code);
                    setCurrentSlide(0);
                    setActiveTab("editor");
                  }}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors group border border-transparent hover:border-border"
                >
                  <p className="text-sm font-medium group-hover:text-foreground">
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.description}
                  </p>
                </button>
              ))}

              {/* Syntax tip */}
              <div className="mt-2 mx-1 p-3 rounded-lg bg-muted/40 border border-border/50">
                <p className="text-xs font-semibold text-foreground mb-1.5">
                  Marp tips
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>
                    <code className="bg-muted px-1 rounded">---</code> separates slides
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">theme:</code>{" "}
                    default · gaia · uncover
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">paginate: true</code> adds page numbers
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">{`<!-- _class: lead -->`}</code> big centered slide
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right panel: slide preview */}
        <div
          ref={previewRef}
          className="flex-1 overflow-hidden relative bg-neutral-700 dark:bg-neutral-900 flex items-center justify-center"
        >
          {rendering && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <p className="text-sm text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                Rendering…
              </p>
            </div>
          )}

          {error && !rendering && (
            <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
              <div className="rounded-xl border border-destructive/50 bg-background/95 backdrop-blur p-5 text-sm text-destructive max-w-lg shadow-lg">
                <p className="font-semibold mb-1">Render error</p>
                <pre className="whitespace-pre-wrap text-xs opacity-80 font-mono">
                  {error}
                </pre>
              </div>
            </div>
          )}

          {!renderedHtml && !rendering && !error && (
            <p className="text-sm text-white/40">Preview will appear here</p>
          )}

          {hasSlides && (
            <div
              style={{
                width: SLIDE_W,
                height: SLIDE_H,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                flexShrink: 0,
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              <iframe
                srcDoc={srcdoc}
                title={`Slide ${currentSlide + 1} of ${slideCount}`}
                sandbox="allow-scripts"
                className="w-full h-full border-0 block"
                style={{ width: SLIDE_W, height: SLIDE_H }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
