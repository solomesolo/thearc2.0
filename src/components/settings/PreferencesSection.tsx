"use client";

import React, { useState } from "react";

export default function PreferencesSection() {
  const [appearance, setAppearance] = useState<"system" | "light" | "dark">("system");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const handleSave = () => {
    // TODO: Save preferences
    alert("Preferences saved.");
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
        Preferences
      </h2>

      {/* Display */}
      <div style={{ marginBottom: "32px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Display
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Appearance
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              {(["system", "light", "dark"] as const).map((option) => (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    backgroundColor: appearance === option ? "var(--surface-alt)" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="appearance"
                    value={option}
                    checked={appearance === option}
                    onChange={(e) => setAppearance(e.target.value as any)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Units
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              {(["metric", "imperial"] as const).map((option) => (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    backgroundColor: units === option ? "var(--surface-alt)" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="units"
                    value={option}
                    checked={units === option}
                    onChange={(e) => setUnits(e.target.value as any)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
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
        Save preferences
      </button>
    </div>
  );
}


