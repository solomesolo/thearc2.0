"use client";

import React from "react";

interface DocumentsHeaderProps {
  onUploadClick: () => void;
  onConnectProviderClick: () => void;
  onExportClick: () => void;
}

export default function DocumentsHeader({
  onUploadClick,
  onConnectProviderClick,
  onExportClick,
}: DocumentsHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          Documents
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          All your medical files in one place.
        </p>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onUploadClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Upload documents
        </button>
        <button
          onClick={onConnectProviderClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Connect provider
        </button>
        <button
          onClick={onExportClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Export
        </button>
      </div>
    </div>
  );
}



