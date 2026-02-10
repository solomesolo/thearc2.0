import { DomainId } from "./domainConfig";

export type DomainDot = "green" | "yellow" | "red" | "gray";

export type ReasonType = "none" | "missing_data" | "overdue_screening" | "trend_flag" | "predisposition" | "unknown";

export interface DomainStatus {
  domainId: DomainId;
  dot: DomainDot;
  sublabel?: string;
  reasonType: ReasonType;
  score: number; // for sorting/priority (higher = more urgent)
}

interface Gap {
  id: string;
  domain?: DomainId;
  priority: "High" | "Medium" | "Low";
  title: string;
  urgency?: "High" | "Medium" | "Low";
}

interface Signal {
  id: string;
  domain?: DomainId;
  direction: "Improving" | "Worsening" | "Stable";
  impact?: "High" | "Medium" | "Low";
}

interface Screening {
  id: string;
  domain: DomainId;
  name: string;
  dueDate?: string;
  overdue?: boolean;
}

interface Predisposition {
  domain: DomainId;
  type: string;
  details?: string;
  monitoringCadenceSet?: boolean;
}

interface DomainData {
  gaps?: Gap[];
  signals?: Signal[];
  screenings?: Screening[];
  predispositions?: Predisposition[];
  dataConfidence?: "High" | "Fair" | "Low";
  sleepSymptoms?: string[];
}

export function computeDomainStatus(domainId: DomainId, data: DomainData): DomainStatus {
  const { gaps = [], signals = [], screenings = [], predispositions = [], dataConfidence = "Low", sleepSymptoms = [] } = data;

  // Filter data for this domain
  const domainGaps = gaps.filter((g) => g.domain === domainId || !g.domain);
  const domainSignals = signals.filter((s) => s.domain === domainId || !s.domain);
  const domainScreenings = screenings.filter((s) => s.domain === domainId);
  const domainPredispositions = predispositions.filter((p) => p.domain === domainId);

  let dot: DomainDot = "gray";
  let sublabel: string | undefined;
  let reasonType: ReasonType = "none";
  let score = 0;

  // RED conditions (highest priority)
  const overdueScreening = domainScreenings.find((s) => s.overdue);
  const highUrgencyGap = domainGaps.find((g) => g.urgency === "High" || g.priority === "High");
  const worseningHighImpact = domainSignals.find((s) => s.direction === "Worsening" && s.impact === "High");

  if (overdueScreening) {
    dot = "red";
    sublabel = `${overdueScreening.name} overdue`;
    reasonType = "overdue_screening";
    score = 100;
  } else if (highUrgencyGap) {
    dot = "red";
    sublabel = highUrgencyGap.title;
    reasonType = "missing_data";
    score = 90;
  } else if (worseningHighImpact) {
    dot = "red";
    sublabel = `${worseningHighImpact.id} trending up`;
    reasonType = "trend_flag";
    score = 85;
  }
  // YELLOW conditions
  else {
    const mediumUrgencyGap = domainGaps.find((g) => g.urgency === "Medium" || g.priority === "Medium");
    const mildWorsening = domainSignals.find((s) => s.direction === "Worsening" && s.impact !== "High");
    const predispositionWithoutCadence = domainPredispositions.find((p) => !p.monitoringCadenceSet);

    if (mediumUrgencyGap) {
      dot = "yellow";
      sublabel = mediumUrgencyGap.title;
      reasonType = "missing_data";
      score = 60;
    } else if (mildWorsening) {
      dot = "yellow";
      sublabel = `${mildWorsening.id} trending up`;
      reasonType = "trend_flag";
      score = 55;
    } else if (predispositionWithoutCadence) {
      dot = "yellow";
      sublabel = `Family history: ${predispositionWithoutCadence.type}`;
      reasonType = "predisposition";
      score = 50;
    }
    // GREEN conditions
    else if (dataConfidence === "High" || dataConfidence === "Fair") {
      dot = "green";
      reasonType = "none";
      score = 10;
    }
    // GRAY (default)
    else {
      dot = "gray";
      reasonType = "unknown";
      score = 5;
    }
  }

  // Special handling for sleep domain with symptoms
  if (domainId === "sleep" && sleepSymptoms.length > 0 && !sublabel) {
    sublabel = sleepSymptoms.join(" + ");
    if (dot === "gray") {
      dot = "yellow";
      reasonType = "unknown";
      score = 45;
    }
  }

  return {
    domainId,
    dot,
    sublabel,
    reasonType,
    score,
  };
}

export function computeAllDomainStatuses(data: Record<DomainId, DomainData>): DomainStatus[] {
  const domains: DomainId[] = [
    "overview",
    "cardiovascular",
    "metabolic",
    "cancer_screening",
    "neuro",
    "sleep",
    "fitness",
  ];

  return domains
    .map((domainId) => computeDomainStatus(domainId, data[domainId] || {}))
    .sort((a, b) => b.score - a.score); // Sort by priority (highest first)
}


