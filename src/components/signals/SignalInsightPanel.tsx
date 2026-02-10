"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Signal {
  id: string;
  name: string;
  latest: number | string;
  baseline: number | string;
  direction: "Improving" | "Worsening" | "Stable";
  source: "Lab" | "Wearable" | "Provider";
  confidenceLevel: "High" | "Moderate" | "Low";
  dataPointCount: number;
  insightText?: string;
  unit?: string;
}

interface SignalInsightPanelProps {
  signal: Signal | null;
}

export default function SignalInsightPanel({ signal }: SignalInsightPanelProps) {
  const { evtActionSetReminder, evtSignalClick } = useCommandCenterStore();

  if (!signal) {
    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "20px",
          position: "sticky",
          top: "88px",
          alignSelf: "flex-start",
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center", padding: "40px 20px" }}>
          Select a signal to see insights
        </div>
      </div>
    );
  }

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case "Improving":
        return "var(--success)";
      case "Worsening":
        return "var(--danger)";
      default:
        return "var(--info)";
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case "Improving":
        return <TrendingDown size={16} style={{ color: getDirectionColor(direction) }} />;
      case "Worsening":
        return <TrendingUp size={16} style={{ color: getDirectionColor(direction) }} />;
      default:
        return <Minus size={16} style={{ color: getDirectionColor(direction) }} />;
    }
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case "High":
        return "var(--success)";
      case "Moderate":
        return "var(--warning)";
      default:
        return "var(--danger)";
    }
  };

  const handleViewTrend = () => {
    const element = document.getElementById("expanded-trend-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSetReminder = () => {
    const frequency = signal.source === "Lab" ? "Every 6 months" : "Weekly summary";
    evtActionSetReminder(signal.id, `${signal.name} check-in`, frequency);
  };

  const handleSeeOptions = () => {
    window.location.href = `/demo/marketplace?filter=signal:${signal.id}`;
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        position: "sticky",
        top: "88px",
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>
        Signal insight
      </h3>

      {/* Latest */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase" }}>
          Latest
        </div>
        <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}>
          {signal.latest} {signal.unit || ""}
        </div>
      </div>

      {/* Direction */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase" }}>
          Direction
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {getDirectionIcon(signal.direction)}
          <span style={{ fontSize: "14px", fontWeight: 500, color: getDirectionColor(signal.direction) }}>
            {signal.direction}
          </span>
        </div>
      </div>

      {/* Confidence */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase" }}>
          Confidence
        </div>
        <div style={{ fontSize: "14px", fontWeight: 500, color: getConfidenceColor(signal.confidenceLevel) }}>
          {signal.confidenceLevel}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "2px" }}>
          {signal.dataPointCount} data points
        </div>
      </div>

      {/* Source */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase" }}>
          Source
        </div>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{signal.source}</div>
      </div>

      {/* Insight text */}
      {signal.insightText && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--surface-alt)",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            {signal.insightText}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={handleViewTrend}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          View trend
        </button>
        <button
          onClick={handleSetReminder}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Set reminder
        </button>
        <button
          onClick={handleSeeOptions}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "var(--primary)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          See options
        </button>
      </div>
    </div>
  );
}


