"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Action {
  id: string;
  title: string;
  reason?: string;
  urgency?: "High" | "Medium" | "Low";
  hasServices?: boolean;
}

interface ActionPlanCardProps {
  actions: Action[];
}

export default function ActionPlanCard({ actions }: ActionPlanCardProps) {
  const { evtActionDoNow, evtActionSetReminder, selectedFocusTile, selectedDomain } = useCommandCenterStore();

  // Filter actions based on focus
  let filteredActions = actions;
  if (selectedFocusTile === "readiness") {
    // Show improving actions
    filteredActions = actions.filter((a) => a.urgency === "High");
  } else if (selectedFocusTile === "risk") {
    // Show risk-related actions
    filteredActions = actions.filter((a) => a.urgency === "High" || a.urgency === "Medium");
  } else if (selectedFocusTile === "confidence") {
    // Show data-related actions
    filteredActions = actions.filter((a) => a.title.toLowerCase().includes("upload") || a.title.toLowerCase().includes("add"));
  }

  // Further filter by domain if selected
  if (selectedDomain) {
    // This would filter by domain
  }

  // Show top 3
  const displayActions = filteredActions.slice(0, 3);

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case "High":
        return "var(--danger)";
      case "Medium":
        return "var(--warning)";
      default:
        return "var(--info)";
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
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>
        This week's plan
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {displayActions.map((action) => (
          <div
            key={action.id}
            style={{
              padding: "12px",
              backgroundColor: "var(--surface-alt)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>
                {action.title}
              </div>
              {action.urgency && (
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    backgroundColor: `${getUrgencyColor(action.urgency)}20`,
                    color: getUrgencyColor(action.urgency),
                    borderRadius: "3px",
                    fontWeight: 500,
                  }}
                >
                  {action.urgency}
                </span>
              )}
            </div>
            {action.reason && (
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                {action.reason}
              </div>
            )}
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => evtActionDoNow(action.id, action.title, action.hasServices || false)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "var(--primary)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Do now
              </button>
              <button
                onClick={() => evtActionSetReminder(action.id, action.title)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Remind
              </button>
              {action.hasServices && (
                <button
                  onClick={() => {
                    // Open ServicesDrawer
                    window.location.href = "/demo/marketplace";
                  }}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  Options
                </button>
              )}
            </div>
          </div>
        ))}
        {displayActions.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-secondary)", fontSize: "12px" }}>
            No actions planned
          </div>
        )}
      </div>
    </div>
  );
}


