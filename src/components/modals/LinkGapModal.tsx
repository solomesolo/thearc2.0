"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import dashboardData from "@/mock/dashboard.json";

interface Gap {
  id: string;
  title: string;
  urgency: "High" | "Medium" | "Low";
  domain?: string;
}

interface LinkGapModalProps {
  isOpen: boolean;
  documentId: string | null;
  onClose: () => void;
  onLink: (gapId: string) => void;
}

export default function LinkGapModal({ isOpen, documentId, onClose, onLink }: LinkGapModalProps) {
  const [selectedGapId, setSelectedGapId] = useState<string | null>(null);

  if (!isOpen) return null;

  const gaps = (dashboardData.gaps || []) as Gap[];

  // Sort gaps by urgency (High > Medium > Low)
  const sortedGaps = [...gaps].sort((a, b) => {
    const urgencyOrder = { High: 3, Medium: 2, Low: 1 };
    return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
  });

  const handleLink = () => {
    if (selectedGapId) {
      onLink(selectedGapId);
      // Show toast
      alert("Linked to missing item.");
      onClose();
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "var(--danger)";
      case "Medium":
        return "var(--warning)";
      default:
        return "var(--info)";
    }
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
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}>Link to missing item</h2>
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

        {sortedGaps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-tertiary)" }}>
            No missing items found.
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {sortedGaps.map((gap) => (
                <label
                  key={gap.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: selectedGapId === gap.id ? "var(--surface-alt)" : "transparent",
                    border: selectedGapId === gap.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                  }}
                >
                  <input
                    type="radio"
                    name="gap"
                    value={gap.id}
                    checked={selectedGapId === gap.id}
                    onChange={() => setSelectedGapId(gap.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
                      {gap.title}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: getUrgencyColor(gap.urgency),
                          backgroundColor: `${getUrgencyColor(gap.urgency)}20`,
                          padding: "2px 6px",
                          borderRadius: "12px",
                        }}
                      >
                        {gap.urgency}
                      </span>
                      {gap.domain && (
                        <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                          {gap.domain}
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
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
                onClick={handleLink}
                disabled={!selectedGapId}
                style={{
                  padding: "10px 20px",
                  backgroundColor: selectedGapId ? "var(--primary)" : "var(--text-tertiary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: selectedGapId ? "pointer" : "not-allowed",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Link
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



