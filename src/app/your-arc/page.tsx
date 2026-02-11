"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/Container";
import { ArcButton } from "../../components/ui/ArcButton";
import { HeroContinuityCardMini } from "../../components/hero/HeroContinuityCardMini";
import { DemoEmbedCard } from "../../components/hero/DemoEmbedCard";
import { HeroFloatingUI } from "../../components/hero/HeroFloatingUI";
import MarketingSignalExampleMini from "../../components/marketing/MarketingSignalExampleMini";
import WebDashboardPreview from "../../components/marketing/WebDashboardPreview";
import MobileViewPreview from "../../components/marketing/MobileViewPreview";
import DayInLifeSection from "../../components/marketing/DayInLifeSection";
import OptionalDeepDiveSection from "../../components/optional/OptionalDeepDiveSection";
import PricingSection from "../../components/pricing/PricingSection";
import { ThemeSection } from "../../theme/ThemeSection";
import { useTheme } from "../../theme/ThemeProvider";
import PageShell from "../../components/layout/PageShell";
import { Section } from "../../components/layout/Section";
import Link from "next/link";

type OutcomeId = "inflammation" | "blood-timing" | "sleep-pattern";

const outcomeData: Record<
  OutcomeId,
  {
    alert: {
      headline: string;
      timeline: string;
      details: string[];
      recommendation: string;
    };
    colorTheme: {
      accent: string;
      border: string;
      shadow: string;
      dot: string;
    };
    timeLabel: string;
    trustLine: string;
    timelineDots: number;
    highlightedDots: number;
  }
> = {
  inflammation: {
    alert: {
      headline: "Chronic inflammation trend rising",
      timeline: "last 18 months",
      details: [
        "hsCRP increased gradually across 7 lab panels over 18 months",
        "Individual values stayed within reference range at each test",
        "Trend only became visible when results were reviewed together",
      ],
      recommendation: "Review lifestyle and cardiovascular risk factors at next routine check-in",
    },
    colorTheme: {
      accent: "#D7B56D", // Amber muted
      border: "rgba(215, 181, 109, 0.35)", // 35% opacity
      shadow: "rgba(215, 181, 109, 0.12)",
      dot: "#D7B56D",
    },
    timeLabel: "18-month longitudinal view",
    trustLine: "Arc does not provide medical advice. It surfaces longitudinal patterns to support informed discussions.",
    timelineDots: 18,
    highlightedDots: 7,
  },
  "blood-timing": {
    alert: {
      headline: "Metabolic markers showing early drift",
      timeline: "last 12 months",
      details: [
        "HbA1c increased slightly between two checks 6 months apart",
        "Fasting glucose remained stable",
        "Change was consistent but not clinically actionable yet",
      ],
      recommendation: "Repeat blood panel in 6 months to confirm or dismiss trend",
    },
    colorTheme: {
      accent: "#14B8A6", // Teal
      border: "rgba(20, 184, 166, 0.4)",
      shadow: "rgba(20, 184, 166, 0.12)",
      dot: "#14B8A6",
    },
    timeLabel: "Comparison of last 2 panels",
    trustLine: "No fixed schedules. Follow-up timing adapts to what your last results actually showed.",
    timelineDots: 12,
    highlightedDots: 2,
  },
  "sleep-pattern": {
    alert: {
      headline: "Sleep consistency declining",
      timeline: "last 10 weeks",
      details: [
        "Increased night-to-night variability across 10 weeks of sleep data",
        "Recovery scores trended downward during the same period",
        "No single bad night — accumulation revealed the pattern",
      ],
      recommendation: "Continue monitoring sleep consistency before making changes",
    },
    colorTheme: {
      accent: "#4DEECD", // Arc accent
      border: "rgba(77, 238, 205, 0.4)",
      shadow: "rgba(77, 238, 205, 0.12)",
      dot: "#4DEECD",
    },
    timeLabel: "10-week rolling view",
    trustLine: "Some signals are meant to be observed over time, not acted on immediately.",
    timelineDots: 10,
    highlightedDots: 3,
  },
};

type UsageStepId = "step1" | "step2" | "step3" | "step4";

const usageStepData: Record<
  UsageStepId,
  {
    context: string[];
  }
> = {
  step1: {
    context: [
      "A timeline begins to form as documents from different clinics are added.",
      "Older records that were once lost become visible again.",
    ],
  },
  step2: {
    context: [
      "Small shifts become noticeable when labs wearables and scans are viewed together.",
      "Nothing triggers action yet but awareness improves.",
    ],
  },
  step3: {
    context: [
      "You browse trusted programs tied to real medical guidance.",
      "You choose what to try and what to ignore.",
    ],
  },
  step4: {
    context: [
      "You compare outcomes across months.",
      "Some changes stick others are discarded.",
      "Your blueprint becomes personal.",
    ],
  },
};

type ActionPathId = "diagnostics" | "specialists" | "services";

const actionPathData: Record<
  ActionPathId,
  {
    context: string[];
  }
> = {
  diagnostics: {
    context: [
      "LDL Cholesterol Pattern Detected",
      "",
      "Your records indicate a change in LDL cholesterol dynamics across recent results.",
      "",
      "Rather than viewing this as an isolated value, The Arc evaluates lipid markers longitudinally, where trends often carry greater clinical meaning than single measurements.",
      "",
      "Elevated attention may be appropriate when patterns suggest:",
      "",
      "• Persistent shifts rather than temporary variation",
      "• Changes linked to metabolic or inflammatory influences",
      "• Profiles associated with altered cardiovascular risk",
      "",
      "Additional insight may come from targeted lipid markers that clarify underlying physiology and refine interpretation.",
    ],
  },
  specialists: {
    context: [
      "Sleep Regulation Signals Identified",
      "",
      "Recent data suggests changes in sleep efficiency, resting heart rate, and recovery variability.",
      "",
      "These metrics reflect regulatory activity within the autonomic nervous system. When observed together, they may indicate adaptive stress responses or emerging disruption of restorative processes.",
      "",
      "Patterns of interest typically include:",
      "",
      "• Concurrent movement across multiple recovery indicators",
      "• Sustained deviation from established baselines",
      "• Signatures associated with sleep instability",
      "",
      "Further evaluation may help distinguish transient adaptation from patterns that benefit from specialist insight.",
    ],
  },
  services: {
    context: [
      "Vitamin D Trend Observed",
      "",
      "Your documents show a reduction in Vitamin D levels alongside reported fatigue.",
      "",
      "Vitamin D participates in neuromuscular function, immune modulation, and metabolic processes. Contextual interpretation is important, as clinical relevance depends on magnitude, duration, and symptom correlation.",
      "",
      "Considerations may include:",
      "",
      "• Degree and persistence of the reduction",
      "• Biological plausibility of associated symptoms",
      "• Expected physiological response to normalization",
      "",
      "Structured correction strategies are available when appropriate.",
    ],
  },
};

