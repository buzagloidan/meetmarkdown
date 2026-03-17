import Image from "next/image";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="MeetMarkdown" width={32} height={32} className="rounded" />
            <h3 className="font-bold text-base">MeetMarkdown</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your one-stop destination for free, instant markdown tools — no sign-up, no hassle.
          </p>
        </div>

        {/* Tools */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Live Editor
              </Link>
            </li>
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={tool.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Guides */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Guides
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/cheatsheet" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Markdown Cheat Sheet
              </Link>
            </li>
            <li>
              <Link href="/guide/mermaid" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mermaid Diagram Guide
              </Link>
            </li>
            <li>
              <Link href="/guide/tables" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Markdown Tables Guide
              </Link>
            </li>
            <li>
              <Link href="/templates/mermaid" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mermaid Templates
              </Link>
            </li>
            <li>
              <Link href="/guide/latex" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                LaTeX Math Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Resources
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/buzagloidan/meetmarkdown"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <Link
                href="/developers"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                API for Developers
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ & Help
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} MeetMarkdown. All rights reserved.</span>
          <span className="hidden sm:inline">·</span>
          <span>Made with <span className="text-red-500">♥</span> for the people of the internet.</span>
        </div>
      </div>
    </footer>
  );
}
