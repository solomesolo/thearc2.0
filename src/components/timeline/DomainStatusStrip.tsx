"use client";

import React from "react";
import DomainStatusDot from "@/components/domain/DomainStatusDot";
import { DomainId } from "@/domain/domainConfig";
import { getDomainLabel } from "@/domain/domainConfig";

interface DomainStatus {
  domainId: DomainId;
  dot: "green" | "yellow" | "red" | "gray";
  sublabel?: string;
}

interface DomainStatusStripProps {
  statuses: DomainStatus[];
  selectedDomain: DomainId | "all";
  onDomainClick: (domainId: DomainId | "all") => void;
}

export default function DomainStatusStrip({ statuses, selectedDomain, onDomainClick }: DomainStatusStripProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>Filter by domain:</span>
      <button
        onClick={() => onDomainClick("all")}
        style={{
          padding: "4px 12px",
          backgroundColor: selectedDomain === "all" ? "var(--primary-light)" : "transparent",
          color: selectedDomain === "all" ? "var(--primary)" : "var(--text-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: selectedDomain === "all" ? 500 : 400,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        All
      </button>
      {statuses.map((status) => {
        const isSelected = selectedDomain === status.domainId;
        return (
          <button
            key={status.domainId}
            onClick={() => onDomainClick(status.domainId)}
            title={status.sublabel}
            style={{
              padding: "4px 12px",
              backgroundColor: isSelected ? "var(--primary-light)" : "transparent",
              color: isSelected ? "var(--primary)" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: isSelected ? 500 : 400,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {getDomainLabel(status.domainId)}
            <DomainStatusDot dot={status.dot} size="sm" />
          </button>
        );
      })}
    </div>
  );
}



