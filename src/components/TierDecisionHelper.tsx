"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import { User, Users, Eye, Sparkles } from "lucide-react";

type Question1Answer = "own" | "program" | null;
type Question2Answer = "insights" | "guided" | null;

interface Tier {
  id: "tier1" | "tier2";
  tierName: string;
  title: string;
  bestFor: string;
  coreFeatures: string[];
  cta: string;
  ctaAction: () => void;
}

const tiers: Tier[] = [
  {
    id: "tier1",
    tierName: "Tier One",
    title: "Health Intelligence",
    bestFor: "Individuals who want to understand their health data",
    coreFeatures: [
      "A unified medical record",
      "Interpreted health trends across history",
      "Early signals before problems escalate",
    ],
    cta: "Explore Health Intelligence",
    ctaAction: () => (window.location.href = "/your-arc"),
  },
  {
    id: "tier2",
    tierName: "Tier Two",
    title: "Longevity Programs",
    bestFor: "Those who want personalized guidance and programs",
    coreFeatures: [
      "Personalized programs based on your health data",
      "Modular blueprints focused on specific health goals",
      "Programs that evolve with your health",
    ],
    cta: "Explore Programs",
    ctaAction: () => (window.location.href = "/your-arc"),
  },
];

export default function TierDecisionHelper() {
  const [question1, setQuestion1] = useState<Question1Answer>(null);
  const [question2, setQuestion2] = useState<Question2Answer>(null);

  // Determine recommended tier based on answers
  const getRecommendedTier = (): "tier1" | "tier2" | null => {
    if (!question1 || !question2) return null;

    // Logic:
    // - own + insights = tier1
    // - own + guided = tier2
    // - program + insights = tier1 (but could be tier2 for clinics)
    // - program + guided = tier2
    if (question1 === "own" && question2 === "insights") return "tier1";
    if (question1 === "own" && question2 === "guided") return "tier2";
    if (question1 === "program" && question2 === "insights") return "tier1";
    if (question1 === "program" && question2 === "guided") return "tier2";

    return null;
  };

  const recommendedTier = getRecommendedTier();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="typography-h2">Find your tier</h2>
        <p className="typography-body-secondary max-w-2xl mx-auto">
          Answer two questions to see which tier fits your needs
        </p>
      </div>

      {/* Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Question 1 */}
        <div className="card-premium">
          <h3 className="card-title mb-4">
            Are you managing your own health or running a program?
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setQuestion1("own")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setQuestion1("own");
                }
              }}
              className={`w-full text-left p-5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                question1 === "own"
                  ? "bg-[var(--color-accent-bg-subtle)]"
                  : "bg-white/5"
              }`}
              aria-pressed={question1 === "own"}
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-accent" />
                <span className="font-medium text-white">Managing my own health</span>
              </div>
            </button>
            <button
              onClick={() => setQuestion1("program")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setQuestion1("program");
                }
              }}
              className={`w-full text-left p-5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                question1 === "program"
                  ? "bg-[var(--color-accent-bg-subtle)]"
                  : "bg-white/5"
              }`}
              aria-pressed={question1 === "program"}
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-medium text-white">Running a program</span>
              </div>
            </button>
          </div>
        </div>

        {/* Question 2 */}
        <div className="card-premium">
          <h3 className="card-title mb-4">
            Do you want insights only or guided interventions?
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setQuestion2("insights")}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && question1) {
                  e.preventDefault();
                  setQuestion2("insights");
                }
              }}
              disabled={!question1}
              className={`w-full text-left p-5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                !question1
                  ? "opacity-50 cursor-not-allowed"
                  : question2 === "insights"
                  ? "bg-[var(--color-accent-bg-subtle)]"
                  : "bg-white/5"
              }`}
              aria-pressed={question2 === "insights"}
              aria-disabled={!question1}
              tabIndex={question1 ? 0 : -1}
            >
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-accent" />
                <span className="font-medium text-white">Insights only</span>
              </div>
            </button>
            <button
              onClick={() => setQuestion2("guided")}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && question1) {
                  e.preventDefault();
                  setQuestion2("guided");
                }
              }}
              disabled={!question1}
              className={`w-full text-left p-5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                !question1
                  ? "opacity-50 cursor-not-allowed"
                  : question2 === "guided"
                  ? "bg-[var(--color-accent-bg-subtle)]"
                  : "bg-white/5"
              }`}
              aria-pressed={question2 === "guided"}
              aria-disabled={!question1}
              tabIndex={question1 ? 0 : -1}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-medium text-white">Guided interventions</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Tier Display */}
      <AnimatePresence>
        {recommendedTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium bg-[var(--color-accent-bg-subtle)] border border-accent">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent text-black flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent mb-1">Recommended for you</p>
                  <h3 className="card-title mb-0">
                    {tiers.find((t) => t.id === recommendedTier)?.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <p className="typography-body-secondary text-sm">
                  {tiers.find((t) => t.id === recommendedTier)?.bestFor}
                </p>

                <div>
                  <p className="text-sm font-medium text-white mb-2">Includes:</p>
                  <ul className="space-y-2">
                    {tiers
                      .find((t) => t.id === recommendedTier)
                      ?.coreFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={tiers.find((t) => t.id === recommendedTier)?.ctaAction}
                  className="w-full"
                >
                  {tiers.find((t) => t.id === recommendedTier)?.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show all tiers if both questions answered */}
      {recommendedTier && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <button
              onClick={() => {
                setQuestion1(null);
                setQuestion2(null);
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reset selection
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

