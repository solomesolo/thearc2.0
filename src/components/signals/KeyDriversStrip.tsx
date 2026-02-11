"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  latest: number | string;
  baseline: number | string;
  direction: "Improving" | "Worsening" | "Stable";
  delta?: number;
}

interface KeyDriversStripProps {
  drivers: Driver[];
  onDriverClick: (signalId: string) => void;
}

export default function KeyDriversStrip({ drivers, onDriverClick }: KeyDriversStripProps) {
  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case "Improving":
        return <TrendingDown size={14} style={{ color: "var(--success)" }} />;
      case "Worsening":
        return <TrendingUp size={14} style={{ color: "var(--danger)" }} />;
      default:
        return <Minus size={14} style={{ color: "var(--info)" }} />;
    }
  };

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

  const formatDelta = (driver: Driver) => {
    if (driver.delta !== undefined) {
      return `${driver.delta > 0 ? "+" : ""}${driver.delta}`;
    }
    // Calculate delta from latest and baseline
    if (typeof driver.latest === "number" && typeof driver.baseline === "number") {
      const delta = driver.latest - driver.baseline;
      return `${delta > 0 ? "+" : ""}${delta.toFixed(1)}`;
    }
    return "";
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>Key drivers</h2>
        <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Biggest changes in your selected range.</span>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {drivers.map((driver) => (
          <button
            key={driver.id}
            onClick={() => onDriverClick(driver.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              backgroundColor: "var(--surface-alt)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-primary)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
            }}
          >
            <span>{driver.name}</span>
            {getDirectionIcon(driver.direction)}
            <span style={{ color: getDirectionColor(driver.direction), fontWeight: 600 }}>{formatDelta(driver)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



