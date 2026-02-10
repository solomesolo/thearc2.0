"use client";

import React from "react";

export default function FakeTimelinePage() {
  const timelineItems = [
    { title: "Lipid Panel", date: "Today", isNew: true, type: "Lab" },
    { title: "Annual Physical", date: "2024", isNew: false, type: "Visit" },
    { title: "Chest Imaging", date: "2023", isNew: false, type: "Imaging" },
    { title: "Medication Change", date: "2022", isNew: false, type: "Medication" },
  ];

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#0C1416",
        padding: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
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
          Timeline
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
          Your complete health history in chronological order.
        </p>
      </div>

      {/* Timeline List */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: "8px" }}>
        {timelineItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "16px",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: item.isNew
                ? "rgba(110,211,194,0.08)"
                : "rgba(231,240,238,0.03)",
              borderRadius: "8px",
              border: item.isNew
                ? "1px solid rgba(110,211,194,0.25)"
                : "1px solid rgba(231,240,238,0.06)",
              boxShadow: item.isNew
                ? "0 0 20px rgba(110,211,194,0.15)"
                : "none",
              position: "relative",
            }}
          >
            {/* Timeline Dot */}
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: item.isNew ? "var(--accent)" : "var(--text-muted)",
                marginTop: "4px",
                flexShrink: 0,
              }}
            />

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                {item.isNew && (
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      backgroundColor: "var(--accent)",
                      color: "white",
                      borderRadius: "4px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Just added
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{item.type}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>•</span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

