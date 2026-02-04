"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * TrajectoryArtifact - Abstract visualization of longitudinal intelligence
 * 
 * Represents early risk signal detection over time through a minimal,
 * premium trajectory visualization. No UI chrome, just pure concept.
 */
export default function TrajectoryArtifact() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Defer animation for performance
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(() => setShouldAnimate(true), { timeout: 300 });
    } else {
      setTimeout(() => setShouldAnimate(true), 150);
    }
  }, []);

  // Trajectory points representing health data over time
  // Each point represents a data point that contributes to pattern detection
  const trajectoryPoints = [
    { x: 8, y: 65, size: 1.5, delay: 0.4 },
    { x: 18, y: 62, size: 1.5, delay: 0.5 },
    { x: 28, y: 58, size: 2, delay: 0.6 },
    { x: 38, y: 55, size: 2, delay: 0.7 },
    { x: 48, y: 52, size: 2.5, delay: 0.8 },
    { x: 58, y: 48, size: 2.5, delay: 0.9 },
    { x: 68, y: 45, size: 3, delay: 1.0 },
    { x: 78, y: 42, size: 3, delay: 1.1 },
    { x: 88, y: 38, size: 3.5, delay: 1.2 },
  ];

  // Early risk signal - appears later in the trajectory
  const riskSignal = { x: 72, y: 44 };

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle at ${riskSignal.x}% ${riskSignal.y}%, rgba(90, 208, 184, 0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Main trajectory visualization */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        {/* Trajectory baseline - subtle horizontal reference */}
        <motion.line
          x1="5"
          y1="70"
          x2="95"
          y2="70"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.8, 0.5, 1], delay: 0.3 }}
        />

        {/* Trajectory curve - represents health trend over time */}
        <motion.path
          d={`M ${trajectoryPoints[0].x} ${trajectoryPoints[0].y} ${trajectoryPoints.map((p, i) => {
            if (i === 0) return '';
            const prev = trajectoryPoints[i - 1];
            const cp1x = prev.x + (p.x - prev.x) * 0.5;
            const cp1y = prev.y;
            const cp2x = p.x - (p.x - prev.x) * 0.5;
            const cp2y = p.y;
            return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
          }).join(' ')}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.8, 0.5, 1], delay: 0.5 }}
        />

        {/* Data points along trajectory */}
        {trajectoryPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill="rgba(255, 255, 255, 0.4)"
            initial={{ scale: 0, opacity: 0 }}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.8, 0.5, 1],
              delay: point.delay,
            }}
          />
        ))}

        {/* Early risk signal detection - subtle pulse */}
        {shouldAnimate && (
          <>
            <motion.circle
              cx={riskSignal.x}
              cy={riskSignal.y}
              r="2.5"
              fill="rgba(90, 208, 184, 0.6)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.8, 0.5, 1],
                delay: 1.4,
              }}
            />
            {/* Subtle glow around risk signal */}
            <motion.circle
              cx={riskSignal.x}
              cy={riskSignal.y}
              r="4"
              fill="none"
              stroke="rgba(90, 208, 184, 0.3)"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1.2],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </>
        )}

        {/* Pattern connection line - subtle indicator */}
        <motion.line
          x1={trajectoryPoints[6].x}
          y1={trajectoryPoints[6].y}
          x2={riskSignal.x}
          y2={riskSignal.y}
          stroke="rgba(90, 208, 184, 0.2)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.5, 1],
            delay: 1.6,
          }}
        />
      </svg>

      {/* Subtle text hint - minimal, abstract */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <motion.p
          className="text-[11px] text-[var(--text-2)] tracking-[0.02em] font-normal"
          initial={{ opacity: 0, y: 10 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.5, 1], delay: 2.0 }}
        >
          Early signals detected
        </motion.p>
      </div>
    </div>
  );
}

