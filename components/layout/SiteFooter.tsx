import Image from "next/image";
import Link from "next/link";
import { tools } from "@/lib/tools";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
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

        {/* Legal */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Legal
          </h4>
          <ul className="space-y-2">
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
