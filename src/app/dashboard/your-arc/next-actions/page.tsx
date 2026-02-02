"use client";

import { GlowCard } from "@/components/ui/GlowCard";

type ActionPriority = "recommended-now" | "recommended-later" | "monitor-only" | "nothing-needed";

interface NextAction {
  id: string;
  priority: ActionPriority;
  title: string;
  category: string;
  trigger: string;
  context: string;
  timingLogic: string;
  whatToDoNext: string;
  timeWindow: string;
  basedOn: string;
}

const nextActions: NextAction[] = [
  // Section A: Recommended now
  {
    id: "crp-repeat",
    priority: "recommended-now",
    title: "CRP repeat check",
    category: "Blood work",
    trigger: "CRP spiked once in last panel (3.2 mg/L, up from 1.8 mg/L)",
    context: "All other inflammation markers (ESR, fibrinogen) remained stable and within normal range",
    timingLogic: "8-week window allows confirmation of whether this is a trend or isolated elevation. Too soon risks noise, too late delays detection if trend is real.",
    whatToDoNext: "Repeat inflammation markers panel in 8 weeks to confirm trend",
    timeWindow: "8 weeks",
    basedOn: "Based on your last results from Dec 15, 2024",
  },
  {
    id: "bp-monitoring",
    priority: "recommended-now",
    title: "Blood pressure home monitoring",
    category: "Vitals",
    trigger: "Borderline readings in clinic (128/82 mmHg)",
    context: "Previous home readings were consistently normal (118-122/70-75 mmHg)",
    timingLogic: "14-day home monitoring period confirms baseline and rules out white coat effect. Clinic readings may be elevated due to visit anxiety.",
    whatToDoNext: "Monitor BP at home twice daily for 14 days, then review results",
    timeWindow: "Within 2 weeks",
    basedOn: "Based on your last clinic visit on Nov 5, 2024",
  },
  {
    id: "dental-cleaning",
    priority: "recommended-now",
    title: "Dental cleaning",
    category: "Dental",
    trigger: "Gingival inflammation noted at last visit (Oct 1, 2024)",
    context: "Previous two visits were clean with no inflammation findings",
    timingLogic: "6-month interval recommended due to gingival findings. Standard annual cleaning insufficient when inflammation is present.",
    whatToDoNext: "Schedule dental cleaning and exam within 6 months of last visit",
    timeWindow: "Within 6 months",
    basedOn: "Based on your last dental exam on Oct 1, 2024",
  },

  // Section B: Recommended later
  {
    id: "hba1c-recheck",
    priority: "recommended-later",
    title: "HbA1c recheck",
    category: "Blood work",
    trigger: "HbA1c increased slightly from 5.2% to 5.4% between May and January panels",
    context: "Fasting glucose remained stable (92 mg/dL), lipid panel stable, no other metabolic changes",
    timingLogic: "6-month window allows confirmation of trend without over-testing. Change is small and within normal range, so immediate action not needed.",
    whatToDoNext: "Repeat comprehensive metabolic panel in 6 months to confirm or dismiss trend",
    timeWindow: "6 months",
    basedOn: "Based on your last results from Jan 8, 2025",
  },
  {
    id: "lipid-panel",
    priority: "recommended-later",
    title: "Lipid panel",
    category: "Blood work",
    trigger: "Lipid panel stable across 3 consecutive panels (May, August, January)",
    context: "All values consistent: Total cholesterol 180-185 mg/dL, LDL 105-110 mg/dL, HDL 63-65 mg/dL",
    timingLogic: "12-month interval appropriate for stable values. No change detected across 8 months, so annual monitoring is sufficient.",
    whatToDoNext: "Routine lipid panel in 12 months to continue monitoring",
    timeWindow: "12 months",
    basedOn: "Based on your last results from Jan 8, 2025",
  },
  {
    id: "tdap-booster",
    priority: "recommended-later",
    title: "Tdap booster",
    category: "Vaccination",
    trigger: "Tdap last given 9 years ago (Sep 15, 2015)",
    context: "Standard 10-year interval for Tdap vaccination",
    timingLogic: "Due within next 12 months based on 10-year standard interval. Not urgent but should be completed this year.",
    whatToDoNext: "Schedule Tdap booster this year",
    timeWindow: "This year",
    basedOn: "Based on your vaccination record from Sep 15, 2015",
  },
  {
    id: "ultrasound-followup",
    priority: "recommended-later",
    title: "Abdominal ultrasound follow-up",
    category: "Imaging",
    trigger: "Baseline ultrasound normal (Oct 18, 2024)",
    context: "No abnormalities detected, all organs normal appearance",
    timingLogic: "Baseline established. No follow-up needed unless clinically indicated. Routine screening not recommended for normal baseline.",
    whatToDoNext: "No routine follow-up needed. Repeat only if symptoms develop or clinically indicated",
    timeWindow: "No routine follow-up",
    basedOn: "Based on your last imaging from Oct 18, 2024",
  },

  // Section C: Monitor only
  {
    id: "sleep-pattern",
    priority: "monitor-only",
    title: "Sleep pattern consistency",
    category: "Wearables",
    trigger: "Sleep consistency improved over 10 weeks (variability decreased 23%)",
    context: "Recovery metrics trending positive, HRV stable despite increased activity",
    timingLogic: "Positive trend detected. Continue monitoring to ensure sustained improvement before making changes.",
    whatToDoNext: "Continue tracking sleep consistency. No intervention needed at this time",
    timeWindow: "Monitor only",
    basedOn: "Based on your wearable data from Dec 10, 2024",
  },
  {
    id: "metabolic-drift",
    priority: "monitor-only",
    title: "Metabolic marker drift",
    category: "Blood work",
    trigger: "HbA1c slight increase (5.2% to 5.4%) while fasting glucose stable",
    context: "Change is within normal range, no other metabolic markers showing concern",
    timingLogic: "Early pattern forming but not clinically actionable yet. Monitor for progression before intervention.",
    whatToDoNext: "Continue monitoring. Recheck in 6 months to assess trend progression",
    timeWindow: "Monitor for 6 months",
    basedOn: "Based on your last results from Jan 8, 2025",
  },
  {
    id: "inflammation-trend",
    priority: "monitor-only",
    title: "Inflammation trend",
    category: "Blood work",
    trigger: "hsCRP gradually rising over 18 months across 7 lab panels",
    context: "Individual values remained within reference range at each test. Pattern only visible longitudinally",
    timingLogic: "Longitudinal pattern detected but values still within normal. Monitor for progression before action.",
    whatToDoNext: "Continue monitoring. Review at next routine check-in",
    timeWindow: "Monitor ongoing",
    basedOn: "Based on your longitudinal lab results from May 2024 to Jan 2025",
  },

  // Section D: Nothing needed right now
  {
    id: "hormone-panel",
    priority: "nothing-needed",
    title: "Hormone panel",
    category: "Blood work",
    trigger: "Hormone panel normal (Nov 20, 2024)",
    context: "All values within optimal ranges: TSH, T4, cortisol, testosterone all normal",
    timingLogic: "Normal values with no concerning trends. Routine monitoring in 12 months is appropriate.",
    whatToDoNext: "No action needed this quarter. Next routine panel in 12 months",
    timeWindow: "No action this quarter",
    basedOn: "Based on your last results from Nov 20, 2024",
  },
  {
    id: "cardiology-followup",
    priority: "nothing-needed",
    title: "Cardiology follow-up",
    category: "Specialist",
    trigger: "Cardiology consult normal (Nov 5, 2024)",
    context: "ECG normal, blood pressure normal, lipid trends stable, no cardiovascular concerns",
    timingLogic: "Last consult normal with stable trends. No follow-up needed unless symptoms develop.",
    whatToDoNext: "No follow-up needed. Continue routine monitoring",
    timeWindow: "No action needed",
    basedOn: "Based on your last consult on Nov 5, 2024",
  },
  {
    id: "imaging-routine",
    priority: "nothing-needed",
    title: "Routine imaging screening",
    category: "Imaging",
    trigger: "Baseline abdominal ultrasound normal (Oct 18, 2024)",
    context: "No abnormalities detected, all organs normal",
    timingLogic: "Normal baseline with no clinical indication for routine follow-up. Repeat only if clinically indicated.",
    whatToDoNext: "No routine imaging needed. Continue standard care",
    timeWindow: "No action this quarter",
    basedOn: "Based on your last imaging from Oct 18, 2024",
  },
];