// Clinical Summary Panel Component
interface ClinicalSummaryPanelProps {
  actionPathData: {
    context: string[];
  };
  prefersReducedMotion?: boolean;
}

function ClinicalSummaryPanel({
  actionPathData,
  prefersReducedMotion = false,
}: ClinicalSummaryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Parse the context array into structured sections
  // Structure: [title, "", summary, "", interpretation, "", patternsLabel, "", bullets..., "", finalParagraph]
  const title = actionPathData.context[0] || "";
  const summaryParagraph = actionPathData.context[2] || "";
  const interpretationParagraph = actionPathData.context[4] || "";
  
  // Find patterns label (usually around index 6)
  let patternsLabel = "";
  for (let i = 0; i < actionPathData.context.length; i++) {
    const line = actionPathData.context[i];
    if (line && (line.toLowerCase().includes("pattern") || 
                 line.toLowerCase().includes("include") ||
                 line.toLowerCase().includes("consider") ||
                 line.toLowerCase().includes("appropriate"))) {
      patternsLabel = line;
      break;
    }
  }
  if (!patternsLabel) {
    patternsLabel = "Patterns of interest typically include:";
  }
  
  // Get bullets (lines starting with •)
  const bullets = actionPathData.context.filter(line => line.startsWith("•"));
  
  // Get final paragraph (last non-empty, non-bullet line)
  const finalParagraph = actionPathData.context
    .slice()
    .reverse()
    .find(line => line !== "" && !line.startsWith("•") && !line.toLowerCase().includes("pattern") && !line.toLowerCase().includes("include") && !line.toLowerCase().includes("consider")) || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      className="border mb-6 practice-panel clinical-summary"
      style={{
        backgroundColor: `var(--surface-raised)`,
        borderRadius: "var(--radius-xl)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: `var(--border-subtle)`,
        padding: "20px 24px",
      }}
    >
      {/* Eyebrow */}
      <p 
        className="font-semibold uppercase mb-2"
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: `var(--text-muted)`,
        }}
      >
        HOW THIS WORKS IN PRACTICE
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: `var(--text-primary)`,
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>

      {/* Summary Section (Always Visible) */}
      <div style={{ marginBottom: "14px" }}>
        <p
          className="summary-text"
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: `var(--text-muted)`,
            fontWeight: 400,
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "none" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {summaryParagraph}
        </p>
      </div>

      {/* What it may indicate (Collapsed view) */}
      {!isExpanded && (
        <div style={{ marginBottom: "14px" }}>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: `var(--text-muted)`,
              fontWeight: 400,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {interpretationParagraph}
          </p>
        </div>
      )}

      {/* Patterns Section (Always Visible) */}
      <div style={{ marginBottom: "14px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: `var(--text-muted)`,
            marginBottom: "10px",
          }}
        >
          {patternsLabel}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {bullets.slice(0, 3).map((bullet, idx) => (
            <div
              key={idx}
              className="pattern-item"
              style={{
                position: "relative",
                paddingLeft: "14px",
                margin: "0",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: `var(--text-primary)`,
                  fontWeight: 400,
                }}
              >
                {bullet.replace("•", "").trim()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expand/Collapse Control */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="expand-control w-full flex items-center justify-between text-left transition-all"
        style={{
          marginTop: "12px",
          padding: "8px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: `var(--text-muted)`,
        }}
        onMouseEnter={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.textDecoration = "underline";
          }
        }}
        onMouseLeave={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.textDecoration = "none";
          }
        }}
        onFocus={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.outline = "2px solid var(--accent-soft)";
            e.currentTarget.style.outlineOffset = "2px";
            e.currentTarget.style.borderRadius = "4px";
          }
        }}
        onBlur={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.outline = "none";
          }
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: `var(--text-muted)`,
          }}
        >
          {isExpanded ? "Hide clinical rationale" : "Read clinical rationale"}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: "var(--text-muted)",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden", marginTop: "18px" }}
        >
          {/* Context Section */}
          <div style={{ marginBottom: "18px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: `var(--text-muted)`,
                marginBottom: "12px",
              }}
            >
              Context
            </h4>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: `var(--text-muted)`,
                fontWeight: 400,
              }}
            >
              {summaryParagraph}
            </p>
          </div>

          {/* Interpretation Section */}
          <div style={{ marginBottom: "18px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: `var(--text-muted)`,
                marginBottom: "12px",
              }}
            >
              Interpretation
            </h4>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: `var(--text-muted)`,
                fontWeight: 400,
              }}
            >
              {interpretationParagraph}
            </p>
          </div>

          {/* Patterns of Interest Section */}
          <div style={{ marginBottom: "18px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: `var(--text-muted)`,
                marginBottom: "12px",
              }}
            >
              Patterns of interest
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="pattern-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: `var(--text-primary)`,
                      fontWeight: 400,
                    }}
                  >
                    {bullet.replace("•", "").trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What to do next Section */}
          {finalParagraph && (
            <div style={{ paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: `var(--text-muted)`,
                  marginBottom: "12px",
                }}
              >
                What to do next
              </h4>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: `var(--text-muted)`,
                  fontWeight: 400,
                }}
              >
                {finalParagraph}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Practice Note - Subtle Footnote */}
      <div 
        className="practice-note"
        style={{
          marginTop: "18px",
          paddingTop: "14px",
          borderTop: "1px solid var(--border-subtle)",
          background: `var(--surface-2)`,
          borderRadius: "12px",
          padding: "10px 12px",
          color: "var(--text-muted)",
          fontSize: "13px",
          lineHeight: 1.5,
        }}
      >
        <p 
          style={{
            fontSize: "13px",
            lineHeight: 1.5,
            color: `var(--text-muted)`,
            margin: 0,
          }}
        >
          Early access users receive priority access and locked in discounts on selected services.
        </p>
      </div>
    </motion.div>
  );
}

