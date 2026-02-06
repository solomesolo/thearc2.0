"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface Signal {
  id: string;
  name: string;
  latest: string | number;
  unit: string;
  baseline: string | number;
  direction: "Improving" | "Worsening" | "Stable";
  source: "Lab" | "Provider" | "Wearable";
  data_points: number;
  trend_data: Array<{ date: string; value: number }>;
}

interface SignalsThatMatterCardProps {
  signals?: Signal[];
}

const signalPriority = [
  "Blood pressure",
  "ApoB",
  "LDL cholesterol",
  "HbA1c",
  "Fasting glucose",
  "Resting heart rate",
  "HRV",
  "VO₂ max",
  "Activity minutes",
];

const sortSignals = (signals: Signal[]): Signal[] => {
  return [...signals].sort((a, b) => {
    const aIndex = signalPriority.findIndex((p) => a.name.toLowerCase().includes(p.toLowerCase()));
    const bIndex = signalPriority.findIndex((p) => b.name.toLowerCase().includes(p.toLowerCase()));
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
};

export default function SignalsThatMatterCard({ signals = [] }: SignalsThatMatterCardProps) {
  const { openSignal, openUpload } = useDashboardUIStore();

  const sortedSignals = sortSignals(signals).slice(0, 5);

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

  const formatValue = (value: string | number, unit: string) => {
    return `${value} ${unit}`;
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
          marginBottom: "4px",
        }}
      >
        Signals that matter
      </h2>
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
          marginBottom: "20px",
        }}
      >
        Key trends from your labs, providers, and wearables.
      </p>

      {sortedSignals.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sortedSignals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => openSignal(signal.id)}
              style={{
                padding: "12px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {signal.name}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {formatValue(signal.latest, signal.unit)}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: getDirectionColor(signal.direction),
                      backgroundColor: `${getDirectionColor(signal.direction)}20`,
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {signal.direction}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {signal.source}
                  </span>
                </div>
              </div>

              {/* Sparkline */}
              {signal.trend_data && signal.trend_data.length > 1 && (
                <div style={{ height: "40px", marginBottom: "8px" }}>
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

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Data points: {signal.data_points}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openSignal(signal.id);
                  }}
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
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "32px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>No trends available yet.</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              marginBottom: "16px",
            }}
          >
            Upload labs or connect wearables to see your signals over time.
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => openUpload()}
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Upload documents
            </button>
            <button
              onClick={() => {
                window.location.href = "/connect/wearables";
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Connect wearables
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

