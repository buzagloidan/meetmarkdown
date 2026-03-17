type TextareaState = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

type CommandResult = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

function wrapSelection(
  state: TextareaState,
  prefix: string,
  suffix: string,
  placeholder: string
): CommandResult {
  const { value, selectionStart, selectionEnd } = state;
  const selected = value.substring(selectionStart, selectionEnd);
  const text = selected || placeholder;
  const newValue =
    value.substring(0, selectionStart) +
    prefix +
    text +
    suffix +
    value.substring(selectionEnd);

  return {
    value: newValue,
    selectionStart: selectionStart + prefix.length,
    selectionEnd: selectionStart + prefix.length + text.length,
  };
}

function blockPrefix(
  state: TextareaState,
  prefix: string,
  placeholder: string
): CommandResult {
  const { value, selectionStart, selectionEnd } = state;
  const before = value.substring(0, selectionStart);
  const selected = value.substring(selectionStart, selectionEnd);
  const text = selected || placeholder;
  const needsNewline = before.length > 0 && !before.endsWith("\n");
  const fullPrefix = (needsNewline ? "\n" : "") + prefix;
  const newValue =
    before + fullPrefix + text + value.substring(selectionEnd);

  return {
    value: newValue,
    selectionStart: selectionStart + fullPrefix.length,
    selectionEnd: selectionStart + fullPrefix.length + text.length,
  };
}

export function applyCommand(
  textarea: HTMLTextAreaElement,
  command: string,
  content: string,
  setContent: (v: string) => void
) {
  const state: TextareaState = {
    value: content,
    selectionStart: textarea.selectionStart,
    selectionEnd: textarea.selectionEnd,
  };

  let result: CommandResult;

  switch (command) {
    case "bold":
      result = wrapSelection(state, "**", "**", "bold text");
      break;
    case "italic":
      result = wrapSelection(state, "_", "_", "italic text");
      break;
    case "strikethrough":
      result = wrapSelection(state, "~~", "~~", "strikethrough");
      break;
    case "code":
      result = wrapSelection(state, "`", "`", "code");
      break;
    case "link":
      result = wrapSelection(state, "[", "](url)", "link text");
      break;
    case "image":
      result = wrapSelection(state, "![", "](url)", "alt text");
      break;
    case "h1":
      result = blockPrefix(state, "# ", "Heading 1");
      break;
    case "h2":
      result = blockPrefix(state, "## ", "Heading 2");
      break;
    case "h3":
      result = blockPrefix(state, "### ", "Heading 3");
      break;
    case "quote":
      result = blockPrefix(state, "> ", "quote");
      break;
    case "ul":
      result = blockPrefix(state, "- ", "list item");
      break;
    case "ol":
      result = blockPrefix(state, "1. ", "list item");
      break;
    case "task":
      result = blockPrefix(state, "- [ ] ", "task");
      break;
    case "codeBlock":
      result = wrapSelection(state, "```\n", "\n```", "code");
      break;
    case "hr": {
      const before = content.substring(0, state.selectionStart);
      const needsNl = before.length > 0 && !before.endsWith("\n");
      const insert = (needsNl ? "\n" : "") + "---\n";
      result = {
        value: before + insert + content.substring(state.selectionEnd),
        selectionStart: state.selectionStart + insert.length,
        selectionEnd: state.selectionStart + insert.length,
      };
      break;
    }
    case "table": {
      const tpl =
        "\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n";
      const before = content.substring(0, state.selectionStart);
      result = {
        value: before + tpl + content.substring(state.selectionEnd),
        selectionStart: state.selectionStart + tpl.length,
        selectionEnd: state.selectionStart + tpl.length,
      };
      break;
    }
    default:
      return;
  }

  setContent(result.value);
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.selectionStart = result.selectionStart;
    textarea.selectionEnd = result.selectionEnd;
  });
}
