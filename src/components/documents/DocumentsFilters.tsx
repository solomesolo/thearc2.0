"use client";

import React from "react";

type DocType = "lab" | "imaging" | "prescription" | "note" | "other";
type DocStatus = "processed" | "processing" | "needs_review" | "failed";
type Source = "provider" | "upload" | "wearable";

interface DocumentsFiltersProps {
  query: string;
  typeFilter: "all" | DocType;
  statusFilter: "all" | DocStatus;
  sourceFilter: "all" | Source;
  dateRange: "all" | "30d" | "90d" | "12m" | "custom";
  onQueryChange: (query: string) => void;
  onTypeFilterChange: (type: "all" | DocType) => void;
  onStatusFilterChange: (status: "all" | DocStatus) => void;
  onSourceFilterChange: (source: "all" | Source) => void;
  onDateRangeChange: (range: "all" | "30d" | "90d" | "12m" | "custom") => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function DocumentsFilters({
  query,
  typeFilter,
  statusFilter,
  sourceFilter,
  dateRange,
  onQueryChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onSourceFilterChange,
  onDateRangeChange,
  onClearFilters,
  hasActiveFilters,
}: DocumentsFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: "var(--surface-alt)",
        borderRadius: "8px",
        border: "1px solid var(--border)",
      }}
    >
      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search by name, type, provider, or date..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 16px",
            fontSize: "14px",
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Filters row */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)" }}>
          Filter:
        </label>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value as "all" | DocType)}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <option value="all">All types</option>
          <option value="lab">Lab results</option>
          <option value="imaging">Imaging</option>
          <option value="prescription">Prescriptions</option>
          <option value="note">Clinical notes</option>
          <option value="other">Other</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as "all" | DocStatus)}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <option value="all">All status</option>
          <option value="processed">Processed</option>
          <option value="processing">Processing</option>
          <option value="needs_review">Needs review</option>
          <option value="failed">Failed</option>
        </select>

        {/* Source filter */}
        <select
          value={sourceFilter}
          onChange={(e) => onSourceFilterChange(e.target.value as "all" | Source)}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <option value="all">All sources</option>
          <option value="provider">Provider</option>
          <option value="upload">Upload</option>
          <option value="wearable">Wearable</option>
        </select>

        {/* Date range filter */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value as "all" | "30d" | "90d" | "12m" | "custom")}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <option value="all">All time</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="12m">Last 12 months</option>
          <option value="custom">Custom</option>
        </select>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            style={{
              padding: "6px 12px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}


