"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabNeuroPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
}

export default function TabNeuroPanel({ intakeData, onUpdateIntakeData }: TabNeuroPanelProps) {
  const neuroRisk = intakeData.riskMap.find((r) => r.category === "neuro_cognitive");

  const items = [
    { id: "brain_fog", label: "Brain fog", value: "Not asked" },
    { id: "mood", label: "Mood", value: "Stable / low / anxious" },
    { id: "attention", label: "Attention issues", value: "Not asked" },
    { id: "stress_load", label: "Stress load", value: "Low/mod/high" },
    { id: "family_neuro", label: "Family neuro history captured?", value: "No" },
  ];

  const quickActions = [
    {
      id: "add_cognition_note",
      label: "Add cognition baseline note",
      onClick: () => alert("Add cognition note (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "quick_stress",
      label: "Quick stress assessment",
      onClick: () => alert("Stress assessment (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "flag_burnout",
      label: "Flag burnout risk",
      onClick: () => alert("Add to Plan (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_coping",
      label: "Add coping resource suggestion",
      onClick: () => alert("Add to patient summary (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    ...(neuroRisk && neuroRisk.level !== "low"
      ? [
          {
            id: "resilience",
            text: "Suggest resilience practices if stress overload",
            type: "prompt" as const,
          },
        ]
      : []),
    {
      id: "screen_prompt",
      text: "Prompt depression/anxiety screen only if indicated",
      type: "info" as const,
    },
  ];

  const documentationAnchors = [
    { id: "neuro_baseline", label: "Neuro/cognition baseline", status: "pending" },
    { id: "stress_overload", label: "Stress overload acknowledged", status: "not_started" },
    { id: "minimal_plan", label: "Minimal plan", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Cognition / mental health snapshot"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}




