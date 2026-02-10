"use client";

import React, { useState } from "react";

interface TimelineMiniStripProps {
  onHover?: () => void;
}

export default function TimelineMiniStrip({ onHover }: TimelineMiniStripProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mt-4 pt-4"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center gap-1.5 h-[40px] px-2 rounded-[8px] transition-opacity"
        style={{
          backgroundColor: "rgba(231,240,238,0.02)",
          opacity: isHovered ? 1 : 0.6,
        }}
      >
        {/* Lab markers */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 rounded-full"
            style={{
              backgroundColor: "rgba(231,240,238,0.15)",
            }}
          />
        ))}
        {/* Signal detected marker */}
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: "var(--accent-alpha-60)",
          }}
        />
        {/* Recommendation bubble */}
        <div
          className="flex-1 h-1.5 rounded-full"
          style={{
            backgroundColor: "var(--accent-alpha-20)",
          }}
        />
      </div>
      {isHovered && (
        <p
          className="text-[10px] mt-2 text-center"
          style={{
            color: "var(--text-muted)",
          }}
        >
          Pattern visible only when viewed together
        </p>
      )}
    </div>
  );
}


