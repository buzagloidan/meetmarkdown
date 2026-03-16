"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MarkdownPreview = dynamic(
  () => import("@/components/markdown/MarkdownPreview").then((m) => m.MarkdownPreview),
  { ssr: false, loading: () => <div className="p-4 text-muted-foreground text-sm">Loading preview...</div> }
);

// ─── Section helper ──────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b">{title}</h2>
      {children}
    </section>
  );
}

function Example({ code, description }: { code: string; description?: string }) {
  return (
    <div className="my-4 rounded-lg border overflow-hidden">
      {description && (
        <p className="px-4 pt-3 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">
            Markdown
          </div>
          <pre className="p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">{code}</pre>
        </div>
        <div>
          <div className="px-3 py-1.5 bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">
            Rendered
          </div>
          <MarkdownPreview content={code} />
        </div>
      </div>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

const sections = [
  { id: "basics", title: "Inline & Display Math" },
  { id: "greek", title: "Greek Letters" },
  { id: "operators", title: "Operators & Relations" },
  { id: "fractions", title: "Fractions & Binomials" },
  { id: "superscripts", title: "Superscripts & Subscripts" },
  { id: "roots", title: "Roots" },
  { id: "sums", title: "Sums, Products & Integrals" },
  { id: "limits", title: "Limits" },
  { id: "matrices", title: "Matrices" },
  { id: "aligned", title: "Aligned Equations" },
  { id: "sets", title: "Sets & Logic" },
  { id: "accents", title: "Accents & Decorations" },
  { id: "spacing", title: "Spacing" },
  { id: "text", title: "Text in Math" },
  { id: "colors", title: "Colors" },
];

export function LaTeXGuideContent() {
  return (
    <div className="space-y-12">
      {/* Quick jump */}
      <nav className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-sm px-3 py-1.5 rounded-full border hover:bg-accent transition-colors"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="rounded-lg border bg-card p-4 text-sm">
        <strong>Try it live:</strong> Open the{" "}
        <Link href="/latex-editor" className="text-primary underline underline-offset-2">
          LaTeX Math Editor
        </Link>{" "}
        or the{" "}
        <Link href="/editor" className="text-primary underline underline-offset-2">
          Markdown Editor
        </Link>{" "}
        to try any of these examples. Math rendering is powered by{" "}
        <a href="https://katex.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
          KaTeX
        </a>.
      </div>

      {/* ─── Basics ────────────────────────────────────────────────────── */}
      <Section id="basics" title="Inline & Display Math">
        <p className="text-muted-foreground mb-4">
          Use single dollar signs <code className="text-xs bg-muted px-1 py-0.5 rounded">$...$</code> for inline math and double dollar signs <code className="text-xs bg-muted px-1 py-0.5 rounded">$$...$$</code> for display (block) equations.
        </p>
        <Example
          code={`Inline: The equation $E = mc^2$ changed physics.`}
          description="Inline math flows within a sentence."
        />
        <Example
          code={`Display equation on its own line:\n\n$$\n\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}\n$$`}
          description="Display math is centered and gets its own vertical space."
        />
      </Section>

      {/* ─── Greek ─────────────────────────────────────────────────────── */}
      <Section id="greek" title="Greek Letters">
        <p className="text-muted-foreground mb-4">
          Lowercase with a backslash, uppercase by capitalising the first letter.
        </p>
        <Example
          code={`$\\alpha, \\beta, \\gamma, \\delta, \\epsilon, \\theta, \\lambda, \\mu, \\pi, \\sigma, \\phi, \\omega$\n\n$\\Gamma, \\Delta, \\Theta, \\Lambda, \\Sigma, \\Phi, \\Omega$`}
        />
      </Section>

      {/* ─── Operators ─────────────────────────────────────────────────── */}
      <Section id="operators" title="Operators & Relations">
        <Example
          code={`$\\pm \\, \\times \\, \\div \\, \\cdot \\, \\neq \\, \\approx \\, \\leq \\, \\geq \\, \\ll \\, \\gg \\, \\equiv \\, \\sim \\, \\propto \\, \\infty$`}
        />
      </Section>

      {/* ─── Fractions ─────────────────────────────────────────────────── */}
      <Section id="fractions" title="Fractions & Binomials">
        <Example
          code={`Fraction: $\\frac{a}{b}$ or display:\n\n$$\n\\frac{n!}{k!(n-k)!}\n$$`}
        />
        <Example
          code={`Binomial coefficient: $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$`}
        />
        <Example
          code={`Continued fraction:\n\n$$\nx = a_0 + \\cfrac{1}{a_1 + \\cfrac{1}{a_2 + \\cfrac{1}{a_3}}}\n$$`}
          description="Use \\cfrac for continued fractions (keeps numerator centered)."
        />
      </Section>

      {/* ─── Superscripts & Subscripts ─────────────────────────────────── */}
      <Section id="superscripts" title="Superscripts & Subscripts">
        <Example
          code={`$x^2$, $x^{n+1}$, $x_i$, $x_{i,j}$, $x_i^2$, $_{10}^{235}\\text{U}$`}
          description="Use ^ for superscripts and _ for subscripts. Wrap multi-character exponents in braces."
        />
      </Section>

      {/* ─── Roots ─────────────────────────────────────────────────────── */}
      <Section id="roots" title="Roots">
        <Example
          code={`$\\sqrt{x}$, $\\sqrt[3]{x}$, $\\sqrt{x^2 + y^2}$`}
          description="Square root with \\sqrt{}, nth root with \\sqrt[n]{}."
        />
      </Section>

      {/* ─── Sums, Products, Integrals ─────────────────────────────────── */}
      <Section id="sums" title="Sums, Products & Integrals">
        <Example
          code={`$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$`}
        />
        <Example
          code={`$$\n\\prod_{i=1}^{n} i = n!\n$$`}
        />
        <Example
          code={`$$\n\\int_{a}^{b} f(x) \\, dx \\qquad \\iint_{D} f(x,y) \\, dA \\qquad \\oint_{C} \\mathbf{F} \\cdot d\\mathbf{r}\n$$`}
          description="Single, double, and contour integrals."
        />
      </Section>

      {/* ─── Limits ────────────────────────────────────────────────────── */}
      <Section id="limits" title="Limits">
        <Example
          code={`$$\n\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\n$$`}
        />
        <Example
          code={`$$\n\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e\n$$`}
          description="Use \\left( and \\right) for auto-sizing parentheses."
        />
      </Section>

      {/* ─── Matrices ──────────────────────────────────────────────────── */}
      <Section id="matrices" title="Matrices">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-xs bg-muted px-1 py-0.5 rounded">pmatrix</code> (parentheses), <code className="text-xs bg-muted px-1 py-0.5 rounded">bmatrix</code> (brackets), <code className="text-xs bg-muted px-1 py-0.5 rounded">vmatrix</code> (determinant), or plain <code className="text-xs bg-muted px-1 py-0.5 rounded">matrix</code>.
        </p>
        <Example
          code={`$$\nA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\quad\nB = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\quad\n\\det(A) = \\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}\n$$`}
        />
      </Section>

      {/* ─── Aligned ───────────────────────────────────────────────────── */}
      <Section id="aligned" title="Aligned Equations">
        <p className="text-muted-foreground mb-4">
          Use <code className="text-xs bg-muted px-1 py-0.5 rounded">aligned</code> to align multiple equations at the <code className="text-xs bg-muted px-1 py-0.5 rounded">&</code> symbol.
        </p>
        <Example
          code={`$$\n\\begin{aligned}\n(a + b)^2 &= a^2 + 2ab + b^2 \\\\\n(a - b)^2 &= a^2 - 2ab + b^2 \\\\\n(a + b)(a - b) &= a^2 - b^2\n\\end{aligned}\n$$`}
        />
      </Section>

      {/* ─── Sets & Logic ──────────────────────────────────────────────── */}
      <Section id="sets" title="Sets & Logic">
        <Example
          code={`$\\in, \\notin, \\subset, \\subseteq, \\cup, \\cap, \\emptyset, \\forall, \\exists, \\neg, \\land, \\lor$\n\n$\\mathbb{R}, \\mathbb{Z}, \\mathbb{N}, \\mathbb{Q}, \\mathbb{C}$`}
          description="Common set and logic symbols, plus number set blackboard bold."
        />
        <Example
          code={`$$\nA = \\{ x \\in \\mathbb{R} \\mid x^2 < 4 \\}\n$$`}
          description="Set builder notation."
        />
      </Section>

      {/* ─── Accents ───────────────────────────────────────────────────── */}
      <Section id="accents" title="Accents & Decorations">
        <Example
          code={`$\\hat{x}, \\bar{x}, \\vec{v}, \\dot{x}, \\ddot{x}, \\tilde{x}, \\widehat{ABC}, \\overline{AB}, \\underline{text}$`}
        />
      </Section>

      {/* ─── Spacing ───────────────────────────────────────────────────── */}
      <Section id="spacing" title="Spacing">
        <p className="text-muted-foreground mb-4">
          LaTeX manages spacing automatically, but you can fine-tune it.
        </p>
        <Example
          code={`$a \\, b$ (thin) vs $a \\; b$ (medium) vs $a \\quad b$ (wide) vs $a \\qquad b$ (extra wide)`}
          description="Use \\, \\; \\quad \\qquad for increasing amounts of space."
        />
      </Section>

      {/* ─── Text ──────────────────────────────────────────────────────── */}
      <Section id="text" title="Text in Math">
        <Example
          code={`$$\nf(x) = x^2 \\quad \\text{for all } x \\in \\mathbb{R}\n$$`}
          description="Use \\text{} to include normal text inside math mode."
        />
      </Section>

      {/* ─── Colors ────────────────────────────────────────────────────── */}
      <Section id="colors" title="Colors">
        <Example
          code={`$$\n\\textcolor{blue}{\\text{blue}} + \\textcolor{red}{\\text{red}} = \\textcolor{purple}{\\text{purple}}\n$$`}
          description="Use \\textcolor{color}{...} for colored math."
        />
      </Section>

      {/* CTA */}
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-lg font-bold mb-2">Ready to write math?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Open the dedicated math editor with a symbol palette and formula templates.
        </p>
        <Link
          href="/latex-editor"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium h-10 px-6 hover:bg-primary/90 transition-colors"
        >
          Open LaTeX Math Editor
        </Link>
      </div>
    </div>
  );
}
