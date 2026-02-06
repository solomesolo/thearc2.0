"use client";

import React, { useState } from "react";

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    inApp: true,
    email: true,
    missingDocs: true,
    overdueScreenings: true,
    trendChanges: true,
    upcomingReminders: true,
    newServices: false,
  });

  const handleSave = () => {
    // TODO: Save notification settings
    alert("Settings saved.");
  };

  const updateNotification = (key: keyof typeof notifications, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "24px",
        }}
      >
        Notifications
      </h2>

      {/* Notification channels */}
      <div style={{ marginBottom: "32px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Notification channels
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>In-app notifications</span>
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
                checked={notifications.inApp}
                onChange={(e) => updateNotification("inApp", e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notifications.inApp ? "var(--primary)" : "var(--text-tertiary)",
                  borderRadius: "12px",
                  transition: "0.3s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    height: "18px",
                    width: "18px",
                    left: notifications.inApp ? "22px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.3s",
                  }}
                />
              </span>
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>Email notifications</span>
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
                checked={notifications.email}
                onChange={(e) => updateNotification("email", e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notifications.email ? "var(--primary)" : "var(--text-tertiary)",
                  borderRadius: "12px",
                  transition: "0.3s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    height: "18px",
                    width: "18px",
                    left: notifications.email ? "22px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.3s",
                  }}
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* What to notify about */}
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          What to notify me about
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { key: "missingDocs", label: "Missing documents" },
            { key: "overdueScreenings", label: "Overdue screenings" },
            { key: "trendChanges", label: "Trend changes" },
            { key: "upcomingReminders", label: "Upcoming reminders" },
            { key: "newServices", label: "New relevant services" },
          ].map((item) => (
            <label
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={notifications[item.key as keyof typeof notifications] as boolean}
                onChange={(e) =>
                  updateNotification(item.key as keyof typeof notifications, e.target.checked)
                }
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Save notification settings
      </button>
    </div>
  );
}

