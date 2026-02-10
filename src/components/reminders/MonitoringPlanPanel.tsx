"use client";

import React from "react";
import { DomainId } from "@/domain/domainConfig";

interface MonitoringPlanPanelProps {
  domain: "all" | DomainId;
  onEnablePlan: (domain: DomainId) => void;
}

export default function MonitoringPlanPanel({ domain, onEnablePlan }: MonitoringPlanPanelProps) {
  if (domain === "all") {
    return (
      <div
        style={{
          position: "sticky",
          top: "24px",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "24px",
          height: "fit-content",
        }}
      >
        <div style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "13px" }}>
          Select a domain to see monitoring plan
        </div>
      </div>
    );
  }

  const getDomainPlan = (domainId: DomainId) => {
    const plans: Record<DomainId, { cadence: string; why: string }> = {
      cardiovascular: {
        cadence: "Every 6 months: Lipid panel, Blood pressure check",
        why: "Regular monitoring helps track improvements and catch changes early.",
      },
      metabolic: {
        cadence: "Every 6 months: HbA1c, Metabolic panel",
        why: "Metabolic markers can change gradually. Regular checks ensure early intervention.",
      },
      cancer_screening: {
        cadence: "Annual: Age-appropriate screenings",
        why: "Early detection significantly improves outcomes for cancer prevention.",
      },
      neuro: {
        cadence: "As needed: Based on symptoms or risk factors",
        why: "Neurological monitoring is personalized based on your specific risk profile.",
      },
      sleep: {
        cadence: "Monthly: Sleep quality check-in",
        why: "Sleep patterns affect overall health. Regular monitoring helps identify trends.",
      },
      fitness: {
        cadence: "Quarterly: Fitness assessment",
        why: "Track your fitness progress and adjust your routine as needed.",
      },
      overview: {
        cadence: "Annual: Comprehensive health check",
        why: "Annual checkups provide a complete picture of your health status.",
      },
    };
    return plans[domainId] || { cadence: "Custom plan", why: "Personalized monitoring plan." };
  };

  const plan = getDomainPlan(domain);
  const domainLabel = domain.charAt(0).toUpperCase() + domain.slice(1).replace("_", " ");

  return (
    <div
      style={{
        position: "sticky",
        top: "24px",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        height: "fit-content",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        Monitoring plan
      </h3>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
        Recommended cadence for {domainLabel.toLowerCase()}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Suggested cadence
        </h4>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
          {plan.cadence}
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: "1.5" }}>
          {plan.why}
        </p>
      </div>

      <button
        onClick={() => onEnablePlan(domain)}
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: "12px",
        }}
      >
        Enable plan
      </button>

      <p style={{ fontSize: "11px", color: "var(--text-tertiary)", textAlign: "center" }}>
        You can customize cadence and channels at any time.
      </p>
    </div>
  );
}


