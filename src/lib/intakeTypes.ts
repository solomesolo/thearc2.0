// Types for First Visit Intake Workspace

export type VisitStatus = "in_progress" | "completed" | "draft";
export type RiskLevel = "low" | "moderate" | "high";
export type RiskCategory = "cardiovascular" | "cancer" | "metabolic" | "venous" | "neuro_cognitive";
export type AutosaveStatus = "saving" | "saved" | "error";

// Minimal diagnostic item type
export type DiagnosticItem = {
  id: string;
  group: "cardio" | "cancer" | "metabolic" | "vascular";
  name: string;
  why: string;
  effort: "low" | "med" | "high";
};

export interface PatientStory {
  narrative: string;
  lastSavedISO?: string;
}

export interface GuidedReviewSection {
  id: string;
  label: string;
  status: "not_reviewed" | "reviewed";
  data: Record<string, any>;
}

export interface RiskTile {
  category: RiskCategory;
  level: RiskLevel;
  reason: string;
  details?: string;
}

export interface SuggestedDiagnostic {
  id: string;
  testName: string;
  why: string;
  effort: "low" | "med" | "high";
  category: string;
  selected: boolean;
}

export interface Visit1IntakeData {
  patientStory: PatientStory;
  patientGoals: string[];
  knownRisks: string[];
  guidedReview: GuidedReviewSection[];
  riskMap: RiskTile[];
  suggestedDiagnostics: SuggestedDiagnostic[];
  openQuestions: string;
  visitStatus: VisitStatus;
}

// Mock storage
const intakeDataStore: Map<string, Visit1IntakeData> = new Map();

// Initialize from localStorage on client-side
if (typeof window !== "undefined") {
  try {
    const storedData = localStorage.getItem("intake_data");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      for (const key in parsed) {
        intakeDataStore.set(key, parsed[key]);
      }
    }
  } catch (e) {
    console.warn("Could not load intake data from localStorage", e);
  }
}

export function getIntakeData(patientId: string): Visit1IntakeData | null {
  return intakeDataStore.get(patientId) || null;
}

export function saveIntakeData(patientId: string, data: Partial<Visit1IntakeData>): Visit1IntakeData {
  const existing = intakeDataStore.get(patientId) || getDefaultIntakeData();
  const updated = { ...existing, ...data };
  intakeDataStore.set(patientId, updated);

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    try {
      const allData = Object.fromEntries(intakeDataStore);
      localStorage.setItem("intake_data", JSON.stringify(allData));
    } catch (e) {
      console.warn("Could not save intake data", e);
    }
  }

  return updated;
}

function getDefaultIntakeData(): Visit1IntakeData {
  return {
    patientStory: { narrative: "" },
    patientGoals: [],
    knownRisks: [],
    guidedReview: [
      { id: "family_history", label: "Family History", status: "not_reviewed", data: {} },
      { id: "lifestyle", label: "Lifestyle", status: "not_reviewed", data: {} },
      { id: "hormonal", label: "Hormonal / Reproductive", status: "not_reviewed", data: {} },
      { id: "stress", label: "Stress & Work Context", status: "not_reviewed", data: {} },
      { id: "medications", label: "Medications & Supplements", status: "not_reviewed", data: {} },
    ],
    riskMap: [
      { category: "cardiovascular", level: "low", reason: "No risk factors identified yet" },
      { category: "cancer", level: "low", reason: "No risk factors identified yet" },
      { category: "metabolic", level: "low", reason: "No risk factors identified yet" },
      { category: "venous", level: "low", reason: "No risk factors identified yet" },
      { category: "neuro_cognitive", level: "low", reason: "No risk factors identified yet" },
    ],
    suggestedDiagnostics: [],
    openQuestions: "",
    visitStatus: "in_progress",
  };
}

