"use client";

import React from "react";
import StrategicModePanel from "./StrategicModePanel";

interface OptionalDeepDiveSectionProps {
  prefersReducedMotion?: boolean;
}

export default function OptionalDeepDiveSection({
  prefersReducedMotion = false,
}: OptionalDeepDiveSectionProps) {
  return (
    <section
      className="advanced-section py-16 md:py-20"
      style={{
        backgroundColor: "#071012",
        color: "rgba(231,240,238,0.95)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{
              color: "rgba(143,166,163,0.85)",
            }}
          >
            OPTIONAL — ADVANCED MODES
          </p>
          <h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{
              color: "rgba(231,240,238,0.95)",
              fontWeight: 600,
              letterSpacing: "-0.2px",
            }}
          >
            Move from visibility to active strategy
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{
              color: "rgba(143,166,163,0.80)",
              lineHeight: 1.5,
            }}
          >
            Some people stay in monitoring mode.
            <br />
            Others choose to actively shape long-term outcomes.
          </p>
        </div>

        {/* Two-module grid */}
        <div className="advanced-row grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Module 1: Longevity Blueprint System */}
          <StrategicModePanel
            title="Blueprint System"
            status="Available"
            description="Structured longitudinal health planning built from your timeline, risk domains, and detected change patterns."
            dataInputs={[
              "Medical timeline",
              "Detected signal clusters",
              "Risk domain weighting",
              "Missing data mapping",
            ]}
            processSteps={[
              "Baseline",
              "Focus Domain",
              "Protocol Path",
              "Outcome Tracking",
            ]}
            outcomes={[
              "Prioritized testing roadmap",
              "Structured follow-up cadence",
              "Multi-year outcome tracking",
            ]}
            primaryCTA="Start Blueprint"
            secondaryCTA="View example blueprint"
            primaryCTALink="/programs/blueprints"
            secondaryCTALink="/programs/blueprints/example"
          />

          {/* Module 2: Investigation Mode */}
          <StrategicModePanel
            title="Investigation Mode"
            status="Available"
            description="Run targeted evidence-based investigations triggered by signal changes — without committing to full programs."
            dataInputs={[
              "Inflammation drift",
              "Sleep variability shift",
              "Lipid trajectory change",
            ]}
            processSteps={[
              "Select Framework",
              "Run Tests / Tracking",
              "Compare vs Baseline",
            ]}
            outcomes={[
              "Hypothesis validation",
              "Evidence-grounded experimentation",
              "Timeline-integrated results",
            ]}
            primaryCTA="Browse Investigations"
            secondaryCTA="View example investigation"
            primaryCTALink="/programs/investigations"
            secondaryCTALink="/programs/investigations/example"
          />
        </div>

        {/* Trust reassurance footer */}
        <div className="text-center">
          <p
            className="text-sm leading-relaxed max-w-[720px] mx-auto"
            style={{
              color: "rgba(143,166,163,0.80)",
            }}
          >
            You can stay in visibility mode forever.
            <br />
            Blueprints are optional — they exist when you want to go deeper.
          </p>
        </div>
      </div>
    </section>
  );
}


