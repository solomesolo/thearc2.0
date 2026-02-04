"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TestTube, Activity, ArrowRight, CheckCircle2 } from "lucide-react";

interface WhyThisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecommendationInput {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}

const recommendationInputs: RecommendationInput[] = [
  {
    id: "ldl-trend",
    label: "LDL Trend",
    value: "Rising 12% over 18 months",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "last-test",
    label: "Last Lipid Panel",
    value: "128 mg/dL (4 months ago)",
    icon: <TestTube className="w-4 h-4" />,
  },
  {
    id: "pattern",
    label: "Pattern Detected",
    value: "Connected to 3 related markers",
    icon: <Activity className="w-4 h-4" />,
  },
];

export default function WhyThisDrawer({ isOpen, onClose }: WhyThisDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--color-bg-card-elevated)] shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="card-title mb-1">Why this recommendation</h2>
                  <p className="typography-body-secondary text-sm">
                    Understand how we arrived at this suggestion
                  </p>
                </div>
                <button
                  onClick={onClose}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      onClose();
                    }
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)]"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Inputs Section */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Inputs</h3>
                <div className="space-y-2">
                  {recommendationInputs.map((input, idx) => (
                    <motion.div
                      key={input.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-white/5 flex items-start gap-3"
                    >
                      <div className="text-accent mt-0.5">{input.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white mb-1">{input.label}</p>
                        <p className="text-xs text-gray-400">{input.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Logic Explanation */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">How we determined this</h3>
                <div className="p-5 rounded-lg bg-[var(--color-accent-bg-subtle)]">
                  <p className="typography-body-secondary text-sm leading-relaxed">
                    Your LDL cholesterol has been trending upward over the past 18 months, showing
                    a 12% increase from baseline. This pattern, combined with your last test being 4
                    months ago and connections to other metabolic markers, suggests it's time for a
                    follow-up screening to track whether interventions are working or if further
                    action is needed.
                  </p>
                </div>
              </div>

              {/* Next Step */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Next step</h3>
                <div className="p-5 rounded-lg bg-white/5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-1">
                        Schedule a follow-up lipid panel
                      </p>
                      <p className="text-xs text-gray-400">
                        Recommended within the next 2-4 weeks to track your LDL trend and assess
                        intervention effectiveness.
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2.5 px-4 rounded-lg bg-[var(--color-accent-primary)] text-black text-sm font-medium hover:bg-[var(--color-accent-primary-hover)] transition-colors flex items-center justify-center gap-2">
                    <span>View screening options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
