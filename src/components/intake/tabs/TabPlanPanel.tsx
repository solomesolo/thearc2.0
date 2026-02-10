"use client";

import React from "react";
import { Visit1IntakeData, SuggestedDiagnostic } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabPlanPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
}

export default function TabPlanPanel({ intakeData, onUpdateIntakeData }: TabPlanPanelProps) {
  const selectedDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.selected);

  const items = [
    {
      id: "diagnostics",
      label: "Diagnostics to do",
      value: selectedDiagnostics.length > 0 ? `${selectedDiagnostics.length} selected` : "None",
    },
    { id: "patient_tasks", label: "What patient should do before Visit 2", value: "Not set" },
    { id: "results_comm", label: "Expectations on results communication", value: "Not set" },
  ];

  const quickActions = [
    {
      id: "generate_plan",
      label: "Generate patient-friendly plan",
      onClick: () => alert("Generate plan (to be implemented)"),
      variant: "primary" as const,
    },
    {
      id: "assign_tasks",
      label: "Assign tasks to team",
      onClick: () => alert("Assign tasks (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "choose_followup",
      label: "Choose follow-up type: Visit 2 data review",
      onClick: () => alert("Choose follow-up (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "set_timing",
      label: "Set follow-up timing",
      onClick: () => alert("Set timing (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    ...(selectedDiagnostics.length === 0
      ? [
          {
            id: "no_diagnostics",
            text: "No diagnostics selected yet",
            type: "info" as const,
          },
        ]
      : []),
    {
      id: "visit2_scheduling",
      text: "Visit 2 not scheduled yet",
      type: "prompt" as const,
    },
  ];

  const documentationAnchors = [
    { id: "ordered_tests", label: "Ordered tests", status: selectedDiagnostics.length > 0 ? "captured" : "pending" },
    { id: "prep_instructions", label: "Prep instructions", status: "not_started" },
    { id: "what_next", label: "What happens next", status: "not_started" },
    { id: "followup_timing", label: "Follow-up timing", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Visit 1 Next Steps Plan"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}



