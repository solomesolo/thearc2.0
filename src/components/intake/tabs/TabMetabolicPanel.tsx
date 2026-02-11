"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";
import OrdersDraftMini from "../shared/OrdersDraftMini";

interface TabMetabolicPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onReviewOrders: () => void;
}

export default function TabMetabolicPanel({
  intakeData,
  onUpdateIntakeData,
  onReviewOrders,
}: TabMetabolicPanelProps) {
  const metabolicRisk = intakeData.riskMap.find((r) => r.category === "metabolic");
  const narrative = intakeData.patientStory.narrative.toLowerCase();

  const items = [
    { id: "meal_timing", label: "Meal timing / eating window", value: "Not captured" },
    { id: "weight_history", label: "Weight history", value: "Stable" },
    { id: "gestational_diabetes", label: "Gestational diabetes history", value: "Not asked" },
    { id: "energy_crashes", label: "Energy crashes/cravings", value: "Not asked" },
    { id: "activity", label: "Activity summary", value: "From guided review" },
  ];

  const quickActions = [
    {
      id: "metabolic_reviewed",
      label: "Metabolic risk reviewed",
      onClick: () => alert("Mark reviewed (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_metabolic_bundle",
      label: "Add metabolic labs bundle to Orders draft",
      onClick: () => {
        const metabolicDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.category === "Metabolic baseline");
        const updated = intakeData.suggestedDiagnostics.map((d) => ({
          ...d,
          selected: metabolicDiagnostics.some((md) => md.id === d.id) ? true : d.selected,
        }));
        onUpdateIntakeData({ suggestedDiagnostics: updated });
      },
      variant: "secondary" as const,
    },
    {
      id: "note_dietary",
      label: "Note dietary pattern",
      onClick: () => alert("Dietary pattern (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_lifestyle_leverage",
      label: "Add lifestyle leverage point",
      onClick: () => alert("Add to Plan draft (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    ...(metabolicRisk && metabolicRisk.level !== "low"
      ? [
          {
            id: "ir_screen",
            text: "Suggest insulin resistance screen if risk present",
            type: "prompt" as const,
          },
        ]
      : []),
    {
      id: "mismatch",
      text: "Lean but sedentary + stressed (consider IR screen)",
      type: "info" as const,
    },
  ];

  const documentationAnchors = [
    { id: "metabolic_reviewed", label: "Metabolic risk reviewed", status: "pending" },
    { id: "lifestyle_factors", label: "Key lifestyle factors", status: "pending" },
    { id: "bundle", label: "Bundle selected/declined", status: "not_started" },
  ];

  const selectedDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.selected && d.category === "Metabolic baseline");

  return (
    <RightRailTabPanel
      title="Metabolic intake snapshot"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    >
      {selectedDiagnostics.length > 0 && (
        <OrdersDraftMini
          selectedDiagnostics={selectedDiagnostics}
          onReview={onReviewOrders}
        />
      )}
    </RightRailTabPanel>
  );
}




