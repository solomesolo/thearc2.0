"use client";

import { arcTokens } from "@/lib/ui/arcTokens";

interface Delta {
  name: string;
  before: string;
  after: string;
  trend: "up" | "down" | "stable";
}

interface InvestigationDeltaGridProps {
  deltas: Delta[];
}

export default function InvestigationDeltaGrid({ deltas }: InvestigationDeltaGridProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return arcTokens.semantic.warning;
      case "down":
        return arcTokens.semantic.success;
      default:
        return arcTokens.text.tertiary;
    }
  };

  const getTrendSymbol = (trend: string) => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.default}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: arcTokens.text.primary,
          marginBottom: "16px",
        }}
      >
        What changed
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {deltas.map((delta, idx) => (
          <div
            key={idx}
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: arcTokens.bg.panel,
              border: `1px solid ${arcTokens.border.default}`,
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: arcTokens.text.primary,
                marginBottom: "8px",
              }}
            >
              {delta.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "14px", color: arcTokens.text.secondary }}>{delta.before}</span>
              <span style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>→</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: arcTokens.text.primary }}>{delta.after}</span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: getTrendColor(delta.trend),
                }}
              >
                {getTrendSymbol(delta.trend)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


