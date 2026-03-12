"use client";

import Link from "next/link";
import { encodeShareContent } from "@/lib/share";

/* ------------------------------------------------------------------ */
/*  Example tables                                                     */
/* ------------------------------------------------------------------ */

const basicTable = `| Name       | Role       | Location   |
|------------|------------|------------|
| Alice      | Engineer   | Berlin     |
| Bob        | Designer   | London     |
| Carol      | PM         | New York   |`;

const alignmentTable = `| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Alice        |    Engineer    |        90,000 |
| Bob          |    Designer    |        85,000 |
| Carol        |       PM       |        95,000 |`;

const formattingTable = `| Feature      | Status          | Notes                        |
|--------------|-----------------|------------------------------|
| **Auth**     | \`done\`          | Uses [OAuth 2.0](https://oauth.net) |
| *Search*     | \`in-progress\`   | Full-text with **Postgres**  |
| ~~Legacy~~   | \`deprecated\`    | Remove in v3                 |`;

const multilineTable = `| Method | Endpoint         | Description                                 |
|--------|------------------|---------------------------------------------|
| GET    | /api/users       | List all users.<br>Supports pagination.     |
| POST   | /api/users       | Create a new user.<br>Requires admin token. |
| DELETE | /api/users/:id   | Delete a user.<br>Returns 204 on success.   |`;

const wideTable = `| ID | Name  | Email             | Role     | Team      | Location | Start Date | Status |
|----|-------|-------------------|----------|-----------|----------|------------|--------|
| 1  | Alice | alice@example.com | Engineer | Platform  | Berlin   | 2022-01-15 | Active |
| 2  | Bob   | bob@example.com   | Designer | Product   | London   | 2021-06-01 | Active |
| 3  | Carol | carol@example.com | PM       | Product   | New York | 2023-03-20 | Active |`;

const comparisonTable = `| Feature        | Free   | Pro     | Enterprise |
|----------------|--------|---------|------------|
| Users          | 5      | 50      | Unlimited  |
| Storage        | 1 GB   | 100 GB  | 1 TB       |
| API access     | No     | Yes     | Yes        |
| SSO            | No     | No      | Yes        |
| Support        | Email  | Chat    | Dedicated  |
| Price (month)  | $0     | $29     | Custom     |`;

const featureMatrix = `| Feature        | macOS | Windows | Linux |
|----------------|:-----:|:-------:|:-----:|
| Auto-update    |  Yes  |   Yes   |  No   |
| Dark mode      |  Yes  |   Yes   |  Yes  |
| Touch Bar      |  Yes  |   N/A   |  N/A  |
| System tray    |  Yes  |   Yes   |  Yes  |
| ARM support    |  Yes  |   Yes   |  Yes  |`;

const apiTable = `| Parameter   | Type     | Required | Default | Description                      |
|-------------|----------|:--------:|---------|----------------------------------|
| \`page\`      | integer  |    No    | \`1\`     | Page number for pagination       |
| \`per_page\`  | integer  |    No    | \`20\`    | Items per page (max 100)         |
| \`sort\`      | string   |    No    | \`desc\`  | Sort order: \`asc\` or \`desc\`       |
| \`q\`         | string   |   Yes    | —       | Search query string              |`;

const pricingTable = `| Plan         | Monthly | Annual (per mo.) | Storage | Support   |
|:-------------|--------:|-----------------:|--------:|:----------|
| Starter      |      $9 |               $7 |    5 GB | Community |
| Professional |     $29 |              $24 |   50 GB | Email     |
| Business     |     $79 |              $66 |  500 GB | Priority  |
| Enterprise   | Custom  |           Custom | Custom  | Dedicated |`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="rounded-lg border bg-muted/20 p-4 font-mono text-sm overflow-x-auto whitespace-pre">
      {code}
    </pre>
  );
}

