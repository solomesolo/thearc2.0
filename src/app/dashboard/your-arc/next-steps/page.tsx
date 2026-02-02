"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

type StepCategory = "blood-work" | "vaccination" | "dental" | "imaging" | "vitals" | "specialist" | "lifestyle";

interface NextStep {
  id: string;
  category: StepCategory;
  title: string;
  trigger: string;
  timing: string;
  confidence: string;
  rationale: string;
  relatesTo: string;
}

const nextSteps: NextStep[] = [
  {
    id: "crp-repeat",
    category: "blood-work",
    title: "CRP repeat check",
    trigger: "CRP spiked once in last panel",
    timing: "8 weeks",
    confidence: "High",
    rationale: "Single elevated reading requires confirmation to distinguish signal from noise. Pattern only visible when viewed longitudinally.",
    relatesTo: "Labs (Inflammation markers)",
  },
  {
    id: "hba1c-recheck",
    category: "blood-work",
    title: "HbA1c recheck",
    trigger: "HbA1c rose slightly from 5.2% to 5.4%",
    timing: "6 months",
    confidence: "Moderate",
    rationale: "Small upward drift within normal range. Early monitoring prevents progression.",
    relatesTo: "Labs (Metabolic markers)",
  },
  {
    id: "lipid-panel",
    category: "blood-work",
    title: "Lipid panel",
    trigger: "Lipid panel stable across 3 panels",
    timing: "12 months",
    confidence: "High",
    rationale: "Consistent stable values indicate routine annual monitoring is appropriate.",
    relatesTo: "Labs (Cardiometabolic markers)",
  },
  {
    id: "tdap-booster",
    category: "vaccination",
    title: "Tdap booster",
    trigger: "Tdap last given 9 years ago",
    timing: "This year",
    confidence: "High",
    rationale: "Standard 10-year interval for Tdap. Due within next 12 months.",
    relatesTo: "Vaccination",
  },
  {
    id: "flu-vaccine",
    category: "vaccination",
    title: "Flu vaccine",
    trigger: "Respiratory history and current season",
    timing: "This season",
    confidence: "Moderate",
    rationale: "Recommended based on respiratory history and seasonal timing.",
    relatesTo: "Vaccination",
  },
  {
    id: "dental-cleaning",
    category: "dental",
    title: "Dental cleaning",
    trigger: "Gingival inflammation noted at last visit",
    timing: "6 months",
    confidence: "High",
    rationale: "6-month interval advised due to gingival findings at last examination.",
    relatesTo: "Dental",
  },
  {
    id: "bp-monitoring",
    category: "vitals",
    title: "Blood pressure monitoring",
    trigger: "Borderline readings in clinic",
    timing: "14 days",
    confidence: "Moderate",
    rationale: "Home monitoring suggested to confirm baseline. Clinic readings may be elevated due to white coat effect.",
    relatesTo: "Vitals (Blood pressure)",
  },
  {
    id: "baseline-ultrasound",
    category: "imaging",
    title: "Baseline ultrasound",
    trigger: "Baseline ultrasound normal from 2 years ago",
    timing: "No follow-up needed",
    confidence: "High",
    rationale: "Baseline ultrasound normal → no follow-up needed at this time.",
    relatesTo: "Imaging",
  },
  {
    id: "minor-finding-recheck",
    category: "imaging",
    title: "Minor finding recheck",
    trigger: "Minor finding noted on prior scan",
    timing: "12–24 months",
    confidence: "Moderate",
    rationale: "Minor finding → recheck in 12–24 months to confirm stability.",
    relatesTo: "Imaging",
  },
  {
    id: "cardiology-consult",
    category: "specialist",
    title: "Cardiology consult",
    trigger: "Cardiology consult last year normal",
    timing: "No follow-up needed",
    confidence: "High",
    rationale: "Last consult normal → no follow-up needed.",
    relatesTo: "Specialist (Cardiology)",
  },
  {
    id: "endocrine-followup",
    category: "specialist",
    title: "Endocrine follow-up",
    trigger: "Normalized endocrine labs",
    timing: "Specialist follow-up not required",
    confidence: "High",
    rationale: "Normalized endocrine labs → specialist follow-up not required.",
    relatesTo: "Specialist (Endocrinology)",
  },
  {
    id: "baseline-specialist",
    category: "specialist",
    title: "One-time baseline specialist visit",
    trigger: "Age and risk factors suggest baseline assessment",
    timing: "This year",
    confidence: "Moderate",
    rationale: "One-time baseline specialist visit recommended based on age and risk profile.",
    relatesTo: "Specialist (Preventive)",
  },
  {
    id: "iron-check",
    category: "lifestyle",
    title: "Iron/ferritin check",
    trigger: "Increased training load",
    timing: "3 months",
    confidence: "Moderate",
    rationale: "Increased training load → consider iron/ferritin check to monitor status.",
    relatesTo: "Lifestyle (Training)",
  },
  {
    id: "bp-stress",
    category: "lifestyle",
    title: "BP assessment after stress",
    trigger: "Extended stress period",
    timing: "Repeat once recovered",
    confidence: "Moderate",
    rationale: "Extended stress period → repeat BP assessment once recovered to confirm baseline.",
    relatesTo: "Lifestyle (Stress management)",
  },
  {
    id: "metabolic-wait",
    category: "lifestyle",
    title: "Metabolic labs can wait",
    trigger: "Weight stabilized",
    timing: "Can wait",
    confidence: "High",
    rationale: "Weight stabilized → metabolic labs can wait until next routine check.",
    relatesTo: "Lifestyle (Weight management)",
  },
  {
    id: "shingles-vaccine",
    category: "vaccination",
    title: "Shingles vaccine",
    trigger: "Age and eligibility criteria met",
    timing: "Can wait — revisit next year",
    confidence: "Moderate",
    rationale: "Shingles vaccine can wait → revisit next year based on current status.",
    relatesTo: "Vaccination",
  },
  {
    id: "dental-annual",
    category: "dental",
    title: "Dental cleaning",
    trigger: "Two clean exams in last 18 months",
    timing: "Annual cleaning sufficient",
    confidence: "High",
    rationale: "Two clean exams → annual cleaning sufficient.",
    relatesTo: "Dental",
  },
  {
    id: "night-guard-review",
    category: "dental",
    title: "Night guard review",
    trigger: "Reported grinding",
    timing: "6 months",
    confidence: "Moderate",
    rationale: "Night guard review suggested due to reported grinding.",
    relatesTo: "Dental",
  },
];

