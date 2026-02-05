/**
 * Visit 1 Progress Engine
 * 
 * Computes per-tab status silently from intake data.
 * Statuses update automatically without manual "complete" clicks.
 */

import { Visit1IntakeData } from "./intakeTypes";

export type TabStatus = "not_reviewed" | "partial" | "reviewed";
export type TabHint = string | null;

export interface Visit1State {
  narrativeText: string;
  guidedReview: {
    familyHistoryReviewed: boolean;
    lifestyleReviewed: boolean;
    hormonalReviewed: boolean;
    stressReviewed: boolean;
    medsReviewed: boolean;
  };
  extractedEntities: {
    cvdFamilyEvent?: boolean;
    cvdFamilyAgeMissing?: boolean;
    cancerFamilyEvent?: boolean;
    cancerAgeMissing?: boolean;
    sleepRedFlags?: boolean;
    metabolicContradiction?: boolean;
    neuroHighRiskLanguage?: boolean;
    fitnessCardioMentioned?: boolean;
  };
  selectedDiagnostics: string[];
  planDraft: {
    hasNextSteps: boolean;
    followUpPlanned: boolean;
  };
  documents: {
    count: number;
    reviewedCount: number;
  };
}

export interface TabStatusResult {
  status: TabStatus;
  hint: TabHint;
}

/**
 * Extract entities from narrative text (simple heuristic)
 */
function extractEntities(narrative: string): Visit1State["extractedEntities"] {
  const lower = narrative.toLowerCase();
  
  return {
    cvdFamilyEvent: /(father|mother|parent|family).*(heart|cardiac|mi|myocardial|stroke|cardiovascular)/i.test(narrative),
    cvdFamilyAgeMissing: /(father|mother|parent).*(heart|cardiac|mi|myocardial|stroke)/i.test(narrative) && 
                         !/\d+\s*(year|yr|age|old)/i.test(narrative),
    cancerFamilyEvent: /(father|mother|parent|family).*(cancer|tumor|malignancy|colon|breast|lung|colorectal|crc)/i.test(narrative),
    cancerAgeMissing: /(father|mother|parent).*(cancer|tumor|malignancy|colon|breast|lung|colorectal|crc)/i.test(narrative) &&
                      !/\d+\s*(year|yr|age|old)/i.test(narrative),
    sleepRedFlags: /(snoring|apnea|fatigue|tired|exhausted|insomnia|wake.*night)/i.test(narrative),
    metabolicContradiction: /(lean|thin|skinny).*(sedentary|sitting|inactive)/i.test(narrative) ||
                           /(overweight|obese).*(active|exercise|workout)/i.test(narrative),
    neuroHighRiskLanguage: /(depressed|depression|anxious|anxiety|panic|suicidal|hopeless|worthless)/i.test(narrative),
    fitnessCardioMentioned: /(cardio|running|jogging|cycling|swimming|aerobic|exercise|workout)/i.test(narrative),
  };
}

/**
 * Compute tab statuses from intake data
 */
export function computeVisit1Progress(intakeData: Visit1IntakeData): Record<string, TabStatusResult> {
  const narrative = intakeData.patientStory.narrative || "";
  const entities = extractEntities(narrative);
  
  const guidedReview = {
    familyHistoryReviewed: intakeData.guidedReview.find(s => s.id === "family_history")?.status === "reviewed",
    lifestyleReviewed: intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed",
    hormonalReviewed: intakeData.guidedReview.find(s => s.id === "hormonal")?.status === "reviewed",
    stressReviewed: intakeData.guidedReview.find(s => s.id === "stress")?.status === "reviewed",
    medsReviewed: intakeData.guidedReview.find(s => s.id === "medications")?.status === "reviewed",
  };

  const state: Visit1State = {
    narrativeText: narrative,
    guidedReview,
    extractedEntities: entities,
    selectedDiagnostics: intakeData.suggestedDiagnostics.filter(d => d.selected).map(d => d.id),
    planDraft: {
      hasNextSteps: intakeData.openQuestions.length > 0 || intakeData.suggestedDiagnostics.some(d => d.selected),
      followUpPlanned: false, // TODO: check if visit 2 scheduled
    },
    documents: {
      count: 0, // TODO: get from patient data
      reviewedCount: 0,
    },
  };

  return {
    overview: computeOverviewStatus(state),
    cardiovascular: computeCardiovascularStatus(state),
    metabolic: computeMetabolicStatus(state),
    cancer: computeCancerStatus(state),
    neuro: computeNeuroStatus(state),
    sleep: computeSleepStatus(state),
    fitness: computeFitnessStatus(state),
    plan: computePlanStatus(state),
    timeline: computeTimelineStatus(state),
    documents: computeDocumentsStatus(state),
  };
}

function computeOverviewStatus(state: Visit1State): TabStatusResult {
  const hasNarrative = state.narrativeText.length > 50;
  const hasAnyReview = Object.values(state.guidedReview).some(r => r);
  
  if (hasNarrative && hasAnyReview) {
    return { status: "reviewed", hint: null };
  } else if (hasNarrative || hasAnyReview) {
    return { status: "partial", hint: null };
  }
  return { status: "not_reviewed", hint: null };
}