function TryLink({ content }: { content: string }) {
  const encoded = encodeShareContent(content);
  return (
    <Link
      href={`/table-formatter#${encoded}`}
      className="text-xs text-primary hover:underline"
    >
      Try in Table Formatter
    </Link>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */

const toc = [
  { id: "basic-syntax", label: "Basic Table Syntax" },
  { id: "column-alignment", label: "Column Alignment" },
  { id: "formatting-in-cells", label: "Formatting in Cells" },
  { id: "multi-line-content", label: "Multi-line Content" },
  { id: "wide-tables", label: "Wide Tables" },
  { id: "common-patterns", label: "Common Patterns" },
  { id: "tips", label: "Tips & Best Practices" },
  { id: "table-formatter", label: "Table Formatter Tool" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function TablesGuideContent() {
  return (
    <div className="space-y-12">
      {/* Table of contents */}
      <nav className="rounded-lg border bg-muted/10 p-5">
        <p className="text-sm font-medium mb-3 text-muted-foreground">
          On this page
        </p>
        <ol className="columns-2 gap-x-8 space-y-1 text-sm">
          {toc.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-primary hover:underline"
              >
                {i + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Basic Table Syntax */}
      <Section id="basic-syntax" title="1. Basic Table Syntax">
        <p className="mb-4 text-muted-foreground">
          A markdown table needs three things: a header row, a separator row
          with dashes, and one or more data rows. Columns are separated by
          pipes (<code className="text-sm bg-muted/30 px-1 rounded">|</code>).
        </p>
        <CodeBlock code={basicTable} />
        <div className="mt-2">
          <TryLink content={basicTable} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The separator row (the one with dashes) tells the markdown processor
          that the first row is a header. You need at least three dashes per
          column.
        </p>
      </Section>

      {/* 2. Column Alignment */}
      <Section id="column-alignment" title="2. Column Alignment">
        <p className="mb-4 text-muted-foreground">
          Control column alignment by adding colons to the separator row.
          A colon on the left means left-aligned, on the right means
          right-aligned, and colons on both sides means centered.
        </p>
        <div className="mb-4 rounded-lg border bg-muted/10 p-4 text-sm space-y-1 font-mono">
          <p>
            <code>:---</code> left-aligned (default)
          </p>
          <p>
            <code>:---:</code> centered
          </p>
          <p>
            <code>---:</code> right-aligned
          </p>
        </div>
        <CodeBlock code={alignmentTable} />
        <div className="mt-2">
          <TryLink content={alignmentTable} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Right-alignment is especially useful for numeric columns like prices,
          counts, or percentages so the digits line up visually.
        </p>
      </Section>

      {/* 3. Formatting in Cells */}
      <Section id="formatting-in-cells" title="3. Formatting in Cells">
        <p className="mb-4 text-muted-foreground">
          You can use most inline markdown inside table cells: bold, italic,
          strikethrough, inline code, and links.
        </p>
        <CodeBlock code={formattingTable} />
        <div className="mt-2">
          <TryLink content={formattingTable} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Block-level elements like headings, lists, and blockquotes are not
          supported inside table cells. Stick to inline formatting.
        </p>
      </Section>

      {/* 4. Multi-line Content */}
      <Section id="multi-line-content" title="4. Multi-line Content">
        <p className="mb-4 text-muted-foreground">
          Markdown tables don&apos;t natively support line breaks within cells.
          Use the HTML{" "}
          <code className="text-sm bg-muted/30 px-1 rounded">
            {"<br>"}
          </code>{" "}
          tag to insert line breaks when you need multi-line cell content.
        </p>
        <CodeBlock code={multilineTable} />
        <div className="mt-2">
          <TryLink content={multilineTable} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          This works on GitHub, GitLab, and most markdown renderers that allow
          inline HTML. Keep cell content concise &mdash; if you need paragraphs,
          consider using a different format.
        </p>
      </Section>

      {/* 5. Wide Tables */}
      <Section id="wide-tables" title="5. Wide Tables">
        <p className="mb-4 text-muted-foreground">
          Tables with many columns can be hard to read in raw markdown. Here
          are some strategies for handling wide tables.
        </p>
        <CodeBlock code={wideTable} />
        <div className="mt-2">
          <TryLink content={wideTable} />
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Tips for wide tables:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Don&apos;t pad columns to equal widths &mdash; most renderers
              ignore whitespace anyway
            </li>
            <li>
              Use the Table Formatter to auto-align columns for readability
            </li>
            <li>
              Consider splitting into multiple tables if you have more than
              7-8 columns
            </li>
            <li>
              Abbreviated headers help keep things compact
            </li>
          </ul>
        </div>
      </Section>

      {/* 6. Common Patterns */}
      <Section id="common-patterns" title="6. Common Patterns">
        <p className="mb-6 text-muted-foreground">
          Ready-to-copy templates for the most common table types.
        </p>

        {/* Comparison Table */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Comparison Table</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Great for pricing pages, plan comparisons, or tool evaluations.
            </p>
            <CodeBlock code={comparisonTable} />
            <div className="mt-2">
              <TryLink content={comparisonTable} />
            </div>
          </div>

          {/* Feature Matrix */}
          <div>
            <h3 className="text-lg font-medium mb-3">Feature Matrix</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Center-aligned columns work well for Yes/No feature grids.
            </p>
            <CodeBlock code={featureMatrix} />
            <div className="mt-2">
              <TryLink content={featureMatrix} />
            </div>
          </div>

          {/* API Reference Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">API Reference Table</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              A standard layout for documenting API parameters or configuration
              options.
            </p>
            <CodeBlock code={apiTable} />
            <div className="mt-2">
              <TryLink content={apiTable} />
            </div>
          </div>

          {/* Pricing Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Pricing Table</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Right-align price columns for clean number formatting.
            </p>
            <CodeBlock code={pricingTable} />
            <div className="mt-2">
              <TryLink content={pricingTable} />
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Tips & Best Practices */}
      <Section id="tips" title="7. Tips & Best Practices">
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="text-base font-medium text-foreground mb-2">
              Keep tables readable in raw markdown
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Align pipes vertically so the table reads well in plain text
                editors &mdash; the Table Formatter does this automatically
              </li>
              <li>
                Leading and trailing pipes are optional but recommended for
                consistency
              </li>
              <li>
                Use consistent column widths within a table
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-2">
              When to use tables
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Structured data with clear column headers</li>
              <li>Feature comparisons across products or plans</li>
              <li>API parameter or configuration references</li>
              <li>Quick-reference data (keyboard shortcuts, status codes)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-2">
              When to avoid tables
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Long-form text &mdash; paragraphs don&apos;t belong in cells
              </li>
              <li>
                Deeply nested or hierarchical data &mdash; use headings or
                lists instead
              </li>
              <li>
                Single-column data &mdash; a list is simpler and easier to read
              </li>
              <li>
                Data that changes frequently &mdash; consider generating
                tables from a data source
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-foreground mb-2">
              Escaping pipes
            </h3>
            <p>
              If your cell content contains a literal pipe character, escape
              it with a backslash:{" "}
              <code className="bg-muted/30 px-1 rounded">\|</code>. Inside
              inline code spans (backticks), pipes don&apos;t need escaping.
            </p>
          </div>
        </div>
      </Section>

      {/* 8. Table Formatter Tool */}
      <Section id="table-formatter" title="8. Table Formatter Tool">
        <div className="rounded-lg border bg-muted/10 p-6">
          <p className="mb-4 text-muted-foreground">
            Tired of manually aligning table columns? The{" "}
            <strong>Table Formatter</strong> takes your messy table and
            produces perfectly aligned, GFM-compatible output in one click.
          </p>
          <Link
            href="/table-formatter"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open Table Formatter
          </Link>
        </div>
      </Section>
    </div>
  );
}