const sectionConfig: Record<ActionPriority, { title: string; description: string }> = {
  "recommended-now": {
    title: "Recommended now",
    description: "Actions that should be taken within the next few weeks",
  },
  "recommended-later": {
    title: "Recommended later",
    description: "Actions scheduled for the coming months based on timing logic",
  },
  "monitor-only": {
    title: "Monitor only",
    description: "Trends to watch without immediate intervention",
  },
  "nothing-needed": {
    title: "Nothing needed right now",
    description: "Categories with no action required this quarter",
  },
};

export default function NextActionsPage() {
  const sections: ActionPriority[] = ["recommended-now", "recommended-later", "monitor-only", "nothing-needed"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Next actions</h1>
        <p className="text-gray-400">Concierge reasoning based on your last checks</p>
      </div>

      {/* Sections */}
      {sections.map((sectionPriority, sectionIndex) => {
        const sectionActions = nextActions.filter((action) => action.priority === sectionPriority);
        const config = sectionConfig[sectionPriority];

        if (sectionActions.length === 0) return null;

        return (
          <div
            key={sectionPriority}
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">{config.title}</h2>
              <p className="text-sm text-gray-400">{config.description}</p>
            </div>

            <div className="space-y-3">
              {sectionActions.map((action, actionIndex) => (
                <div
                  key={action.id}
                >
                  <GlowCard className="p-5">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-semibold text-white">{action.title}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-400">
                              {action.category}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                sectionPriority === "recommended-now"
                                  ? "bg-amber-500/10 text-amber-400"
                                  : sectionPriority === "recommended-later"
                                  ? "bg-[#4DEECD]/10 text-[#4DEECD]"
                                  : sectionPriority === "monitor-only"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "bg-green-500/10 text-green-400"
                              }`}
                            >
                              {action.timeWindow}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 italic">{action.basedOn}</p>
                        </div>
                      </div>

                      {/* Trigger */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Trigger</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{action.trigger}</p>
                      </div>

                      {/* Context */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Context</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{action.context}</p>
                      </div>

                      {/* Timing Logic */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Timing logic</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{action.timingLogic}</p>
                      </div>

                      {/* What to do next */}
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">What to do next</p>
                        <p className="text-sm text-[#4DEECD] font-medium leading-relaxed">{action.whatToDoNext}</p>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

