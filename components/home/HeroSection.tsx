import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
        Markdown tools,{" "}
        <span className="text-primary underline decoration-wavy decoration-primary/40">
          free forever
        </span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Edit, format, convert, and transform your markdown — right in the browser. No account, no
        upload, no tracking.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/editor"
          className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/80"
        >
          Open Live Editor
        </Link>
        <Link
          href="#tools"
          className="inline-flex items-center justify-center h-9 px-4 rounded-lg border border-border bg-background text-sm font-medium transition-colors hover:bg-muted"
        >
          Browse All Tools
        </Link>
      </div>
    </section>
  );
}
