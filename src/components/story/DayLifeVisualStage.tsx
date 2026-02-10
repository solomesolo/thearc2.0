"use client";

import React from "react";
import MarketingProductScene, { SceneStep } from "./MarketingProductScene";

interface DayLifeVisualStageProps {
  activeStep: SceneStep;
  mode?: "static" | "embed"; // Kept for compatibility, but now always uses component mode
  prefersReducedMotion?: boolean;
}

export default function DayLifeVisualStage({
  activeStep,
  mode = "static",
  prefersReducedMotion = false,
}: DayLifeVisualStageProps) {
  return (
    <div
      className="relative w-full"
      style={{
        height: "clamp(500px, 60vh, 700px)",
        minHeight: "500px",
        maxHeight: "700px",
      }}
    >
      <MarketingProductScene step={activeStep} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}

