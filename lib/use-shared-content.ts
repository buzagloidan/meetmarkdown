"use client";

import { useEffect, useRef } from "react";
import { decodeShareContent } from "@/lib/share";

/**
 * On mount, checks the URL hash for shared content.
 * If found, calls the setter and clears the hash.
 * Only runs once.
 */
export function useSharedContent(setter: (content: string) => void) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const hash = window.location.hash;
    if (!hash) return;

    const decoded = decodeShareContent(hash);
    if (decoded) {
      setter(decoded);
      // Clean up the URL without triggering navigation
      history.replaceState(null, "", window.location.pathname);
    }
  }, [setter]);
}
