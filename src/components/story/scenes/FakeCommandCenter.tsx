"use client";

import React from "react";

export default function FakeCommandCenter() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#0C1416",
        padding: "20px",
        overflow: "hidden",
        display: "flex",
        gap: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "4px",
            }}
          >
            Command Center
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
            Your health overview and recommended actions.
          </p>
        </div>

        {/* Placeholder for main content */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(231,240,238,0.02)",
            borderRadius: "8px",
            border: "1px dashed rgba(231,240,238,0.1)",
          }}
        />
      </div>

      {/* Right: Action Inbox Panel */}
      <div
        style={{
          width: "360px",
          backgroundColor: "rgba(110,211,194,0.08)",
          borderRadius: "12px",
          border: "1px solid rgba(110,211,194,0.25)",
          padding: "20px",
          boxShadow: "0 0 20px rgba(110,211,194,0.15)",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Action Inbox
        </h2>

        {/* Top Action Card */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid rgba(110,211,194,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "12px" }}>
            <div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Repeat Lipid Panel
              </h3>
              <div
                style={{
                  fontSize: "11px",
                  padding: "2px 6px",
                  backgroundColor: "rgba(255,165,0,0.2)",
                  color: "rgba(255,165,0,0.9)",
                  borderRadius: "4px",
                  display: "inline-block",
                }}
              >
                Medium urgency
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              marginBottom: "12px",
              lineHeight: 1.5,
            }}
          >
            Why: gradual LDL upward drift over 12 months suggests monitoring.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: "12px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Do now
            </button>
            <button
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: "12px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid rgba(231,240,238,0.2)",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Set reminder
            </button>
          </div>
        </div>

        {/* Reminder List */}
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(231,240,238,0.1)" }}>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              padding: "8px",
              backgroundColor: "rgba(231,240,238,0.03)",
              borderRadius: "6px",
            }}
          >
            <div style={{ fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
              Lipid panel reminder
            </div>
            <div>Next: Aug 15</div>
          </div>
        </div>
      </div>
    </div>
  );
}

