"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabFitnessPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
}

export default function TabFitnessPanel({ intakeData, onUpdateIntakeData }: TabFitnessPanelProps) {
  const items = [
    { id: "strength", label: "Strength frequency", value: "Not captured" },
    { id: "cardio_gap", label: "Cardio gap indicator", value: "Not captured" },
    { id: "steps", label: "Steps/walking", value: "Not captured" },
    { id: "sitting", label: "Sitting time", value: "Not captured" },
    { id: "vein_support", label: "Vein-support habits", value: "Not captured" },
  ];

  const quickActions = [
    {
      id: "capture_routine",
      label: "Capture routine",
      onClick: () => alert("Capture routine (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "identify_gaps",
      label: "Identify gaps",
      onClick: () => alert("Zone 2 toggle (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_prescription",
      label: "Add movement prescription draft",
      onClick: () => alert("Add to Plan (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const cvdRisk = intakeData.riskMap.find((r) => r.category === "cardiovascular");
  const venousRisk = intakeData.riskMap.find((r) => r.category === "venous");

  const suggestions = [
    ...(cvdRisk && cvdRisk.level !== "low"
      ? [
          {
            id: "zone2",
            text: "Suggest Zone 2 1–2x/week if CVD risk high",
            type: "prompt" as const,
          },
        ]
      : []),
    ...(venousRisk && venousRisk.level !== "low"
      ? [
          {
            id: "calf_pump",
            text: "Suggest calf pump/leg elevation if varicosis",
            type: "prompt" as const,
          },
        ]
      : []),
  ];

  const documentationAnchors = [
    { id: "fitness_baseline", label: "Fitness baseline", status: "not_started" },
    { id: "leverage_points", label: "Leverage points", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Movement baseline snapshot"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}


