"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { useCommandCenterStore, DomainId } from "@/state/useCommandCenterStore";

interface RiskLoadTileProps {
  score: number; // 0-100 (lower is better)
  topDomains: Array<{ id: DomainId; name: string; hasPredisposition?: boolean }>;
}

export default function RiskLoadTile({ score, topDomains = [] }: RiskLoadTileProps) {
  const { evtDomainClick } = useCommandCenterStore();

  const getScoreColor = () => {
    if (score <= 30) return "var(--success)";
    if (score <= 60) return "var(--warning)";
    return "var(--danger)";
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={() => {
        useCommandCenterStore.setState({ selectedFocusTile: "risk" });
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 500 }}>
        Risk load
      </div>
      <div style={{ fontSize: "48px", fontWeight: 600, color: getScoreColor(), marginBottom: "12px" }}>
        {score}
      </div>
      {topDomains.length > 0 && (
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px" }}>Focus areas</div>
          {topDomains.slice(0, 2).map((domain) => (
            <div
              key={domain.id}
              onClick={(e) => {
                e.stopPropagation();
                evtDomainClick(domain.id);
              }}
              style={{
                fontSize: "12px",
                color: "var(--text-primary)",
                padding: "6px 8px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              {domain.name}
              {domain.hasPredisposition && (
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    backgroundColor: "var(--warning-light)",
                    color: "var(--warning)",
                    borderRadius: "3px",
                  }}
                >
                  Watch
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

