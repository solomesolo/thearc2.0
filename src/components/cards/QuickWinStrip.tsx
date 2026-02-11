"use client";

import React from "react";
import { Clock } from "lucide-react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface QuickWinStripProps {
  gap?: { id: string; title: string };
  action?: { id: string; title: string };
}

export default function QuickWinStrip({ gap, action }: QuickWinStripProps) {
  const { openUpload, openReminder, openGap } = useDashboardUIStore();

  const handleAction = () => {
    if (gap) {
      openUpload(gap.id);
    } else if (action) {
      openReminder({ name: action.title });
    }
  };

  const getText = () => {
    if (gap) {
      return `Upload your last ${gap.title.toLowerCase()} PDF`;
    } else if (action) {
      return action.title;
    }
    return "You're up to date.";
  };

  const getButtonLabel = () => {
    if (gap) return "Upload";
    if (action) return "Set reminder";
    return null;
  };

  const text = getText();
  const buttonLabel = getButtonLabel();

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
          <Clock size={20} style={{ color: "white" }} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Quick win
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                color: "var(--text-tertiary)",
              }}
            >
              <Clock size={12} />
              <span>5 min</span>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
            {text}
          </p>
        </div>
      </div>
      {buttonLabel && (
        <button
          onClick={handleAction}
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
          {buttonLabel}
        </button>
      )}
    </div>
  );
}



