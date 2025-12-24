"use client";

import { MutableRefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered once on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Small helper to run GSAP animations scoped to a ref with automatic cleanup.
 * Keeps animation setup colocated with components while avoiding SSR warnings.
 */
export function useGsapTimeline(
  scopeRef: MutableRefObject<HTMLElement | null>,
  animation: (context: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      animation({ gsap, ScrollTrigger });
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
