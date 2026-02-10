"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/Container";
import { ArcButton } from "../../components/ui/ArcButton";
import { HeroContinuityCardMini } from "../../components/hero/HeroContinuityCardMini";
import { DemoEmbedCard } from "../../components/hero/DemoEmbedCard";
import MarketingSignalExampleMini from "../../components/marketing/MarketingSignalExampleMini";
import TimelineMiniStrip from "../../components/marketing/TimelineMiniStrip";
import DevicePreviewMini from "../../components/marketing/DevicePreviewMini";
import DayInLifeSection from "../../components/marketing/DayInLifeSection";
import OptionalDeepDiveSection from "../../components/optional/OptionalDeepDiveSection";
import PricingSection from "../../components/pricing/PricingSection";
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
      "A change in your timeline suggests additional clarity may help.",
      "Arc shows relevant testing options with preparation notes expected costs and how results would fit into your history.",
      "You decide whether and when to proceed.",
    ],
  },
  specialists: {
    context: [
      "If interpretation matters more than more data Arc highlights specialists experienced in early stage prevention.",
      "Your timeline provides shared context before any conversation begins.",
    ],
  },
  services: {
    context: [
      "When lifestyle or longitudinal support is appropriate Arc surfaces services tied to clinical guidance.",
      "Programs are transparent optional and easy to stop.",
    ],
  },
};

