---
name: meetmarkdown-tools
description: Formats, converts, diffs, and analyzes markdown using the MeetMarkdown API. Use when the user asks to format markdown, convert markdown to HTML, convert HTML to markdown, count words in markdown, diff two markdown files, or format markdown tables.
---

# MeetMarkdown Tools

API base: `https://meetmarkdown.com/api/v1`

All endpoints accept JSON via POST. No auth required. 100KB max input.

## Endpoints

### Format markdown

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/format \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg md "$(cat FILE)" '{markdown: $md}')"
```

Returns `{ "result": "formatted markdown" }`.

### Convert markdown to HTML

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/to-html \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg md "$(cat FILE)" '{markdown: $md}')"
```

Returns `{ "result": "<html>..." }`.

### Convert HTML to markdown

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/html-to-markdown \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg html "$(cat FILE)" '{html: $html}')"
```

Returns `{ "result": "# markdown..." }`.

### Word count and stats

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/word-count \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg md "$(cat FILE)" '{markdown: $md}')"
```

Returns `{ "stats": { "words", "chars", "charsNoSpaces", "lines", "paragraphs", "readingTime", "headings", "codeBlocks", "links", "images" } }`.

### Diff two markdown documents

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/diff \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg a "$(cat FILE_A)" --arg b "$(cat FILE_B)" '{original: $a, modified: $b}')"
```

Returns `{ "diff": { "changes": [...], "added": N, "removed": N } }`.

### Format tables

```bash
curl -s -X POST https://meetmarkdown.com/api/v1/table-format \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg md "$(cat FILE)" '{markdown: $md}')"
```

Returns `{ "result": "formatted table markdown" }`.

## Workflow

1. Read the file(s) the user wants to process
2. Call the appropriate endpoint using curl with jq for JSON encoding
3. Extract the result with `jq -r '.result'` (or `.stats`, `.diff`)
4. Write the result back to the file or display it to the user

## Notes

- Always use `jq -n` to safely encode file content as JSON (handles newlines, quotes, special chars)
- For format/table-format: write the result back to the original file
- For to-html: save as `.html` or display inline
- For word-count: display the stats to the user
- For diff: display the summary (added/removed lines) to the user
