"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!ref.current) return;
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables:
            resolvedTheme === "dark"
              ? {
                  background: "transparent",
                  primaryColor: "#3D2218",
                  primaryTextColor: "#FFF8F0",
                  primaryBorderColor: "#C08552",
                  lineColor: "#C08552",
                  secondaryColor: "#2A1712",
                  tertiaryColor: "#1E0F0C",
                  edgeLabelBackground: "transparent",
                  clusterBkg: "#2A1712",
                  titleColor: "#FFF8F0",
                }
              : {
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
                },
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, code.trim());

        if (!cancelled && ref.current) {
          // Strip background CSS Mermaid injects inside the SVG <style> block
          const cleaned = svg.replace(/\bbackground\s*:[^;}"]+;?/g, "background: transparent;");

          // svg is sanitized output from mermaid library, not raw user HTML
          ref.current.innerHTML = cleaned;

          // Belt-and-suspenders: also clear via DOM after insert
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.background = "transparent";
            svgEl.style.backgroundColor = "transparent";
            // First rect child = background fill rect
            const bgRect = svgEl.querySelector(":scope > rect:first-child");
            if (bgRect) bgRect.setAttribute("fill", "transparent");
          }

          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme]);

  if (error) {
    return (
      <div className="rounded border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive font-mono">
        Mermaid error: {error}
      </div>
    );
  }

  return <div ref={ref} className="my-4 flex justify-center overflow-x-auto" />;
}
