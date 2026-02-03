"use client";

import React, { useState } from "react";
import { RiskTile } from "@/lib/intakeTypes";

interface LiveRiskMapProps {
  riskTiles: RiskTile[];
}

export default function LiveRiskMap({ riskTiles }: LiveRiskMapProps) {
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 border-red-200 text-red-800";
      case "moderate":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "low":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cardiovascular: "Cardiovascular",
      cancer: "Cancer",
      metabolic: "Metabolic",
      venous: "Venous",
      neuro_cognitive: "Neuro / Cognitive",
    };
    return labels[category] || category;
  };

  // Map risk categories to section IDs
  const categoryToSectionId: Record<string, string> = {
    cardiovascular: "cardiovascular",
    metabolic: "metabolic",
    cancer: "cancer-screening",
    neuro_cognitive: "neuro",
  };

  return (
    <div className="space-y-2">
      <label className="block text-[16px] leading-[24px] font-semibold text-gray-900 mb-2">
        Live Risk Map
      </label>
      <p className="text-[12px] leading-[16px] text-gray-500 mb-4">
        Updates in real time as you document. Click a tile for details.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {riskTiles.map((tile) => {
          const sectionId = categoryToSectionId[tile.category];
          return (
            <div key={tile.category}>
              {sectionId && (
                <div id={sectionId} className="scroll-mt-4" style={{ marginTop: "-4px", height: "4px" }} />
              )}
              <div
                className={`border rounded-xl cursor-pointer transition-colors ${getRiskColor(tile.level)}`}
                onClick={() => setExpandedTile(expandedTile === tile.category ? null : tile.category)}
                style={{ height: "72px", padding: "12px" }}
              >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] leading-[18px] font-medium">{getCategoryLabel(tile.category)}</span>
              <span
                className="px-1.5 rounded-[9px] text-[12px] leading-[16px] font-medium capitalize border"
                style={{ height: "18px", display: "inline-flex", alignItems: "center" }}
              >
                {tile.level}
              </span>
            </div>
            <div className="text-[12px] leading-[16px] text-gray-600">{tile.reason}</div>
                {expandedTile === tile.category && tile.details && (
                  <div className="mt-2 pt-2 border-t border-current/20 text-[12px] leading-[16px]">{tile.details}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

