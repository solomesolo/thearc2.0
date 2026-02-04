"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * TrajectoryHeroArtifact - Clinical trajectory visualization
 * 
 * A floating medical research visualization showing a health trajectory
 * with confidence band, data points, and early risk signal detection.
 * No container, no hard edges - pure clinical visualization.
 */
export default function TrajectoryHeroArtifact() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredSignal, setHoveredSignal] = useState(false);

  useEffect(() => {
    // Defer animation for performance
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(() => setShouldAnimate(true), { timeout: 300 });
    } else {
      setTimeout(() => setShouldAnimate(true), 150);
    }
  }, []);

  // Data points along the trajectory (5 points for clinical feel)
  // Tooltips: 2-4 words max, clinical terminology
  const dataPoints = [
    { id: 0, x: 10, y: 50, tooltip: "Lab marker" },
    { id: 1, x: 25, y: 49, tooltip: "Wearable signal" },
    { id: 2, x: 40, y: 47, tooltip: "Trend shift" },
    { id: 3, x: 60, y: 44, tooltip: "Pattern detected" },
    { id: 4, x: 85, y: 40, tooltip: "Current state" },
  ];

  // Early risk signal - appears before curve changes (between point 2 and 3)
  const signalPoint = { x: 50, y: 45.5 };

  // Generate smooth trajectory curve path
  const generateCurvePath = () => {
    const points = dataPoints;
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) * 0.5;
      const cp2y = curr.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  // Generate confidence band path (range band behind curve)
  const generateConfidenceBand = () => {
    const points = dataPoints;
    const bandWidth = 3; // Vertical spread of confidence band
    
    // Upper band (curve + bandWidth)
    let upperPath = `M ${points[0].x} ${points[0].y - bandWidth}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp1y = prev.y - bandWidth;
      const cp2x = curr.x - (curr.x - prev.x) * 0.5;
      const cp2y = curr.y - bandWidth;
      upperPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y - bandWidth}`;
    }
    
    // Lower band (curve - bandWidth) - reverse order
    let lowerPath = `L ${points[points.length - 1].x} ${points[points.length - 1].y + bandWidth}`;
    for (let i = points.length - 2; i >= 0; i--) {
      const prev = points[i + 1];
      const curr = points[i];
      const cp1x = curr.x + (prev.x - curr.x) * 0.5;
      const cp1y = curr.y + bandWidth;
      const cp2x = prev.x - (prev.x - curr.x) * 0.5;
      const cp2y = prev.y + bandWidth;
      lowerPath = `C ${cp2x} ${cp2y}, ${cp1x} ${cp1y}, ${curr.x} ${curr.y + bandWidth} ` + lowerPath;
    }
    lowerPath += ` Z`;
    
    return upperPath + lowerPath;
  };

  return (
    <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "1.15", maxHeight: "460px", minHeight: "320px" }}>
      {/* Floating visual group - Soft shadow only on the group */}
      <div
        className="relative w-full h-full"
        style={{
          filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
        }}
      >
        {/* SVG visualization - No container, pure clinical visualization */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          {/* Confidence band (range band) - Faint, behind curve */}
          <motion.path
            d={generateConfidenceBand()}
            fill="rgba(255, 255, 255, 0.03)"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 }}
          />

          {/* Faint horizontal axis line - Hairline stroke */}
          <motion.line
            x1="8"
            y1="70"
            x2="92"
            y2="70"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.8, 0.5, 1], delay: 0.3 }}
          />

          {/* Smooth trajectory curve - Thin stroke (1px equivalent) */}
          {/* Premium motion: Line draws in slowly (400-600ms), calm and clinical */}
          <motion.path
            d={generateCurvePath()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5, // 500ms - between 400-600ms, calm and clinical
              ease: [0.25, 0.8, 0.5, 1], // Smooth ease, no spring
              delay: 0.5 
            }}
          />

          {/* Data points along the line (5 points) */}
          {dataPoints.map((point, index) => (
            <g key={point.id}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="0.8"
                fill="rgba(255, 255, 255, 0.4)"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.1"
                initial={{ scale: 0, opacity: 0 }}
                animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.8, 0.5, 1],
                  delay: 0.8 + index * 0.12,
                }}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: "pointer" }}
              />
              
              {/* Tooltip on hover - Tiny, neutral, subtle blur, no border */}
              {hoveredPoint === point.id && (
                <motion.g
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  style={{ filter: "blur(0.5px)" }}
                >
                  {/* Neutral background - very subtle */}
                  <rect
                    x={point.x - Math.max(8, point.tooltip.length * 1.8)}
                    y={point.y - 7}
                    width={Math.max(16, point.tooltip.length * 3.6)}
                    height="4"
                    rx="1"
                    fill="rgba(255, 255, 255, 0.08)"
                  />
                  {/* Text - very small */}
                  <text
                    x={point.x}
                    y={point.y - 4.5}
                    textAnchor="middle"
                    fontSize="2"
                    fill="rgba(255, 255, 255, 0.7)"
                    fontFamily="var(--font-family-body)"
                    fontWeight="400"
                  >
                    {point.tooltip}
                  </text>
                </motion.g>
              )}
            </g>
          ))}

          {/* Subtle accent signal dot - Small, desaturated (not bright teal) */}
          {shouldAnimate && (
            <>
              {/* Premium motion: Signal dot appears, then pulses once (not looping) */}
              <motion.circle
                cx={signalPoint.x}
                cy={signalPoint.y}
                r="1.2"
                fill="rgba(120, 180, 170, 0.5)" // Desaturated mint/gray-green
                stroke="rgba(120, 180, 170, 0.3)"
                strokeWidth="0.15"
                initial={{ scale: 0, opacity: 0 }}
                animate={shouldAnimate ? { 
                  scale: 1,
                  opacity: 0.6,
                } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.8, 0.5, 1], // Smooth ease, no spring
                  delay: 1.0,
                }}
                onMouseEnter={() => setHoveredSignal(true)}
                onMouseLeave={() => setHoveredSignal(false)}
                style={{ cursor: "pointer" }}
              />
              
              {/* Premium pulse animation - Pulses once only (not looping), calm and clinical */}
              <motion.circle
                cx={signalPoint.x}
                cy={signalPoint.y}
                r="2.5"
                fill="none"
                stroke="rgba(120, 180, 170, 0.2)"
                strokeWidth="0.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={shouldAnimate ? { 
                  scale: [0, 1.4, 1.2],
                  opacity: [0, 0.3, 0],
                } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.8, 0.5, 1], // Smooth ease, no spring
                  delay: 1.1,
                  times: [0, 0.5, 1], // Ensures it completes and stops (no loop)
                }}
              />
              
              {/* Tooltip on hover - Tiny, neutral, subtle blur, no border */}
              {hoveredSignal && (
                <motion.g
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  style={{ filter: "blur(0.5px)" }}
                >
                  {/* Neutral background - very subtle */}
                  <rect
                    x={signalPoint.x - 10}
                    y={signalPoint.y - 7}
                    width="20"
                    height="4"
                    rx="1"
                    fill="rgba(255, 255, 255, 0.08)"
                  />
                  {/* Text - very small */}
                  <text
                    x={signalPoint.x}
                    y={signalPoint.y - 4.5}
                    textAnchor="middle"
                    fontSize="2"
                    fill="rgba(255, 255, 255, 0.7)"
                    fontFamily="var(--font-family-body)"
                    fontWeight="400"
                  >
                    Early risk signal
                  </text>
                </motion.g>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
