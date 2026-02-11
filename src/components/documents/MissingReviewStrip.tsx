"use client";

import React from "react";

interface MissingReviewStripProps {
  missingCount: number;
  needsReviewCount: number;
  onFixNowClick: () => void;
  onReviewClick: () => void;
}

export default function MissingReviewStrip({
  missingCount,
  needsReviewCount,
  onFixNowClick,
  onReviewClick,
}: MissingReviewStripProps) {
  if (missingCount === 0 && needsReviewCount === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "20px",
        padding: "12px 16px",
        backgroundColor: "var(--surface-alt)",
        borderRadius: "8px",
        border: "1px solid var(--border)",
      }}
    >
      {missingCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Missing items: {missingCount}
          </span>
          <button
            onClick={onFixNowClick}
            style={{
              padding: "4px 12px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Fix now
          </button>
        </div>
      )}
      {needsReviewCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Needs review: {needsReviewCount}
          </span>
          <button
            onClick={onReviewClick}
            style={{
              padding: "4px 12px",
              backgroundColor: "var(--warning)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Review
          </button>
        </div>
      )}
    </div>
  );
}



