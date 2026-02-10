"use client";

import React from "react";
import { Upload, Clock } from "lucide-react";

interface QuickWinCardProps {
  title?: string;
  action?: string;
  onAction?: () => void;
}

export default function QuickWinCard({
  title = "Upload your last lipid panel PDF",
  action = "Upload",
  onAction
}: QuickWinCardProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: "#8B5CF6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Upload size={20} style={{ color: "white" }} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Quick win
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-tertiary)" }}>
              <Clock size={12} />
              <span>5 min</span>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
            {title}
          </p>
        </div>
      </div>
      <button
        onClick={onAction}
        style={{
          padding: "8px 16px",
          backgroundColor: "#8B5CF6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {action}
      </button>
    </div>
  );
}


