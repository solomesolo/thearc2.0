"use client";

import React from "react";

export type RibbonMode = "idle" | "records" | "trends" | "signals";

interface RibbonChipsProps {
  mode: RibbonMode;
  onModeChange: (mode: RibbonMode) => void;
  prefersReducedMotion?: boolean;
}

export function RibbonChips({ mode, onModeChange, prefersReducedMotion = false }: RibbonChipsProps) {
  const [hoveredMode, setHoveredMode] = React.useState<RibbonMode | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (newMode: RibbonMode) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredMode(newMode);
    onModeChange(newMode);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMode(null);
      onModeChange("idle");
    }, 250);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const chips: { mode: RibbonMode; label: string }[] = [
    { mode: "records", label: "Records" },
    { mode: "trends", label: "Trends" },
    { mode: "signals", label: "Signals" },
  ];

  const transitionDuration = prefersReducedMotion ? "0ms" : "150ms";

  return (
    <div className="ribbon-chips-container">
      {chips.map((chip) => {
        const isActive = mode === chip.mode || hoveredMode === chip.mode;
        
        return (
          <button
            key={chip.mode}
            type="button"
            className={`ribbon-chip ${isActive ? "ribbon-chip-active" : ""}`}
            onMouseEnter={() => handleMouseEnter(chip.mode)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onModeChange(chip.mode)}
            style={{
              transition: prefersReducedMotion ? "none" : `all ${transitionDuration} ease-out`,
            }}
            aria-label={`Show ${chip.label}`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}

