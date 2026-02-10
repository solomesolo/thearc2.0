"use client";

import React from "react";

export default function FakeMarketplacePage() {
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
          Marketplace
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
          Trusted services matched to your health needs.
        </p>
      </div>

      {/* Filter Chip */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            backgroundColor: "rgba(110,211,194,0.15)",
            border: "1px solid rgba(110,211,194,0.3)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "var(--accent)",
          }}
        >
          <span>Filtered by:</span>
          <span style={{ fontWeight: 600 }}>Lipid panel due</span>
        </div>
      </div>

      {/* Service Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, overflowY: "auto" }}>
        {/* Card 1: At-home lipid test */}
        <div
          style={{
            backgroundColor: "rgba(110,211,194,0.08)",
            borderRadius: "12px",
            border: "1px solid rgba(110,211,194,0.25)",
            padding: "20px",
            boxShadow: "0 0 20px rgba(110,211,194,0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                At-home lipid test
              </h3>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                Why now: Your LDL trend shows gradual increase. Monitor every 6 months.
              </div>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              $49
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Select
            </button>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid rgba(231,240,238,0.2)",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Card 2: Lab draw appointment */}
        <div
          style={{
            backgroundColor: "rgba(231,240,238,0.03)",
            borderRadius: "12px",
            border: "1px solid rgba(231,240,238,0.1)",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Lab draw appointment
              </h3>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                Why now: Comprehensive panel recommended based on your timeline.
              </div>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              $89
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Select
            </button>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid rgba(231,240,238,0.2)",
                borderRadius: "6px",
                cursor: "default",
                fontWeight: 500,
              }}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

