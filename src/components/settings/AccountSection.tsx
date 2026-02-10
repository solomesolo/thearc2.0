"use client";

import React, { useState } from "react";

export default function AccountSection() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [timezone, setTimezone] = useState("America/New_York");

  const handleUpdate = () => {
    // TODO: Save profile
    alert("Profile updated.");
  };

  const handleSignOut = () => {
    // TODO: Sign out
    if (confirm("Are you sure you want to sign out?")) {
      alert("Signed out.");
    }
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
        Account
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
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
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "14px",
              color: "var(--text-primary)",
              backgroundColor: "var(--surface-alt)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
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
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "14px",
              color: "var(--text-primary)",
              backgroundColor: "var(--surface-alt)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
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
            Time zone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "14px",
              color: "var(--text-primary)",
              backgroundColor: "var(--surface-alt)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={handleUpdate}
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
          Update profile
        </button>
        <button
          onClick={handleSignOut}
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}


