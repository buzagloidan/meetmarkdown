"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tools } from "@/lib/tools";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown, Menu, X, BookOpen } from "lucide-react";

const guides = [
  { href: "/cheatsheet", title: "Markdown Cheat Sheet", description: "Quick reference for all markdown syntax" },
  { href: "/guide/mermaid", title: "Mermaid Diagram Guide", description: "Complete guide to Mermaid diagram syntax" },
  { href: "/guide/tables", title: "Markdown Tables Guide", description: "How to create and format tables" },
  { href: "/templates/mermaid", title: "Mermaid Templates", description: "Ready-to-use diagram templates" },
];

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
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) setGuidesOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) setMobileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change (link click)
  function closeMobile() { setMobileOpen(false); }

  return (
    <header
      className={`sticky z-50 transition-all duration-300 ${
        scrolled ? "top-4 mx-4 lg:mx-10 xl:mx-20" : "top-0 mx-0"
      }`}
    >
      <div
        className={`transition-all duration-300 bg-background/90 backdrop-blur-lg border-border flex items-center justify-between ${
          scrolled
            ? "rounded-full border shadow-lg px-4 py-2"
            : "border-b px-4 sm:px-6 py-3"
        }`}
      >
        {/* Left: Logo + desktop nav */}
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight mr-2">
            <Image src="/logo.png" alt="MeetMarkdown" width={28} height={28} className="rounded" />
            <span className="hidden sm:inline">MeetMarkdown</span>
          </Link>

          {/* Desktop nav links */}
          <Link
            href="/editor"
            className={`hidden md:inline-flex px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 ${
              scrolled ? "rounded-full" : "rounded-lg"
            }`}
          >
            Markdown Editor
          </Link>

          <Link
            href="/mermaid-editor"
            className={`hidden md:inline-flex px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 ${
              scrolled ? "rounded-full" : "rounded-lg"
            }`}
          >
            Mermaid Editor
          </Link>

          <Link
            href="/developers"
            className={`hidden md:inline-flex px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 ${
              scrolled ? "rounded-full" : "rounded-lg"
            }`}
          >
            Developers
          </Link>

          {/* Tools dropdown — desktop only */}
          <div ref={toolsRef} className="relative hidden md:block">
            <button
              onClick={() => setToolsOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 ${
                scrolled ? "rounded-full" : "rounded-lg"
              }`}
            >
              <GridIcon />
              Tools
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {toolsOpen && (
              <div className="absolute left-0 top-full mt-3 w-[520px] rounded-2xl border bg-popover shadow-xl p-4 grid grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
                  >
                    <tool.icon className="h-5 w-5 shrink-0 text-primary mt-0.5" />
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

          {/* Guides dropdown — desktop only */}
          <div ref={guidesRef} className="relative hidden md:block">
            <button
              onClick={() => setGuidesOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 ${
                scrolled ? "rounded-full" : "rounded-lg"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Guides
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${guidesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {guidesOpen && (
              <div className="absolute left-0 top-full mt-3 w-[320px] rounded-2xl border bg-popover shadow-xl p-3 space-y-1">
                {guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    onClick={() => setGuidesOpen(false)}
                    className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-accent transition-colors group"
                  >
                    <p className="text-sm font-medium group-hover:text-foreground leading-tight">
                      {guide.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {guide.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <div ref={mobileRef} className="relative md:hidden">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-full mt-3 w-[280px] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border bg-popover shadow-xl p-3 space-y-1">
                <Link
                  href="/editor"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm font-medium"
                >
                  Markdown Editor
                </Link>
                <Link
                  href="/mermaid-editor"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm font-medium"
                >
                  Mermaid Editor
                </Link>

                <Link
                  href="/developers"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm font-medium"
                >
                  Developers
                </Link>

                <div className="border-t my-2" />
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Guides</p>

                {guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm font-medium"
                  >
                    {guide.title}
                  </Link>
                ))}

                <div className="border-t my-2" />
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tools</p>

                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors group"
                  >
                    <tool.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium group-hover:text-foreground">
                      {tool.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
