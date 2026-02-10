"use client";

import React, { useState } from "react";
import { Download, Trash2 } from "lucide-react";

export default function PrivacySecuritySection() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleDownloadData = () => {
    // TODO: Start data export
    alert("Export started.");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // TODO: Delete account
      alert("Account deletion initiated.");
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
        Privacy & security
      </h2>

      {/* Privacy */}
      <div style={{ marginBottom: "32px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Privacy
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handleDownloadData}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              width: "fit-content",
            }}
          >
            <Download size={16} />
            Download my data
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "transparent",
              color: "var(--danger)",
              border: "1px solid var(--danger)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              width: "fit-content",
            }}
          >
            <Trash2 size={16} />
            Delete my account
          </button>
        </div>
      </div>

      {/* Security */}
      <div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Security
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
              Two-factor authentication
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Add an extra layer of security to your account
            </div>
          </div>
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
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: twoFactorEnabled ? "var(--primary)" : "var(--text-tertiary)",
                borderRadius: "12px",
                transition: "0.3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  height: "18px",
                  width: "18px",
                  left: twoFactorEnabled ? "22px" : "3px",
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
  );
}


