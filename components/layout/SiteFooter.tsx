import Link from "next/link";
import { tools } from "@/lib/tools";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="font-bold text-base">MeetMarkdown</h3>
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
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MeetMarkdown. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
