"use client";

import React, { useState } from "react";
import { Calendar, FileText, Watch, Stethoscope } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  type: "Lab" | "Wearable" | "Screening" | "Other";
  title: string;
  source?: string;
}

interface HealthTimelineCompactProps {
  events: TimelineEvent[];
}

export default function HealthTimelineCompact({ events }: HealthTimelineCompactProps) {
  const [filter, setFilter] = useState<"All" | "Labs" | "Wearables" | "Screenings">("All");

  const filteredEvents = events.filter((event) => {
    if (filter === "All") return true;
    if (filter === "Labs") return event.type === "Lab";
    if (filter === "Wearables") return event.type === "Wearable";
    if (filter === "Screenings") return event.type === "Screening";
    return true;
  });

  const displayEvents = filteredEvents.slice(0, 5);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Lab":
        return <FileText size={14} style={{ color: "var(--text-secondary)" }} />;
      case "Wearable":
        return <Watch size={14} style={{ color: "var(--text-secondary)" }} />;
      case "Screening":
        return <Stethoscope size={14} style={{ color: "var(--text-secondary)" }} />;
      default:
        return <Calendar size={14} style={{ color: "var(--text-secondary)" }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>Timeline</h3>
        <div style={{ display: "flex", gap: "4px" }}>
          {(["All", "Labs", "Wearables", "Screenings"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "4px 8px",
                backgroundColor: filter === f ? "var(--primary-light)" : "transparent",
                color: filter === f ? "var(--primary)" : "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: filter === f ? 500 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {displayEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              // Open EventDetailDrawer (would be implemented)
              console.log("Open event detail:", event.id);
            }}
            style={{
              padding: "10px",
              backgroundColor: "var(--surface-alt)",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface)";
              e.currentTarget.style.border = "1px solid var(--border)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
              e.currentTarget.style.border = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              {getTypeIcon(event.type)}
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)" }}>{event.title}</span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-tertiary)", paddingLeft: "22px" }}>
              {new Date(event.date).toLocaleDateString()} {event.source && `• ${event.source}`}
            </div>
          </div>
        ))}
        {displayEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-secondary)", fontSize: "12px" }}>
            No events found
          </div>
        )}
      </div>
    </div>
  );
}



