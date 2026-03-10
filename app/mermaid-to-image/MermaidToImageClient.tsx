"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, ImageDown } from "lucide-react";

const SAMPLE = `flowchart TD
  A[Start] --> B{Is it Mermaid?}
  B -- Yes --> C[Render Diagram]
  B -- No --> D[Skip]
  C --> E[Export as Image]`;

export function MermaidToImageClient() {
  const [code, setCode] = useState(SAMPLE);
  const [svgHtml, setSvgHtml] = useState("");
  const [error, setError] = useState("");
  const [rendering, setRendering] = useState(false);
  const codeRef = useRef(code);
  codeRef.current = code;
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const renderDiagram = useCallback(async (source: string) => {
    if (!source.trim()) { setSvgHtml(""); setError(""); return; }
    setRendering(true);
    setError("");
    try {
      const mermaidModule = await import("mermaid");
      const mermaid = mermaidModule.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        // htmlLabels: false avoids <foreignObject> so canvas export works without taint
        flowchart: { htmlLabels: false },
        themeVariables: {
          background: "transparent",
          mainBkg: "transparent",
          nodeBorder: "#6366f1",
          primaryColor: "#ede9fe",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#6366f1",
          lineColor: "#6b7280",
          fontSize: "15px",
        },
      });
      const id = `mermaid-img-${Math.random().toString(36).slice(2)}`;
      // svg is mermaid library output — not user-supplied HTML
      const { svg } = await mermaid.render(id, source.trim());
      setSvgHtml(svg);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid diagram syntax");
      setSvgHtml("");
    } finally {
      setRendering(false);
    }
  }, []);

  // Debounced render on code change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => renderDiagram(codeRef.current), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, renderDiagram]);

  function getSvgEl(): SVGElement | null {
    return svgContainerRef.current?.querySelector("svg") ?? null;
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
        if (bgColor) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas);
      };
      img.onerror = () => reject(new Error("Failed to load SVG for export"));
      img.src = dataUri;
    });
  }

  async function downloadPng(transparent: boolean) {
    try {
      const canvas = await svgToCanvas(transparent ? null : "#ffffff");
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = transparent ? "diagram-transparent.png" : "diagram.png";
      a.click();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Export failed");
    }
  }

  async function downloadJpg() {
    try {
      const canvas = await svgToCanvas("#ffffff");
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "diagram.jpg";
      a.click();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Export failed");
    }
  }

  const [previewSrc, setPreviewSrc] = useState("");
  useEffect(() => {
    if (!svgHtml) { setPreviewSrc(""); return; }
    const t = setTimeout(async () => {
      try {
        const canvas = await svgToCanvas("#ffffff");
        setPreviewSrc(canvas.toDataURL("image/png"));
      } catch {
        setPreviewSrc("");
      }
    }, 100);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgHtml]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[480px]">
        {/* Editor */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Mermaid Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 min-h-[420px] resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
            placeholder={"flowchart TD\n  A[Start] --> B[End]"}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Preview
          </label>
          <div className="flex-1 min-h-[420px] rounded-lg border bg-white flex items-center justify-center overflow-auto relative">
            {rendering && (
              <p className="text-sm text-muted-foreground">Rendering…</p>
            )}
            {error && !rendering && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive max-w-sm mx-4">
                {error}
              </div>
            )}
            {/* Hidden SVG for getBoundingClientRect measurement */}
            {svgHtml && (
              <div
                ref={svgContainerRef}
                className="absolute opacity-0 pointer-events-none"
                /* svgHtml comes from mermaid.render() — library output, not user input */
                dangerouslySetInnerHTML={{ __html: svgHtml }}
              />
            )}
            {/* PNG img — enables native right-click Save/Copy */}
            {previewSrc && !rendering && !error && (
              <img
                src={previewSrc}
                alt="Mermaid diagram"
                className="max-w-full max-h-full object-contain p-4"
                title="Right-click to copy or save image"
              />
            )}
            {!svgHtml && !rendering && !error && (
              <p className="text-sm text-muted-foreground">Preview will appear here</p>
            )}
          </div>
          {previewSrc && (
            <p className="text-xs text-muted-foreground text-center">
              Right-click the diagram to copy or save directly
            </p>
          )}
        </div>
      </div>

      {/* Download buttons */}
      {previewSrc && (
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => downloadPng(true)}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            <ImageDown className="h-4 w-4" />
            Download PNG (transparent)
          </button>
          <button
            onClick={() => downloadPng(false)}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            <Download className="h-4 w-4" />
            Download PNG (white bg)
          </button>
          <button
            onClick={downloadJpg}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            <Download className="h-4 w-4" />
            Download JPG
          </button>
        </div>
      )}
    </div>
  );
}
