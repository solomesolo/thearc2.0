"use client";

import React from "react";

export default function FakeSignalsPage() {
  // Simple SVG sparkline
  const sparklineData = [45, 50, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72];

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
          Signals
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
          Health trends and patterns over time.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["Cardio", "Metabolic", "Cancer/Screening", "Sleep", "Neuro"].map((cat) => (
          <button
            key={cat}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor: cat === "Metabolic" ? "rgba(110,211,194,0.15)" : "rgba(231,240,238,0.05)",
              color: cat === "Metabolic" ? "var(--accent)" : "var(--text-secondary)",
              border: `1px solid ${cat === "Metabolic" ? "rgba(110,211,194,0.3)" : "rgba(231,240,238,0.1)"}`,
              borderRadius: "6px",
              cursor: "default",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expanded Signal Card */}
      <div
        style={{
          backgroundColor: "rgba(110,211,194,0.08)",
          borderRadius: "12px",
          border: "1px solid rgba(110,211,194,0.25)",
          padding: "20px",
          boxShadow: "0 0 20px rgba(110,211,194,0.15)",
        }}
      >
        {/* Signal Header */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              LDL Cholesterol
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "rgba(255,165,0,0.9)",
                fontSize: "12px",
              }}
            >
              <span>↗</span>
              <span>slight upward</span>
            </div>
          </div>
          <div style={{ fontSize: "24px", fontWeight: 600, color: "var(--text-primary)" }}>118 mg/dL</div>
        </div>

        {/* Sparkline Chart */}
        <div style={{ marginBottom: "16px", height: "80px" }}>
          <svg width="100%" height="80" style={{ overflow: "visible" }} viewBox="0 0 100 80" preserveAspectRatio="none">
            <polyline
              points={sparklineData
                .map((val, i) => {
                  const x = (i / (sparklineData.length - 1)) * 100;
                  const y = 80 - ((val - 40) / 35) * 60;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 2px 4px rgba(110,211,194,0.3))" }}
            />
            {sparklineData.map((val, i) => {
              const x = (i / (sparklineData.length - 1)) * 100;
              const y = 80 - ((val - 40) / 35) * 60;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--accent)"
                  style={{ filter: "drop-shadow(0 0 4px rgba(110,211,194,0.5))" }}
                />
              );
            })}
          </svg>
        </div>

        {/* Why This Matters */}
        <div
          style={{
            padding: "12px",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: "var(--text-primary)" }}>Why this matters:</strong> A gradual upward trend
          over 12 months may indicate dietary or lifestyle changes. Consider repeating in 6 months to confirm
          pattern.
        </div>
      </div>
    </div>
  );
}

