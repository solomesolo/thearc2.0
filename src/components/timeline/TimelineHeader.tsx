"use client";

import React from "react";
import AddDataMenu from "@/components/controls/AddDataMenu";

type Range = "30d" | "90d" | "6m" | "12m" | "24m" | "all";

interface TimelineHeaderProps {
  range: Range;
  search: string;
  onRangeChange: (range: Range) => void;
  onSearchChange: (search: string) => void;
}

export default function TimelineHeader({ range, search, onRangeChange, onSearchChange }: TimelineHeaderProps) {
  const ranges: Array<{ id: Range; label: string }> = [
    { id: "30d", label: "30 days" },
    { id: "90d", label: "90 days" },
    { id: "6m", label: "6 months" },
    { id: "12m", label: "12 months" },
    { id: "24m", label: "24 months" },
    { id: "all", label: "All time" },
  ];

  return (
    <div
      style={{
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Left: Title + Subtitle */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Timeline
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Your health history in one place.
        </p>
      </div>

      {/* Right: Add data + Range + Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Range:</span>
          <select
            value={range}
            onChange={(e) => onRangeChange(e.target.value as Range)}
            style={{
              padding: "6px 12px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              backgroundColor: "var(--surface-alt)",
              color: "var(--text-primary)",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {ranges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search documents, labs, medications..."
          style={{
            padding: "8px 12px",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            backgroundColor: "var(--surface-alt)",
            color: "var(--text-primary)",
            fontSize: "13px",
            minWidth: "200px",
          }}
        />
        <AddDataMenu />
      </div>
    </div>
  );
}

