"use client";

import React from "react";

interface MarketingSceneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function MarketingSceneFrame({ children, className = "" }: MarketingSceneFrameProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius: "28px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 60% 40%, rgba(110,211,194,0.06), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none", // Disable all interactions by default
        }}
      >
        {children}
      </div>
    </div>
  );
}

