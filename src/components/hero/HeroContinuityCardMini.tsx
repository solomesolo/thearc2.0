"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroContinuityCardMiniProps {
  coveragePercent?: number;
  trendDirection?: "up" | "flat" | "down";
  prefersReducedMotion?: boolean;
}

export function HeroContinuityCardMini({
  coveragePercent = 70,
  trendDirection = "up",
  prefersReducedMotion = false,
}: HeroContinuityCardMiniProps) {
  const [animatedCoverage, setAnimatedCoverage] = useState(coveragePercent);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && !prefersReducedMotion) {
      // Animate coverage: 70 → 72 → 74 → 70
      const interval = setInterval(() => {
        setAnimatedCoverage((prev) => {
          if (prev >= 74) return 70;
          return prev + 2;
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setAnimatedCoverage(coveragePercent);
    }
  }, [isHovered, prefersReducedMotion, coveragePercent]);

  const trendIcon = trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "→";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[520px] rounded-[18px] p-4 md:p-[18px] transition-all duration-200"
      style={{
        backgroundColor: "var(--bg-2)",
        border: `1px solid var(--border-1)`,
        borderColor: isHovered ? "var(--border-2)" : "var(--border-1)",
        boxShadow: isHovered ? "var(--shadow-2)" : "var(--shadow-1)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Dot + Text */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Dot with optional outer ring */}
          <div className="relative flex-shrink-0">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            {!prefersReducedMotion && (
              <div
                className="absolute inset-0 rounded-full blur-md opacity-18"
                style={{
                  backgroundColor: "var(--accent)",
                  width: "18px",
                  height: "18px",
                  top: "-7px",
                  left: "-7px",
                }}
              />
            )}
          </div>
          {/* Text */}
          <p
            className="text-sm font-medium leading-relaxed flex-1"
            style={{
              color: "var(--text-1)",
            }}
          >
            Data continuity improves signal accuracy and recommendations.
          </p>
        </div>

        {/* Right: Coverage Chip */}
        <div
          className="rounded-full px-[10px] py-2 flex-shrink-0 transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-inset)",
            border: `1px solid var(--border-1)`,
          }}
        >
          <span
            className="text-[13px] font-semibold whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            Coverage: {animatedCoverage}% {trendIcon}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
