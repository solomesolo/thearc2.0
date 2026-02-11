export interface BaselineSignal {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: string;
}

export interface TrackingPlanItem {
  id: string;
  title: string;
  description: string;
}

export interface Delta {
  name: string;
  before: string;
  after: string;
  trend: "up" | "down" | "stable";
}

export interface Driver {
  id: string;
  name: string;
  strength: "strong" | "weak" | "none";
  description?: string;
}

export interface InvestigationData {
  // Header
  title: string;
  status: string;
  evidence: string;
  dataCompleteness: number;

  // Key Insight Hero
  finding: string;
  direction: "up" | "down" | "neutral";
  confidence: "High" | "Moderate" | "Low";
  whyItMatters: string;

  // What Changed
  deltas: Delta[];

  // Likely Drivers
  drivers: Driver[];

  // Next Action
  recommendation: string;
  whyNow: string;
  timeSensitivity?: string;

  // Supporting Data (collapsible)
  baselinePeriod: string;
  observationPeriod: string;
  baselineSignals: BaselineSignal[];
  trackingPlan: TrackingPlanItem[];
  comparisonSummary: string;
  interpretation: string;
}

export const investigationData: InvestigationData = {
  title: "Investigation — LDL Response to Diet Pattern",
  status: "Active",
  evidence: "Moderate",
  dataCompleteness: 86,

  // Key Finding
  finding: "LDL increased +15% during high saturated fat periods",
  direction: "up",
  confidence: "Moderate",
  whyItMatters: "Pattern suggests LDL sensitivity to diet composition, not weight change.",

  // What Changed (deltas only)
  deltas: [
    {
      name: "LDL",
      before: "102 mg/dL",
      after: "118 mg/dL",
      trend: "up",
    },
    {
      name: "Triglycerides",
      before: "110 mg/dL",
      after: "110 mg/dL",
      trend: "stable",
    },
    {
      name: "hsCRP",
      before: "1.1 mg/L",
      after: "1.1 mg/L",
      trend: "stable",
    },
  ],

  // Likely Drivers (ranked)
  drivers: [
    {
      id: "diet",
      name: "Saturated fat intake timing",
      strength: "strong",
      description: "Correlation strongest during high saturated fat weeks",
    },
    {
      id: "sleep",
      name: "Sleep variability",
      strength: "weak",
      description: "Minor signal detected but not conclusive",
    },
    {
      id: "training",
      name: "Training load",
      strength: "none",
      description: "No correlation observed",
    },
  ],

  // Next Action
  recommendation: "Repeat lipid panel in 12 weeks",
  whyNow: "Confirm upward trend pattern and validate diet-LDL relationship.",
  timeSensitivity: "Timing: 6 months from baseline",

  // Supporting Data
  baselinePeriod: "Jan — Jun 2024",
  observationPeriod: "Jul — Dec 2024",
  baselineSignals: [
    {
      id: "ldl",
      name: "LDL",
      value: "102",
      unit: "mg/dL",
      status: "Stable range",
    },
    {
      id: "triglycerides",
      name: "Triglycerides",
      value: "110",
      unit: "mg/dL",
      status: "Stable",
    },
    {
      id: "hscrp",
      name: "hsCRP",
      value: "1.1",
      unit: "mg/L",
      status: "Low inflammation baseline",
    },
  ],
  trackingPlan: [
    {
      id: "diet",
      title: "Diet Pattern Tagging",
      description: "High saturated fat weeks vs baseline",
    },
    {
      id: "lipid",
      title: "Repeat Lipid Panel",
      description: "Every 12 weeks",
    },
    {
      id: "sleep",
      title: "Sleep Consistency",
      description: "Variability tracking overlay",
    },
  ],
  comparisonSummary: "Early signal suggests LDL sensitivity to diet composition, not weight change.",
  interpretation: "Pattern may suggest LDL response to saturated fat intake variability. Confirm with next lipid panel and diet log consistency.",
};
