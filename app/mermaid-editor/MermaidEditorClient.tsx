"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Download,
  Copy,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronDown,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";

// ─── Sample diagrams ─────────────────────────────────────────────────────────

const SAMPLES: { label: string; code: string }[] = [
  {
    label: "Flowchart",
    code: `flowchart TD
  A[Start] --> B{Is it Mermaid?}
  B -- Yes --> C[Render Diagram]
  B -- No --> D[Skip]
  C --> E[Export as Image]`,
  },
  {
    label: "Sequence",
    code: `sequenceDiagram
  participant Alice
  participant Bob
  Alice->>Bob: Hello Bob, how are you?
  Bob-->>Alice: Great, thanks!
  Alice->>Bob: See you around`,
  },
  {
    label: "Class",
    code: `classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +quack()
    +swim()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }`,
  },
  {
    label: "State",
    code: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing : start
  Processing --> Done : success
  Processing --> Error : fail
  Done --> [*]
  Error --> Idle : retry`,
  },
  {
    label: "ER Diagram",
    code: `erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER {
    string name
    string email
  }
  ORDER {
    int id
    date created
  }
  LINE-ITEM {
    int quantity
    float price
  }`,
  },
  {
    label: "Gantt",
    code: `gantt
  title A Simple Project
  dateFormat  YYYY-MM-DD
  section Design
  Wireframes       :done, des1, 2024-01-01, 3d
  Mockups          :active, des2, after des1, 4d
  section Dev
  Backend          :dev1, after des2, 6d
  Frontend         :dev2, after des2, 6d`,
  },
  {
    label: "Pie Chart",
    code: `pie title Browser Market Share
  "Chrome" : 65
  "Safari" : 18
  "Firefox" : 7
  "Edge" : 6
  "Other" : 4`,
  },
  {
    label: "Git Graph",
    code: `gitGraph
  commit id: "Initial commit"
  branch feature
  checkout feature
  commit id: "Add feature"
  commit id: "Fix tests"
  checkout main
  merge feature
  commit id: "Release v1.0"`,
  },
  {
    label: "Mindmap",
    code: `mindmap
  root((MeetMarkdown))
    Tools
      Editor
      Formatter
      Diff
    Export
      PNG
      SVG
      PDF
    Features
      Dark mode
      Offline
      Free forever`,
  },
];

// ─── Available themes ─────────────────────────────────────────────────────────

const THEMES: { name: string; description: string }[] = [
  { name: "default", description: "The default theme for all diagrams." },
  { name: "neutral", description: "Great for black and white documents that will be printed." },
  { name: "dark", description: "Goes well with dark-colored elements or dark-mode." },
  { name: "forest", description: "Contains shades of green." },
  { name: "base", description: "The only theme that can be modified via themeVariables." },
];

const DEFAULT_CONFIG = `{
  "theme": "base"
}`;

type BgOption = "transparent" | "white" | "dark" | "custom";
type Tab = "code" | "config" | "samples";

// ─── Component ───────────────────────────────────────────────────────────────

export function MermaidEditorClient() {
  const [code, setCode] = useState(SAMPLES[0].code);
  const [configText, setConfigText] = useState(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<Tab>("code");
  const [svgHtml, setSvgHtml] = useState("");
  const [error, setError] = useState("");
  const [rendering, setRendering] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const [bg, setBg] = useState<BgOption>("white");
  const [customBg, setCustomBg] = useState("#ffffff");
  const [handDrawn, setHandDrawn] = useState(false);

  const codeRef = useRef(code);
  codeRef.current = code;
  const configRef = useRef(configText);
  configRef.current = configText;
  const handDrawnRef = useRef(handDrawn);
  handDrawnRef.current = handDrawn;

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const renderDiagram = useCallback(async (source: string, cfgText: string, sketch: boolean) => {
    if (!source.trim()) { setSvgHtml(""); setError(""); return; }
    setRendering(true);
    setError("");
    try {
      let extraConfig: Record<string, unknown> = {};
      try { extraConfig = JSON.parse(cfgText); } catch { /* ignore bad JSON */ }

      const mermaidModule = await import("mermaid");
      const mermaid = mermaidModule.default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        look: sketch ? "handDrawn" : "classic",
        flowchart: { htmlLabels: false },
        themeVariables: {
          background: "transparent",
          primaryColor: "#F5E6D3",
          primaryTextColor: "#4B2E2B",
          primaryBorderColor: "#C08552",
          lineColor: "#8C5A3C",
          secondaryColor: "#FFF8F0",
          tertiaryColor: "#FFFCF8",
          edgeLabelBackground: "transparent",
          clusterBkg: "#F5E6D3",
          titleColor: "#4B2E2B",
          fontSize: "15px",
        },
        ...extraConfig,
      });

      const id = `mermaid-live-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, source.trim());
      setSvgHtml(svg);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid diagram syntax");
      setSvgHtml("");
    } finally {
      setRendering(false);
    }
  }, []);

  // Debounced re-render on code / config / handDrawn change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => renderDiagram(codeRef.current, configRef.current, handDrawnRef.current),
      400,
    );
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, configText, handDrawn, renderDiagram]);

  // ── Zoom helpers ──────────────────────────────────────────────────────────
  function zoomIn() { setZoom((z) => Math.min(parseFloat((z + 0.25).toFixed(2)), 4)); }
  function zoomOut() { setZoom((z) => Math.max(parseFloat((z - 0.25).toFixed(2)), 0.25)); }
  function zoomReset() { setZoom(1); setPan({ x: 0, y: 0 }); }

  // Mouse-wheel zoom on the preview panel
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => parseFloat(Math.min(4, Math.max(0.25, z + delta)).toFixed(2)));
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ── Theme helpers ──────────────────────────────────────────────────────────
  function applyTheme(name: string) {
    try {
      const parsed = JSON.parse(configText) as Record<string, unknown>;
      parsed.theme = name;
      setConfigText(JSON.stringify(parsed, null, 2));
    } catch {
      setConfigText(JSON.stringify({ theme: name }, null, 2));
    }
  }

  function activeTheme(): string {
    try {
      const parsed = JSON.parse(configText) as Record<string, unknown>;
      return typeof parsed.theme === "string" ? parsed.theme : "";
    } catch {
      return "";
    }
  }

  // ── SVG helpers ───────────────────────────────────────────────────────────
  function getSvgEl(): SVGElement | null {
    return svgContainerRef.current?.querySelector("svg") ?? null;
  }

  function getEffectiveBg(): string | null {
    if (bg === "transparent") return null;
    if (bg === "white") return "#ffffff";
    if (bg === "dark") return "#1e1e2e";
    return customBg;
  }

  async function svgToCanvas(bgColor: string | null): Promise<HTMLCanvasElement> {
    const svgEl = getSvgEl();
    if (!svgEl) throw new Error("No diagram rendered");

    const clone = svgEl.cloneNode(true) as SVGElement;
    const bbox = svgEl.getBoundingClientRect();
    const w = Math.round(bbox.width) || 800;
    const h = Math.round(bbox.height) || 600;
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));

    if (bgColor) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("fill", bgColor);
      clone.insertBefore(rect, clone.firstChild);
    } else {
      const bgRect = clone.querySelector(":scope > rect:first-child");
      if (bgRect) bgRect.setAttribute("fill", "none");
    }

    const svgData = new XMLSerializer().serializeToString(clone);
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = 2;
        const canvas = document.createElement("canvas");
        canvas.width = w * scale;
        canvas.height = h * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(scale, scale);
        if (bgColor) { ctx.fillStyle = bgColor; ctx.fillRect(0, 0, w, h); }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas);
      };
      img.onerror = () => reject(new Error("Failed to load SVG for export"));
      img.src = dataUri;
    });
  }

  // ── Export actions ────────────────────────────────────────────────────────
  async function downloadSvg() {
    const svgEl = getSvgEl();
    if (!svgEl) { toast.error("No diagram rendered"); return; }
    try {
      const clone = svgEl.cloneNode(true) as SVGElement;
      const bgColor = getEffectiveBg();
      if (bgColor) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", bgColor);
        clone.insertBefore(rect, clone.firstChild);
      }
      const svgData = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.svg";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    }
  }

  async function downloadPng() {
    try {
      const canvas = await svgToCanvas(getEffectiveBg());
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "diagram.png";
      a.click();
      toast.success("PNG downloaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    }
  }

  async function copyImage() {
    try {
      const canvas = await svgToCanvas(getEffectiveBg());
      canvas.toBlob(async (blob) => {
        if (!blob) { toast.error("Failed to create image"); return; }
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          toast.success("Diagram copied to clipboard");
        } catch {
          toast.error("Clipboard access denied — try downloading instead");
        }
      }, "image/png");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Copy failed");
    }
  }

  // ── Background style for preview ──────────────────────────────────────────
  const previewBgStyle =
    bg === "transparent"
      ? { backgroundImage: "repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%)", backgroundSize: "16px 16px" }
      : bg === "dark"
      ? { backgroundColor: "#1e1e2e" }
      : bg === "custom"
      ? { backgroundColor: customBg }
      : { backgroundColor: "#ffffff" };

  const hasDiagram = !!svgHtml && !error;
  const currentTheme = activeTheme();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ── Top toolbar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b bg-background flex-shrink-0 flex-wrap gap-y-2">
        {/* Left: zoom + hand-drawn */}
        <div className="flex items-center gap-1">
          <button onClick={zoomOut} title="Zoom out" className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button onClick={zoomReset} className="px-2 py-1 rounded hover:bg-accent text-xs font-mono text-muted-foreground hover:text-foreground transition-colors min-w-[3.5rem] text-center">
            {Math.round(zoom * 100)}%
          </button>
          <button onClick={zoomIn} title="Zoom in" className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={zoomReset} title="Reset zoom" className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          <button
            onClick={() => setHandDrawn((v) => !v)}
            title="Toggle hand-drawn style"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              handDrawn ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Pencil className="h-3.5 w-3.5" />
            Hand-drawn
          </button>
        </div>

        {/* Right: background + export */}
        <div className="flex items-center gap-2">
          {/* Background picker */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">BG:</span>
            {(["transparent", "white", "dark"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setBg(opt)}
                title={opt}
                className={`w-6 h-6 rounded border-2 transition-all ${
                  bg === opt ? "border-primary scale-110" : "border-border hover:border-muted-foreground"
                } ${
                  opt === "transparent"
                    ? "bg-[repeating-conic-gradient(#ccc_0%_25%,white_0%_50%)] [background-size:8px_8px]"
                    : opt === "white"
                    ? "bg-white"
                    : "bg-[#1e1e2e]"
                }`}
              />
            ))}
            <label title="Custom color" className={`w-6 h-6 rounded border-2 cursor-pointer transition-all overflow-hidden ${bg === "custom" ? "border-primary scale-110" : "border-border hover:border-muted-foreground"}`}>
              <input
                type="color"
                value={customBg}
                onChange={(e) => { setCustomBg(e.target.value); setBg("custom"); }}
                className="w-8 h-8 -translate-x-1 -translate-y-1 cursor-pointer opacity-0 absolute"
              />
              <div className="w-full h-full rounded" style={{ backgroundColor: customBg }} />
            </label>
          </div>

          <div className="w-px h-5 bg-border" />

          {/* Export buttons */}
          <button
            disabled={!hasDiagram}
            onClick={copyImage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>

          <div className="relative group">
            <button
              disabled={!hasDiagram}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5" />
              Export
              <ChevronDown className="h-3 w-3" />
            </button>
            {hasDiagram && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border bg-popover shadow-lg overflow-hidden z-10 hidden group-hover:block">
                <button onClick={downloadPng} className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors">
                  PNG (2×)
                </button>
                <button onClick={downloadSvg} className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors">
                  SVG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main split ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left panel: editor / config / samples */}
        <div className="flex flex-col w-full lg:w-[420px] lg:flex-shrink-0 border-r overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b bg-muted/30">
            {(["code", "config", "samples"] as Tab[]).map((t) => (
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

          {/* Tab content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === "code" && (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 resize-none font-mono text-sm p-3 outline-none bg-background focus:ring-1 focus:ring-ring h-48 lg:h-full"
                spellCheck={false}
                placeholder={"flowchart TD\n  A[Start] --> B[End]"}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const el = e.currentTarget;
                    const start = el.selectionStart;
                    const end = el.selectionEnd;
                    const next = code.slice(0, start) + "  " + code.slice(end);
                    setCode(next);
                    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
                  }
                }}
              />
            )}

            {activeTab === "config" && (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* JSON editor */}
                <textarea
                  value={configText}
                  onChange={(e) => setConfigText(e.target.value)}
                  className="flex-1 resize-none font-mono text-sm p-3 outline-none bg-background focus:ring-1 focus:ring-ring h-32 lg:h-48 min-h-[8rem]"
                  spellCheck={false}
                />

                {/* Theme reference panel */}
                <div className="border-t bg-muted/20 overflow-y-auto flex-shrink-0">
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-xs font-semibold text-foreground mb-0.5">Available Themes</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Click a theme to apply it.
                    </p>
                  </div>
                  <div className="px-3 pb-3 space-y-1">
                    {THEMES.map((t) => {
                      const isActive = currentTheme === t.name;
                      return (
                        <button
                          key={t.name}
                          onClick={() => applyTheme(t.name)}
                          className={`w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg border transition-colors ${
                            isActive
                              ? "bg-primary/10 border-primary/40 text-foreground"
                              : "border-transparent hover:bg-accent hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <code className={`text-xs font-mono font-semibold shrink-0 mt-px ${isActive ? "text-primary" : ""}`}>
                            {t.name}
                          </code>
                          <span className="text-xs leading-snug">{t.description}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-xs text-muted-foreground">
                      Any{" "}
                      <code className="bg-muted px-1 rounded text-xs">MermaidConfig</code> key
                      is supported — e.g.{" "}
                      <code className="bg-muted px-1 rounded text-xs">&quot;fontSize&quot;</code>,{" "}
                      <code className="bg-muted px-1 rounded text-xs">&quot;flowchart&quot;</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "samples" && (
              <div className="flex-1 overflow-y-auto p-2 grid grid-cols-1 gap-1">
                {SAMPLES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setCode(s.code); setActiveTab("code"); }}
                    className="text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors group border border-transparent hover:border-border"
                  >
                    <p className="text-sm font-medium group-hover:text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{s.code.slice(0, 60)}…</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel: preview */}
        <div ref={previewRef} className="flex-1 overflow-hidden relative" style={previewBgStyle}>
          {/* Hidden SVG for measurement */}
          {svgHtml && (
            <div
              ref={svgContainerRef}
              className="absolute opacity-0 pointer-events-none"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          )}

          {rendering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground bg-background/70 px-3 py-1.5 rounded-full backdrop-blur-sm">
                Rendering…
              </p>
            </div>
          )}

          {error && !rendering && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="rounded-xl border border-destructive/50 bg-background/90 backdrop-blur p-5 text-sm text-destructive max-w-md shadow-lg">
                <p className="font-semibold mb-1">Syntax error</p>
                <pre className="whitespace-pre-wrap text-xs opacity-80">{error}</pre>
              </div>
            </div>
          )}

          {!svgHtml && !rendering && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Preview will appear here</p>
            </div>
          )}

          {/* Zoomable + pannable SVG */}
          {svgHtml && !error && (
            <div
              className="w-full h-full overflow-hidden select-none"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                setIsDragging(true);
                dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
              }}
              onMouseMove={(e) => {
                if (!isDragging) return;
                setPan({
                  x: dragOrigin.current.px + e.clientX - dragOrigin.current.mx,
                  y: dragOrigin.current.py + e.clientY - dragOrigin.current.my,
                });
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.15s ease",
                }}
                dangerouslySetInnerHTML={{ __html: svgHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
