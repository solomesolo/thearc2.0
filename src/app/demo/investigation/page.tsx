"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { investigationData } from "@/lib/demo/demoInvestigationData";
import InvestigationInsightHero from "@/components/investigation/InvestigationInsightHero";
import InvestigationDeltaGrid from "@/components/investigation/InvestigationDeltaGrid";
import InvestigationDriversCard from "@/components/investigation/InvestigationDriversCard";
import InvestigationNextActionCard from "@/components/investigation/InvestigationNextActionCard";
import InvestigationSupportingDataAccordion from "@/components/investigation/InvestigationSupportingDataAccordion";
import { arcTokens } from "@/lib/ui/arcTokens";

export default function InvestigationDemoPage() {
  const handleDoNow = () => {
    // Navigate to action or open modal
    console.log("Do now clicked");
  };

  const handleSchedule = () => {
    // Open schedule modal
    console.log("Schedule clicked");
  };

  const handleLearnWhy = () => {
    // Expand supporting data or show explanation
    console.log("Learn why clicked");
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container investigation-demo-page relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Demo Banner */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: "32px",
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: arcTokens.surface.card,
              border: `1px solid ${arcTokens.border.default}`,
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: arcTokens.text.tertiary,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Demo investigation — not your personal data
            </span>
          </div>

          {/* Page Header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: arcTokens.text.primary,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {investigationData.title}
              </h1>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "12px", color: arcTokens.text.secondary }}>
                  <span style={{ color: arcTokens.text.tertiary }}>Status:</span> {investigationData.status}
                </div>
                <div style={{ fontSize: "12px", color: arcTokens.text.secondary }}>
                  <span style={{ color: arcTokens.text.tertiary }}>Evidence:</span> {investigationData.evidence}
                </div>
                <div style={{ fontSize: "12px", color: arcTokens.text.secondary }}>
                  <span style={{ color: arcTokens.text.tertiary }}>Data completeness:</span> {investigationData.dataCompleteness}%
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: arcTokens.text.secondary,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Example investigation built from sample timeline + signal history.
            </p>
          </div>

          {/* Key Insight Hero */}
          <InvestigationInsightHero
            finding={investigationData.finding}
            direction={investigationData.direction}
            confidence={investigationData.confidence}
            dataCompleteness={investigationData.dataCompleteness}
            whyItMatters={investigationData.whyItMatters}
          />

          {/* What Changed */}
          <InvestigationDeltaGrid deltas={investigationData.deltas} />

          {/* Likely Drivers */}
          <InvestigationDriversCard drivers={investigationData.drivers} />

          {/* What To Do Next - MOST IMPORTANT */}
          <InvestigationNextActionCard
            recommendation={investigationData.recommendation}
            whyNow={investigationData.whyNow}
            timeSensitivity={investigationData.timeSensitivity}
            onDoNow={handleDoNow}
            onSchedule={handleSchedule}
            onLearnWhy={handleLearnWhy}
          />

          {/* Supporting Data (Collapsible) */}
          <InvestigationSupportingDataAccordion
            baselineSignals={investigationData.baselineSignals}
            trackingPlan={investigationData.trackingPlan}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
