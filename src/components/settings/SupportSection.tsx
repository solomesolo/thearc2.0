"use client";

import React from "react";

export default function SupportSection() {
  const appVersion = "1.0.0";

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
        Support
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Open help center
            alert("Opening help center...");
          }}
          style={{
            fontSize: "14px",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Help center
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Open contact support
            alert("Opening contact support...");
          }}
          style={{
            fontSize: "14px",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Contact support
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Open bug report
            alert("Opening bug report...");
          }}
          style={{
            fontSize: "14px",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Report a bug
        </a>
      </div>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          fontSize: "12px",
          color: "var(--text-tertiary)",
        }}
      >
        Version {appVersion}
      </div>
    </div>
  );
}

