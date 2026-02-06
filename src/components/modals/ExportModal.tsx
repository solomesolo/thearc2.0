"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount?: number;
  totalCount?: number;
}

export default function ExportModal({ isOpen, onClose, selectedCount = 0, totalCount = 0 }: ExportModalProps) {
  const [exportOption, setExportOption] = useState<"selected" | "all">("selected");
  const [format, setFormat] = useState<"zip" | "pdf">("zip");

  if (!isOpen) return null;

  const handleExport = () => {
    // TODO: Implement export logic
    console.log("Exporting:", { exportOption, format });
    // Show toast
    alert(`Export started. ${exportOption === "selected" ? `${selectedCount} documents` : "All documents"} will be exported as ${format.toUpperCase()}.`);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}>Export documents</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Export option */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Export
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: exportOption === "selected" ? "var(--surface-alt)" : "transparent",
                }}
              >
                <input
                  type="radio"
                  checked={exportOption === "selected"}
                  onChange={() => setExportOption("selected")}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                  Export selected documents ({selectedCount})
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: exportOption === "all" ? "var(--surface-alt)" : "transparent",
                }}
              >
                <input
                  type="radio"
                  checked={exportOption === "all"}
                  onChange={() => setExportOption("all")}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                  Export all documents ({totalCount})
                </span>
              </label>
            </div>
          </div>

          {/* Format option */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "zip" | "pdf")}
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
              <option value="zip">ZIP (default)</option>
              <option value="pdf">PDF bundle</option>
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
            <button
              onClick={onClose}
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
              Cancel
            </button>
            <button
              onClick={handleExport}
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
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

