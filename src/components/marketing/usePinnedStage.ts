"use client";
import { useEffect, useState, useRef } from "react";

export function usePinnedStage(sectionRef: React.RefObject<HTMLElement>, stageHeight = 520, topOffset = 120) {
  const [style, setStyle] = useState<React.CSSProperties>({ position: "relative" });
  const widthRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      // Get the grid container and steps container
      const grid = section.querySelector(".grid.grid-cols-12") as HTMLElement;
      const stepsContainer = section.querySelector("#daylife-steps") as HTMLElement;
      const rightCol = grid?.querySelector(".col-span-7") as HTMLElement;
      
      if (!grid || !stepsContainer || !rightCol) return;

      // Measure width once
      if (!widthRef.current) {
        widthRef.current = rightCol.offsetWidth;
      }

      const gridRect = grid.getBoundingClientRect();
      const stepsRect = stepsContainer.getBoundingClientRect();
      const rightColRect = rightCol.getBoundingClientRect();
      
      // Calculate when to start pinning (when grid reaches topOffset - header is scrolled past)
      const gridStart = gridRect.top;
      // Calculate when to stop pinning (when steps container ends)
      const stepsEnd = stepsRect.bottom;
      const pinEndPoint = topOffset + stageHeight;

      // Get the right column's left position relative to viewport
      const leftPosition = rightColRect.left;

      // If grid has reached topOffset (header scrolled past) and steps haven't ended: pin
      if (gridStart <= topOffset && stepsEnd > pinEndPoint) {
        setStyle({
          position: "fixed",
          top: topOffset,
          width: `${widthRef.current}px`,
          left: `${leftPosition}px`,
        });
      }
      // If steps have ended: stop pinning and position at steps end
      else if (stepsEnd <= pinEndPoint) {
        // Get the section's bottom to ensure we don't go past it
        const sectionRect = section.getBoundingClientRect();
        const sectionBottom = sectionRect.bottom;
        
        // Calculate steps end position relative to right column
        const stepsBottom = stepsContainer.offsetTop + stepsContainer.offsetHeight;
        const rightColTop = rightCol.offsetTop;
        const absoluteTop = stepsBottom - rightColTop - stageHeight;
        
        // Ensure stage doesn't go past section bottom
        const maxTop = sectionRect.height - stageHeight;
        
        setStyle({
          position: "absolute",
          top: `${Math.max(0, Math.min(absoluteTop, maxTop))}px`,
          width: "100%",
        });
      }
      // Otherwise: normal flow
      else {
        setStyle({ position: "relative", width: "100%" });
      }
    };

    // Initial calculation
    const timeout = setTimeout(() => {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef, stageHeight, topOffset]);

  return style;
}

