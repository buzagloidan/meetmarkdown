"use client";

import { useState, useEffect } from "react";

interface FocusOverlayProps {
  textarea: HTMLTextAreaElement | null;
}

export function FocusOverlay({ textarea }: FocusOverlayProps) {
  const [lineY, setLineY] = useState(0);
  const [lineHeight, setLineHeight] = useState(22);

  useEffect(() => {
    if (!textarea) return;

    function updateLine() {
      if (!textarea) return;
      const { selectionStart, value, scrollTop } = textarea;
      const lines = value.substring(0, selectionStart).split("\n");
      const currentLine = lines.length - 1;
      const cs = getComputedStyle(textarea);
      const lh = parseFloat(cs.lineHeight) || 22;
      const pt = parseFloat(cs.paddingTop) || 0;
      setLineHeight(lh);
      setLineY(pt + currentLine * lh - scrollTop);
    }

    const events = ["click", "keyup", "scroll", "input"] as const;
    events.forEach((e) => textarea.addEventListener(e, updateLine));
    updateLine();

    return () => {
      events.forEach((e) => textarea.removeEventListener(e, updateLine));
    };
  }, [textarea]);

  if (!textarea) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <div
        className="absolute left-0 right-0 top-0 bg-background/70 transition-[height] duration-75"
        style={{ height: Math.max(0, lineY) }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-background/70 transition-[top] duration-75"
        style={{ top: Math.max(0, lineY + lineHeight) }}
      />
    </div>
  );
}
