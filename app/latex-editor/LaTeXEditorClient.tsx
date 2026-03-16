"use client";

import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { CopyButton } from "@/components/shared/CopyButton";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { ShareButton } from "@/components/shared/ShareButton";
import { useSharedContent } from "@/lib/use-shared-content";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-4 text-muted-foreground text-sm">Loading preview...</div> }
);

// ─── Symbol palette ──────────────────────────────────────────────────────────

const SYMBOL_GROUPS: { label: string; symbols: { label: string; latex: string }[] }[] = [
  {
    label: "Greek",
    symbols: [
      { label: "α", latex: "\\alpha" },
      { label: "β", latex: "\\beta" },
      { label: "γ", latex: "\\gamma" },
      { label: "δ", latex: "\\delta" },
      { label: "ε", latex: "\\epsilon" },
      { label: "θ", latex: "\\theta" },
      { label: "λ", latex: "\\lambda" },
      { label: "μ", latex: "\\mu" },
      { label: "π", latex: "\\pi" },
      { label: "σ", latex: "\\sigma" },
      { label: "φ", latex: "\\phi" },
      { label: "ω", latex: "\\omega" },
      { label: "Δ", latex: "\\Delta" },
      { label: "Σ", latex: "\\Sigma" },
      { label: "Ω", latex: "\\Omega" },
      { label: "Φ", latex: "\\Phi" },
    ],
  },
  {
    label: "Operators",
    symbols: [
      { label: "±", latex: "\\pm" },
      { label: "×", latex: "\\times" },
      { label: "÷", latex: "\\div" },
      { label: "·", latex: "\\cdot" },
      { label: "≠", latex: "\\neq" },
      { label: "≈", latex: "\\approx" },
      { label: "≤", latex: "\\leq" },
      { label: "≥", latex: "\\geq" },
      { label: "∞", latex: "\\infty" },
      { label: "∝", latex: "\\propto" },
      { label: "√", latex: "\\sqrt{}" },
      { label: "∂", latex: "\\partial" },
      { label: "∇", latex: "\\nabla" },
    ],
  },
  {
    label: "Arrows",
    symbols: [
      { label: "→", latex: "\\rightarrow" },
      { label: "←", latex: "\\leftarrow" },
      { label: "↔", latex: "\\leftrightarrow" },
      { label: "⇒", latex: "\\Rightarrow" },
      { label: "⇐", latex: "\\Leftarrow" },
      { label: "⇔", latex: "\\Leftrightarrow" },
      { label: "↦", latex: "\\mapsto" },
    ],
  },
  {
    label: "Sets & Logic",
    symbols: [
      { label: "∈", latex: "\\in" },
      { label: "∉", latex: "\\notin" },
      { label: "⊂", latex: "\\subset" },
      { label: "⊆", latex: "\\subseteq" },
      { label: "∪", latex: "\\cup" },
      { label: "∩", latex: "\\cap" },
      { label: "∅", latex: "\\emptyset" },
      { label: "∀", latex: "\\forall" },
      { label: "∃", latex: "\\exists" },
      { label: "¬", latex: "\\neg" },
      { label: "∧", latex: "\\land" },
      { label: "∨", latex: "\\lor" },
      { label: "ℝ", latex: "\\mathbb{R}" },
      { label: "ℤ", latex: "\\mathbb{Z}" },
      { label: "ℕ", latex: "\\mathbb{N}" },
    ],
  },
  {
    label: "Structures",
    symbols: [
      { label: "x²", latex: "^{2}" },
      { label: "xₙ", latex: "_{n}" },
      { label: "frac", latex: "\\frac{}{}" },
      { label: "sum", latex: "\\sum_{i=1}^{n}" },
      { label: "prod", latex: "\\prod_{i=1}^{n}" },
      { label: "int", latex: "\\int_{a}^{b}" },
      { label: "lim", latex: "\\lim_{x \\to \\infty}" },
      { label: "binom", latex: "\\binom{n}{k}" },
      { label: "vec", latex: "\\vec{v}" },
      { label: "hat", latex: "\\hat{x}" },
      { label: "bar", latex: "\\bar{x}" },
      { label: "dot", latex: "\\dot{x}" },
      { label: "matrix", latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
    ],
  },
];

// ─── Templates ───────────────────────────────────────────────────────────────

const TEMPLATES: { label: string; markdown: string }[] = [
  {
    label: "Quadratic Formula",
    markdown: `The solutions to $ax^2 + bx + c = 0$ are:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$`,
  },
  {
    label: "Euler's Identity",
    markdown: `Euler's identity connects five fundamental constants:

$$
e^{i\\pi} + 1 = 0
$$`,
  },
  {
    label: "Taylor Series",
    markdown: `The Taylor series expansion of $f(x)$ around $a$:

$$
f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x - a)^n
$$`,
  },
  {
    label: "Gaussian Integral",
    markdown: `The Gaussian integral:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$`,
  },
  {
    label: "Bayes' Theorem",
    markdown: `Bayes' theorem for conditional probability:

$$
P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)}
$$`,
  },
  {
    label: "Matrix Multiplication",
    markdown: `A $2 \\times 2$ matrix product:

$$
\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}
$$`,
  },
  {
    label: "Maxwell's Equations",
    markdown: `Maxwell's equations in differential form:

$$
\\begin{aligned}
\\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\epsilon_0} \\\\
\\nabla \\cdot \\mathbf{B} &= 0 \\\\
\\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\
\\nabla \\times \\mathbf{B} &= \\mu_0 \\mathbf{J} + \\mu_0 \\epsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}
\\end{aligned}
$$`,
  },
  {
    label: "Schrödinger Equation",
    markdown: `The time-dependent Schrödinger equation:

$$
i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\hat{H} \\Psi(\\mathbf{r}, t)
$$`,
  },
  {
    label: "Standard Deviation",
    markdown: `Population standard deviation:

$$
\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}
$$`,
  },
  {
    label: "Cauchy-Schwarz Inequality",
    markdown: `The Cauchy-Schwarz inequality:

$$
\\left| \\sum_{i=1}^{n} a_i b_i \\right|^2 \\leq \\left( \\sum_{i=1}^{n} a_i^2 \\right) \\left( \\sum_{i=1}^{n} b_i^2 \\right)
$$`,
  },
];

const DEFAULT_CONTENT = `# LaTeX Math in Markdown

Write inline math with single dollar signs: $E = mc^2$

Or display equations with double dollar signs:

$$
\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}
$$

## Try editing below

The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

A matrix:

$$
A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}
$$

A sum: $\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$
`;

// ─── Component ───────────────────────────────────────────────────────────────

type PaletteTab = "symbols" | "templates";

export function LaTeXEditorClient() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [paletteTab, setPaletteTab] = useState<PaletteTab>("symbols");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useSharedContent(useCallback((v: string) => setContent(v), []));

  function insertAtCursor(text: string) {
    const el = textareaRef.current;
    if (!el) {
      setContent((c) => c + text);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = content.slice(0, start) + text + content.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      // Place cursor inside empty braces if present, otherwise at end of insertion
      const bracePos = text.indexOf("{}");
      if (bracePos !== -1) {
        el.selectionStart = el.selectionEnd = start + bracePos + 1;
      } else {
        el.selectionStart = el.selectionEnd = start + text.length;
      }
    });
  }

  function loadTemplate(markdown: string) {
    setContent(markdown);
    setPaletteTab("symbols");
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => insertAtCursor("$$\n\n$$")}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Insert block $$
          </button>
          <button
            onClick={() => insertAtCursor("$$")}
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Insert inline $
          </button>
        </div>
        <div className="flex gap-2">
          <ShareButton path="/latex-editor" content={content} />
          <CopyButton text={content} />
          <DownloadButton content={content} filename="math-document.md" mimeType="text/markdown" />
        </div>
      </div>

      {/* Symbol palette / templates */}
      <div className="rounded-lg border bg-background">
        <div className="flex border-b">
          <button
            onClick={() => setPaletteTab("symbols")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              paletteTab === "symbols"
                ? "border-b-2 border-primary text-foreground -mb-px bg-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Symbols
          </button>
          <button
            onClick={() => setPaletteTab("templates")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              paletteTab === "templates"
                ? "border-b-2 border-primary text-foreground -mb-px bg-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Templates
          </button>
        </div>

        {paletteTab === "symbols" && (
          <div className="p-3 space-y-3 max-h-48 overflow-y-auto">
            {SYMBOL_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">{group.label}</p>
                <div className="flex flex-wrap gap-1">
                  {group.symbols.map((sym) => (
                    <button
                      key={sym.latex}
                      onClick={() => insertAtCursor(sym.latex)}
                      title={sym.latex}
                      className="w-9 h-9 rounded border text-sm font-mono hover:bg-accent hover:border-primary/50 transition-colors flex items-center justify-center"
                    >
                      {sym.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {paletteTab === "templates" && (
          <div className="p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.label}
                onClick={() => loadTemplate(tpl.markdown)}
                className="text-left p-2.5 rounded-lg border hover:bg-accent hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium leading-tight">{tpl.label}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-520px)] min-h-[400px]">
        <div className="flex flex-col min-h-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Markdown + LaTeX
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-h-0 resize-none rounded-lg border bg-background font-mono text-sm p-3 outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
            placeholder="Write markdown with $inline$ or $$block$$ LaTeX..."
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const next = content.slice(0, start) + "  " + content.slice(end);
                setContent(next);
                requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
              }
            }}
          />
        </div>
        <div className="flex flex-col min-h-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Preview
          </div>
          <div className="flex-1 min-h-0 rounded-lg border overflow-auto bg-background">
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
