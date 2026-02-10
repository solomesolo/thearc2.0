"use client";

import React from "react";

export default function FakeDocumentsPage() {
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
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "rgba(231,240,238,0.95)",
            marginBottom: "4px",
          }}
        >
          Documents
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
          All your medical files in one place.
        </p>
      </div>

      {/* Missing/Review Strip */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "20px",
          padding: "12px 16px",
          backgroundColor: "rgba(231,240,238,0.03)",
          borderRadius: "8px",
          border: "1px solid rgba(231,240,238,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Missing items: 3</span>
          <button
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "default",
            }}
          >
            Fix now
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Needs review: 2</span>
          <button
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              backgroundColor: "rgba(255,165,0,0.2)",
              color: "rgba(255,165,0,0.9)",
              border: "1px solid rgba(255,165,0,0.3)",
              borderRadius: "4px",
              cursor: "default",
            }}
          >
            Review
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search by name, type, provider, or date..."
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "rgba(231,240,238,0.03)",
            border: "1px solid rgba(231,240,238,0.1)",
            borderRadius: "8px",
            color: "var(--text-primary)",
            fontSize: "14px",
          }}
          readOnly
        />
      </div>

      {/* Upload Modal Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        <div
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Upload documents
            </h2>
          </div>

          {/* Drag & Drop Area */}
          <div
            style={{
              border: "2px dashed rgba(110,211,194,0.3)",
              borderRadius: "8px",
              padding: "40px 20px",
              textAlign: "center",
              backgroundColor: "rgba(110,211,194,0.05)",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px" }}>
              Drag and drop files here
            </div>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "13px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "default",
              }}
            >
              Upload PDF
            </button>
          </div>

          {/* File List */}
          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "rgba(110,211,194,0.05)",
                borderRadius: "6px",
                border: "1px solid rgba(110,211,194,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "rgba(110,211,194,0.1)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  📄
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                    lipid_panel_dec_2024.pdf
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
                    Status: Added to timeline ✓
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  backgroundColor: "rgba(110,211,194,0.3)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "var(--accent)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

