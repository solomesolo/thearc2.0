"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabCancerPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
}

export default function TabCancerPanel({ intakeData, onUpdateIntakeData }: TabCancerPanelProps) {
  const cancerRisk = intakeData.riskMap.find((r) => r.category === "cancer");

  const items = [
    { id: "family_cancer", label: "Family cancer types + ages", value: "CRC: mother (~50), —" },
    { id: "prior_screenings", label: "Prior screenings status", value: "Colonoscopy: —" },
    { id: "red_flags", label: "Red flag symptom checklist", value: "Asked/not asked" },
    { id: "anxiety", label: "Patient anxiety/concerns", value: "—" },
  ];

  const quickActions = [
    {
      id: "add_family_cancer",
      label: "Add family cancer event",
      onClick: () => alert("Add family cancer event (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "update_screening",
      label: "Update screening status",
      onClick: () => alert("Update screening status (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_screening_plan",
      label: "Add screening plan",
      onClick: () => alert("Add screening plan (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_reminders",
      label: "Add recommended screening reminders to Plan",
      onClick: () => alert("Add to Plan (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    {
      id: "early_screening",
      text: "Mother CRC ~50: consider earlier baseline colon screening discussion",
      type: "prompt" as const,
    },
    {
      id: "red_flags_checklist",
      text: "Red flags asked checklist (non-blocking)",
      type: "checklist" as const,
    },
  ];

  const documentationAnchors = [
    { id: "family_cancer", label: "Family cancer history + age", status: "pending" },
    { id: "screening_status", label: "Screening status", status: "pending" },
    { id: "planned_steps", label: "Planned next steps + rationale", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Screening + family cancer intake"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}


