"use client";

import React from "react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface TodayHeroCardProps {
  status: "Stable" | "Improving" | "Needs attention";
  watchAreas?: string[];
  dataConfidence: number;
  nextAction?: {
    id: string;
    title: string;
    hasServices?: boolean;
  };
}

export default function TodayHeroCard({
  status,
  watchAreas = [],
  dataConfidence,
  nextAction,
}: TodayHeroCardProps) {
  const { openReminder, setMarketplaceFilter, scrollToSection, openUpload } = useDashboardUIStore();

  const getConfidenceLabel = (percent: number) => {
    if (percent >= 70) return "Good";
    if (percent >= 40) return "Fair";
    return "Limited";
  };

  const handleDoNow = () => {
    if (!nextAction) return;
    
    if (nextAction.hasServices) {
      setMarketplaceFilter({
        sourceType: "action",
        sourceId: nextAction.id,
        label: nextAction.title,
      });
      scrollToSection("marketplace");
    } else {
      openReminder({
        name: nextAction.title,
      });
    }
  };

  const handleDetails = () => {
    scrollToSection("nextsteps");
  };

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

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "20px",
        }}
      >
        Today
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Status line */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", color: "var(--text-secondary)", minWidth: "100px" }}>
            Status
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: getStatusColor(status),
            }}
          >
            {status}
          </span>
        </div>

        {/* Watch areas */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <span style={{ fontSize: "14px", color: "var(--text-secondary)", minWidth: "100px" }}>
            Watch areas
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {watchAreas.length === 0 ? (
              <span style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
                None right now
              </span>
            ) : (
              watchAreas.slice(0, 2).map((area, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "6px",
                    color: "var(--text-primary)",
                  }}
                >
                  {area}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Data confidence */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", color: "var(--text-secondary)", minWidth: "100px" }}>
            Data confidence
          </span>
          <span style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)" }}>
            {getConfidenceLabel(dataConfidence)} ({dataConfidence}%)
          </span>
        </div>

        {/* Next best action */}
        {nextAction ? (
          <div
            style={{
              padding: "16px",
              backgroundColor: "var(--surface-alt)",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              Next best action
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              {nextAction.title}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleDoNow}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Do now
              </button>
              <button
                onClick={handleDetails}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Details
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ marginBottom: "8px" }}>No urgent actions right now.</div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
                marginBottom: "16px",
              }}
            >
              Add more data to improve your recommendations.
            </div>
            <button
              onClick={() => openUpload()}
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              + Add data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