export function extractRiskFactors(narrative: string): { risks: string[]; riskMap: RiskTile[] } {
  const risks: string[] = [];
  const riskMap: RiskTile[] = [
    { category: "cardiovascular", level: "low", reason: "No risk factors identified yet" },
    { category: "cancer", level: "low", reason: "No risk factors identified yet" },
    { category: "metabolic", level: "low", reason: "No risk factors identified yet" },
    { category: "venous", level: "low", reason: "No risk factors identified yet" },
    { category: "neuro_cognitive", level: "low", reason: "No risk factors identified yet" },
  ];

  const lowerNarrative = narrative.toLowerCase();

  // Simple keyword-based extraction (in production, use NLP/AI)
  if (lowerNarrative.includes("heart") || lowerNarrative.includes("cardiac") || lowerNarrative.includes("chest pain")) {
    risks.push("Cardiovascular concerns");
    riskMap[0] = { category: "cardiovascular", level: "moderate", reason: "Cardiovascular symptoms mentioned" };
  }

  if (lowerNarrative.includes("cancer") || lowerNarrative.includes("tumor") || lowerNarrative.includes("malignancy")) {
    risks.push("Cancer risk factors");
    riskMap[1] = { category: "cancer", level: "moderate", reason: "Cancer-related concerns mentioned" };
  }

  if (lowerNarrative.includes("diabetes") || lowerNarrative.includes("blood sugar") || lowerNarrative.includes("insulin")) {
    risks.push("Metabolic concerns");
    riskMap[2] = { category: "metabolic", level: "moderate", reason: "Metabolic symptoms mentioned" };
  }

  return { risks, riskMap };
}

