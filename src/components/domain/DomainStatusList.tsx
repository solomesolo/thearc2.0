"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { DomainId, getDomainConfig } from "@/domain/domainConfig";
import DomainStatusDot, { DomainDot } from "./DomainStatusDot";

export interface DomainStatus {
  domainId: DomainId;
  dot: DomainDot;
  sublabel?: string;
  reasonType: string;
  score: number;
}

interface DomainStatusListProps {
  statuses: DomainStatus[];
  onDomainClick?: (domainId: DomainId) => void;
  compact?: boolean;
}

export default function DomainStatusList({ statuses, onDomainClick, compact = false }: DomainStatusListProps) {
  const { evtDomainClick } = useCommandCenterStore();
  const [localSelectedDomain, setLocalSelectedDomain] = React.useState<DomainId | null>(null);

  const handleDomainClick = (domainId: DomainId) => {
    setLocalSelectedDomain(domainId);
    if (onDomainClick) {
      onDomainClick(domainId);
    } else {
      // Map new domain IDs to old ones for compatibility
      const domainMap: Record<DomainId, any> = {
        overview: "heart", // Map overview to heart for now
        cardiovascular: "heart",
        metabolic: "metabolic",
        cancer_screening: "heart", // Map to heart for now
        neuro: "heart", // Map to heart for now
        sleep: "sleep",
        fitness: "fitness",
      };
      const oldDomainId = domainMap[domainId] || "heart";
      evtDomainClick(oldDomainId);
      // Also set selectedDomain in store
      useCommandCenterStore.setState({ selectedDomain: domainId });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: compact ? "12px" : "16px",
        height: compact ? "auto" : "100%",
      }}
    >
      {!compact && (
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
          Focus areas
        </h3>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: compact ? "6px" : "8px" }}>
        {statuses.map((status) => {
          const config = getDomainConfig(status.domainId);
          const isSelected = localSelectedDomain === status.domainId;

          return (
            <button
              key={status.domainId}
              onClick={() => handleDomainClick(status.domainId)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: compact ? "8px 10px" : "10px 12px",
                backgroundColor: isSelected ? "var(--primary-light)" : "transparent",
                border: isSelected ? "1px solid var(--primary)" : "1px solid transparent",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = "var(--surface-alt)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }
              }}
            >
              {/* Icon */}
              <div style={{ display: "flex", alignItems: "center", minWidth: "20px" }}>{config?.icon}</div>

              {/* Label + Sublabel */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: compact ? "13px" : "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                  {config?.label || status.domainId}
                </div>
                {status.sublabel && (
                  <div
                    style={{
                      fontSize: compact ? "11px" : "12px",
                      color: "var(--text-secondary)",
                      marginTop: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {status.sublabel}
                  </div>
                )}
              </div>

              {/* Dot */}
              <DomainStatusDot dot={status.dot} size={compact ? "sm" : "md"} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

