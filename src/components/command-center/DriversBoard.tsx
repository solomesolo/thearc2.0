"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, AlertCircle, FileText } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
// Using simple SVG sparkline instead of react-sparklines

interface Driver {
  id: string;
  title: string;
  state: "Improving" | "Worsening" | "Stable" | "Missing" | "Outdated";
  sparkline?: number[];
  source: "Lab" | "Wearable" | "Provider";
  isGap?: boolean;
  gapId?: string;
}

interface DriversBoardProps {
  drivers: Driver[];
}

export default function DriversBoard({ drivers }: DriversBoardProps) {
  const { evtSignalClick, evtGapClick, selectedFocusTile, selectedDomain } = useCommandCenterStore();

  // Filter drivers based on focus
  let filteredDrivers = drivers;
  if (selectedFocusTile === "readiness") {
    // Show improving/stable drivers
    filteredDrivers = drivers.filter((d) => d.state === "Improving" || d.state === "Stable");
  } else if (selectedFocusTile === "risk") {
    // Show worsening drivers
    filteredDrivers = drivers.filter((d) => d.state === "Worsening");
  } else if (selectedFocusTile === "confidence") {
    // Show missing/outdated
    filteredDrivers = drivers.filter((d) => d.state === "Missing" || d.state === "Outdated");
  }

  // Further filter by domain if selected
  if (selectedDomain) {
    // This would filter by domain - for now just use all
    // filteredDrivers = filteredDrivers.filter(d => d.domainId === selectedDomain);
  }

  // Show top 6
  const displayDrivers = filteredDrivers.slice(0, 6);

  const getStateColor = (state: string) => {
    switch (state) {
      case "Improving":
        return "var(--success)";
      case "Worsening":
        return "var(--danger)";
      case "Stable":
        return "var(--info)";
      case "Missing":
      case "Outdated":
        return "var(--warning)";
      default:
        return "var(--text-tertiary)";
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case "Improving":
        return <TrendingUp size={14} style={{ color: getStateColor(state) }} />;
      case "Worsening":
        return <TrendingDown size={14} style={{ color: getStateColor(state) }} />;
      case "Stable":
        return <Minus size={14} style={{ color: getStateColor(state) }} />;
      case "Missing":
      case "Outdated":
        return <AlertCircle size={14} style={{ color: getStateColor(state) }} />;
      default:
        return null;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Lab":
        return <FileText size={12} style={{ color: "var(--text-tertiary)" }} />;
      case "Wearable":
        return <span style={{ fontSize: "12px" }}>⌚</span>;
      default:
        return <FileText size={12} style={{ color: "var(--text-tertiary)" }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "16px",
        }}
      >
        Key drivers
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {displayDrivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => {
              if (driver.isGap && driver.gapId) {
                evtGapClick(driver.gapId, driver.title);
              } else {
                evtSignalClick(driver.id, driver.title);
              }
            }}
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
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>
                {driver.title}
              </div>
              {getSourceIcon(driver.source)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              {getStateIcon(driver.state)}
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: getStateColor(driver.state),
                }}
              >
                {driver.state}
              </span>
            </div>
            {driver.sparkline && driver.sparkline.length > 0 ? (
              <div style={{ height: "30px", width: "100%", overflow: "hidden" }}>
                <svg width="100%" height="30" style={{ display: "block" }}>
                  <polyline
                    points={driver.sparkline
                      .map((val, idx) => {
                        const maxVal = Math.max(...driver.sparkline!);
                        const minVal = Math.min(...driver.sparkline!);
                        const range = maxVal - minVal || 1;
                        const x = (idx / Math.max(driver.sparkline!.length - 1, 1)) * 100;
                        const y = 30 - ((val - minVal) / range) * 28 - 1;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke={getStateColor(driver.state)}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <div
                style={{
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "var(--text-tertiary)",
                }}
              >
                {driver.state === "Missing" ? "Missing data" : "No trend"}
              </div>
            )}
          </div>
        ))}
      </div>
      {displayDrivers.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
          No drivers to display
        </div>
      )}
    </div>
  );
}

