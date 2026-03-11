import { HeroInput } from "./HeroInput";

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Subtle radial background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      <h1
        className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-5 leading-[1.1] [font-variant-ligatures:common-ligatures] [font-feature-settings:'liga'_1,'dlig'_1]"
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.02em",
        }}
      >
        Markdown anything
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto mb-10">
        Paste your markdown or start typing — edit, format, convert, and export
        right in the browser. No account needed.
      </p>

      {/* Client-side interactive input */}
      <HeroInput />
    </section>
  );
}
