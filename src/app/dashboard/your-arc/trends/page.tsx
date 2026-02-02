"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

type SignalTier = "high-impact" | "future-proofing" | "avoid-bad-decisions" | "longevity";

interface Signal {
  id: string;
  tier: SignalTier;
  title: string;
  timeWindow: string;
  whatChanged: string;
  whyItMatters: string;
  nextStep: string;
  urgency: "informational" | "caution" | "urgent";
  color: string;
}

const signals: Signal[] = [
  // Tier 1: Indispensable alerts
  {
    id: "cardiovascular-risk",
    tier: "high-impact",
    title: "Cardiovascular risk escalation",
    timeWindow: "Last 12 months",
    whatChanged: "ApoB trend up, BP variability worsens, inflammation + lipids align poorly",
    whyItMatters: "Cardiovascular risk rising across multiple markers. Consider review within 90 days.",
    nextStep: "Consider review within 90 days",
    urgency: "caution",
    color: "#EF4444",
  },
  {
    id: "cancer-screening",
    tier: "high-impact",
    title: "Screening timing signal",
    timeWindow: "Based on data convergence",
    whatChanged: "Biomarker velocity, family history, labs, and age converge",
    whyItMatters: "Based on your data, now is the right time to screen or consult.",
    nextStep: "Schedule appropriate screening",
    urgency: "informational",
    color: "#F59E0B",
  },
  {
    id: "metabolic-syndrome",
    tier: "high-impact",
    title: "Early insulin resistance pattern",
    timeWindow: "Last 6 months",
    whatChanged: "HbA1c trending upward within normal, fasting insulin and glucose diverge",
    whyItMatters: "Early insulin resistance pattern forming. Consider a repeat check in 3–6 months.",
    nextStep: "Consider a repeat check in 3–6 months",
    urgency: "caution",
    color: "#F59E0B",
  },
  // Tier 2: Protect future self
  {
    id: "cognitive-risk",
    tier: "future-proofing",
    title: "Cognitive decline risk signals",
    timeWindow: "Last 18 months",
    whatChanged: "Sleep + inflammation + cardio markers align",
    whyItMatters: "Multiple factors that influence long-term cognitive health are converging.",
    nextStep: "Review lifestyle interventions",
    urgency: "informational",
    color: "#14B8A6",
  },
  {
    id: "hormonal-decline",
    tier: "future-proofing",
    title: "Hormonal decline meaningful over time",
    timeWindow: "Last 24 months",
    whatChanged: "Gradual decline in key hormones",
    whyItMatters: "Pattern suggests age-related changes that may benefit from monitoring.",
    nextStep: "Monitor and reassess in 6 months",
    urgency: "informational",
    color: "#14B8A6",
  },
  {
    id: "bone-density",
    tier: "future-proofing",
    title: "Bone density risk and timely DEXA",
    timeWindow: "Last 36 months",
    whatChanged: "Age, hormonal markers, and activity patterns suggest baseline assessment timing",
    whyItMatters: "Establishing baseline bone density now supports future monitoring decisions.",
    nextStep: "Consider baseline DEXA scan",
    urgency: "informational",
    color: "#14B8A6",
  },
  // Tier 3: Saves from bad decisions
  {
    id: "no-intervention-needed",
    tier: "avoid-bad-decisions",
    title: "No intervention needed — stable trend",
    timeWindow: "Last 12 months",
    whatChanged: "Stable trend across multiple markers",
    whyItMatters: "Stable trend indicates no action required at this time.",
    nextStep: "Continue monitoring",
    urgency: "informational",
    color: "#4DEECD",
  },
  {
    id: "wait-and-monitor",
    tier: "avoid-bad-decisions",
    title: "Wait and monitor — variation likely noise",
    timeWindow: "Last 6 months",
    whatChanged: "Single outlier value within otherwise stable pattern",
    whyItMatters: "Variation appears to be noise rather than meaningful signal. No intervention needed.",
    nextStep: "Continue routine monitoring",
    urgency: "informational",
    color: "#4DEECD",
  },
  {
    id: "recheck-confirm",
    tier: "avoid-bad-decisions",
    title: "Recheck once to confirm — do not act yet",
    timeWindow: "Last 8 weeks",
    whatChanged: "Borderline value requires confirmation before any action",
    whyItMatters: "One borderline reading does not justify intervention. Confirm with repeat test.",
    nextStep: "Repeat test in 8 weeks to confirm",
    urgency: "informational",
    color: "#4DEECD",
  },
  // Tier 4: Longevity specific
  {
    id: "protocol-fit",
    tier: "longevity",
    title: "A protocol fits your biomarkers",
    timeWindow: "Based on current markers",
    whatChanged: "Your biomarker profile aligns with evidence-based intervention protocols",
    whyItMatters: "Curated and personalized protocol options available based on your data.",
    nextStep: "Review protocol options",
    urgency: "informational",
    color: "#8B5CF6",
  },
  {
    id: "longevity-intervention",
    tier: "longevity",
    title: "Evidence-backed longevity intervention",
    timeWindow: "Based on longitudinal data",
    whatChanged: "Multiple markers suggest benefit from specific evidence-based approach",
    whyItMatters: "Longitudinal data supports targeted intervention aligned with longevity research.",
    nextStep: "Explore intervention options",
    urgency: "informational",
    color: "#8B5CF6",
  },
];

const tiers = [
  { id: "high-impact" as SignalTier, label: "High impact" },
  { id: "future-proofing" as SignalTier, label: "Future-proofing" },
  { id: "avoid-bad-decisions" as SignalTier, label: "Avoid bad decisions" },
  { id: "longevity" as SignalTier, label: "Longevity" },
];

export default function TrendsPage() {
  const [selectedTier, setSelectedTier] = useState<SignalTier | null>(null);

  const filteredSignals = selectedTier
    ? signals.filter((signal) => signal.tier === selectedTier)
    : signals;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Trends & Signals</h1>
        <p className="text-gray-400">Meaningful signals detected early without panic or noise</p>
      </motion.div>

      {/* Tier Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTier(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedTier === null
              ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          All
        </button>
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTier === tier.id
                ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSignals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <GlowCard
              className="p-5 border"
              style={{
                borderColor:
                  signal.urgency === "urgent"
                    ? "rgba(239, 68, 68, 0.3)"
                    : signal.urgency === "caution"
                    ? "rgba(245, 158, 11, 0.3)"
                    : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${signal.color}15`,
                    color: signal.color,
                  }}
                >
                  {signal.urgency}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{signal.timeWindow}</p>
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    What changed
                  </p>
                  <p className="text-sm text-gray-300">{signal.whatChanged}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Why it matters
                  </p>
                  <p className="text-sm text-gray-300">{signal.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Suggested next step
                  </p>
                  <p className="text-sm text-[#4DEECD]">{signal.nextStep}</p>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">
                Mark as "Monitor only" →
              </button>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

