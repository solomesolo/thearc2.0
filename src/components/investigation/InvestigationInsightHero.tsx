"use client";

import { arcTokens } from "@/lib/ui/arcTokens";

interface InvestigationInsightHeroProps {
  finding: string;
  direction: "up" | "down" | "neutral";
  confidence: "High" | "Moderate" | "Low";
  dataCompleteness: number;
  whyItMatters: string;
}

export default function InvestigationInsightHero({
  finding,
  direction,
  confidence,
  dataCompleteness,
  whyItMatters,
}: InvestigationInsightHeroProps) {
  const getDirectionSymbol = () => {
    switch (direction) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  const getDirectionColor = () => {
    switch (direction) {
      case "up":
        return arcTokens.semantic.warning; // Up risk = warning
      case "down":
        return arcTokens.semantic.success; // Down risk = success
      default:
        return arcTokens.text.tertiary; // Neutral = muted
    }
  };

  const getConfidenceColor = () => {
    switch (confidence) {
      case "High":
        return arcTokens.semantic.success;
      case "Moderate":
        return arcTokens.accent.primary;
      default:
        return arcTokens.text.tertiary;
    }
  };

  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.default}`,
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        marginBottom: "24px",
      }}
    >
      {/* Main Finding */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: arcTokens.text.primary,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {finding}
          </h2>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: getDirectionColor(),
            }}
          >
            {getDirectionSymbol()}
          </span>
        </div>
      </div>

      {/* Confidence & Data Completeness */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            backgroundColor: `${getConfidenceColor()}20`,
            border: `1px solid ${getConfidenceColor()}40`,
            fontSize: "12px",
            fontWeight: 500,
            color: getConfidenceColor(),
          }}
        >
          Confidence: {confidence}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: arcTokens.text.secondary,
          }}
        >
          Data completeness: {dataCompleteness}%
        </div>
      </div>

      {/* Why It Matters */}
      <p
        style={{
          fontSize: "14px",
          color: arcTokens.text.secondary,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {whyItMatters}
      </p>
    </div>
  );
}


