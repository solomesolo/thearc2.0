"use client";

import React from "react";
import { format, parseISO } from "date-fns";

interface Reminder {
  id: string;
  name: string;
  nextRunDate: string;
}

interface UpcomingStripProps {
  reminders: Reminder[];
  activeTab: "7d" | "30d" | "later";
  onTabChange: (tab: "7d" | "30d" | "later") => void;
  onReminderClick: (reminderId: string) => void;
}

export default function UpcomingStrip({
  reminders,
  activeTab,
  onTabChange,
  onReminderClick,
}: UpcomingStripProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "16px",
        }}
      >
        Upcoming
      </h3>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", borderBottom: "1px solid var(--border)" }}>
        {(["7d", "30d", "later"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: "8px 16px",
              backgroundColor: activeTab === tab ? "var(--primary)" : "transparent",
              color: activeTab === tab ? "white" : "var(--text-secondary)",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "-1px",
            }}
          >
            {tab === "7d" ? "Next 7 days" : tab === "30d" ? "Next 30 days" : "Later"}
          </button>
        ))}
      </div>

      {/* Reminders list */}
      {reminders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", color: "var(--text-tertiary)", fontSize: "13px" }}>
          No reminders scheduled in this period.
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              onClick={() => onReminderClick(reminder.id)}
              style={{
                padding: "12px 16px",
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                {reminder.name}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                {format(parseISO(reminder.nextRunDate), "MMM d, yyyy")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


