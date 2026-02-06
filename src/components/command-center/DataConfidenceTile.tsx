"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface DataConfidenceTileProps {
  score: number; // Coverage percentage 0-100
  missingCount: number;
}

export default function DataConfidenceTile({ score, missingCount }: DataConfidenceTileProps) {
  const { evtGapClick } = useCommandCenterStore();

  const getScoreColor = () => {
    if (score >= 80) return "var(--success)";
    if (score >= 50) return "var(--warning)";
    return "var(--danger)";
  };

  const handleFixNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Find highest priority gap and open it
    // For now, just open add data modal
    useCommandCenterStore.getState().evtAddDataClick();
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
        useCommandCenterStore.setState({ selectedFocusTile: "confidence" });
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
        Data confidence
      </div>
      <div style={{ fontSize: "48px", fontWeight: 600, color: getScoreColor(), marginBottom: "12px" }}>
        {score}%
      </div>
      {missingCount > 0 && (
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "16px" }}>
          {missingCount} {missingCount === 1 ? "item" : "items"} missing
        </div>
      )}
      {missingCount > 0 && (
        <button
          onClick={handleFixNow}
          style={{
            marginTop: "auto",
            padding: "8px 16px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 500,
            width: "100%",
          }}
        >
          Fix now
        </button>
      )}
    </div>
  );
}

