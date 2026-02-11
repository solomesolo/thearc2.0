"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { filterSignals } from "@/utils/commandCenterFilters";

interface Signal {
  id: string;
  name: string;
  latest: number | string;
  unit: string;
  direction: "Improving" | "Worsening" | "Stable";
  trend_data?: Array<{ date: string; value: number }>;
  source?: string;
  confidence?: number;
  domain_id?: string;
  impactScore?: number;
}

interface SignalsBoardProps {
  signals: Signal[];
}

export default function SignalsBoard({ signals }: SignalsBoardProps) {
  const context = useCommandCenterStore((state) => state.context);
  const { evtSignalClick } = useCommandCenterStore();

  // Filter signals by context
  const filteredSignals = filterSignals(signals, context);

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

  const getDirectionArrow = (direction: string) => {
    switch (direction) {
      case "Improving":
        return "↓";
      case "Worsening":
        return "↑";
      default:
        return "→";
    }
  };

  const getSourceIcon = (source?: string) => {
    switch (source?.toLowerCase()) {
      case "wearable":
        return "⌚";
      case "lab":
        return "🧪";
      case "provider":
        return "👤";
      default:
        return "📊";
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "var(--text-tertiary)";
    if (confidence >= 70) return "var(--success)";
    if (confidence >= 40) return "var(--warning)";
    return "var(--danger)";
  };

  const getContextLabel = () => {
    if (context.type === "domain") {
      const domainMap: Record<string, string> = {
        heart: "Heart",
        metabolic: "Metabolic",
        sleep: "Sleep & recovery",
        fitness: "Fitness",
      };
      return domainMap[context.id || ""] || context.id;
    }
    return null;
  };

  const contextLabel = getContextLabel();
  const { evtInboxClearContext } = useCommandCenterStore();

  return (
    <div
      style={{
        gridColumn: "1 / 13",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Signals that matter
        </h2>
        {contextLabel && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Showing signals related to: <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{contextLabel}</span>
            </span>
            <button
              onClick={evtInboxClearContext}
              style={{
                fontSize: "12px",
                color: "var(--primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {filteredSignals.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => evtSignalClick(signal.id, signal.name)}
              style={{
                padding: "16px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Signal name + source */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    flex: 1,
                  }}
                >
                  {signal.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "12px" }} title={signal.source || "Unknown source"}>
                    {getSourceIcon(signal.source)}
                  </span>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: getConfidenceColor(signal.confidence),
                    }}
                    title={`Confidence: ${signal.confidence || "Unknown"}%`}
                  />
                </div>
              </div>

              {/* Latest value + direction */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {signal.latest}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{signal.unit}</span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: getDirectionColor(signal.direction),
                  }}
                  title={signal.direction}
                >
                  {getDirectionArrow(signal.direction)}
                </span>
              </div>

              {/* Mini sparkline */}
              {signal.trend_data && signal.trend_data.length > 1 && (
                <div style={{ height: "32px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={signal.trend_data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={getDirectionColor(signal.direction)}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
          <div style={{ marginBottom: "8px" }}>No signals available yet.</div>
          <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
            Upload labs or connect wearables to see signals over time.
          </div>
        </div>
      )}
    </div>
  );
}

