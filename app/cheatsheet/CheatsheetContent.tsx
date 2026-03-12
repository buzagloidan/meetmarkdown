"use client";

import Link from "next/link";
import { encodeShareContent } from "@/lib/share";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Section {
  id: string;
  title: string;
  description: string;
  examples: { syntax: string; result: string }[];
}

const sections: Section[] = [
  {
    id: "headings",
    title: "Headings",
    description:
      "Use 1-6 hash characters at the start of a line to create headings. The number of hashes determines the heading level.",
    examples: [
      {
        syntax: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
        result:
          "Renders as H1 through H6 headings, each progressively smaller. H1 is the largest page title; H6 is the smallest sub-heading.",
      },
      {
        syntax: `Heading 1
=========

Heading 2
---------`,
        result:
          "Alternative syntax: underline text with equals signs for H1 or dashes for H2.",
      },
    ],
  },
  {
    id: "paragraphs-line-breaks",
    title: "Paragraphs & Line Breaks",
    description:
      "Paragraphs are separated by a blank line. For a hard line break within a paragraph, end the line with two or more spaces or use a backslash.",
    examples: [
      {
        syntax: `This is the first paragraph.

This is the second paragraph.`,
        result: "Two separate paragraphs with space between them.",
      },
      {
        syntax: `This line has a line break
right here (two trailing spaces).

This line has a break\\
using a backslash.`,
        result:
          "A hard line break appears where the trailing spaces or backslash are placed, without starting a new paragraph.",
      },
    ],
  },
  {
    id: "emphasis",
    title: "Bold, Italic, Strikethrough",
    description:
      "Wrap text in asterisks or underscores for emphasis. Use double asterisks for bold, single for italic, and double tildes for strikethrough.",
    examples: [
      {
        syntax: `*italic* or _italic_
**bold** or __bold__
***bold and italic*** or ___bold and italic___
~~strikethrough~~`,
        result:
          "italic, bold, bold and italic, and strikethrough text respectively.",
      },
    ],
  },
  {
    id: "blockquotes",
    title: "Blockquotes",
    description:
      "Start a line with > to create a blockquote. Nest blockquotes by adding additional > characters.",
    examples: [
      {
        syntax: `> This is a blockquote.
>
> It can span multiple lines.`,
        result: "A visually indented block with a left border, like an email quote.",
      },
      {
        syntax: `> First level of quoting.
>
> > Nested blockquote.
>
> Back to the first level.`,
        result:
          "A nested blockquote renders as a quote-within-a-quote, each level further indented.",
      },
    ],
  },
  {
    id: "lists",
    title: "Ordered & Unordered Lists",
    description:
      "Use dashes, asterisks, or plus signs for unordered lists. Use numbers followed by a period for ordered lists. Indent by 2-4 spaces to nest.",
    examples: [
      {
        syntax: `- Item one
- Item two
  - Nested item
  - Another nested item
- Item three`,
        result: "A bulleted list with a nested sub-list under item two.",
      },
      {
        syntax: `1. First item
2. Second item
   1. Sub-item A
   2. Sub-item B
3. Third item`,
        result:
          "A numbered list with a nested numbered sub-list under the second item.",
      },
      {
        syntax: `1. First item

   Additional paragraph under the first item.

2. Second item`,
        result:
          "List items can contain multiple paragraphs if subsequent paragraphs are indented to align with the text.",
      },
    ],
  },
  {
    id: "code",
    title: "Code",
    description:
      "Use backticks for inline code and triple backticks (or indentation) for code blocks. Add a language identifier after the opening backticks for syntax highlighting.",
    examples: [
      {
        syntax: "Inline code: `const x = 42;`",
        result:
          "The text between backticks renders in a monospaced font with a subtle background.",
      },
      {
        syntax: "```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```",
        result:
          "A syntax-highlighted code block with the language displayed. Most renderers support hundreds of language identifiers.",
      },
      {
        syntax: "```\nPlain code block without a language.\nNo syntax highlighting.\n```",
        result: "A code block rendered in monospaced font without highlighting.",
      },
      {
        syntax: "    // Indented code block (4 spaces)\n    const y = 100;",
        result:
          "Four spaces of indentation also create a code block. This is the original markdown syntax.",
      },
    ],
  },
  {
    id: "links",
    title: "Links",
    description:
      "Markdown supports inline links, reference-style links, and auto-links.",
    examples: [
      {
        syntax: `[Visit Google](https://google.com)

[Visit Google](https://google.com "Google Homepage")`,
        result:
          "A clickable link. The optional text in quotes becomes a tooltip on hover.",
      },
      {
        syntax: `[Reference link][1]
[Another link][homepage]

[1]: https://example.com
[homepage]: https://example.com/home "Example Home"`,
        result:
          "Reference-style links separate the URL from the text. The reference definitions can be placed anywhere in the document.",
      },
      {
        syntax: `<https://example.com>
<user@example.com>`,
        result:
          "Angle brackets around a URL or email address create auto-links that are clickable.",
      },
    ],
  },
  {
    id: "images",
    title: "Images",
    description:
      "Images use the same syntax as links, prefixed with an exclamation mark. The text in brackets becomes the alt text.",
    examples: [
      {
        syntax: `![Alt text](https://example.com/image.png)

![Alt text](https://example.com/image.png "Optional title")`,
        result:
          "An embedded image. The alt text is shown if the image fails to load and is read by screen readers.",
      },
      {
        syntax: `![Logo][logo]

[logo]: https://example.com/logo.png "Company Logo"`,
        result: "Reference-style image syntax, useful when reusing the same image URL.",
      },
    ],
  },
  {
    id: "tables",
    title: "Tables",
    description:
      "Create tables using pipes and dashes. The second row defines column alignment using colons.",
    examples: [
      {
        syntax: `| Name    | Role       | Status  |
| ------- | ---------- | ------- |
| Alice   | Developer  | Active  |
| Bob     | Designer   | On leave|
| Charlie | Manager    | Active  |`,
        result:
          "A table with three columns. Columns are left-aligned by default.",
      },
      {
        syntax: `| Left   | Center  | Right  |
| :----- | :-----: | -----: |
| 1      | 2       | 3      |
| hello  | world   | !      |`,
        result:
          "Colons in the separator row control alignment: left colon for left, both colons for center, right colon for right.",
      },
    ],
  },
  {
    id: "horizontal-rules",
    title: "Horizontal Rules",
    description:
      "Create a horizontal rule (thematic break) with three or more dashes, asterisks, or underscores on their own line.",
    examples: [
      {
        syntax: `---

***

___`,
        result:
          "Each renders as a horizontal line spanning the width of the content area. All three forms are equivalent.",
      },
    ],
  },
  {
    id: "task-lists",
    title: "Task Lists / Checkboxes",
    description:
      "Add checkboxes to list items with [ ] (unchecked) or [x] (checked). This is a GitHub Flavored Markdown extension.",
    examples: [
      {
        syntax: `- [x] Write the introduction
- [x] Add code examples
- [ ] Proofread the document
- [ ] Publish`,
        result:
          "A list with interactive checkboxes. Checked items typically render with a strikethrough or dimmed style.",
      },
    ],
  },
  {
    id: "footnotes",
    title: "Footnotes",
    description:
      "Create footnotes with [^label] in the text and a matching definition elsewhere in the document.",
    examples: [
      {
        syntax: `Here is a statement that needs a citation[^1].

And another claim[^note].

[^1]: Source: The Markdown Guide, 2024.
[^note]: This is a longer footnote with
    multiple lines of content.`,
        result:
          "Superscript numbers appear inline and link to the footnote definitions collected at the bottom of the rendered page.",
      },
    ],
  },
  {
    id: "definition-lists",
    title: "Definition Lists",
    description:
      "Some markdown processors support definition lists. Place the term on one line, then the definition on the next line prefixed with a colon and a space.",
    examples: [
      {
        syntax: `Markdown
: A lightweight markup language for creating formatted text using a plain-text editor.

HTML
: The standard markup language for documents designed to be displayed in a web browser.`,
        result:
          "Each term is rendered in bold or a distinct style, with its definition indented below it. Not supported by all renderers.",
      },
    ],
  },
  {
    id: "escaping-characters",
    title: "Escaping Characters",
    description:
      "Prefix any markdown special character with a backslash to display it literally.",
    examples: [
      {
        syntax: `\\*This is not italic\\*
\\# This is not a heading
\\[This is not a link\\](url)
\\| Not | a | table |`,
        result:
          "The special characters are rendered as plain text instead of being interpreted as markdown formatting.",
      },
      {
        syntax: `Escapable characters:
\\  backslash
\`  backtick
*  asterisk
_  underscore
{} curly braces
[] square brackets
() parentheses
#  hash
+  plus sign
-  dash
.  period
!  exclamation mark
|  pipe`,
        result: "All markdown special characters can be escaped with a backslash.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function TryInEditorLink({ markdown }: { markdown: string }) {
  const encoded = encodeShareContent(markdown);
  return (
    <Link
      href={`/editor#${encoded}`}
      className="text-xs text-primary hover:underline"
    >
      Try in Editor &rarr;
    </Link>
  );
}

function SyntaxBlock({ syntax, result }: { syntax: string; result: string }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-muted/20 p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
        {syntax}
      </div>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-muted-foreground flex-1">{result}</p>
        <TryInEditorLink markdown={syntax} />
      </div>
    </div>
  );
}

function CheatsheetSection({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-20">
      <h2 className="text-xl font-bold mb-2">{section.title}</h2>
      <p className="text-muted-foreground text-sm mb-4">{section.description}</p>
      <div className="space-y-4">
        {section.examples.map((example, i) => (
          <SyntaxBlock key={i} syntax={example.syntax} result={example.result} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export function CheatsheetContent() {
  return (
    <div className="flex gap-10">
      {/* Table of contents — sidebar on large screens, top on small */}
      <nav className="hidden lg:block w-56 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Contents
        </h2>
        <ul className="space-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-0.5"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 min-w-0">
        {/* Mobile TOC */}
        <nav className="lg:hidden mb-8">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Contents
          </h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-3 py-1.5 rounded-full border hover:bg-accent transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s) => (
            <CheatsheetSection key={s.id} section={s} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-muted-foreground mb-3">
            Ready to write some markdown?
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Open the Editor
          </Link>
        </div>
      </div>
    </div>
  );
}
