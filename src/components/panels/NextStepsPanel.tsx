"use client";

import React from "react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface Action {
  id: string;
  title: string;
  reason: string;
  urgency: "High" | "Medium" | "Low";
  frequency?: string;
  has_services?: boolean;
}

interface NextStepsPanelProps {
  actions?: Action[];
}

export default function NextStepsPanel({ actions = [] }: NextStepsPanelProps) {
  const { openReminder, setMarketplaceFilter, scrollToSection, setHighlightId } = useDashboardUIStore();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "var(--danger)";
      case "Medium":
        return "var(--warning)";
      default:
        return "var(--info)";
    }
  };

  const handleSetReminder = (action: Action) => {
    openReminder({
      name: action.title,
      frequency: action.frequency || "Monthly",
    });
  };

  const handleViewOptions = (action: Action) => {
    setMarketplaceFilter({
      sourceType: "action",
      sourceId: action.id,
      label: action.title,
    });
    scrollToSection("marketplace");
    setTimeout(() => {
      setHighlightId("marketplace");
    }, 300);
  };

  return (
    <div
      id="nextsteps"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}
      >
        Next steps
      </h3>
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
          marginBottom: "16px",
        }}
      >
        Recommended actions based on your current data.
      </p>

      {actions.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {actions.slice(0, 3).map((action) => (
            <div
              key={action.id}
              style={{
                padding: "12px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "6px",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                {action.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontWeight: 500 }}>Why:</span> {action.reason}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: getUrgencyColor(action.urgency),
                    backgroundColor: `${getUrgencyColor(action.urgency)}20`,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>▲</span> {action.urgency}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleSetReminder(action)}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Set reminder
                </button>
                <button
                  onClick={() => handleViewOptions(action)}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  View options
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ marginBottom: "4px" }}>You're up to date.</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
            }}
          >
            We'll recommend next steps as new data arrives.
          </div>
        </div>
      )}
    </div>
  );
}


