"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { getWhatChanged, getTopAction } from "@/utils/commandCenterFilters";

interface HealthStoryStripProps {
  status: "Stable" | "Improving" | "Needs attention";
  watchAreas?: string[];
  signals?: Array<{ name: string; latest: number | string; baseline: number | string; direction: string }>;
  actions?: Array<{ id: string; title: string; has_services?: boolean; recommended_frequency?: string }>;
  coveragePercent: number;
}

export default function HealthStoryStrip({
  status,
  watchAreas = [],
  signals = [],
  actions = [],
  coveragePercent,
}: HealthStoryStripProps) {
  const context = useCommandCenterStore((state) => state.context);
  const { evtActionDoNow, evtAddDataClick } = useCommandCenterStore();

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Improving":
        return "var(--success)";
      case "Needs attention":
        return "var(--warning)";
      default:
        return "var(--info)";
    }
  };

  const getConfidenceLabel = (percent: number) => {
    if (percent >= 70) return "Good";
    if (percent >= 40) return "Fair";
    return "Limited";
  };

  const whatChanged = getWhatChanged(signals);
  const topAction = getTopAction(actions, context);

  const handleCTA = () => {
    if (topAction) {
      evtActionDoNow(topAction.id, topAction.title, topAction.has_services || false, topAction.recommended_frequency);
    } else {
      evtAddDataClick();
    }
  };

  const getCTALabel = () => {
    if (!topAction) return "Add data";
    if (topAction.has_services) return "Do now";
    if (topAction.title.toLowerCase().includes("upload") || topAction.title.toLowerCase().includes("connect")) {
      return topAction.title.toLowerCase().includes("upload") ? "Upload" : "Connect";
    }
    return "Do now";
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
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "12px",
        }}
      >
        Today
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", fontSize: "12px", flex: 1 }}>
        <span style={{ color: "var(--text-secondary)" }}>Status:</span>
        <span style={{ fontWeight: 500, color: getStatusColor(status) }}>{status}</span>

        <span style={{ color: "var(--text-secondary)" }}>Focus:</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {watchAreas.length === 0 ? (
            <span style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>None</span>
          ) : (
            watchAreas.slice(0, 2).map((area, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "10px",
                  padding: "2px 6px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "4px",
                  color: "var(--text-primary)",
                }}
              >
                {area}
              </span>
            ))
          )}
        </div>

        <span style={{ color: "var(--text-secondary)" }}>Confidence:</span>
        <span style={{ fontWeight: 500 }}>{getConfidenceLabel(coveragePercent)} ({coveragePercent}%)</span>

        <span style={{ color: "var(--text-secondary)" }}>Changed:</span>
        <span style={{ fontSize: "11px" }}>{whatChanged}</span>
      </div>

      {/* CTA at bottom */}
      <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>
          {topAction ? topAction.title : "Add data to unlock recommendations."}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={handleCTA}
            style={{
              flex: 1,
              padding: "6px 12px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {getCTALabel()}
          </button>
          {topAction && (
            <button
              onClick={() => {
                const { evtActionDetails } = useCommandCenterStore.getState();
                evtActionDetails(topAction.id, topAction.title);
              }}
              style={{
                padding: "6px 12px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
