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

export interface InvestigationData {
  question: string;
  baselinePeriod: string;
  observationPeriod: string;
  baselineSignals: BaselineSignal[];
  trackingPlan: TrackingPlanItem[];
  comparisonSummary: string;
  interpretation: string;
}

export const investigationData: InvestigationData = {
  question: "Why did LDL increase despite stable exercise and weight?",
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
  comparisonSummary:
    "Early signal suggests LDL sensitivity to diet composition, not weight change.",
  interpretation:
    "Pattern may suggest LDL response to saturated fat intake variability. Confirm with next lipid panel and diet log consistency.",
};

