"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import AddDataMenu from "@/components/controls/AddDataMenu";
import DomainStatusDot from "@/components/domain/DomainStatusDot";
import { computeDomainStatus } from "@/domain/computeDomainStatus";
import { DomainId } from "@/domain/domainConfig";

type Domain = "all" | "heart" | "metabolic" | "sleep" | "fitness";
type Range = "30d" | "90d" | "6m" | "12m" | "24m";

interface SignalsHeaderProps {
  domain: Domain;
  range: Range;
  onDomainChange: (domain: Domain) => void;
  onRangeChange: (range: Range) => void;
  domainStatuses?: Array<{ domainId: DomainId; dot: "green" | "yellow" | "red" | "gray" }>;
}

export default function SignalsHeader({ domain, range, onDomainChange, onRangeChange, domainStatuses = [] }: SignalsHeaderProps) {
  const { contextLabel } = useCommandCenterStore();

  const domains: Array<{ id: Domain; label: string }> = [
    { id: "all", label: "All signals" },
    { id: "heart", label: "Heart" },
    { id: "metabolic", label: "Metabolic" },
    { id: "sleep", label: "Sleep & recovery" },
    { id: "fitness", label: "Fitness" },
  ];

  const ranges: Array<{ id: Range; label: string }> = [
    { id: "30d", label: "30d" },
    { id: "90d", label: "90d" },
    { id: "6m", label: "6m" },
    { id: "12m", label: "12m" },
    { id: "24m", label: "24m" },
  ];

  const getContextLabel = () => {
    if (domain === "all") return "All signals";
    const domainMap: Record<Domain, string> = {
      all: "All signals",
      heart: "Heart signals",
      metabolic: "Metabolic signals",
      sleep: "Sleep & recovery signals",
      fitness: "Fitness signals",
    };
    return domainMap[domain];
  };

  return (
    <div
      style={{
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Left: Page title + context */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Signals
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
          Trends from your labs, providers, and wearables.
        </p>
        <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
          Showing: <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>{getContextLabel()}</span>
        </div>
      </div>

      {/* Center: Domain tabs */}
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", alignItems: "center" }}>
        {domains.map((d) => {
          // Map domain to DomainId for status lookup
          const domainIdMap: Record<Domain, DomainId> = {
            all: "overview",
            heart: "cardiovascular",
            metabolic: "metabolic",
            sleep: "sleep",
            fitness: "fitness",
          };
          const statusDomainId = domainIdMap[d.id] || "overview";
          const status = domainStatuses.find((s) => s.domainId === statusDomainId);

          return (
            <button
              key={d.id}
              onClick={() => onDomainChange(d.id)}
              style={{
                padding: "8px 16px",
                backgroundColor: domain === d.id ? "var(--primary)" : "transparent",
                color: domain === d.id ? "white" : "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: domain === d.id ? 500 : 400,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {d.label}
              {status && d.id !== "all" && <DomainStatusDot dot={status.dot} size="sm" />}
            </button>
          );
        })}
      </div>

      {/* Right: Date range + Add data */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Range:</span>
          <select
            value={range}
            onChange={(e) => onRangeChange(e.target.value as Range)}
            style={{
              padding: "6px 12px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              backgroundColor: "var(--surface-alt)",
              color: "var(--text-primary)",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {ranges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <AddDataMenu />
      </div>
    </div>
  );
}