// Initialize dummy data for demo patient
export function initializeDummyData(patientId: string): Visit1IntakeData {
  const dummyData: Visit1IntakeData = {
    patientStory: {
      narrative: `Patient presents for first visit. 45-year-old female with concerns about cardiovascular risk and family history.

Family History:
- Father had myocardial infarction at age 52 (age not fully documented)
- Mother had colon cancer at age 48
- Maternal grandmother had stroke

Current Concerns:
- Patient reports occasional chest pain with exertion
- Blood pressure has been elevated on recent checks (140/90)
- Family history of cardiovascular disease is concerning
- Wants to understand her risk and prevention strategies

Lifestyle:
- Sedentary lifestyle, works desk job
- Minimal exercise (walks occasionally)
- Sleep quality is poor, reports snoring and fatigue
- Stress levels are high due to work demands
- Weight has been stable but BMI is 28

Medications:
- Currently taking birth control pills
- No other medications

The patient is motivated to make lifestyle changes and wants a comprehensive assessment of her cardiovascular and cancer risks.`,
      lastSavedISO: new Date().toISOString(),
    },
    patientGoals: [
      "Understand my cardiovascular risk",
      "Develop a prevention plan",
      "Improve sleep quality",
      "Establish baseline health metrics",
    ],
    knownRisks: [
      "Family history of CVD",
      "Elevated blood pressure",
      "Sedentary lifestyle",
      "Family history of colon cancer",
    ],
    guidedReview: [
      { 
        id: "family_history", 
        label: "Family History", 
        status: "reviewed", 
        data: { 
          cvd: true, 
          cancer: true,
          father_mi_age: 52,
          mother_cancer_type: "colon",
          mother_cancer_age: 48,
          grandmother_stroke: true,
          notes: "Strong family history of cardiovascular disease and colon cancer"
        } 
      },
      { 
        id: "lifestyle", 
        label: "Lifestyle", 
        status: "reviewed", 
        data: { 
          exercise: "minimal",
          exercise_details: "Occasional walks, no structured exercise routine",
          sleep: "poor",
          sleep_details: "Reports snoring, frequent fatigue, difficulty falling asleep",
          diet: "mixed",
          diet_details: "Tries to eat healthy but work schedule makes it challenging",
          alcohol: "occasional",
          alcohol_details: "1-2 glasses of wine per week",
          smoking: false,
          bmi: 28
        } 
      },
      { 
        id: "hormonal", 
        label: "Hormonal / Reproductive", 
        status: "reviewed", 
        data: { 
          bc_pills: true,
          bc_type: "Combined oral contraceptive",
          menarche_age: 13,
          menstrual_regular: true,
          last_menstrual_period: "2 weeks ago",
          pregnancies: 0,
          menopause: false,
          notes: "On birth control for 10+ years"
        } 
      },
      { 
        id: "stress", 
        label: "Stress & Work Context", 
        status: "reviewed", 
        data: { 
          work_stress: "high",
          work_hours: "50-60 hours/week",
          work_type: "Corporate management",
          stress_sources: ["Work deadlines", "Long hours", "High responsibility"],
          coping_strategies: "Limited - mainly relies on occasional exercise",
          sleep_impact: "Reports work stress affects sleep quality"
        } 
      },
      { 
        id: "medications", 
        label: "Medications & Supplements", 
        status: "reviewed", 
        data: { 
          bc_pills: true,
          medications_list: [
            { name: "Combined oral contraceptive", dose: "Daily", duration: "10+ years" }
          ],
          supplements: [],
          allergies: "None known",
          notes: "No other medications or supplements currently"
        } 
      },
    ],
    riskMap: [
      { 
        category: "cardiovascular", 
        level: "moderate", 
        reason: "Family history + elevated BP + sedentary lifestyle",
        details: "Father MI at 52, grandmother stroke, patient BP 140/90, minimal exercise"
      },
      { 
        category: "cancer", 
        level: "moderate", 
        reason: "Family history of colon cancer",
        details: "Mother colon cancer at 48, warrants earlier screening consideration"
      },
      { 
        category: "metabolic", 
        level: "moderate", 
        reason: "BMI 28, sedentary lifestyle",
        details: "Overweight, minimal exercise, work-related stress may contribute"
      },
      { 
        category: "venous", 
        level: "low", 
        reason: "No significant risk factors",
        details: "On birth control but no personal or family history of VTE"
      },
      { 
        category: "neuro_cognitive", 
        level: "low", 
        reason: "No significant risk factors",
        details: "No cognitive concerns reported, good mental health baseline"
      },
    ],
    suggestedDiagnostics: [
      {
        id: "lipid_panel",
        testName: "Comprehensive Lipid Panel",
        why: "Assess cardiovascular risk profile",
        effort: "low",
        category: "Cardiovascular risk",
        selected: true,
      },
      {
        id: "apo_b",
        testName: "ApoB",
        why: "More accurate CVD risk marker",
        effort: "low",
        category: "Cardiovascular risk",
        selected: true,
      },
      {
        id: "hs_crp",
        testName: "High-sensitivity CRP",
        why: "Inflammation marker for CVD risk",
        effort: "low",
        category: "Cardiovascular risk",
        selected: false,
      },
      {
        id: "metabolic_panel",
        testName: "Comprehensive Metabolic Panel",
        why: "Baseline metabolic assessment",
        effort: "low",
        category: "Metabolic baseline",
        selected: true,
      },
      {
        id: "hba1c",
        testName: "HbA1c",
        why: "Long-term glucose control",
        effort: "low",
        category: "Metabolic baseline",
        selected: false,
      },
      {
        id: "cancer_screening",
        testName: "Age-appropriate cancer screening",
        why: "Based on family history and risk factors",
        effort: "med",
        category: "Cancer prevention",
        selected: false,
      },
      {
        id: "colonoscopy",
        testName: "Colonoscopy",
        why: "Mother's colon cancer at age 48 warrants earlier screening",
        effort: "high",
        category: "Cancer prevention",
        selected: false,
      },
      {
        id: "carotid_ultrasound",
        testName: "Carotid Artery Ultrasound",
        why: "Assess vascular health given family CVD history",
        effort: "med",
        category: "Vascular imaging",
        selected: false,
      },
      {
        id: "sleep_study",
        testName: "Sleep Study (Polysomnography)",
        why: "Evaluate sleep apnea given snoring and fatigue",
        effort: "high",
        category: "Other",
        selected: false,
      },
    ],
    openQuestions: `Working Hypotheses & Open Questions:

1. Cardiovascular Risk Assessment:
   - Need 7-day home BP log to confirm hypertension diagnosis
   - Consider advanced lipid panel (ApoB, Lp(a)) given strong family history
   - Evaluate need for CAC scan or carotid ultrasound
   - Discuss lifestyle modifications (exercise, stress management)

2. Cancer Screening:
   - Colonoscopy timing: Given mother's colon cancer at age 48, consider earlier screening
   - Discuss genetic counseling referral for Lynch syndrome evaluation
   - Review mammography and cervical cancer screening status

3. Sleep & Fatigue:
   - Evaluate for sleep apnea given snoring and fatigue
   - Consider sleep study referral
   - Assess impact of work stress on sleep quality

4. Metabolic Health:
   - Baseline metabolic panel ordered
   - Monitor for insulin resistance given BMI 28 and sedentary lifestyle
   - Consider HbA1c and fasting insulin

5. Hormonal Considerations:
   - Review birth control options given cardiovascular risk factors
   - Discuss transition planning as patient approaches perimenopause
   - Evaluate need for hormone level assessment`,
    visitStatus: "in_progress",
  };
  
  // Save dummy data
  intakeDataStore.set(patientId, dummyData);
  if (typeof window !== "undefined") {
    try {
      const allData = Object.fromEntries(intakeDataStore);
      localStorage.setItem("intake_data", JSON.stringify(allData));
    } catch (e) {
      console.warn("Could not save dummy intake data", e);
    }
  }
  
  return dummyData;
}

