"use client";

import React, { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { filterSignals } from "@/utils/commandCenterFilters";

interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  source?: string;
}

interface Signal {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  direction: "Improving" | "Worsening" | "Stable";
  trend_data?: Array<{ date: string; value: number }>;
  domain_id?: string;
  impactScore?: number;
  confidence?: number;
}

interface TimelineSignalsToggleProps {
  events?: TimelineEvent[];
  signals?: Signal[];
}

export default function TimelineSignalsToggle({
  events = [],
  signals = [],
}: TimelineSignalsToggleProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "signals">("timeline");
  const [timelineFilter, setTimelineFilter] = useState<string>("All");
  const context = useCommandCenterStore((state) => state.context);
  const { evtAddDataClick } = useCommandCenterStore();

  const handleKeyDown = (e: React.KeyboardEvent, tab: "timeline" | "signals") => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tab);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab("timeline");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab("signals");
    }
  };

  // Filter events by timeline filter
  const filteredEvents =
    timelineFilter === "All"
      ? events
      : events.filter((e) => e.type.toLowerCase() === timelineFilter.toLowerCase());

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

  const filterOptions = ["All", "Labs", "Screenings", "Imaging", "Medications", "Diagnoses", "Wearables"];

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
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
      }}
    >
      {/* Tabs */}
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          role="tab"
          aria-selected={activeTab === "timeline"}
          aria-controls="timeline-panel"
          onClick={() => setActiveTab("timeline")}
          onKeyDown={(e) => handleKeyDown(e, "timeline")}
          style={{
            padding: "8px 16px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "timeline" ? "2px solid var(--primary)" : "2px solid transparent",
            color: activeTab === "timeline" ? "var(--primary)" : "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeTab === "timeline" ? 500 : 400,
            transition: "all 0.2s",
          }}
        >
          Timeline
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "signals"}
          aria-controls="signals-panel"
          onClick={() => setActiveTab("signals")}
          onKeyDown={(e) => handleKeyDown(e, "signals")}
          style={{
            padding: "8px 16px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "signals" ? "2px solid var(--primary)" : "2px solid transparent",
            color: activeTab === "signals" ? "var(--primary)" : "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeTab === "signals" ? 500 : 400,
            transition: "all 0.2s",
          }}
        >
          Signals
        </button>
      </div>

      {/* Timeline Panel */}
      {activeTab === "timeline" && (
        <div role="tabpanel" id="timeline-panel" aria-labelledby="timeline-tab">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Health timeline
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Filter:</span>
              <select
                value={timelineFilter}
                onChange={(e) => setTimelineFilter(e.target.value)}
                style={{
                  padding: "4px 8px",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  backgroundColor: "var(--surface-alt)",
                  color: "var(--text-primary)",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {filterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          marginBottom: "4px",
                        }}
                      >
                        {event.title}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    {event.source && (
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "2px 6px",
                          backgroundColor: "var(--surface-alt)",
                          borderRadius: "4px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {event.source}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
              <div style={{ marginBottom: "8px" }}>No events yet.</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-tertiary)",
                  marginBottom: "16px",
                }}
              >
                Upload documents or connect providers to build your timeline.
              </div>
              <button
                onClick={evtAddDataClick}
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
                + Add data
              </button>
            </div>
          )}
        </div>
      )}

      {/* Signals Panel */}
      {activeTab === "signals" && (
        <div role="tabpanel" id="signals-panel" aria-labelledby="signals-tab">
          <div style={{ marginBottom: "16px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Key trends
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
              }}
            >
              Trends shown are selected based on impact and confidence.
            </p>
          </div>

          {filteredSignals.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredSignals.map((signal) => (
                <div
                  key={signal.id}
                  style={{
                    padding: "12px",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {signal.name}
                    </div>
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
                  </div>
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
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      {signal.value} {signal.unit}
                    </div>
                    <button
                      onClick={() => {
                        const { evtSignalClick } = useCommandCenterStore.getState();
                        evtSignalClick(signal.id, signal.name);
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
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
              <div style={{ marginBottom: "8px" }}>No trends available yet.</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-tertiary)",
                  marginBottom: "16px",
                }}
              >
                Upload labs or connect wearables to see signals over time.
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={evtAddDataClick}
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
      )}
    </div>
  );
}
