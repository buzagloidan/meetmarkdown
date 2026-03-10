"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export function SplitPane({ left, right, className }: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function onMove(e: MouseEvent) {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(80, Math.max(20, pct)));
    }

    function onUp() {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  return (
    <div ref={containerRef} className={cn("flex h-full", className)}>
      <div style={{ width: `${leftWidth}%` }} className="min-w-0 overflow-hidden">
        {left}
      </div>
      <div
        className="w-1.5 flex-none cursor-col-resize bg-border hover:bg-primary/40 transition-colors relative group"
        onMouseDown={onMouseDown}
      >
        <div className="absolute inset-y-0 -inset-x-1" />
      </div>
      <div style={{ width: `${100 - leftWidth}%` }} className="min-w-0 overflow-hidden">
        {right}
      </div>
    </div>
  );
}
