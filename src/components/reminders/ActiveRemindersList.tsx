"use client";

import React, { useState } from "react";
import { format, parseISO, addWeeks, addMonths } from "date-fns";
import { Edit, Bell, Check, MoreVertical } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Reminder {
  id: string;
  name: string;
  domainId: string;
  type: string;
  frequency: string;
  nextRunDate: string;
  channels: { inApp: boolean; email: boolean };
  isEnabled: boolean;
}

interface ActiveRemindersListProps {
  reminders: Reminder[];
  selectedReminderId: string | null;
  onReminderSelect: (id: string) => void;
}

export default function ActiveRemindersList({
  reminders,
  selectedReminderId,
  onReminderSelect,
}: ActiveRemindersListProps) {
  const { evtActionSetReminder } = useCommandCenterStore();
  const [snoozeMenuOpen, setSnoozeMenuOpen] = useState<string | null>(null);

  const handleToggle = (reminder: Reminder) => {
    // TODO: Update reminder enabled state
    console.log("Toggle reminder:", reminder.id, !reminder.isEnabled);
    alert("Reminder updated.");
  };

  const handleSnooze = (reminderId: string, duration: "1w" | "2w" | "1m") => {
    // TODO: Update nextRunDate based on duration
    const reminder = reminders.find((r) => r.id === reminderId);
    if (reminder) {
      const now = new Date();
      let newDate: Date;
      if (duration === "1w") {
        newDate = addWeeks(now, 1);
      } else if (duration === "2w") {
        newDate = addWeeks(now, 2);
      } else {
        newDate = addMonths(now, 1);
      }
      console.log("Snooze reminder:", reminderId, duration, newDate);
      alert("Reminder updated.");
    }
    setSnoozeMenuOpen(null);
  };

  const handleComplete = (reminder: Reminder) => {
    // TODO: Mark complete and reschedule if recurring
    console.log("Complete reminder:", reminder.id);
    alert("Reminder updated.");
  };

  const handleEdit = (reminder: Reminder) => {
    evtActionSetReminder(reminder.id, reminder.name, reminder.frequency);
  };

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
          No active reminders.
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
        marginBottom: "24px",
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
        Active
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {reminders.map((reminder) => {
          const isSelected = selectedReminderId === reminder.id;
          return (
            <div
              key={reminder.id}
              style={{
                padding: "16px",
                backgroundColor: isSelected ? "var(--surface-alt)" : "transparent",
                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Toggle */}
              <label
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={reminder.isEnabled}
                  onChange={() => handleToggle(reminder)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: reminder.isEnabled ? "var(--primary)" : "var(--text-tertiary)",
                    borderRadius: "12px",
                    transition: "0.3s",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      content: '""',
                      height: "18px",
                      width: "18px",
                      left: reminder.isEnabled ? "22px" : "3px",
                      bottom: "3px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.3s",
                    }}
                  />
                </span>
              </label>

              {/* Reminder info */}
              <div style={{ flex: 1 }}>
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
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                  Next: {format(parseISO(reminder.nextRunDate), "MMM d, yyyy")} • {reminder.frequency}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  {reminder.channels.inApp && "In-app"}
                  {reminder.channels.inApp && reminder.channels.email && " • "}
                  {reminder.channels.email && "Email"}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => handleEdit(reminder)}
                  style={{
                    padding: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                  }}
                  title="Edit"
                >
                  <Edit size={16} />
                </button>

                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setSnoozeMenuOpen(snoozeMenuOpen === reminder.id ? null : reminder.id)}
                    style={{
                      padding: "6px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-secondary)",
                    }}
                    title="Snooze"
                  >
                    <Bell size={16} />
                  </button>
                  {snoozeMenuOpen === reminder.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "4px",
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        zIndex: 10,
                        minWidth: "120px",
                      }}
                    >
                      <button
                        onClick={() => handleSnooze(reminder.id, "1w")}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                        }}
                      >
                        1 week
                      </button>
                      <button
                        onClick={() => handleSnooze(reminder.id, "2w")}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                        }}
                      >
                        2 weeks
                      </button>
                      <button
                        onClick={() => handleSnooze(reminder.id, "1m")}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                        }}
                      >
                        1 month
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleComplete(reminder)}
                  style={{
                    padding: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                  }}
                  title="Complete"
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

