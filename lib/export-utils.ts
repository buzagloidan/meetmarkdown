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

/** Convert markdown to HTML with Mermaid blocks rendered as inline SVGs */
export async function markdownToRenderedHtml(markdown: string): Promise<string> {
  const [{ markdownToHtml }, mermaidModule] = await Promise.all([
    import("@/lib/markdown-to-html"),
    import("mermaid"),
  ]);
  const mermaid = mermaidModule.default;
  mermaid.initialize({ startOnLoad: false, theme: "default" });

  let bodyHtml = await markdownToHtml(markdown);

  const parser = new DOMParser();
  const doc = parser.parseFromString(bodyHtml, "text/html");
  const mermaidBlocks = doc.querySelectorAll("code.language-mermaid");
  for (const block of mermaidBlocks) {
    const code = block.textContent ?? "";
    const id = `mermaid-export-${Math.random().toString(36).slice(2)}`;
    try {
      // svg is output from mermaid library — not user-supplied HTML
      const { svg } = await mermaid.render(id, code.trim());
      const wrapper = doc.createElement("div");
      wrapper.style.textAlign = "center";
      wrapper.style.margin = "1.5em 0";
      wrapper.innerHTML = svg;
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

  return doc.body.innerHTML;
}

export function buildFullHtml(bodyHtml: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title><style>${PRINT_STYLES}</style></head><body>${bodyHtml}</body></html>`;
}

/** Open a print-to-PDF dialog for the given markdown */
export async function exportAsPdf(markdown: string): Promise<void> {
  const bodyHtml = await markdownToRenderedHtml(markdown);
  const fullHtml = buildFullHtml(bodyHtml);

  const blob = new Blob([fullHtml], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  const win = window.open(blobUrl, "_blank");
  if (!win) { URL.revokeObjectURL(blobUrl); return; }

  win.addEventListener("afterprint", () => {
    win.close();
    URL.revokeObjectURL(blobUrl);
  });
  win.addEventListener("load", () => {
    win.focus();
    win.print();
  });
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

  // html-docx-js can't embed SVGs — convert each Mermaid SVG to a PNG <img> first
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

  // @ts-expect-error — no types for html-docx-js
  const htmlDocx = (await import("html-docx-js/dist/html-docx")).default;
  const blob = htmlDocx.asBlob(fullHtml) as Blob;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}
