"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { Bell, CheckCircle2 } from "lucide-react";

interface CoachRailProps {
  todayFocus?: {
    title: string;
    description: string;
    action: () => void;
  };
  notifications?: Array<{ id: string; message: string; time: string }>;
}

export default function CoachRail({ todayFocus, notifications = [] }: CoachRailProps) {
  const { selectedServices } = useCommandCenterStore();

  const defaultFocus = todayFocus || {
    title: "Complete your health map",
    description: "Add lab results to improve data confidence from 70% to 85%",
    action: () => {
      useCommandCenterStore.getState().evtAddDataClick();
    },
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Coach Card */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", fontWeight: 500 }}>
          Arc Coach
        </div>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
          Today's focus
        </h3>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.5" }}>
          {defaultFocus.description}
        </p>
        <button
          onClick={defaultFocus.action}
          style={{
            width: "100%",
            padding: "8px 16px",
            backgroundColor: "var(--accent)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Do it now
        </button>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Bell size={14} />
            Notifications
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {notifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  padding: "8px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "6px",
                }}
              >
                <div style={{ marginBottom: "4px" }}>{notif.message}</div>
                <div style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>{notif.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Services Basket */}
      {selectedServices.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} />
            Selected ({selectedServices.length})
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "12px" }}>
            {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} selected
          </div>
          <button
            onClick={() => {
              window.location.href = "/demo/marketplace";
            }}
            style={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            View basket
          </button>
        </div>
      )}
    </div>
  );
}


