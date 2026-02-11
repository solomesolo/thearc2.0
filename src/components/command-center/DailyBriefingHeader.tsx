"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface DailyBriefingHeaderProps {
  insight?: string;
  primaryCTA?: {
    label: string;
    action: () => void;
  };
}

export default function DailyBriefingHeader({ insight, primaryCTA }: DailyBriefingHeaderProps) {
  const { evtAddDataClick, evtActionDoNow, evtConnectProvider } = useCommandCenterStore();

  // Default insight if not provided
  const defaultInsight = insight || "Your health data is 70% complete. Add lab results to improve insights.";

  // Default CTA if not provided
  const handleDefaultCTA = () => {
    evtAddDataClick();
  };

  const ctaLabel = primaryCTA?.label || "Add data";
  const ctaAction = primaryCTA?.action || handleDefaultCTA;

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
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Today
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: "1.5",
          }}
        >
          {defaultInsight}
        </p>
      </div>
      {primaryCTA && (
        <button
          onClick={ctaAction}
          style={{
            padding: "12px 24px",
            backgroundColor: "var(--primary)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}


