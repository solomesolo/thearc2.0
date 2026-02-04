"use client";

import { useState, useEffect } from "react";

export type TimelineState = "fragmented" | "merged" | "recommendation";

export function useScrollState(): TimelineState {
  const [state, setState] = useState<TimelineState>("fragmented");

  useEffect(() => {
    const handleScroll = () => {
      const problemSection = document.getElementById("home.problem");
      const timelineSection = document.getElementById("home.timelineDemo");
      const marketplaceSection = document.getElementById("home.marketplace");

      if (!problemSection || !timelineSection || !marketplaceSection) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Get section positions relative to viewport
      const problemRect = problemSection.getBoundingClientRect();
      const timelineRect = timelineSection.getBoundingClientRect();
      const marketplaceRect = marketplaceSection.getBoundingClientRect();

      // Determine state based on scroll position
      // "recommendation" state: when marketplace section is in view
      if (marketplaceRect.top < viewportHeight * 0.4) {
        setState("recommendation");
      }
      // "merged" state: when timeline section is in view and we've scrolled past problem
      else if (
        timelineRect.top < viewportHeight * 0.5 &&
        problemRect.bottom < viewportHeight * 0.8
      ) {
        setState("merged");
      }
      // "fragmented" state: when problem section is in view
      else if (problemRect.top < viewportHeight * 0.6) {
        setState("fragmented");
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return state;
}