export function suggestDiagnostics(narrative: string, riskMap: RiskTile[]): SuggestedDiagnostic[] {
  const suggestions: SuggestedDiagnostic[] = [];

  // Cardiovascular risk
  if (riskMap.find((r) => r.category === "cardiovascular" && r.level !== "low")) {
    suggestions.push({
      id: "lipid_panel",
      testName: "Comprehensive Lipid Panel",
      why: "Assess cardiovascular risk profile",
      effort: "low",
      category: "Cardiovascular risk",
      selected: false,
    });
    suggestions.push({
      id: "apo_b",
      testName: "ApoB",
      why: "More accurate CVD risk marker",
      effort: "low",
      category: "Cardiovascular risk",
      selected: false,
    });
    suggestions.push({
      id: "hs_crp",
      testName: "High-sensitivity CRP",
      why: "Inflammation marker for cardiovascular risk",
      effort: "low",
      category: "Cardiovascular risk",
      selected: false,
    });
  }

  // Cancer prevention
  if (riskMap.find((r) => r.category === "cancer" && r.level !== "low")) {
    suggestions.push({
      id: "cancer_screening",
      testName: "Age-appropriate cancer screening",
      why: "Based on family history and risk factors",
      effort: "med",
      category: "Cancer prevention",
      selected: false,
    });
    suggestions.push({
      id: "genetic_counseling",
      testName: "Genetic counseling referral",
      why: "Strong family history warrants evaluation",
      effort: "high",
      category: "Cancer prevention",
      selected: false,
    });
  }

  // Metabolic baseline
  if (riskMap.find((r) => r.category === "metabolic" && r.level !== "low")) {
    suggestions.push({
      id: "metabolic_panel",
      testName: "Comprehensive Metabolic Panel",
      why: "Baseline metabolic assessment",
      effort: "low",
      category: "Metabolic baseline",
      selected: false,
    });
    suggestions.push({
      id: "hba1c",
      testName: "HbA1c",
      why: "Screen for prediabetes/diabetes",
      effort: "low",
      category: "Metabolic baseline",
      selected: false,
    });
    suggestions.push({
      id: "insulin_fasting",
      testName: "Fasting Insulin",
      why: "Assess insulin resistance",
      effort: "low",
      category: "Metabolic baseline",
      selected: false,
    });
  }

  // Vascular imaging
  if (riskMap.find((r) => (r.category === "cardiovascular" || r.category === "venous") && r.level !== "low")) {
    suggestions.push({
      id: "carotid_ultrasound",
      testName: "Carotid Artery Ultrasound",
      why: "Assess vascular health and plaque burden",
      effort: "med",
      category: "Vascular imaging",
      selected: false,
    });
    suggestions.push({
      id: "cac_scan",
      testName: "Coronary Artery Calcium (CAC) Scan",
      why: "Quantify coronary atherosclerosis",
      effort: "med",
      category: "Vascular imaging",
      selected: false,
    });
  }

  return suggestions;
}
