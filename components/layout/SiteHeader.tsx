"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tools } from "@/lib/tools";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown } from "lucide-react";

function GridIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 5.125C4 4.504 4.504 4 5.125 4h1.75C7.496 4 8 4.504 8 5.125v1.75C8 7.496 7.496 8 6.875 8h-1.75A1.125 1.125 0 0 1 4 6.875zm6 0C10 4.504 10.504 4 11.125 4h1.75C13.496 4 14 4.504 14 5.125v1.75C14 7.496 13.496 8 12.875 8h-1.75A1.125 1.125 0 0 1 10 6.875zM17.25 4C16.56 4 16 4.56 16 5.25v1.5c0 .69.56 1.25 1.25 1.25h1.5C19.44 8 20 7.44 20 6.75v-1.5C20 4.56 19.44 4 18.75 4zM16 11.125c0-.621.504-1.125 1.125-1.125h1.75c.621 0 1.125.504 1.125 1.125v1.75c0 .621-.504 1.125-1.125 1.125h-1.75A1.125 1.125 0 0 1 16 12.875zM17.125 16c-.621 0-1.125.504-1.125 1.125v1.75c0 .621.504 1.125 1.125 1.125h1.75c.621 0 1.125-.504 1.125-1.125v-1.75c0-.621-.504-1.125-1.125-1.125zM10 11.125c0-.621.504-1.125 1.125-1.125h1.75c.621 0 1.125.504 1.125 1.125v1.75c0 .621-.504 1.125-1.125 1.125h-1.75A1.125 1.125 0 0 1 10 12.875zM11.125 16c-.621 0-1.125.504-1.125 1.125v1.75c0 .621.504 1.125 1.125 1.125h1.75c.621 0 1.125-.504 1.125-1.125v-1.75c0-.621-.504-1.125-1.125-1.125zM4 11.125C4 10.504 4.504 10 5.125 10h1.75C7.496 10 8 10.504 8 11.125v1.75C8 13.496 7.496 14 6.875 14h-1.75A1.125 1.125 0 0 1 4 12.875zM5.125 16C4.504 16 4 16.504 4 17.125v1.75C4 19.496 4.504 20 5.125 20h1.75C7.496 20 8 19.496 8 18.875v-1.75C8 16.504 7.496 16 6.875 16z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-4 z-50 mx-4 lg:mx-10 xl:mx-20 transition-all duration-300">
      <div className="bg-background/90 border border-border rounded-full shadow-lg backdrop-blur-lg px-4 py-2 flex items-center justify-between transition-all duration-300">

        <div className="flex items-center gap-1">
          <Link href="/" className="font-bold text-base tracking-tight mr-2 flex items-center gap-2">
            MeetMarkdown
          </Link>

          <Link
            href="/editor"
            className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
          >
            Editor
          </Link>

          {/* Tools dropdown */}
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
            >
              <GridIcon />
              Tools
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute left-0 top-full mt-3 w-[520px] rounded-2xl border bg-popover shadow-xl p-4 grid grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
                  >
                    <span className="text-xl mt-0.5 shrink-0">{tool.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium group-hover:text-foreground leading-tight">
                        {tool.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
