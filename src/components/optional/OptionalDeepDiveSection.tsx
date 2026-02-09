"use client";

import React from "react";
import OptionalFeatureCard from "./OptionalFeatureCard";

interface OptionalDeepDiveSectionProps {
  prefersReducedMotion?: boolean;
}

export default function OptionalDeepDiveSection({
  prefersReducedMotion = false,
}: OptionalDeepDiveSectionProps) {
  return (
    <section
      className="py-20 md:py-24"
      style={{
        backgroundColor: "#060B0C",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{
              color: "var(--text-muted)",
            }}
          >
            OPTIONAL — GO DEEPER WHEN YOU'RE READY
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{
              color: "rgba(231,240,238,0.95)",
              fontWeight: 500,
              letterSpacing: "-0.2px",
            }}
          >
            Turn visibility into a personal strategy
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Some people stop at visibility and check-ins.
            <br />
            Others want to actively shape their long-term trajectory.
            <br />
            <span style={{ color: "var(--text-muted)" }}>Arc supports both — without pressure.</span>
          </p>
        </div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Card 1: Longevity Blueprint */}
          <OptionalFeatureCard
            title="Start your longevity blueprint"
            description="A structured, evolving plan built from your timeline, risks, and goals — updated as your data grows."
            connectionBullets={[
              "Medical timeline",
              "Detected patterns",
              "Risk domains",
              "Missing data gaps",
            ]}
            flowSteps={[
              { emoji: "1️⃣", text: "Review your baseline (timeline + signals)" },
              { emoji: "2️⃣", text: "Choose focus area (cardio, metabolic, neuro, etc.)" },
              { emoji: "3️⃣", text: "Follow structured testing + intervention roadmap" },
            ]}
            benefits={[
              "Prioritized testing roadmap",
              "Structured follow-up cadence",
              "Outcome tracking over years",
            ]}
            primaryCTA="Start blueprint"
            secondaryCTA="See example blueprint →"
            variant="blueprint"
            primaryCTALink="/programs/blueprints"
            secondaryCTALink="/programs/blueprints/example"
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Card 2: Self Investigation */}
          <OptionalFeatureCard
            title="Run your own investigations using proven blueprints"
            description="Explore structured investigation frameworks without committing to a full program."
            connectionBullets={[
              "Why did inflammation trend change?",
              "Why did sleep variability increase?",
              "Why did LDL shift despite stable diet?",
            ]}
            flowSteps={[
              { emoji: "1️⃣", text: "Pick investigation blueprint" },
              { emoji: "2️⃣", text: "Run recommended labs or tracking" },
              { emoji: "3️⃣", text: "Compare results to your baseline timeline" },
            ]}
            benefits={[
              "Structured curiosity",
              "Evidence-based frameworks",
              "Timeline-integrated results",
            ]}
            primaryCTA="Browse investigation blueprints"
            secondaryCTA="See example investigation →"
            variant="investigation"
            primaryCTALink="/programs/investigations"
            secondaryCTALink="/programs/investigations/example"
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Trust reassurance footer */}
        <div className="text-center">
          <p
            className="text-sm leading-relaxed max-w-[720px] mx-auto"
            style={{
              color: "var(--text-muted)",
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