const categories = [
  { id: "blood-work" as StepCategory, label: "Blood work" },
  { id: "vaccination" as StepCategory, label: "Vaccination" },
  { id: "dental" as StepCategory, label: "Dental" },
  { id: "imaging" as StepCategory, label: "Imaging" },
  { id: "vitals" as StepCategory, label: "Vitals" },
  { id: "specialist" as StepCategory, label: "Specialist" },
  { id: "lifestyle" as StepCategory, label: "Lifestyle" },
];

export default function NextStepsPage() {
  const [selectedCategory, setSelectedCategory] = useState<StepCategory | null>(null);
  const [selectedStep, setSelectedStep] = useState<NextStep | null>(null);

  const filteredSteps = selectedCategory
    ? nextSteps.filter((step) => step.category === selectedCategory)
    : nextSteps;

  const handleCategoryClick = (category: StepCategory) => {
    setSelectedCategory(category);
    const firstStep = nextSteps.find((step) => step.category === category);
    setSelectedStep(firstStep || null);
  };

  const handleStepClick = (step: NextStep) => {
    setSelectedStep(step);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Next Steps</h1>
        <p className="text-gray-400">What to do next, based on what your last checks actually showed</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Category and Step List */}
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedStep(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Steps List */}
          <div className="space-y-2">
            {filteredSteps.length > 0 ? (
              filteredSteps.map((step) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedStep?.id === step.id
                      ? "bg-[#4DEECD]/10 border-[#4DEECD]/30"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    <span className="text-xs text-gray-400">{step.timing}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{step.trigger}</p>
                  <p className="text-xs text-gray-500">{step.relatesTo}</p>
                </motion.button>
              ))
            ) : (
              <GlowCard className="p-6 text-center">
                <p className="text-gray-400">Nothing needed right now for this category.</p>
              </GlowCard>
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div>
          <AnimatePresence mode="wait">
            {selectedStep ? (
              <motion.div
                key={selectedStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlowCard className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">{selectedStep.title}</h2>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#4DEECD]/10 text-[#4DEECD] text-xs font-medium">
                          {categories.find((c) => c.id === selectedStep.category)?.label}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-300 text-xs">
                          {selectedStep.confidence} confidence
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          Trigger
                        </p>
                        <p className="text-sm text-gray-300">{selectedStep.trigger}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          Recommended timing
                        </p>
                        <p className="text-sm text-[#4DEECD] font-medium">{selectedStep.timing}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          Rationale
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed">{selectedStep.rationale}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          Relates to
                        </p>
                        <p className="text-sm text-gray-300">{selectedStep.relatesTo}</p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <GlowCard className="p-6">
                  <p className="text-gray-400 text-center">Select a step to see details</p>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

