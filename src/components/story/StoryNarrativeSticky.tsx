"use client";

import React from "react";
import Link from "next/link";

export type StoryStep = "upload" | "timeline" | "signal" | "action" | "marketplace";

interface StepData {
  id: StoryStep;
  label: string;
  title: string;
  body: string;
  whatYouSee: string;
  ctaText: string;
}

const steps: StepData[] = [
  {
    id: "upload",
    label: "1 — Upload",
    title: "Upload a lab result",
    body: "Add a PDF from your portal or email. Arc organizes it automatically.",
    whatYouSee: "Document added → categorized → placed on your timeline.",
    ctaText: "See the document →",
  },
  {
    id: "timeline",
    label: "2 — Timeline",
    title: "Your history becomes one view",
    body: "Records from different clinics become a continuous timeline you can scan.",
    whatYouSee: "Past labs, visits, imaging, and notes in chronological order.",
    ctaText: "Explore timeline →",
  },
  {
    id: "signal",
    label: "3 — Signals",
    title: "A trend becomes visible",
    body: "A single result may look normal — but a pattern across time can matter.",
    whatYouSee: "A signal tile shows a change over months, not a single appointment.",
    ctaText: "View trend →",
  },
  {
    id: "action",
    label: "4 — Next steps",
    title: "You get a clear next step",
    body: "No diagnosis. No pressure. Just a recommendation based on your timeline.",
    whatYouSee: '"Repeat lipid panel in 6 months" + optional reminders.',
    ctaText: "Set a reminder →",
  },
  {
    id: "marketplace",
    label: "5 — Options",
    title: "Trusted services, matched to context",
    body: "If you want to act, Arc shows relevant options with preparation notes and follow-up.",
    whatYouSee: "Testing options + expected cost range + how results fit your history.",
    ctaText: "See options →",
  },
];

interface StoryNarrativeStickyProps {
  activeStep: StoryStep;
  onStepClick?: (step: StoryStep) => void;
  prefersReducedMotion?: boolean;
}

function StoryNarrativeSticky({
  activeStep,
  onStepClick,
  prefersReducedMotion = false,
}: StoryNarrativeStickyProps) {
  const handleStepClick = (step: StoryStep) => {
    onStepClick?.(step);
    if (typeof window !== "undefined") {
      const element = document.getElementById(`story-step-${step}`);
      if (element) {
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      }
    }
  };

  const handleCTAClick = (e: React.MouseEvent, step: StoryStep) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      window.open(`/demo/command-center?story=${step}`, "_blank");
    }
  };

  return (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const isActive = activeStep === step.id;
        return (
          <div
            key={step.id}
            id={`story-step-${step.id}`}
            className="relative pl-6 transition-all duration-300"
            style={{
              borderLeft: isActive ? "2px solid rgba(110,211,194,0.35)" : "2px solid transparent",
            }}
          >
            {/* Step label */}
            <p
              className="text-xs font-semibold uppercase mb-2"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                letterSpacing: "1.2px",
                transition: "color 200ms ease",
              }}
            >
              {step.label}
            </p>

            {/* Active indicator dot */}
            {isActive && (
              <div
                className="absolute left-[-5px] top-[6px] w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "var(--accent)",
                }}
              />
            )}

            {/* Title */}
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                color: isActive ? "rgba(231,240,238,0.95)" : "rgba(231,240,238,0.7)",
                fontWeight: 500,
                transition: "color 200ms ease",
              }}
            >
              {step.title}
            </h3>

            {/* Body */}
            <p
              className="text-sm mb-3 leading-relaxed"
              style={{
                color: isActive ? "var(--text-secondary)" : "var(--text-muted)",
                lineHeight: 1.6,
                transition: "color 200ms ease",
              }}
            >
              {step.body}
            </p>

            {/* What you see */}
            <div
              className="mb-4 p-3 rounded-[8px]"
              style={{
                backgroundColor: isActive ? "rgba(110,211,194,0.05)" : "rgba(231,240,238,0.02)",
                border: `1px solid ${isActive ? "rgba(110,211,194,0.1)" : "rgba(231,240,238,0.06)"}`,
                transition: "all 200ms ease",
              }}
            >
              <p
                className="text-[10px] font-medium uppercase mb-1"
                style={{
                  color: "var(--text-muted)",
                  letterSpacing: "0.8px",
                }}
              >
                What you see:
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: isActive ? "var(--text-secondary)" : "var(--text-muted)",
                }}
              >
                {step.whatYouSee}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={(e) => handleCTAClick(e, step.id)}
              className="text-xs font-medium inline-flex items-center gap-1 transition-colors"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = "var(--accent-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--text-muted)";
                }
              }}
            >
              {step.ctaText}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default StoryNarrativeSticky;

