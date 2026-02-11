"use client";

import React from "react";
import { useCommandCenterStore, DomainId } from "@/state/useCommandCenterStore";

interface Domain {
  id: DomainId;
  name: string;
  score: number;
  confidence: number;
  predisposition?: boolean;
  watchReason?: string;
  dataSources?: string[];
}

interface RiskRadarProps {
  domains: Domain[];
}

export default function RiskRadar({ domains }: RiskRadarProps) {
  const context = useCommandCenterStore((state) => state.context);
  const highlightTargetId = useCommandCenterStore((state) => state.highlightTargetId);
  const { evtDomainClick } = useCommandCenterStore();

  const getScoreColor = (score: number) => {
    if (score >= 70) return "var(--success)";
    if (score >= 40) return "var(--warning)";
    return "var(--danger)";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 70) return "High";
    if (confidence >= 40) return "Medium";
    return "Low";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return "Low";
    if (score >= 40) return "Moderate";
    return "High";
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}
      >
        Risk radar
      </h2>
      <p
        style={{
          fontSize: "10px",
          color: "var(--text-tertiary)",
          marginBottom: "12px",
        }}
      >
        Click a domain to see what matters and what to do next.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          flex: 1,
        }}
      >
        {domains.map((domain) => {
          const isSelected = context.type === "domain" && context.id === domain.id;
          return (
            <div
              key={domain.id}
              id={`domain-${domain.id}`}
              onClick={() => evtDomainClick(domain.id)}
              style={{
                padding: "12px",
                backgroundColor: isSelected ? "var(--surface-alt)" : "var(--surface-alt)",
                borderRadius: "8px",
                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--border)";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {domain.name}
                </div>
                {domain.predisposition && (
                  <span
                    style={{
                      fontSize: "8px",
                      padding: "1px 4px",
                      backgroundColor: "var(--warning)",
                      color: "white",
                      borderRadius: "3px",
                      fontWeight: 600,
                    }}
                    title={domain.watchReason ? `Watch reason: ${domain.watchReason}` : undefined}
                  >
                    Watch
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: getScoreColor(domain.score),
                  }}
                >
                  {domain.score}
                </span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>score</span>
              </div>
              <div style={{ fontSize: "9px", color: "var(--text-tertiary)", marginBottom: "2px" }}>
                Risk: {getRiskLabel(domain.score)}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color: "var(--text-tertiary)",
                }}
                title={
                  domain.dataSources
                    ? `Confidence: ${getConfidenceLabel(domain.confidence)}\nBased on: ${domain.dataSources.join(", ")}`
                    : `Confidence: ${getConfidenceLabel(domain.confidence)}`
                }
              >
                {getConfidenceLabel(domain.confidence)} conf.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
