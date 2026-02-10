export interface FocusArea {
  id: string;
  label: string;
  isActive: boolean;
}

export interface Signal {
  id: string;
  name: string;
  value: string;
  unit: string;
  trend: string;
  trendDescription: string;
}

export interface Action {
  id: string;
  title: string;
  reason: string;
  timing: string;
}

export const focusAreas: FocusArea[] = [
  { id: "metabolic", label: "Metabolic Health", isActive: true },
  { id: "cardiovascular", label: "Cardiovascular", isActive: false },
  { id: "sleep", label: "Sleep Quality", isActive: false },
  { id: "inflammation", label: "Inflammation Risk", isActive: false },
];

export const signals: Signal[] = [
  {
    id: "ldl",
    name: "LDL Trend",
    value: "118",
    unit: "mg/dL",
    trend: "↗",
    trendDescription: "slight upward trend (12 months)",
  },
  {
    id: "sleep",
    name: "Sleep Variability",
    value: "",
    unit: "",
    trend: "↑",
    trendDescription: "increasing variability",
  },
];

export const actions: Action[] = [
  {
    id: "lipid-panel",
    title: "Repeat Lipid Panel",
    reason: "confirm upward trend pattern",
    timing: "6 months",
  },
  {
    id: "sleep-tracking",
    title: "Track sleep consistency",
    reason: "signal variability detected",
    timing: "30 days baseline",
  },
];

