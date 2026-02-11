"use client";

import React, { useState } from "react";
import PricingCard from "./PricingCard";
import RegionUnavailableModal from "../modals/RegionUnavailableModal";

interface PricingSectionProps {
  prefersReducedMotion?: boolean;
}

export default function PricingSection({
  prefersReducedMotion = false,
}: PricingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string>("pricing_health_intelligence");

  const handleRegionUnavailable = (source: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };
  // Primary bullets (max 3, always visible)
  const tier1PrimaryBullets = [
    "Upload and unify your medical history",
    "See trends and risks across time",
    "Get clear next-step guidance",
  ];

  const tier2PrimaryBullets = [
    "Everything in Health Intelligence",
    "Personalized longevity blueprint",
    "Investigation and experiment tracking",
  ];

  // Expandable feature groups (collapsed by default)
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
      title: "Blueprint Engine",
      features: [
        "Personalized longevity roadmap",
        "Multi-year health optimization tracking",
        "Adaptive plan updates",
      ],
    },
    {
      title: "Investigation Frameworks",
      features: [
        "Evidence-based investigation frameworks",
        "Signal deep-dive protocols",
        "Timeline-integrated results",
      ],
    },
    {
      title: "Experiment Tracking",
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
        backgroundColor: "var(--bg)",
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
              color: "var(--text)",
              fontWeight: 500,
              letterSpacing: "-0.2px",
            }}
          >
            Choose how deep you want to go
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            Start with visibility.
            <br />
            Upgrade when you want structured long-term strategy.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Tier 1 */}
          <PricingCard
            tierName="Arc Health Intelligence"
            badge="Most people start here"
            price="$29"
            tagline="See your full health story and detect meaningful change early."
            primaryBullets={tier1PrimaryBullets}
            featureGroups={tier1Features}
            ctaText="Start Health Intelligence"
            ctaLink="/signup?tier=intelligence"
            isHighlighted={false}
            prefersReducedMotion={prefersReducedMotion}
            onRegionUnavailable={handleRegionUnavailable}
          />

          {/* Tier 2 - Highlighted */}
          <PricingCard
            tierName="Arc Longevity Studio"
            price="$99"
            tagline="Turn visibility into a long-term health strategy."
            primaryBullets={tier2PrimaryBullets}
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

      {/* Region Unavailable Modal */}
      <RegionUnavailableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </section>
  );
}


