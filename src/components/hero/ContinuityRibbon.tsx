"use client";

import React from "react";

export type RibbonMode = "idle" | "records" | "trends" | "signals";

interface ContinuityRibbonProps {
  mode: RibbonMode;
  prefersReducedMotion?: boolean;
}

interface Marker {
  id: string;
  x: number; // Percentage of SVG width
  y: number; // Percentage of SVG height
  icon: React.ReactNode;
  label: string;
  category: "records" | "trends" | "signals";
}

// Medical markers positioned along the ribbon
const MARKERS: Marker[] = [
  {
    id: "lab",
    x: 15,
    y: 45,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2v20M15 2v20M5 7h14M5 17h14" />
        <path d="M12 2v4M12 18v4" />
      </svg>
    ),
    label: "Lab result",
    category: "records",
  },
  {
    id: "imaging",
    x: 28,
    y: 42,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 10l4 4 4-4" />
        <path d="M8 14h8" />
      </svg>
    ),
    label: "Imaging",
    category: "records",
  },
  {
    id: "medication",
    x: 42,
    y: 38,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M12 7v10" />
        <path d="M9 12h6" />
      </svg>
    ),
    label: "Medication",
    category: "records",
  },
  {
    id: "screening",
    x: 55,
    y: 35,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    label: "Screening",
    category: "trends",
  },
  {
    id: "wearable",
    x: 68,
    y: 32,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    label: "Wearable",
    category: "trends",
  },
];

// SVG paths: 3 paths that merge into 1
// Path 1: Fragment (left, scattered) - represents fragmented records
const PATH_1 = "M 50 50 Q 120 45, 200 40 Q 280 35, 360 32 Q 440 30, 520 28";

// Path 2: Merge (middle, converging) - represents merging data streams
const PATH_2 = "M 200 40 Q 280 35, 360 32 Q 440 30, 520 28";

// Path 3: Unified (right, single trajectory) - represents unified timeline
const PATH_3 = "M 360 32 Q 440 30, 520 28 Q 600 26, 680 25 Q 760 24, 840 23";

export function ContinuityRibbon({ mode, prefersReducedMotion = false }: ContinuityRibbonProps) {
  const SVG_WIDTH = 900;
  const SVG_HEIGHT = 400;

  // Determine which paths to highlight based on mode
  const showPath1 = mode === "idle" || mode === "records";
  const showPath2 = mode === "idle" || mode === "records" || mode === "trends";
  const showPath3 = mode === "idle" || mode === "trends" || mode === "signals";

  // Opacity for each path based on mode
  const getPathOpacity = (pathNum: 1 | 2 | 3): number => {
    if (mode === "idle") return 0.4;
    if (mode === "records") return pathNum === 1 ? 1 : pathNum === 2 ? 0.6 : 0.3;
    if (mode === "trends") return pathNum === 2 ? 1 : pathNum === 3 ? 0.8 : 0.3;
    if (mode === "signals") return pathNum === 3 ? 1 : 0.3;
    return 0.4;
  };

  // Stroke color based on mode
  const getStrokeColor = (pathNum: 1 | 2 | 3): string => {
    if (mode === "records" && pathNum === 1) return "rgba(236, 218, 200, 0.85)";
    if (mode === "trends" && pathNum === 2) return "rgba(236, 218, 200, 0.85)";
    if (mode === "signals" && pathNum === 3) return "rgba(110, 211, 194, 0.85)"; // Arc Jade for signals
    return "rgba(236, 218, 200, 0.45)";
  };

  const transitionDuration = prefersReducedMotion ? "0ms" : "200ms";

  return (
    <div className="continuity-ribbon-container">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="continuity-ribbon-svg"
      >
        <defs>
          {/* Gradient for ribbon stroke */}
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(236, 218, 200, 0.6)" />
            <stop offset="50%" stopColor="rgba(236, 218, 200, 0.8)" />
            <stop offset="100%" stopColor="rgba(110, 211, 194, 0.7)" />
          </linearGradient>
        </defs>

        {/* Path 1: Fragment */}
        {showPath1 && (
          <path
            d={PATH_1}
            fill="none"
            stroke={getStrokeColor(1)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={getPathOpacity(1)}
            style={{
              transition: prefersReducedMotion ? "none" : `opacity ${transitionDuration} ease-out, stroke ${transitionDuration} ease-out`,
            }}
            className="ribbon-path ribbon-path-1"
          />
        )}

        {/* Path 2: Merge */}
        {showPath2 && (
          <path
            d={PATH_2}
            fill="none"
            stroke={getStrokeColor(2)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={getPathOpacity(2)}
            style={{
              transition: prefersReducedMotion ? "none" : `opacity ${transitionDuration} ease-out, stroke ${transitionDuration} ease-out`,
            }}
            className="ribbon-path ribbon-path-2"
          />
        )}

        {/* Path 3: Unified */}
        {showPath3 && (
          <path
            d={PATH_3}
            fill="none"
            stroke={getStrokeColor(3)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={getPathOpacity(3)}
            style={{
              transition: prefersReducedMotion ? "none" : `opacity ${transitionDuration} ease-out, stroke ${transitionDuration} ease-out`,
            }}
            className="ribbon-path ribbon-path-3"
          />
        )}

        {/* Medical Markers */}
        {MARKERS.map((marker) => {
          const x = (marker.x / 100) * SVG_WIDTH;
          const y = (marker.y / 100) * SVG_HEIGHT;
          
          // Determine if marker should be highlighted
          const isHighlighted =
            (mode === "records" && marker.category === "records") ||
            (mode === "trends" && marker.category === "trends") ||
            (mode === "signals" && marker.category === "signals");

          const isEarlySignal = marker.id === "wearable" && (mode === "signals" || mode === "idle");
          
          // Apply pulse animation only for early signal marker (when not reduced motion)
          const shouldPulse = isEarlySignal && !prefersReducedMotion;

          return (
            <g
              key={marker.id}
              className={`ribbon-marker ribbon-marker-${marker.id}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transformOrigin: "center",
              }}
            >
              {/* Marker circle */}
              <circle
                cx="0"
                cy="0"
                r="12"
                fill={isHighlighted ? "rgba(110, 211, 194, 0.15)" : "rgba(236, 218, 200, 0.08)"}
                stroke={isHighlighted ? "rgba(110, 211, 194, 0.4)" : "rgba(236, 218, 200, 0.25)"}
                strokeWidth="1.5"
                className={shouldPulse ? "early-signal-marker" : ""}
                style={{
                  transition: prefersReducedMotion ? "none" : `fill ${transitionDuration} ease-out, stroke ${transitionDuration} ease-out`,
                }}
              />
              
              {/* Icon */}
              <g
                transform="translate(-8, -8)"
                fill="none"
                stroke={isHighlighted ? "rgba(110, 211, 194, 0.85)" : "rgba(236, 218, 200, 0.6)"}
                strokeWidth="2"
                style={{
                  transition: prefersReducedMotion ? "none" : `stroke ${transitionDuration} ease-out`,
                }}
              >
                {marker.icon}
              </g>

              {/* Label */}
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fontSize="11"
                fill={isHighlighted ? "rgba(110, 211, 194, 0.75)" : "rgba(236, 218, 200, 0.5)"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="500"
                style={{
                  transition: prefersReducedMotion ? "none" : `fill ${transitionDuration} ease-out`,
                }}
              >
                {marker.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

