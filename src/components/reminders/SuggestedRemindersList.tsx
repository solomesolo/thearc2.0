"use client";

import React from "react";

interface SuggestedReminder {
  id: string;
  name: string;
  domainId: string;
  type: string;
  recommendedReason: string;
  recommendedFrequency?: string;
}

interface SuggestedRemindersListProps {
  reminders: SuggestedReminder[];
  onAddReminder: (reminderId: string) => void;
}

export default function SuggestedRemindersList({
  reminders,
  onAddReminder,
}: SuggestedRemindersListProps) {
  if (reminders.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
          No suggestions right now.
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
          Add more data to personalize monitoring.
        </div>
      </div>
    );
  }

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
        Suggested
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            style={{
              padding: "16px",
              backgroundColor: "var(--surface-alt)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
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
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "12px" }}>
              {reminder.recommendedReason}
            </div>
            <button
              onClick={() => onAddReminder(reminder.id)}
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



