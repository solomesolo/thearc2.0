"use client";

import React from "react";

export type DomainDot = "green" | "yellow" | "red" | "gray";

interface DomainStatusDotProps {
  dot: DomainDot;
  size?: "sm" | "md";
}

export default function DomainStatusDot({ dot, size = "md" }: DomainStatusDotProps) {
  const sizePx = size === "sm" ? 8 : 12;
  const dotSize = size === "sm" ? 6 : 10;

  const getColor = () => {
    switch (dot) {
      case "green":
        return "#10B981"; // var(--success)
      case "yellow":
        return "#F59E0B"; // var(--warning)
      case "red":
        return "#EF4444"; // var(--danger)
      case "gray":
        return "#9CA3AF"; // var(--text-tertiary)
    }
  };

  const getAriaLabel = () => {
    switch (dot) {
      case "green":
        return "Status: OK";
      case "yellow":
        return "Status: Needs attention";
      case "red":
        return "Status: High priority";
      case "gray":
        return "Status: Unknown";
    }
  };

  return (
    <div
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        borderRadius: "50%",
        backgroundColor: getColor(),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-label={getAriaLabel()}
      role="status"
    >
      <div
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: getColor(),
        }}
      />
    </div>
  );
}

