"use client";

import React from "react";
import PricingCard from "./PricingCard";

interface PricingSectionProps {
  prefersReducedMotion?: boolean;
}

export default function PricingSection({
  prefersReducedMotion = false,
}: PricingSectionProps) {
  const tier1Features = [
    {
      title: "Data Foundation",
      features: [
        "Upload unlimited medical records",
        "Automatic lab and report structuring",
        "Medication and diagnosis timeline",
      ],
    },
    {
      title: "Timeline Intelligence",
      features: [
        "One living health timeline",
        "Missing data detection",
        "Cross-provider context",
      ],
    },
    {
      title: "Signals + Monitoring",
      features: [
        "Early pattern detection",
        "Risk domain tracking",
        "Smart reminders",
      ],
    },
    {
      title: "Smart Actions",
      features: [
        "Next best step suggestions",
        "Monitoring cadence guidance",
        "Contextual marketplace recommendations",
      ],
    },
  ];

  const tier2Features = [
    {
      title: "Includes Everything in Health Intelligence PLUS:",
      features: [],
    },
    {
      title: "Longevity Blueprint Engine",
      features: [
        "Personalized longevity roadmap",
        "Multi-year health optimization tracking",
        "Adaptive plan updates",
      ],
    },
    {
      title: "Investigation Blueprints",
      features: [
        "Evidence-based investigation frameworks",
        "Signal deep-dive protocols",
        "Timeline-integrated results",
      ],
    },
    {
      title: "Experimentation Tracking",
      features: [
        "Protocol outcome tracking",
        "Before / after signal comparison",
        "Intervention response visibility",
      ],
    },
    {
      title: "Strategy Layer",
      features: [
        "Long horizon planning tools",
        "Priority decision engine",
        "Risk trajectory modeling",
      ],
    },
  ];

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
            PRICING
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{
              color: "rgba(231,240,238,0.95)",
              fontWeight: 500,
              letterSpacing: "-0.2px",
            }}
          >
            Choose how deep you want to go
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Start with visibility.
            <br />
            Upgrade when you want structured long-term strategy.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Tier 1 */}
          <PricingCard
            tierName="Arc Health Intelligence"
            badge="Most people start here"
            price="$29"
            tagline="See your full health story and detect meaningful change early."
            featureGroups={tier1Features}
            ctaText="Start Health Intelligence"
            ctaLink="/signup?tier=intelligence"
            isHighlighted={false}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Tier 2 - Highlighted */}
          <PricingCard
            tierName="Arc Longevity Studio"
            badge="For proactive longevity planning"
            price="$99"
            tagline="Turn visibility into a long-term health strategy."
            featureGroups={tier2Features}
            ctaText="Start Longevity Studio"
            ctaLink="/signup?tier=longevity"
            isHighlighted={true}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Trust Line */}
        <div className="text-center">
          <p
            className="text-sm leading-relaxed max-w-[720px] mx-auto"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Cancel anytime.
            <br />
            You always keep your data and timeline.
          </p>
        </div>
      </div>
    </section>
  );
}