export default function YourArcPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeId>("inflammation");
  const [selectedStep, setSelectedStep] = useState<UsageStepId>("step1");
  const [selectedActionPath, setSelectedActionPath] = useState<ActionPathId>("diagnostics");

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
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Section 1: Hero v2 - Split Layout */}
      <section 
        className="relative"
            style={{ 
          minHeight: "clamp(600px, 85vh, 820px)",
          paddingTop: "clamp(48px, 8vh, 88px)",
          paddingBottom: "clamp(48px, 10vh, 96px)",
          backgroundColor: "var(--bg)",
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
                      color: "var(--text-muted)",
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
                  className="font-semibold"
                  style={{
                    fontSize: "clamp(38px, 5vw, 56px)",
                    fontWeight: 600,
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
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
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
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
                    color: "var(--text-muted)",
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
                      className="rounded-full px-[22px] h-12 flex items-center justify-center font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] w-full sm:w-auto"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "#071012",
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.backgroundColor = "var(--accent-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.backgroundColor = "var(--accent)";
                        }
                      }}
                    >
                      Start building your timeline
                    </button>
                    <button
                      onClick={handleSecondaryCTA}
                      className="rounded-full px-[22px] h-12 flex items-center justify-center font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] w-full sm:w-auto"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid var(--border-strong)",
                        color: "var(--text-primary)",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.borderColor = "var(--accent-muted)";
                          e.currentTarget.style.color = "var(--accent-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (typeof window !== "undefined" && e.currentTarget) {
                          e.currentTarget.style.borderColor = "var(--border-strong)";
                          e.currentTarget.style.color = "var(--text-primary)";
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
                      color: "var(--text-muted)",
                      marginTop: "12px",
                    }}
                  >
                Takes less than 2 minutes
              </p>
            </motion.div>
          </div>
            </div>

            {/* Right Column: Demo Embed (spans cols 6-12, 7 cols = ~55%) */}
            <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-center lg:justify-start order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.5 }}
                >
                  <DemoEmbedCard prefersReducedMotion={prefersReducedMotion} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Realistic outcomes section */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#060B0C" }}>
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-muted)" }}>
              EARLY VISIBILITY
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: "rgba(231,240,238,0.95)" }}>
              What early visibility actually looks like
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Not predictions. Not diagnoses. Just seeing what is hard to see when your records are scattered.
            </p>
          </div>

          {/* Outcome Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              const colorTheme = outcomeData[cardId].colorTheme;
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
                  className="text-left p-5 rounded-[20px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B0C]"
                  style={{
                    backgroundColor: "#0C1416",
                    borderColor: isActive ? colorTheme.border : "rgba(231,240,238,0.08)",
                    borderRadius: "20px",
                    boxShadow: isActive
                      ? `0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04), 0 0 20px ${colorTheme.shadow}`
                      : "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
                    transition: "all 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && !isActive && e.currentTarget) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "rgba(110,211,194,0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && !isActive && e.currentTarget) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(231,240,238,0.08)";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>{card.title}</h3>
                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colorTheme.accent }}
                      ></div>
                    )}
                  </div>
                  <p
                    className="text-sm mb-2.5 font-medium"
                    style={{ color: isActive ? colorTheme.accent : "var(--accent)" }}
                  >
                    {card.subtitle}
                  </p>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{card.timeLabel}</p>
                  {card.supporting && (
                    <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{card.supporting}</p>
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
                    className="text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                    style={{ 
                      color: isActive ? colorTheme.accent : "var(--accent)",
                    }}
                    onMouseEnter={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.color = "var(--accent-hover)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (typeof window !== "undefined" && e.currentTarget) {
                        e.currentTarget.style.color = isActive ? colorTheme.accent : "var(--accent)";
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
              className="rounded-[20px] border p-6 md:p-8 relative overflow-hidden"
              style={{
                backgroundColor: "#0C1416",
                borderColor: outcomeData[selectedOutcome]?.colorTheme.border || "rgba(231,240,238,0.08)",
                borderRadius: "20px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
              }}
            >
            {/* Subtle amber gradient overlay for inflammation card */}
            {selectedOutcome === "inflammation" && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, rgba(215,181,109,0.2) 0%, rgba(215,181,109,0.05) 100%)",
                  pointerEvents: "none",
                }}
              />
            )}
            <div className="space-y-5">
              {/* Alert Content */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                  Example signal
                </p>
                <h4
                  className="text-xl font-semibold"
                  style={{
                    color: selectedOutcome === "inflammation" 
                      ? "rgba(231,240,238,0.95)" 
                      : (outcomeData[selectedOutcome]?.colorTheme.accent || "var(--accent)"),
                  }}
                >
                  {outcomeData[selectedOutcome]?.alert.headline || outcomeData["inflammation"].alert.headline}
                </h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Timeline: {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                </p>
                <div className="space-y-2.5">
                  {(outcomeData[selectedOutcome]?.alert.details || outcomeData["inflammation"].alert.details).map(
                    (detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{
                            backgroundColor: selectedOutcome === "inflammation"
                              ? "#D7B56D" // amber muted for example signal
                              : "var(--accent-alpha-60)", // jade alpha for default
                          }}
                        ></div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(231,240,238,0.95)" }}>{detail}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="pt-4 border-t" style={{ borderColor: "rgba(231,240,238,0.08)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-1">
                    {Array.from({ length: outcomeData[selectedOutcome]?.timelineDots || 18 }).map((_, idx) => {
                      const totalDots = outcomeData[selectedOutcome]?.timelineDots || 18;
                      const highlightedCount = outcomeData[selectedOutcome]?.highlightedDots || 7;
                      const isHighlighted = idx >= totalDots - highlightedCount;
                      return (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            isHighlighted
                              ? "w-2"
                              : "w-1.5"
                          }`}
                          style={{
                            backgroundColor: isHighlighted
                              ? (selectedOutcome === "inflammation" 
                                  ? "#D7B56D" // amber muted for example signal
                                  : "var(--accent-alpha-60)") // jade alpha for default
                              : "rgba(255, 255, 255, 0.2)",
                            opacity: isHighlighted ? 1 : 0.4,
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="pt-4 border-t" style={{ borderColor: "rgba(231,240,238,0.08)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                  Recommendation
                </p>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{
                    color: selectedOutcome === "inflammation"
                      ? "#D7B56D" // amber muted for inflammation
                      : (outcomeData[selectedOutcome]?.colorTheme.accent || "var(--accent)"),
                  }}
                >
                  {outcomeData[selectedOutcome]?.alert.recommendation || outcomeData["inflammation"].alert.recommendation}
                </p>
              </div>
            </div>

            {/* Trust Line */}
              <div className="pt-6 mt-6 border-t" style={{ borderColor: "rgba(231,240,238,0.08)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {outcomeData[selectedOutcome]?.trustLine || outcomeData["inflammation"].trustLine}
              </p>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Section 3: How people actually use Arc */}
      <section 
        id="how-it-works" 
        className="py-16 md:py-20"
        style={{
          backgroundColor: "#060B0C",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{
                color: "var(--text-primary)",
                fontWeight: 500,
                letterSpacing: "-0.2px",
                marginBottom: "calc(1rem + 8px)",
              }}
            >
              How people actually use Arc
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Not all at once. Not automatically. At your own pace.
            </p>
          </div>

          {/* Four Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  className="text-left p-5 rounded-[20px] border relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B0C]"
                  style={{
                    backgroundColor: "#0C1416",
                    borderRadius: "20px",
                    borderColor: isActive 
                      ? "rgba(110,211,194,0.35)" 
                      : "rgba(231,240,238,0.08)",
                    boxShadow: isActive
                      ? "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)"
                      : "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(110,211,194,0.06) 0%, rgba(0,0,0,0) 70%), #0C1416"
                      : "#0C1416",
                    transition: "transform 180ms ease, border-color 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget && !isActive) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "rgba(110,211,194,0.22)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget && !isActive) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(231,240,238,0.08)";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  {/* Optional top accent line for active card */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "20px",
                        right: "20px",
                        height: "2px",
                        background: "rgba(110,211,194,0.45)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(110,211,194,0.18)"
                          : "rgba(231,240,238,0.10)",
                        color: isActive
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                        border: "1px solid rgba(231,240,238,0.12)",
                      }}
                    >
                      {step.stepNumber}
                    </div>
                  </div>
                  <h3 
                    className="text-base font-semibold leading-tight"
                    style={{
                      color: "rgba(231,240,238,0.95)",
                      fontWeight: 500,
                      marginBottom: "calc(0.625rem + 4px)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed mb-3"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.body}
                  </p>
                  <p 
                    className="text-xs"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    {step.note}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Context Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="rounded-[24px] border"
              style={{
                backgroundColor: "#0C1416",
                borderRadius: "24px",
                borderColor: "rgba(231,240,238,0.08)",
                padding: "28px 32px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
              }}
            >
              <p 
                className="text-xs font-semibold uppercase mb-4"
                style={{
                  color: "var(--text-muted)",
                  letterSpacing: "1.8px",
                }}
              >
                What this looks like in practice
              </p>
              <div className="space-y-2.5">
                {(usageStepData[selectedStep]?.context || usageStepData["step1"].context).map(
                  (line, idx) => (
                    <p 
                      key={idx} 
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Trust Line */}
              <div 
                className="pt-6 mt-6 border-t"
                style={{
                  borderColor: "rgba(231,240,238,0.06)",
                }}
              >
                <p 
                  className="text-xs leading-relaxed"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Arc does not automate decisions. It helps you see clearly so you can decide deliberately.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Section 4: Marketplace section with early access advantage */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              From insight to real action
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              When your data suggests attention may be needed, Arc connects you to trusted options with full context and no pressure.
            </p>
          </div>

          {/* Action Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              },
            ].map((card, index) => {
              const isActive = selectedActionPath === card.id;
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
                  className="text-left p-5 rounded-[20px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B0C]"
                  style={{
                    backgroundColor: "#0C1416",
                    borderRadius: "20px",
                    borderColor: isActive
                      ? "rgba(110,211,194,0.35)"
                      : "rgba(231,240,238,0.08)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
                    transition: "transform 180ms ease, border-color 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget && !isActive) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "rgba(110,211,194,0.22)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== "undefined" && e.currentTarget && !isActive) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(231,240,238,0.08)";
                    }
                  }}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <h3 
                    className="text-base font-semibold mb-2.5 leading-tight"
                    style={{
                      color: "rgba(231,240,238,0.95)",
                      fontWeight: 500,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
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
                      {/* Hover reveal: What changed */}
                      <div
                        className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        <p className="text-[10px] font-medium uppercase mb-1" style={{ letterSpacing: "0.8px" }}>
                          What changed:
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
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

          {/* Context Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedActionPath}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="rounded-[24px] border mb-6"
              style={{
                backgroundColor: "#0C1416",
                borderRadius: "24px",
                borderColor: "rgba(231,240,238,0.08)",
                padding: "28px 32px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
              }}
            >
              <p 
                className="text-xs font-semibold uppercase mb-4"
                style={{
                  color: "var(--text-muted)",
                  letterSpacing: "1.8px",
                }}
              >
                How this works in practice
              </p>
              <div className="space-y-2.5">
                {(actionPathData[selectedActionPath]?.context || actionPathData["diagnostics"].context).map(
                  (line, idx) => (
                    <p 
                      key={idx} 
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Timeline Mini Strip */}
              <TimelineMiniStrip />

              {/* Early Access Strip - Integrated */}
              <div 
                className="pt-6 mt-6 border-t"
                style={{
                  borderColor: "rgba(231,240,238,0.06)",
                }}
              >
                <p 
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Early access users receive priority access and locked in discounts on selected services.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="text-center space-y-4">
            <ArcButton href="/contact">Request early access</ArcButton>
            <p className="text-xs text-gray-400 leading-relaxed">
              Arc connects you to care. It never pushes decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Web platform and mobile app section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* CTA Above Section */}
          <div className="text-center mb-12">
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
              className="text-sm font-medium transition-colors inline-flex items-center gap-1"
              style={{
                color: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = "var(--accent-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== "undefined" && e.currentTarget) {
                  e.currentTarget.style.color = "var(--accent)";
                }
              }}
            >
              See how this looks in a real example →
            </button>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{
                color: "rgba(231,240,238,0.95)",
                fontWeight: 500,
                letterSpacing: "-0.2px",
              }}
            >
              Your health, visible where you need it
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Use the web platform for deep review and the mobile app for only what matters in the moment.
            </p>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Web Platform Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="p-6 md:p-8 rounded-[20px] border"
              style={{
                backgroundColor: "#0C1416",
                borderRadius: "20px",
                borderColor: "rgba(231,240,238,0.08)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
              }}
            >
              <h3 
                className="text-lg font-semibold mb-5"
                style={{
                  color: "rgba(231,240,238,0.95)",
                  fontWeight: 500,
                }}
              >
                Web platform
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Review your documents and history in one living timeline
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    See trends across months and years
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Export and share context when needed
                  </p>
                </div>
              </div>
              
              {/* Device Preview */}
              <DevicePreviewMini
                mode="web"
                caption="Example: Reviewing 3 years of labs + wearables to see long-term pattern."
              />
              
              <p 
                className="text-xs pt-4 border-t mt-6"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "rgba(231,240,238,0.06)",
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
              className="p-6 md:p-8 rounded-[20px] border"
              style={{
                backgroundColor: "#0C1416",
                borderRadius: "20px",
                borderColor: "rgba(231,240,238,0.08)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
              }}
            >
              <h3 
                className="text-lg font-semibold mb-5"
                style={{
                  color: "rgba(231,240,238,0.95)",
                  fontWeight: 500,
                }}
              >
                Mobile app
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    See only the most important trends
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Receive notifications only when attention is needed
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: "var(--accent-alpha-60)",
                    }}
                  />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Capture and upload records instantly
                  </p>
                </div>
              </div>
              
              {/* Device Preview */}
              <DevicePreviewMini
                mode="mobile"
                caption='Example: "Sleep trend worsening — review in web dashboard when ready."'
              />
              
              <p 
                className="text-xs pt-4 border-t mt-6"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "rgba(231,240,238,0.06)",
                }}
              >
                For knowing when something actually needs attention.
              </p>
            </motion.div>
          </div>

          {/* Reassurance Line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="text-center text-sm leading-relaxed"
            style={{
              color: "var(--text-muted)",
            }}
          >
            No constant alerts. You are notified only when attention is actually needed.
          </motion.p>
        </div>
      </section>

      {/* Section 5.5: Day in the life story section */}
      <DayInLifeSection />

      {/* Section 5.6: Optional deep dive section */}
      <OptionalDeepDiveSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 6: Pricing section */}
      <PricingSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 7: Final CTA section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              See what your records have been trying to tell you
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Early access gives you a head start on visibility, coordination, and action.
            </p>
            <div className="pt-4">
              <ArcButton href="/contact">Request early access</ArcButton>
            </div>
            <p className="text-xs text-gray-400 pt-4">
              You own your data. Always.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

