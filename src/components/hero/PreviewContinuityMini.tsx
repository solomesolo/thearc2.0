"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PreviewContinuityMiniProps {
  prefersReducedMotion?: boolean;
}

interface Marker {
  id: string;
  x: number; // Percentage of SVG width
  y: number; // Percentage of SVG height
  icon: React.ReactNode;
  label: string;
  isEarlySignal?: boolean;
}

const MARKERS: Marker[] = [
  {
    id: "lab",
    x: 15,
    y: 50,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2v20M15 2v20M5 7h14M5 17h14" />
        <path d="M12 2v4M12 18v4" />
      </svg>
    ),
    label: "Lab result",
  },
  {
    id: "imaging",
    x: 35,
    y: 48,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 10l4 4 4-4" />
        <path d="M8 14h8" />
      </svg>
    ),
    label: "Imaging",
  },
  {
    id: "medication",
    x: 55,
    y: 52,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M12 12v4" />
        <path d="M10 14h4" />
      </svg>
    ),
    label: "Medication update",
  },
  {
    id: "screening",
    x: 75,
    y: 50,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
    ),
    label: "Screening due",
  },
  {
    id: "wearable",
    x: 85,
    y: 48,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M12 7v10" />
        <path d="M7 12h10" />
      </svg>
    ),
    label: "Wearable trend",
    isEarlySignal: true,
  },
];

export function PreviewContinuityMini({
  prefersReducedMotion = false,
}: PreviewContinuityMiniProps) {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[640px] relative">
      <svg
        viewBox="0 0 400 120"
        className="w-full h-auto"
        style={{ minHeight: "120px" }}
      >
        <defs>
          <linearGradient id="continuityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(231, 240, 238, 0.18)" />
            <stop offset="100%" stopColor="rgba(110, 211, 194, 0.55)" />
          </linearGradient>
        </defs>

        {/* Three strands merging into one */}
        {/* Strand 1 (left) */}
        <motion.path
          d="M 20 60 Q 100 50 150 50"
          fill="none"
          stroke="url(#continuityGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
        />

        {/* Strand 2 (center-left) */}
        <motion.path
          d="M 30 70 Q 110 60 150 50"
          fill="none"
          stroke="url(#continuityGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
        />

        {/* Strand 3 (center-right) */}
        <motion.path
          d="M 40 80 Q 120 70 150 50"
          fill="none"
          stroke="url(#continuityGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
        />

        {/* Merged line (main timeline) */}
        <motion.path
          d="M 150 50 L 380 50"
          fill="none"
          stroke="url(#continuityGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.6 }}
        />

        {/* Markers */}
        {MARKERS.map((marker, index) => {
          const x = (marker.x / 100) * 400;
          const y = (marker.y / 100) * 120;
          const isHovered = hoveredMarker === marker.id;

          return (
            <g
              key={marker.id}
              onMouseEnter={() => setHoveredMarker(marker.id)}
              onMouseLeave={() => setHoveredMarker(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Marker circle */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 12 : 10}
                fill="var(--surface)"
                stroke={marker.isEarlySignal ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: prefersReducedMotion ? 0 : 0.8 + index * 0.1,
                }}
              />

              {/* Pulse effect for early signal */}
              {marker.isEarlySignal && !prefersReducedMotion && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={10}
                  fill="var(--accent-alpha-20)"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Icon */}
              <foreignObject
                x={x - 8}
                y={y - 8}
                width="16"
                height="16"
                style={{
                  color: marker.isEarlySignal ? "var(--accent)" : "var(--text-secondary)",
                  pointerEvents: "none",
                }}
              >
                <div style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {marker.icon}
                </div>
              </foreignObject>

              {/* Label (shown on hover) */}
              {isHovered && (
                <motion.text
                  x={x}
                  y={y - 18}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-primary)"
                  initial={{ opacity: 0, y: y - 15 }}
                  animate={{ opacity: 1, y: y - 18 }}
                  exit={{ opacity: 0, y: y - 15 }}
                  style={{
                    fontFamily: "var(--font-family)",
                    fontWeight: 500,
                  }}
                >
                  {marker.label}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
