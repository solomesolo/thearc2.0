"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface ReadinessTileProps {
  score: number; // 0-100
  status: "Improving" | "Stable" | "Needs attention";
  drivers: string[]; // Top 2 drivers
}

export default function ReadinessTile({ score, status, drivers = [] }: ReadinessTileProps) {
  const { evtDomainClick } = useCommandCenterStore();

  const getStatusColor = () => {
    switch (status) {
      case "Improving":
        return "var(--success)";
      case "Needs attention":
        return "var(--warning)";
      default:
        return "var(--info)";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Improving":
        return <TrendingUp size={16} style={{ color: getStatusColor() }} />;
      case "Needs attention":
        return <TrendingDown size={16} style={{ color: getStatusColor() }} />;
      default:
        return <Minus size={16} style={{ color: getStatusColor() }} />;
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
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={() => {
        // Set focus to readiness
        useCommandCenterStore.setState({ selectedFocusTile: "readiness" });
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 500 }}>
        Health readiness
      </div>
      <div style={{ fontSize: "48px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
        {score}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "16px",
        }}
      >
        {getStatusIcon()}
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: getStatusColor(),
          }}
        >
          {status}
        </span>
      </div>
      {drivers.length > 0 && (
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px" }}>Key drivers</div>
          {drivers.slice(0, 2).map((driver, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                padding: "4px 8px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "4px",
              }}
            >
              {driver}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


