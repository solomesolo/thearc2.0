"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/Container";
import Button from "../../components/ui/Button";
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
      accent: "#F59E0B", // Amber
      border: "rgba(245, 158, 11, 0.4)",
      shadow: "rgba(245, 158, 11, 0.12)",
      dot: "#F59E0B",
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section 1: Hero with FOMO promise */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center py-12 md:py-16">
        {/* Subtle background depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-30" 
            style={{ 
              background: 'radial-gradient(circle at 50% 30%, rgba(77, 238, 205, 0.03) 0%, transparent 70%)' 
            }}
          ></div>
        </div>
        
        <Container>
          <div className="max-w-[740px] mx-auto text-center space-y-8 md:space-y-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                YOUR ARC
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.1 }}
              className="typography-h1"
            >
              Your medical data is already shaping your future health.
              <br />
              You just can't see it yet.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.2 }}
              className="typography-body max-w-2xl mx-auto"
            >
              Arc brings your medical records into one living timeline so you can spot meaningful change early and decide what to do next.
            </motion.p>

            {/* Early access advantage strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#4DEECD]/10 to-[#4DEECD]/5 border border-[#4DEECD]/30 backdrop-blur-sm"
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-[#4DEECD] ${prefersReducedMotion ? '' : 'animate-pulse'}`}></div>
              <p className="text-sm text-white font-medium">
                Early access includes priority onboarding and locked-in discounts on trusted medical services.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4DEECD] text-black text-base font-semibold hover:bg-[#4DEECD]/90 transition-all inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[0_0_20px_rgba(77,238,205,0.2)]"
                >
                  Request early access
                </Link>
                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  See how it works
                </Link>
              </div>
              <p className="text-xs text-gray-400">
                Takes less than 2 minutes
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section 2: Realistic outcomes section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">
              EARLY VISIBILITY
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              What early visibility actually looks like
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
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
                  className={`text-left p-5 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive ? "" : "border-white/6 hover:border-white/15"
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: colorTheme.border,
                          boxShadow: `0 0 20px ${colorTheme.shadow}`,
                        }
                      : {}
                  }
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colorTheme.accent }}
                      ></div>
                    )}
                  </div>
                  <p
                    className="text-sm mb-2.5 font-medium"
                    style={{ color: isActive ? colorTheme.accent : "#4DEECD" }}
                  >
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{card.timeLabel}</p>
                  {card.supporting && (
                    <p className="text-xs text-gray-500 mb-3">{card.supporting}</p>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOutcome(cardId);
                    }}
                    className="text-xs font-medium inline-flex items-center gap-1 transition-colors"
                    style={{ color: isActive ? colorTheme.accent : "#4DEECD" }}
                  >
                    View example
                    <span aria-hidden="true">→</span>
                  </button>
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
              className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border p-6 md:p-8"
              style={{
                borderColor: outcomeData[selectedOutcome]?.colorTheme.border || "rgba(255, 255, 255, 0.1)",
              }}
            >
            <div className="space-y-5">
              {/* Alert Content */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                  Example signal
                </p>
                <h4
                  className="text-xl font-semibold"
                  style={{
                    color: outcomeData[selectedOutcome]?.colorTheme.accent || "#FFFFFF",
                  }}
                >
                  {outcomeData[selectedOutcome]?.alert.headline || outcomeData["inflammation"].alert.headline}
                </h4>
                <p className="text-xs text-gray-400">
                  Timeline: {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                </p>
                <div className="space-y-2.5">
                  {(outcomeData[selectedOutcome]?.alert.details || outcomeData["inflammation"].alert.details).map(
                    (detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{
                            backgroundColor: outcomeData[selectedOutcome]?.colorTheme.dot || "#4DEECD",
                          }}
                        ></div>
                        <p className="text-sm text-gray-300 leading-relaxed">{detail}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="pt-4 border-t border-white/5">
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
                              ? outcomeData[selectedOutcome]?.colorTheme.accent || "#4DEECD"
                              : "rgba(255, 255, 255, 0.2)",
                            opacity: isHighlighted ? 1 : 0.4,
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400">
                    {outcomeData[selectedOutcome]?.alert.timeline || outcomeData["inflammation"].alert.timeline}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Recommendation
                </p>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{
                    color: outcomeData[selectedOutcome]?.colorTheme.accent || "#4DEECD",
                  }}
                >
                  {outcomeData[selectedOutcome]?.alert.recommendation || outcomeData["inflammation"].alert.recommendation}
                </p>
              </div>
            </div>

            {/* Trust Line */}
            <div className="pt-6 mt-6 border-t border-white/5">
              <p className="text-xs text-gray-400 leading-relaxed">
                {outcomeData[selectedOutcome]?.trustLine || outcomeData["inflammation"].trustLine}
              </p>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Section 3: How people actually use Arc */}
      <section id="how-it-works" className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              How people actually use Arc
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
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
                  className={`text-left p-5 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive
                      ? "border-[#4DEECD]/40 shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                      : "border-white/6 hover:border-white/15"
                  }`}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#4DEECD] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {step.stepNumber}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2.5 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{step.body}</p>
                  <p className="text-xs text-gray-400">{step.note}</p>
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
              className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-6 md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">
                What this looks like in practice
              </p>
              <div className="space-y-2.5">
                {(usageStepData[selectedStep]?.context || usageStepData["step1"].context).map(
                  (line, idx) => (
                    <p key={idx} className="text-sm text-gray-300 leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Trust Line */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-xs text-gray-400 leading-relaxed">
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
              },
              {
                id: "specialists" as ActionPathId,
                title: "Medical specialists",
                body: "Clinicians focused on prevention and early stage intervention when expert input helps.",
              },
              {
                id: "services" as ActionPathId,
                title: "Health services",
                body: "Programs and services aligned with evidence based medical practices.",
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
                  className={`text-left p-5 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive
                      ? "border-[#4DEECD]/40 shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                      : "border-white/6 hover:border-white/15"
                  }`}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <h3 className="text-base font-semibold text-white mb-2.5 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{card.body}</p>
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
              className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-6 md:p-8 mb-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">
                How this works in practice
              </p>
              <div className="space-y-2.5">
                {(actionPathData[selectedActionPath]?.context || actionPathData["diagnostics"].context).map(
                  (line, idx) => (
                    <p key={idx} className="text-sm text-gray-300 leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Early Access Strip - Integrated */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Early access users receive priority access and locked in discounts on selected services.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button variant="primary" href="/contact">Request early access</Button>
            <p className="text-xs text-gray-400 leading-relaxed">
              Arc connects you to care. It never pushes decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Web platform and mobile app section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Your health, visible where you need it
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
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
              className="p-6 md:p-8 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6"
            >
              <h3 className="text-lg font-semibold text-white mb-5">Web platform</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Review your documents and history in one living timeline
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    See trends across months and years
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Export and share context when needed
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 pt-4 border-t border-white/5">
                Built for clarity, not speed
              </p>
            </motion.div>

            {/* Mobile App Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6"
            >
              <h3 className="text-lg font-semibold text-white mb-5">Mobile app</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    See only the most important trends
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Receive notifications only when attention is needed
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Capture and upload records instantly
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 pt-4 border-t border-white/5">
                Built for presence, not distraction
              </p>
            </motion.div>
          </div>

          {/* Reassurance Line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="text-center text-sm text-gray-400 leading-relaxed"
          >
            No constant alerts. You are notified only when attention is actually needed.
          </motion.p>
        </div>
      </section>

      {/* Section 6: What this is not section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              What Arc is and is not
            </h2>
          </div>

          {/* Definition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Right Card: What this is (appears first on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="p-6 md:p-8 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 order-1 md:order-2"
            >
              <h3 className="text-lg font-semibold text-white mb-5">What this is</h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc is a system built on medical knowledge and evidence
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc organizes your records into a living timeline
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc highlights meaningful change without noise
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc supports better conversations with medical professionals
                </p>
              </div>
              <p className="text-xs text-gray-400 pt-4 border-t border-white/5">
                Designed to support judgment, not override it
              </p>
            </motion.div>

            {/* Left Card: What this is not */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 order-2 md:order-1"
            >
              <h3 className="text-lg font-semibold text-white mb-5">What this is not</h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc is not an AI diagnostic system
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc does not replace doctors
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc does not make medical decisions for you
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Arc does not sell or monetize your data
                </p>
              </div>
              <p className="text-xs text-gray-400 pt-4 border-t border-white/5">
                Boundaries are intentional
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
              <Button variant="primary" href="/contact">Request early access</Button>
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

