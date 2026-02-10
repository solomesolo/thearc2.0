"use client";

import React from "react";

export type RibbonMode = "idle" | "records" | "trends" | "signals";

interface RibbonCaptionProps {
  mode: RibbonMode;
  prefersReducedMotion?: boolean;
}

const CAPTIONS: Record<RibbonMode, string> = {
  idle: "",
  records: "All documents, in one place.",
  trends: "Labs and wearables become clear signals.",
  signals: "Early changes, before problems escalate.",
};

export function RibbonCaption({ mode, prefersReducedMotion = false }: RibbonCaptionProps) {
  const [displayMode, setDisplayMode] = React.useState<RibbonMode>(mode);
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    if (mode === "idle") {
      setOpacity(0);
      // Delay clearing the text after fade out
      const timeout = setTimeout(() => {
        setDisplayMode("idle");
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setDisplayMode(mode);
      // Fade in
      const timeout = setTimeout(() => {
        setOpacity(1);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [mode]);

  const transitionDuration = prefersReducedMotion ? "0ms" : "150ms";

  if (displayMode === "idle" && opacity === 0) {
    return null;
  }

  return (
    <div
      className="ribbon-caption"
      style={{
        opacity,
        transition: prefersReducedMotion ? "none" : `opacity ${transitionDuration} ease-out`,
      }}
    >
      {CAPTIONS[displayMode]}
    </div>
  );
}


