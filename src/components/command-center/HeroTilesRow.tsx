"use client";

import React from "react";
import ReadinessTile from "./ReadinessTile";
import RiskLoadTile from "./RiskLoadTile";
import DataConfidenceTile from "./DataConfidenceTile";

interface HeroTilesRowProps {
  readiness: {
    score: number;
    status: "Improving" | "Stable" | "Needs attention";
    drivers: string[];
  };
  riskLoad: {
    score: number;
    topDomains: Array<{ id: string; name: string; hasPredisposition?: boolean }>;
  };
  dataConfidence: {
    score: number;
    missingCount: number;
  };
}

export default function HeroTilesRow({ readiness, riskLoad, dataConfidence }: HeroTilesRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <ReadinessTile score={readiness.score} status={readiness.status} drivers={readiness.drivers} />
      <RiskLoadTile score={riskLoad.score} topDomains={riskLoad.topDomains} />
      <DataConfidenceTile score={dataConfidence.score} missingCount={dataConfidence.missingCount} />
    </div>
  );
}