function computeCardiovascularStatus(state: Visit1State): TabStatusResult {
  const hasFamilyEvent = state.extractedEntities.cvdFamilyEvent;
  const hasAgeMissing = state.extractedEntities.cvdFamilyAgeMissing;
  const hasBP = /(blood pressure|bp|hypertension|hypotension)/i.test(state.narrativeText);
  const hasSymptoms = /(chest pain|dyspnea|shortness of breath|angina)/i.test(state.narrativeText);
  
  if (hasFamilyEvent && hasBP && hasSymptoms) {
    return { status: "reviewed", hint: hasAgeMissing ? "Age of MI missing" : null };
  } else if (hasFamilyEvent || hasBP || hasSymptoms) {
    return { status: "partial", hint: hasAgeMissing ? "Age of MI missing" : "Family history captured" };
  }
  return { status: "not_reviewed", hint: null };
}

function computeMetabolicStatus(state: Visit1State): TabStatusResult {
  const hasLifestyle = state.guidedReview.lifestyleReviewed;
  const hasWeight = /(weight|obese|overweight|bmi|waist)/i.test(state.narrativeText);
  const hasContradiction = state.extractedEntities.metabolicContradiction;
  
  if (hasLifestyle || hasWeight) {
    return { status: "reviewed", hint: hasContradiction ? "Consider insulin check" : null };
  } else if (hasContradiction) {
    return { status: "partial", hint: "Consider insulin check" };
  }
  return { status: "not_reviewed", hint: null };
}

function computeCancerStatus(state: Visit1State): TabStatusResult {
  const hasFamilyEvent = state.extractedEntities.cancerFamilyEvent;
  const hasAgeMissing = state.extractedEntities.cancerAgeMissing;
  const hasScreening = /(colonoscopy|mammogram|screening|pap|psa)/i.test(state.narrativeText);
  
  if (hasFamilyEvent && hasScreening) {
    return { status: "reviewed", hint: hasAgeMissing ? "CRC age missing" : null };
  } else if (hasFamilyEvent) {
    return { status: "partial", hint: hasAgeMissing ? "CRC age missing" : "CRC hx → discuss screening" };
  }
  return { status: "not_reviewed", hint: null };
}

function computeNeuroStatus(state: Visit1State): TabStatusResult {
  const hasStress = state.guidedReview.stressReviewed;
  const hasMention = /(stress|anxiety|mood|depression|cognition|brain fog|attention)/i.test(state.narrativeText);
  const hasHighRisk = state.extractedEntities.neuroHighRiskLanguage;
  
  if (hasStress || hasMention) {
    return { status: "reviewed", hint: hasHighRisk ? "High-risk language detected" : null };
  } else if (hasHighRisk) {
    return { status: "partial", hint: "High-risk language detected" };
  }
  return { status: "not_reviewed", hint: null };
}

function computeSleepStatus(state: Visit1State): TabStatusResult {
  const hasLifestyle = state.guidedReview.lifestyleReviewed;
  const hasSleep = /(sleep|insomnia|rest|tired|fatigue|awake|snoring)/i.test(state.narrativeText);
  const hasRedFlags = state.extractedEntities.sleepRedFlags;
  
  if (hasLifestyle || hasSleep) {
    return { status: "reviewed", hint: hasRedFlags ? "Snoring + fatigue" : null };
  } else if (hasRedFlags) {
    return { status: "partial", hint: "Snoring + fatigue" };
  }
  return { status: "not_reviewed", hint: null };
}

function computeFitnessStatus(state: Visit1State): TabStatusResult {
  const hasLifestyle = state.guidedReview.lifestyleReviewed;
  const hasMovement = /(exercise|workout|running|walking|strength|cardio|movement|activity)/i.test(state.narrativeText);
  const hasCardio = state.extractedEntities.fitnessCardioMentioned;
  const hasCVD = state.extractedEntities.cvdFamilyEvent;
  
  if (hasLifestyle || hasMovement) {
    return { status: "reviewed", hint: hasCVD && !hasCardio ? "Cardio gap noted" : null };
  } else if (hasCVD && !hasCardio) {
    return { status: "partial", hint: "Cardio gap noted" };
  }
  return { status: "not_reviewed", hint: null };
}

function computePlanStatus(state: Visit1State): TabStatusResult {
  const hasDiagnostics = state.selectedDiagnostics.length > 0;
  const hasNextSteps = state.planDraft.hasNextSteps;
  const hasFollowUp = state.planDraft.followUpPlanned;
  
  // Plan is always "partial" (draft) during Visit 1 unless completed
  if (hasDiagnostics && hasFollowUp) {
    return { status: "reviewed", hint: null };
  } else if (hasDiagnostics || hasNextSteps) {
    return { status: "partial", hint: hasFollowUp ? null : "No follow-up planned yet" };
  }
  return { status: "partial", hint: "No follow-up planned yet" };
}

function computeTimelineStatus(state: Visit1State): TabStatusResult {
  // Timeline is always passive, shows event count
  return { status: "reviewed", hint: null };
}

function computeDocumentsStatus(state: Visit1State): TabStatusResult {
  const count = state.documents.count;
  if (count > 0) {
    return { status: state.documents.reviewedCount === count ? "reviewed" : "partial", hint: `${count} docs` };
  }
  return { status: "not_reviewed", hint: null };
}