export default function YourArcPage() {
  const { theme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeId>("inflammation");
  const [selectedStep, setSelectedStep] = useState<UsageStepId>("step1");
  const [selectedActionPath, setSelectedActionPath] = useState<ActionPathId>("diagnostics");
  
  // Hero section should be light unless user explicitly selected dark globally
  const heroTheme = theme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const handlePrimaryCTA = () => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleSecondaryCTA = () => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <PageShell>
      {/* Section 1: Hero v2 - Split Layout */}
      <ThemeSection theme={heroTheme}>
        <section 
          className="relative"
          style={{ 
            minHeight: "clamp(600px, 85vh, 820px)",
            paddingTop: "clamp(48px, 8vh, 88px)",
            paddingBottom: "clamp(48px, 10vh, 96px)",
            backgroundColor: "rgb(var(--bg))",
          }}
        >
        {/* Full-width container with proper padding */}
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16">
          {/* 12-col grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Copy (spans cols 1-5, 5 cols = ~45%) */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-5 w-full" style={{ maxWidth: "680px" }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "2.4px",
                      color: "var(--text-3)",
                      marginBottom: "18px",
                    }}
                  >
                YOUR ARC
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.1 }}
                  className="h1-unified"
                  style={{
                    fontSize: "clamp(38px, 5vw, 56px)",
                    maxWidth: "680px",
                    marginBottom: "20px",
                  }}
                >
                  Your health data already contains patterns.
              <br />
                  Arc helps you see them early — and act with confidence.
            </motion.h1>

                {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.2 }}
                  className="body-unified"
                  style={{
                    fontSize: "18px",
                    maxWidth: "560px",
                    marginBottom: "8px",
                  }}
                >
                  Arc brings your medical records into one living timeline — so trends, risks, and missing data become clear in context.
            </motion.p>

                {/* Live preview hint */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.25 }}
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: "var(--text-3)",
                    maxWidth: "560px",
                    marginBottom: "22px",
                  }}
                >
                  Explore a live example of your Command Center.
                </motion.p>

                {/* Continuity Confidence Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.3 }}
                  style={{ marginBottom: "28px" }}
                >
                  <HeroContinuityCardMini
                    coveragePercent={70}
                    trendDirection="up"
                    prefersReducedMotion={prefersReducedMotion}
                  />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
                    <button
                      onClick={handlePrimaryCTA}
                      className="rounded-full px-[22px] h-12 flex items-center justify-center font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))] w-full sm:w-auto"
                      style={{
                        backgroundColor: `rgb(var(--btn-primary-bg))`,
                        color: `rgb(var(--btn-primary-text))`,
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--accent) / 0.9)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--btn-primary-bg))`;
                        }
                      }}
                    >
                      Start building your timeline
                    </button>
                    <button
                      onClick={handleSecondaryCTA}
                      className="rounded-full px-[22px] h-12 flex items-center justify-center font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))] w-full sm:w-auto"
                      style={{
                        backgroundColor: `rgb(var(--btn-secondary-bg))`,
                        border: `1px solid rgb(var(--btn-secondary-border))`,
                        color: `rgb(var(--btn-secondary-text))`,
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.borderColor = `rgb(var(--accent))`;
                          e.currentTarget.style.color = `rgb(var(--accent))`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.borderColor = `rgb(var(--btn-secondary-border))`;
                          e.currentTarget.style.color = `rgb(var(--btn-secondary-text))`;
                        }
                      }}
                    >
                      See how Arc works
                    </button>
              </div>
                  <p
                    className="text-xs"
                    style={{
                      fontSize: "12px",
                      color: "var(--text-3)",
                      marginTop: "12px",
                    }}
                  >
                Takes less than 2 minutes
              </p>
            </motion.div>
          </div>
            </div>

            {/* Right Column: Floating UI Visualization (spans cols 6-12, 7 cols = ~55%) */}
            <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-center lg:justify-start order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.5 }}
                >
                  <HeroFloatingUI prefersReducedMotion={prefersReducedMotion} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ThemeSection>

      {/* Section 2: Realistic outcomes section */}
      <Section variant="surface2">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p 
              className="text-xs font-semibold uppercase tracking-[0.18em]" 
              style={{ 
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              EARLY VISIBILITY
            </p>
            <h2 
              className="font-semibold"
              style={{
                fontSize: "clamp(36px, 4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "rgb(var(--text-1))",
                marginBottom: "14px",
              }}
            >
              What early visibility actually looks like
            </h2>
            <p 
              className="text-lg text-center"
              style={{ 
                fontSize: "18px",
                lineHeight: 1.6,
                color: "var(--text-muted)",
              }}
            >
              Not predictions. Not diagnoses. Just seeing what is hard to see when your records are scattered.
            </p>
          </div>

          {/* Outcome Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                id: "inflammation" as OutcomeId,
                title: "Detected inflammation trend",
                subtitle: "Visible 18 months before symptoms",
                timeLabel: "18-month longitudinal view",
                supporting: "",
              },
              {
                id: "blood-timing" as OutcomeId,
                title: "Blood check timing adjusted",
                subtitle: "Recheck recommended in 6 months",
                timeLabel: "Comparison of last 2 panels",
                supporting: "Recent results were mostly stable, with a mild upward drift that warrants confirmation.",
              },
              {
                id: "sleep-pattern" as OutcomeId,
                title: "Sleep pattern shift observed",
                subtitle: "Pattern forming over 10 weeks",
                timeLabel: "10-week rolling view",
                supporting: "Sleep variability increased when viewed alongside recovery and stress indicators.",
              },
            ].map((card, index) => {
              const cardId = card.id;
              const isActive = selectedOutcome === cardId;
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedOutcome(cardId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedOutcome(cardId);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: index * 0.1 }}
                  className="text-left border transition-all focus:outline-none"
                  style={{
                    backgroundColor: `var(--surface-card)`,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isActive ? `var(--accent-soft)` : `var(--border-subtle)`,
                    borderRadius: "var(--radius-xl)",
                    padding: "26px",
                    boxShadow: isActive ? `var(--shadow-soft)` : "none",
                    transition: "all 150ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && !isActive && e.currentTarget) {
                      e.currentTarget.style.borderColor = `var(--border-subtle)`;
                      e.currentTarget.style.boxShadow = `var(--shadow-soft)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && !isActive && e.currentTarget) {
                      e.currentTarget.style.borderColor = `var(--border-subtle)`;
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                  onFocus={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "2px solid var(--accent-soft)";
                      e.currentTarget.style.outlineOffset = "2px";
                    }
                  }}
                  onBlur={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "none";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
                    <h3 
                      className="font-semibold"
                      style={{ 
                        fontSize: "24px",
                        lineHeight: 1.25,
                        color: `rgb(var(--text-1))`,
                      }}
                    >
                      {card.title}
                    </h3>
                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `var(--accent-soft)` }}
                      ></div>
                    )}
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ 
                      color: isActive ? `var(--accent-strong)` : `var(--accent-primary)`,
                      marginBottom: "8px",
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <p 
                    className="text-xs" 
                    style={{ 
                      color: "var(--text-muted)",
                      marginBottom: card.supporting ? "8px" : "14px",
                    }}
                  >
                    {card.timeLabel}
                  </p>
                  {card.supporting && (
                    <p 
                      className="text-xs" 
                      style={{ 
                        color: "var(--text-muted)",
                        marginBottom: "14px",
                      }}
                    >
                      {card.supporting}
                    </p>
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOutcome(cardId);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedOutcome(cardId);
                      }
                    }}
                    className="inline-flex items-center gap-1 transition-all cursor-pointer"
                    style={{ 
                      color: `var(--accent-strong)`,
                      fontSize: "14px",
                      fontWeight: 500,
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.color = `var(--accent-strong)`;
                        e.currentTarget.style.textDecoration = "underline";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.color = `var(--accent-strong)`;
                        e.currentTarget.style.textDecoration = "none";
                      }
                    }}
                    onFocus={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.outline = "2px solid var(--accent-soft)";
                        e.currentTarget.style.outlineOffset = "2px";
                        e.currentTarget.style.borderRadius = "4px";
                      }
                    }}
                    onBlur={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.outline = "none";
                      }
                    }}
                  >
                    View example
                    <span aria-hidden="true">→</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Example Signal Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOutcome}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="border relative overflow-hidden example-panel"
              style={{
                backgroundColor: `var(--surface-card)`,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `var(--border-subtle)`,
                borderRadius: "24px",
                padding: "32px 36px",
                boxShadow: `var(--shadow-soft)`,
                transition: "all 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.borderColor = `var(--border-subtle)`;
                  // Increase indicator bar opacity on hover
                  const indicatorBar = e.currentTarget.querySelector('[data-signal-indicator]') as HTMLElement;
                  if (indicatorBar) {
                    indicatorBar.style.opacity = "0.9";
                  }
                  // Deepen title color slightly
                  const title = e.currentTarget.querySelector('[data-signal-title]') as HTMLElement;
                  if (title) {
                    title.style.opacity = "0.95";
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.borderColor = `var(--border-subtle)`;
                  // Reset indicator bar opacity
                  const indicatorBar = e.currentTarget.querySelector('[data-signal-indicator]') as HTMLElement;
                  if (indicatorBar) {
                    indicatorBar.style.opacity = "0.7";
                  }
                  // Reset title color
                  const title = e.currentTarget.querySelector('[data-signal-title]') as HTMLElement;
                  if (title) {
                    title.style.opacity = "1";
                  }
                }
              }}
            >
              {/* Left-edge Signal Bar (Monitor state) */}
              <div
                data-signal-indicator
                style={{
                  position: "absolute",
                  left: 0,
                  top: "24px",
                  bottom: "24px",
                  width: "3px",
                  borderRadius: "2px",
                  background: `var(--signal-monitor)`,
                  opacity: 0.7,
                  transition: "opacity 150ms ease-out",
                }}
              />
              
            <div className="space-y-5" style={{ paddingLeft: "0" }}>
              {/* Alert Content */}
              <div className="space-y-4">
                <p 
                  className="font-semibold uppercase" 
                  style={{ 
                    color: "var(--signal-neutral)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    marginBottom: "0",
                  }}
                >
                  EXAMPLE SIGNAL
                </p>
                <h4
                  data-signal-title
                  className="font-semibold"
                  style={{
                    fontSize: "24px",
                    lineHeight: 1.25,
                    color: `var(--signal-monitor)`,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    marginBottom: "0",
                    transition: "opacity 150ms ease-out",
                  }}
                >
                  {outcomeData[selectedOutcome]?.alert.headline || outcomeData["inflammation"].alert.headline}
                </h4>
                <p 
                  className="text-xs" 
                  style={{ 
                    color: "var(--signal-neutral)",
                    fontSize: "14px",
                    marginBottom: "0",
                  }}
                >
                  Timeline: {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                </p>
                <div className="space-y-3.5">
                  {(outcomeData[selectedOutcome]?.alert.details || outcomeData["inflammation"].alert.details).map(
                    (detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className="rounded-full mt-2.5 flex-shrink-0"
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: `var(--accent-soft)`,
                          }}
                        ></div>
                        <p 
                          className="leading-relaxed" 
                          style={{ 
                            color: `rgb(var(--text-1))`,
                            fontSize: "16px",
                            lineHeight: 1.75,
                          }}
                        >
                          {detail}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Section Divider */}
              <div 
                className="section-divider"
                style={{ 
                  borderTop: "1px solid var(--border-subtle)",
                  margin: "18px 0",
                }}
              />

              {/* Timeline Preview - Borderless Surface Band */}
              <div 
                className="timeline-band"
                style={{
                  background: `var(--surface-raised)`,
                  border: "0",
                  borderRadius: "14px",
                  padding: "14px 16px",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 flex-1">
                    {Array.from({ length: outcomeData[selectedOutcome]?.timelineDots || 18 }).map((_, idx) => {
                      const totalDots = outcomeData[selectedOutcome]?.timelineDots || 18;
                      const highlightedCount = outcomeData[selectedOutcome]?.highlightedDots || 7;
                      const isHighlighted = idx >= totalDots - highlightedCount;
                      
                      // Calculate elegant color progression: muted red → amber → teal (left to right)
                      const progress = idx / (totalDots - 1); // 0 to 1
                      let dotColor: string;
                      let dotBorderColor: string;
                      
                      // Elegant muted colors
                      // Red: #C26F6F (194, 111, 111) - desaturated clinical red
                      // Amber: #C7A95B (199, 169, 91) - muted amber
                      // Teal: #4DAE9E (77, 174, 158) - elegant teal
                      
                      if (progress < 0.5) {
                        // Muted Red to Amber (0 to 0.5)
                        const t = progress * 2; // 0 to 1
                        const r = Math.round(194 * (1 - t) + 199 * t); // 194 to 199
                        const g = Math.round(111 * (1 - t) + 169 * t); // 111 to 169
                        const b = Math.round(111 * (1 - t) + 91 * t); // 111 to 91
                        dotColor = `rgba(${r}, ${g}, ${b}, 0.16)`;
                        dotBorderColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
                      } else {
                        // Amber to Teal (0.5 to 1)
                        const t = (progress - 0.5) * 2; // 0 to 1
                        const r = Math.round(199 * (1 - t) + 77 * t); // 199 to 77
                        const g = Math.round(169 * (1 - t) + 174 * t); // 169 to 174
                        const b = Math.round(91 * (1 - t) + 158 * t); // 91 to 158
                        dotColor = `rgba(${r}, ${g}, ${b}, 0.16)`;
                        dotBorderColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
                      }
                      
                      return (
                        <div
                          key={idx}
                          className={`rounded-full transition-all ${
                            isHighlighted
                              ? "w-2 h-2"
                              : "w-1.5 h-1.5"
                          }`}
                          style={{
                            backgroundColor: dotColor,
                            border: `1px solid ${dotBorderColor}`,
                            opacity: isHighlighted ? 1 : 0.6,
                            transition: "opacity 150ms ease-out",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => {
                            if (typeof window !== "undefined" && e.currentTarget) {
                              e.currentTarget.style.opacity = "1";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (typeof window !== "undefined" && e.currentTarget) {
                              e.currentTarget.style.opacity = isHighlighted ? "1" : "0.6";
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                  <p 
                    className="text-xs timeline-meta" 
                    style={{ 
                      color: "var(--signal-neutral)",
                      fontSize: "14px",
                      paddingRight: "10px",
                    }}
                  >
                    {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                  </p>
                </div>
              </div>

              {/* Section Divider */}
              <div 
                className="section-divider"
                style={{ 
                  borderTop: "1px solid var(--border-subtle)",
                  margin: "18px 0",
                }}
              />

              {/* Recommendation - Premium Callout */}
              <div>
                <p 
                  className="font-semibold uppercase mb-3" 
                  style={{ 
                    color: "var(--signal-neutral)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    marginBottom: "12px",
                  }}
                >
                  RECOMMENDATION
                </p>
                <div
                  className="recommendation-callout relative"
                  style={{
                    background: `var(--accent-soft)`,
                    border: `1px solid var(--border-subtle)`,
                    borderRadius: "16px",
                    padding: "16px 18px",
                  }}
                >
                  {/* Left accent rule */}
                  <div
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "12px",
                      bottom: "12px",
                      width: "3px",
                      borderRadius: "2px",
                      background: `var(--accent-primary)`,
                      opacity: 0.8,
                    }}
                  />
                  <p
                    className="leading-relaxed"
                    style={{
                      color: `rgb(var(--text-1))`,
                      fontSize: "16px",
                      lineHeight: 1.6,
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {outcomeData[selectedOutcome]?.alert.recommendation || outcomeData["inflammation"].alert.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer - Inline Footnote */}
              <div 
                className="disclaimer"
                style={{
                  marginTop: "18px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-subtle)",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  color: "var(--text-muted)",
                }}
              >
                <p 
                  className="leading-relaxed" 
                  style={{ 
                    color: "var(--text-muted)",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {outcomeData[selectedOutcome]?.trustLine || outcomeData["inflammation"].trustLine}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
      </Section>

      {/* Section 3: How people actually use Arc */}
      <Section id="how-it-works" variant="default">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="h2-unified mb-4">
              How people actually use Arc
            </h2>
            <p className="body-unified text-lg text-center">
              Not all at once. Not automatically. At your own pace.
            </p>
          </div>

          {/* Four Step Cards - Narrative Journey */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 step-row"
            onMouseLeave={(e) => {
              // Reset all cards when leaving row
              if (typeof window !== "undefined") {
                const cards = e.currentTarget.querySelectorAll('.step-card');
                cards.forEach((card) => {
                  const htmlCard = card as HTMLElement;
                  htmlCard.style.opacity = "1";
                });
                // Reset practice panel
                const panel = document.querySelector('[data-practice-panel]') as HTMLElement;
                if (panel) {
                  panel.style.borderColor = `var(--border-subtle)`;
                  const label = panel.querySelector('[data-practice-label]') as HTMLElement;
                  if (label) {
                    label.style.color = `var(--text-muted)`;
                  }
                }
              }
            }}
          >
            {[
              {
                id: "step1" as UsageStepId,
                stepNumber: 1,
                title: "Bring your medical history into one place",
                body: "Upload documents lab results scans and records from different providers into a single private timeline.",
                note: "Nothing is analyzed before your history is complete.",
              },
              {
                id: "step2" as UsageStepId,
                stepNumber: 2,
                title: "See patterns across time not isolated results",
                body: "Arc organizes your history and highlights change that only appears when results are viewed together.",
                note: "Based on medical knowledge and clinical guidance not automated diagnosis.",
              },
              {
                id: "step3" as UsageStepId,
                stepNumber: 3,
                title: "Add health improvement plans when you are ready",
                body: "Explore evidence based programs built from trusted medical guidance not trends.",
                note: "Plans are optional transparent and always adjustable.",
              },
              {
                id: "step4" as UsageStepId,
                stepNumber: 4,
                title: "Test and refine your own health blueprints",
                body: "Track what works for you by observing real changes over time and adjusting your approach.",
                note: "You stay in control of what you follow and what you discard.",
              },
            ].map((step, index) => {
              const isActive = selectedStep === step.id;
              // Sequential narrative emphasis: Step 1 = stable, Step 2 = slight emphasis, Step 3 = active focal, Step 4 = soft anticipation
              const stepState = index === 0 ? "stable" : index === 1 ? "emphasis" : index === 2 ? "active" : "anticipation";
              
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedStep(step.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedStep(step.id);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: index * 0.1 }}
                  className="text-left border relative focus:outline-none step-card"
                  data-step={stepState}
                  data-active={isActive ? "true" : "false"}
                  style={{
                    backgroundColor: `var(--surface-card)`,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: `var(--border-subtle)`,
                    borderRadius: "var(--radius-xl)",
                    padding: "26px",
                    boxShadow: isActive
                      ? `0 18px 60px rgba(14,26,24,0.10), 0 0 0 6px var(--accent-soft)`
                      : "none",
                    transition: "all 160ms ease-out",
                    opacity: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      // Activate this card with focus halo
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 18px 60px rgba(14,26,24,0.10), 0 0 0 6px var(--accent-soft)`;
                      
                      // Activate step chip
                      const chip = e.currentTarget.querySelector('.step-chip') as HTMLElement;
                      if (chip) {
                        chip.style.backgroundColor = `var(--accent-soft)`;
                        chip.style.borderColor = `rgba(77,174,158,0.30)`;
                        chip.style.color = `var(--accent-strong)`;
                      }
                      
                      // Emphasize title
                      const title = e.currentTarget.querySelector('.step-title') as HTMLElement;
                      if (title) {
                        title.style.color = `rgb(var(--text-1))`;
                      }
                      
                      // Soften siblings
                      const row = e.currentTarget.closest('.step-row');
                      if (row) {
                        const siblings = row.querySelectorAll('.step-card');
                        siblings.forEach((sibling) => {
                          if (sibling !== e.currentTarget) {
                            const htmlSibling = sibling as HTMLElement;
                            htmlSibling.style.opacity = "0.65";
                          }
                        });
                      } else {
                        // Fallback: find all step cards in parent
                        const allCards = document.querySelectorAll('.step-card');
                        allCards.forEach((card) => {
                          if (card !== e.currentTarget) {
                            const htmlCard = card as HTMLElement;
                            htmlCard.style.opacity = "0.65";
                          }
                        });
                      }
                      
                      // Activate practice panel (keep calm, no green)
                      const panel = document.querySelector('[data-practice-panel]') as HTMLElement;
                      if (panel) {
                        const label = panel.querySelector('[data-practice-label]') as HTMLElement;
                        if (label) {
                          label.style.color = `rgb(var(--text-1))`;
                        }
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      // Reset this card
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      
                      // Reset step chip
                      const chip = e.currentTarget.querySelector('.step-chip') as HTMLElement;
                      if (chip && !isActive) {
                        chip.style.backgroundColor = `var(--surface-raised)`;
                        chip.style.borderColor = `var(--border-subtle)`;
                        chip.style.color = `var(--text-muted)`;
                      }
                    }
                  }}
                  onFocus={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "2px solid var(--accent-soft)";
                      e.currentTarget.style.outlineOffset = "2px";
                    }
                  }}
                  onBlur={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "none";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  {/* Step Number Chip - Carries Active Signal */}
                  <div 
                    className="step-chip-container"
                    style={{ 
                      marginBottom: "16px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="step-chip transition-all"
                      style={{
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive
                          ? `var(--accent-soft)`
                          : `var(--surface-raised)`,
                        color: isActive
                          ? `var(--accent-strong)`
                          : `var(--text-muted)`,
                        border: `1px solid ${isActive ? `rgba(77,174,158,0.30)` : `var(--border-subtle)`}`,
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "1",
                        transition: "all 160ms ease-out",
                      }}
                    >
                      {step.stepNumber}
                    </div>
                  </div>
                  
                  {/* Title - Active Emphasis */}
                  <h3 
                    className="font-semibold step-title"
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      color: isActive
                        ? `rgb(var(--text-1))`
                        : `rgb(var(--text-1))`,
                      fontWeight: 600,
                      marginBottom: "12px",
                      transition: "color 160ms ease-out",
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  {/* Body */}
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      marginBottom: "12px",
                    }}
                  >
                    {step.body}
                  </p>
                  
                  {/* Microcopy */}
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      marginBottom: "0",
                    }}
                  >
                    {step.note}
                  </p>
                  
                  {/* Subtle Gradient Fade to Next Step */}
                  {index < 3 && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        right: "-12px",
                        top: "20%",
                        bottom: "20%",
                        width: "24px",
                        background: `linear-gradient(to right, rgba(0,0,0,0.04), transparent)`,
                        zIndex: 1,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Practice Panel - Single Premium Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="border practice-panel"
              data-practice-panel
              style={{
                backgroundColor: `var(--surface-raised)`,
                borderRadius: "var(--radius-xl)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `var(--border-subtle)`,
                padding: "28px 32px",
                transition: "all 180ms ease-out",
              }}
            >
              <p 
                className="font-semibold uppercase mb-4"
                data-practice-label
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: `var(--text-muted)`,
                  transition: "color 180ms ease-out",
                }}
              >
                WHAT THIS LOOKS LIKE IN PRACTICE
              </p>
              <div className="space-y-3">
                {(usageStepData[selectedStep]?.context || usageStepData["step1"].context).map(
                  (line, idx) => (
                    <p 
                      key={idx} 
                      className="leading-relaxed"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: `rgb(var(--text-1))`,
                      }}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Optional Divider */}
              <div 
                className="practice-divider"
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  margin: "18px 0",
                }}
              />

              {/* Practice Note - Soft Callout Band */}
              <div 
                className="practice-note"
                style={{
                  marginTop: "18px",
                  background: `rgba(14,26,24,0.03)`,
                  borderRadius: "16px",
                  padding: "14px 16px",
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                <p 
                  className="leading-relaxed"
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: `var(--text-muted)`,
                    margin: 0,
                  }}
                >
                  Arc does not automate decisions. It helps you see clearly so you can decide deliberately.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
      </Section>

      {/* Section 4: Marketplace section with early access advantage */}
      <Section variant="surface">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="h2-unified mb-4">
              From insight to real action
            </h2>
            <p className="body-unified text-lg text-center">
              When your data suggests attention may be needed, Arc connects you to trusted options with full context and no pressure.
            </p>
          </div>

          {/* Action Path Cards - Decision Support Flow */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 card-row"
            onMouseLeave={(e) => {
              // Reset all cards when leaving row
              if (typeof window !== "undefined") {
                const cards = e.currentTarget.querySelectorAll('.action-card');
                cards.forEach((card) => {
                  const htmlCard = card as HTMLElement;
                  htmlCard.style.opacity = "1";
                });
              }
            }}
          >
            {[
              {
                id: "diagnostics" as ActionPathId,
                title: "Diagnostics and testing",
                body: "Vetted testing options with preparation guidance pricing and clear follow up context.",
                example: {
                  title: "LDL trending up across 3 tests",
                  signals: [
                    { label: "LDL Cholesterol", trend: "up" as const },
                  ],
                  suggestedAction: "Lipid panel follow-up suggested",
                },
                actionType: "diagnostics" as const,
              },
              {
                id: "specialists" as ActionPathId,
                title: "Medical specialists",
                body: "Clinicians focused on prevention and early stage intervention when expert input helps.",
                example: {
                  title: "Sleep + HRV + fatigue trend",
                  signals: [
                    { label: "Sleep efficiency", trend: "down" as const },
                    { label: "Resting HR", trend: "up" as const },
                    { label: "Recovery variability", trend: "up" as const },
                  ],
                  suggestedAction: "Optional consult: Sleep medicine",
                },
                actionType: "specialists" as const,
              },
              {
                id: "services" as ActionPathId,
                title: "Health services",
                body: "Programs and services aligned with evidence based medical practices.",
                example: {
                  title: "Low Vitamin D + fatigue",
                  signals: [
                    { label: "Vitamin D", trend: "down" as const },
                    { label: "Reported fatigue", trend: "stable" as const },
                  ],
                  suggestedAction: "Vitamin D repletion protocol available",
                },
                actionType: "services" as const,
              },
            ].map((card, index) => {
              const isActive = selectedActionPath === card.id;
              // Decision flow semantics: subtle indicator colors
              const indicatorColor = 
                card.actionType === "diagnostics" ? `var(--signal-monitor)` :
                card.actionType === "specialists" ? `var(--accent-primary)` :
                `var(--signal-clear)`;
              
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedActionPath(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedActionPath(card.id);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: index * 0.1 }}
                  className="text-left border relative transition-all focus:outline-none action-card"
                  data-state={isActive ? "active" : "idle"}
                  data-active={isActive ? "true" : "false"}
                  data-type={card.actionType}
                  style={{
                    backgroundColor: `var(--surface-card)`,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: `var(--border-subtle)`,
                    borderRadius: "var(--radius-xl)",
                    padding: "26px",
                    boxShadow: isActive
                      ? `0 18px 60px rgba(14,26,24,0.10), 0 0 0 6px var(--accent-soft)`
                      : "none",
                    transition: "all 160ms ease-out",
                    opacity: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      // Activate this card with focus halo
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 18px 60px rgba(14,26,24,0.10), 0 0 0 6px var(--accent-soft)`;
                      
                      // Soften siblings
                      const row = e.currentTarget.closest('.card-row');
                      if (row) {
                        const siblings = row.querySelectorAll('.action-card');
                        siblings.forEach((sibling) => {
                          if (sibling !== e.currentTarget) {
                            const htmlSibling = sibling as HTMLElement;
                            htmlSibling.style.opacity = "0.65";
                          }
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      // Reset this card
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isActive
                        ? `0 18px 60px rgba(14,26,24,0.10), 0 0 0 6px var(--accent-soft)`
                        : "none";
                    }
                  }}
                  onFocus={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "2px solid var(--accent-soft)";
                      e.currentTarget.style.outlineOffset = "2px";
                    }
                  }}
                  onBlur={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget) {
                      e.currentTarget.style.outline = "none";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  {/* Subtle Left Indicator - Decision Flow Semantics */}
                  <div
                    className="absolute left-0"
                    style={{
                      top: "24px",
                      bottom: "24px",
                      width: "3px",
                      borderRadius: "2px",
                      background: indicatorColor,
                      opacity: 0.3,
                      transition: "opacity 160ms ease-out",
                    }}
                  />
                  
                  {/* Title */}
                  <h3 
                    className="font-semibold leading-tight"
                    style={{
                      fontSize: "24px",
                      lineHeight: 1.25,
                      color: `rgb(var(--text-1))`,
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    {card.title}
                  </h3>
                  
                  {/* Body */}
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      marginBottom: "14px",
                    }}
                  >
                    {card.body}
                  </p>
                  
                  {/* Example from timeline */}
                  {card.example && (
                    <div className="group">
                      <MarketingSignalExampleMini
                        title={card.example.title}
                        signals={card.example.signals}
                        suggestedAction={card.example.suggestedAction}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            // Open demo with example preset
                            const exampleMap: Record<string, string> = {
                              diagnostics: "lipid_trend",
                              specialists: "sleep_trend",
                              services: "vitamin_d",
                            };
                            const example = exampleMap[card.id];
                            if (example) {
                              window.open(`/demo/command-center?example=${example}`, "_blank");
                            }
                          }
                        }}
                      />
                      {/* What Changed - Footnote Style */}
                      <div
                        className="what-changed mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          marginTop: "14px",
                          color: "var(--text-muted)",
                          fontSize: "14px",
                          lineHeight: 1.5,
                        }}
                      >
                        <p 
                          className="label mb-1" 
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                            marginBottom: "4px",
                          }}
                        >
                          What changed:
                        </p>
                        <p 
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "14px",
                            lineHeight: 1.5,
                            margin: 0,
                          }}
                        >
                          {card.id === "diagnostics" && "LDL increased 14% over 18 months"}
                          {card.id === "specialists" && "Sleep efficiency declined 12% over 3 months"}
                          {card.id === "services" && "Vitamin D levels below optimal range"}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Practice Panel - Single Premium Container */}
          <AnimatePresence mode="wait">
            <ClinicalSummaryPanel
              key={selectedActionPath}
              actionPathData={actionPathData[selectedActionPath] || actionPathData["diagnostics"]}
              prefersReducedMotion={prefersReducedMotion}
            />
          </AnimatePresence>

          {/* CTA - Critical Button Visibility Fix */}
          <div className="text-center" style={{ marginTop: "32px" }}>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/contact";
                }
              }}
              className="primary-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium tracking-tight transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: `var(--accent-primary)`,
                color: `white`,
                border: "none",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow: `0 10px 30px rgba(0,0,0,0.12)`,
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.backgroundColor = `var(--accent-strong)`;
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.backgroundColor = `var(--accent-primary)`;
                }
              }}
              onFocus={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.outline = "2px solid var(--accent-soft)";
                  e.currentTarget.style.outlineOffset = "2px";
                }
              }}
              onBlur={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.outline = "none";
                }
              }}
            >
              Request early access
            </button>
            <p 
              className="leading-relaxed"
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--text-muted)",
                marginTop: "16px",
              }}
            >
              Arc connects you to care. It never pushes decisions.
            </p>
          </div>
      </Section>

      {/* Section 5: Web platform and mobile app section */}
      <Section variant="surface2">
          {/* CTA Above Section - Tertiary Link */}
          <div className="text-center mb-10">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  // Scroll to hero demo section
                  const heroSection = document.querySelector('section[id="home.hero"]') || 
                                     document.querySelector('[id*="hero"]') ||
                                     document.querySelector('section:first-of-type');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }
              }}
              className="text-sm font-medium transition-all inline-flex items-center gap-1"
              style={{
                color: `rgb(var(--accent-primary))`,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = `rgb(var(--accent-strong))`;
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.textDecorationColor = `rgba(110,211,194,0.4)`;
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = `rgb(var(--accent-primary))`;
                  e.currentTarget.style.textDecoration = "none";
                }
              }}
            >
              See how this looks in a real example →
            </button>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="h2-unified mb-4">
              Your health, visible where you need it
            </h2>
            <p className="body-unified text-lg text-center">
              Use the web platform for deep review and the mobile app for only what matters in the moment.
            </p>
          </div>

          {/* Platform Cards - Interactive Demo Row */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 demo-row device-grid"
            onMouseLeave={(e) => {
              // Reset all frames and cards when leaving row
              if (typeof window !== "undefined") {
                const frames = e.currentTarget.querySelectorAll('.demo-frame');
                frames.forEach((frame) => {
                  const htmlFrame = frame as HTMLElement;
                  htmlFrame.style.opacity = "0.9";
                  htmlFrame.style.filter = "saturate(1)";
                  htmlFrame.style.transform = "translateY(0)";
                  htmlFrame.style.boxShadow = "0 18px 60px rgba(14,26,24,0.10)";
                  htmlFrame.style.outline = "none";
                });
                const cards = e.currentTarget.querySelectorAll('.device-card');
                cards.forEach((card) => {
                  const htmlCard = card as HTMLElement;
                  htmlCard.style.opacity = "1";
                  htmlCard.style.transform = "translateY(0)";
                  htmlCard.style.borderColor = `var(--border-subtle)`;
                  htmlCard.style.boxShadow = "0 18px 60px rgba(14,26,24,0.06)";
                });
              }
            }}
          >
            {/* Web Platform Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="p-6 md:p-8 rounded-[20px] border device-card"
              style={{
                backgroundColor: `var(--surface-card)`,
                borderRadius: "var(--radius-xl)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `var(--border-subtle)`,
                boxShadow: "0 18px 60px rgba(14,26,24,0.06)",
                transition: "all 180ms ease-out",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "rgba(77,174,158,0.22)";
                  e.currentTarget.style.boxShadow = "0 24px 80px rgba(14,26,24,0.10)";
                  // Soften siblings
                  const grid = e.currentTarget.closest('.device-grid');
                  if (grid) {
                    const siblings = grid.querySelectorAll('.device-card');
                    siblings.forEach((sibling) => {
                      if (sibling !== e.currentTarget) {
                        const htmlSibling = sibling as HTMLElement;
                        htmlSibling.style.opacity = "0.7";
                      }
                    });
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = `var(--border-subtle)`;
                  e.currentTarget.style.boxShadow = "0 18px 60px rgba(14,26,24,0.06)";
                }
              }}
            >
              <h3 
                className="font-semibold"
                style={{
                  fontSize: "24px",
                  color: `rgb(var(--text-1))`,
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                Web platform
              </h3>
              <div className="mb-5" style={{ marginBottom: "20px" }}>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  Review your documents and history in one living timeline
                </div>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  See trends across months and years
                </div>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  Export and share context when needed
                </div>
              </div>
              
              {/* Device Preview - Interactive */}
              <div
                style={{ marginTop: "18px" }}
                onMouseEnter={(e) => {
                  if (typeof window !== "undefined") {
                    const frame = e.currentTarget.querySelector('.demo-frame') as HTMLElement;
                    if (frame) {
                      frame.style.opacity = "1";
                      frame.style.transform = "translateY(-2px)";
                      frame.style.boxShadow = "0 24px 80px rgba(14,26,24,0.10)";
                      frame.style.outline = "none";
                      // Highlight Timeline tab
                      const timelineTab = frame.querySelector('[data-tab="timeline"]') as HTMLElement;
                      if (timelineTab) {
                        timelineTab.style.backgroundColor = "rgba(110,211,194,0.12)";
                        timelineTab.style.borderColor = "rgba(110,211,194,0.30)";
                      }
                    }
                    // Soften other frame
                    const row = e.currentTarget.closest('.demo-row');
                    if (row) {
                      const otherFrames = row.querySelectorAll('.demo-frame');
                      otherFrames.forEach((otherFrame) => {
                        if (otherFrame !== frame) {
                          const htmlOtherFrame = otherFrame as HTMLElement;
                          htmlOtherFrame.style.opacity = "0.55";
                          htmlOtherFrame.style.filter = "saturate(0.9)";
                        }
                      });
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (typeof window !== "undefined") {
                    const frame = e.currentTarget.querySelector('.demo-frame') as HTMLElement;
                    if (frame) {
                      frame.style.opacity = "0.9";
                      frame.style.transform = "translateY(0)";
                      frame.style.boxShadow = "0 18px 60px rgba(14,26,24,0.10)";
                      frame.style.outline = "none";
                      // Reset Timeline tab
                      const timelineTab = frame.querySelector('[data-tab="timeline"]') as HTMLElement;
                      if (timelineTab) {
                        timelineTab.style.backgroundColor = "rgba(255,255,255,0.06)";
                        timelineTab.style.borderColor = "rgba(110,211,194,0.25)";
                      }
                    }
                  }
                }}
              >
                <WebDashboardPreview
                  caption="Reviewing 3 years of labs + wearables to see long-term pattern."
                />
              </div>
              
              <p 
                className="example-caption"
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  color: "var(--text-muted)",
                }}
              >
                For understanding your full health story.
              </p>
            </motion.div>

            {/* Mobile App Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-[20px] border device-card"
              style={{
                backgroundColor: `var(--surface-card)`,
                borderRadius: "var(--radius-xl)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `var(--border-subtle)`,
                boxShadow: "0 18px 60px rgba(14,26,24,0.06)",
                transition: "all 180ms ease-out",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "rgba(77,174,158,0.22)";
                  e.currentTarget.style.boxShadow = "0 24px 80px rgba(14,26,24,0.10)";
                  // Soften siblings
                  const grid = e.currentTarget.closest('.device-grid');
                  if (grid) {
                    const siblings = grid.querySelectorAll('.device-card');
                    siblings.forEach((sibling) => {
                      if (sibling !== e.currentTarget) {
                        const htmlSibling = sibling as HTMLElement;
                        htmlSibling.style.opacity = "0.7";
                      }
                    });
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = `var(--border-subtle)`;
                  e.currentTarget.style.boxShadow = "0 18px 60px rgba(14,26,24,0.06)";
                }
              }}
            >
              <h3 
                className="font-semibold"
                style={{
                  fontSize: "24px",
                  color: `rgb(var(--text-1))`,
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                Mobile app
              </h3>
              <div className="mb-5" style={{ marginBottom: "20px" }}>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  See only the most important trends
                </div>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  Receive notifications only when attention is needed
                </div>
                <div 
                  className="feature-item"
                  style={{
                    position: "relative",
                    paddingLeft: "14px",
                    margin: "10px 0",
                    color: `rgb(var(--text-1))`,
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="feature-indicator"
                    style={{
                      content: "",
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "2px",
                      borderRadius: "2px",
                      background: `var(--border-subtle)`,
                    }}
                  />
                  Capture and upload records instantly
                </div>
              </div>
              
              {/* Device Preview - Interactive */}
              <div
                style={{ marginTop: "18px" }}
                onMouseEnter={(e) => {
                  if (typeof window !== "undefined") {
                    const frame = e.currentTarget.querySelector('.demo-frame') as HTMLElement;
                    if (frame) {
                      frame.style.opacity = "1";
                      frame.style.transform = "translateY(-2px)";
                      frame.style.boxShadow = "0 24px 80px rgba(14,26,24,0.10)";
                      frame.style.outline = "none";
                      // Pulse signal card
                      const signalCard = frame.querySelector('[data-signal-card]') as HTMLElement;
                      if (signalCard) {
                        signalCard.style.animation = "pulse 0.6s ease-out";
                      }
                    }
                    // Soften other frame
                    const row = e.currentTarget.closest('.demo-row');
                    if (row) {
                      const otherFrames = row.querySelectorAll('.demo-frame');
                      otherFrames.forEach((otherFrame) => {
                        if (otherFrame !== frame) {
                          const htmlOtherFrame = otherFrame as HTMLElement;
                          htmlOtherFrame.style.opacity = "0.55";
                          htmlOtherFrame.style.filter = "saturate(0.9)";
                        }
                      });
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (typeof window !== "undefined") {
                    const frame = e.currentTarget.querySelector('.demo-frame') as HTMLElement;
                    if (frame) {
                      frame.style.opacity = "0.9";
                      frame.style.transform = "translateY(0)";
                      frame.style.boxShadow = "0 18px 60px rgba(14,26,24,0.10)";
                      frame.style.outline = "none";
                    }
                  }
                }}
              >
                <MobileViewPreview
                  caption='Sleep trend worsening — review in web dashboard when ready.'
                />
              </div>
              
              <p 
                className="example-caption"
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  color: "var(--text-muted)",
                }}
              >
                For knowing when something actually needs attention.
              </p>
            </motion.div>
          </div>

          {/* Reassurance Line - Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="trust-footnote text-center"
            style={{
              marginTop: "18px",
              padding: "12px 14px",
              borderRadius: "14px",
              background: "rgba(77,174,158,0.08)",
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            No constant alerts. You are notified only when attention is actually needed.
          </motion.div>
      </Section>

      {/* Section 5.5: Day in the life story section */}
      <DayInLifeSection />

      {/* Section 5.6: Optional deep dive section */}
      <OptionalDeepDiveSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 6: Pricing section */}
      <PricingSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 7: Final CTA section */}
      <Section variant="default">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="h2-unified">
            See what your records have been trying to tell you
          </h2>
          <p className="body-unified text-lg text-center">
            Early access gives you a head start on visibility, coordination, and action.
          </p>
          <div className="pt-4">
            <ArcButton href="/contact">Request early access</ArcButton>
          </div>
          <p className="text-xs pt-4" style={{ color: `rgb(var(--text-3))` }}>
            You own your data. Always.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}

