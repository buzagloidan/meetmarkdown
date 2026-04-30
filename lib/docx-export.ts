"use client";

import { buildFullHtml, markdownToRenderedHtml } from "@/lib/export-utils";

declare global {
  interface Window {
    htmlDocx?: {
      asBlob(html: string): Blob;
    };
  }
}

const HTML_DOCX_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/html-docx-js@0.3.1/dist/html-docx.js";

let htmlDocxLoadPromise: Promise<NonNullable<Window["htmlDocx"]>> | null = null;

function loadHtmlDocx(): Promise<NonNullable<Window["htmlDocx"]>> {
  if (window.htmlDocx) return Promise.resolve(window.htmlDocx);

  htmlDocxLoadPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = HTML_DOCX_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      if (window.htmlDocx) {
        resolve(window.htmlDocx);
      } else {
        reject(new Error("DOCX exporter failed to initialize"));
      }
    };
    script.onerror = () => reject(new Error("DOCX exporter failed to load"));
    document.head.appendChild(script);
  });

  return htmlDocxLoadPromise;
}

/**
 * Convert an SVG element to a PNG data URL via canvas.
 * Falls back to an SVG data URI if the canvas gets tainted
 * (e.g. Mermaid SVGs that contain <foreignObject>).
 */
async function svgToImgSrc(svgEl: SVGSVGElement): Promise<string | null> {
  const svgData = new XMLSerializer().serializeToString(svgEl);
  const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth || svgEl.viewBox?.baseVal?.width || 700;
        const h = img.naturalHeight || svgEl.viewBox?.baseVal?.height || 400;
        const canvas = document.createElement("canvas");
        canvas.width = w * 2;
        canvas.height = h * 2;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(2, 2);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        // Canvas tainted (foreignObject in SVG) — embed SVG directly
        resolve(svgDataUri);
      }
    };
    img.onerror = () => resolve(null);
    img.src = svgDataUri;
  });
}

/** Download markdown as a .docx file */
export async function exportAsDocx(markdown: string, filename = "document"): Promise<void> {
  const bodyHtml = await markdownToRenderedHtml(markdown);

  // html-docx-js can't embed SVGs, so convert each Mermaid SVG to a PNG <img> first.
  const parser = new DOMParser();
  const doc = parser.parseFromString(bodyHtml, "text/html");
  const svgWrappers = doc.querySelectorAll<HTMLElement>("div[style*='text-align: center'] svg, div[style*='text-align:center'] svg");
  for (const svgEl of svgWrappers) {
    const src = await svgToImgSrc(svgEl as unknown as SVGSVGElement);
    if (src) {
      const img = doc.createElement("img");
      img.src = src;
      img.style.maxWidth = "100%";
      svgEl.parentElement?.replaceChild(img, svgEl);
    }
  }

  const fullHtml = buildFullHtml(doc.body.innerHTML);
  const htmlDocx = await loadHtmlDocx();
  const blob = htmlDocx.asBlob(fullHtml);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}
