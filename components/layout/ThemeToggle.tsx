"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-14 h-7" />;

  const isDark = resolvedTheme === "dark";

  return (
    <label className="relative block w-14 h-7 cursor-pointer" aria-label="Toggle theme">
      <input
        type="checkbox"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      {/* Track */}
      <span className="block w-full h-full rounded-full bg-muted border border-border transition-colors duration-300" />
      {/* Thumb */}
      <span
        className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all duration-300 ease-in-out ${
          isDark ? "left-[calc(100%-1.625rem)]" : "left-0.5"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 fill-slate-500 stroke-slate-500" aria-hidden />
        ) : (
          <Sun className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" aria-hidden />
        )}
      </span>
    </label>
  );
}
