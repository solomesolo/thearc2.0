"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { filterActions, filterServices } from "@/utils/commandCenterFilters";

interface Action {
  id: string;
  title: string;
  reason: string;
  urgency: "High" | "Medium" | "Low";
  has_services?: boolean;
  recommended_frequency?: string;
}

interface Reminder {
  id: string;
  name: string;
  next: string;
  enabled: boolean;
}

interface Service {
  id: string;
  name: string;
  why_now: string;
  context_links?: {
    actionId?: string;
    gapId?: string;
    domainId?: string;
    signalId?: string;
  };
  selected?: boolean;
}

interface ActionInboxProps {
  actions?: Action[];
  reminders?: Reminder[];
  services?: Service[];
}

export default function ActionInbox({ actions = [], reminders = [], services = [] }: ActionInboxProps) {
  const context = useCommandCenterStore((state) => state.context);
  const inboxFilter = useCommandCenterStore((state) => state.inboxFilter);
  const highlightTargetId = useCommandCenterStore((state) => state.highlightTargetId);
  const {
    evtInboxClearContext,
    evtActionDoNow,
    evtActionSetReminder,
    evtActionDetails,
    evtServiceSelect,
    evtServiceLearnMore,
  } = useCommandCenterStore();

  // Filter actions and services by context
  const filteredActions = filterActions(actions, context);
  const filteredServices = filterServices(services, context);

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

  const isServicesHighlighted = highlightTargetId === "servicesPanel";

  return (
    <div style={{ padding: "16px", height: "100%" }}>
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "12px",
        }}
      >
        Action inbox
      </h3>

      {/* Context chip */}
      {inboxFilter.type !== "none" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            padding: "6px 10px",
            backgroundColor: "var(--surface-alt)",
            borderRadius: "6px",
          }}
        >
          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
            Showing: <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{inboxFilter.label}</span>
          </span>
          <button
            onClick={evtInboxClearContext}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              color: "var(--primary)",
              fontSize: "11px",
              textDecoration: "underline",
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Do next */}
      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "8px",
          }}
        >
          Do next
        </h4>
        {filteredActions.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {filteredActions.slice(0, 2).map((action) => (
              <div
                key={action.id}
                style={{
                  padding: "10px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {action.title}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                    lineHeight: "1.4",
                  }}
                >
                  {action.reason}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      color: getUrgencyColor(action.urgency),
                      backgroundColor: `${getUrgencyColor(action.urgency)}20`,
                      padding: "2px 5px",
                      borderRadius: "3px",
                    }}
                  >
                    {action.urgency}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => evtActionDoNow(action.id, action.title, action.has_services || false, action.recommended_frequency)}
                    style={{
                      flex: 1,
                      padding: "5px 8px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                  >
                    Do now
                  </button>
                  <button
                    onClick={() => evtActionSetReminder(action.id, action.title, action.recommended_frequency)}
                    style={{
                      flex: 1,
                      padding: "5px 8px",
                      backgroundColor: "transparent",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                  >
                    Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", padding: "8px" }}>
            No actions right now.
          </div>
        )}
      </div>

      {/* Reminders */}
      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "6px",
          }}
        >
          Reminders
        </h4>
        {reminders.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {reminders.slice(0, 2).map((reminder) => (
              <div
                key={reminder.id}
                style={{
                  padding: "8px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: "2px",
                    }}
                  >
                    {reminder.name}
                  </div>
                  <div style={{ fontSize: "9px", color: "var(--text-secondary)" }}>
                    {new Date(reminder.next).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={reminder.enabled}
                    onChange={(e) => {
                      // Toggle reminder enabled state
                      // In a real app, this would call a store method to update the reminder
                      console.log(`Toggle reminder ${reminder.id} to ${e.target.checked}`);
                    }}
                    style={{ cursor: "pointer", width: "12px", height: "12px" }}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", padding: "8px" }}>
            No reminders.
          </div>
        )}
      </div>

      {/* Services */}
      {filteredServices.length > 0 && (
        <div id="servicesPanel" style={{ outline: isServicesHighlighted ? "2px solid var(--focus)" : "none", borderRadius: "8px", padding: isServicesHighlighted ? "4px" : "0", transition: "outline 0.2s" }}>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "6px",
            }}
          >
            Services
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {filteredServices.slice(0, 2).map((service) => (
              <div
                key={service.id}
                style={{
                  padding: "8px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {service.name}
                </div>
                <div style={{ fontSize: "9px", color: "var(--text-secondary)", marginBottom: "6px", lineHeight: "1.4" }}>
                  {service.why_now}
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => evtServiceSelect(service.id)}
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      backgroundColor: service.selected ? "var(--success)" : "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                    }}
                  >
                    {service.selected ? (
                      <>
                        <Check size={10} />
                        Selected
                      </>
                    ) : (
                      "Select"
                    )}
                  </button>
                  <button
                    onClick={() => evtServiceLearnMore(service.id)}
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      backgroundColor: "transparent",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "9px",
                      fontWeight: 500,
                    }}
                  >
                    More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
