"use client";

import React from "react";
import { Visit1IntakeData, SuggestedDiagnostic } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";
import OrdersDraftMini from "../shared/OrdersDraftMini";

interface TabCardioPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onReviewOrders: () => void;
}

export default function TabCardioPanel({
  intakeData,
  onUpdateIntakeData,
  onReviewOrders,
}: TabCardioPanelProps) {
  // Extract CVD-related data from narrative or guided review
  const narrative = intakeData.patientStory.narrative.toLowerCase();
  const hasCVDMention = narrative.includes("heart") || narrative.includes("cardiac") || narrative.includes("chest");
  const cvdRisk = intakeData.riskMap.find((r) => r.category === "cardiovascular");

  const items = [
    { id: "family_events", label: "Family events + ages", value: "MI: father (age unknown), Stroke: —" },
    { id: "bp_status", label: "BP history", value: "Unknown" },
    { id: "smoking", label: "Smoking status", value: "Not asked" },
    { id: "symptoms", label: "Symptoms", value: "Chest pain: denied, Exertional dyspnea: —" },
  ];

  const quickActions = [
    {
      id: "add_family_event",
      label: "Add family event",
      onClick: () => alert("Add family event modal (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "mark_reviewed",
      label: "Mark risk factors reviewed",
      onClick: () => alert("Mark reviewed (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "start_bp_plan",
      label: "Start BP plan",
      onClick: () => alert("BP plan (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_cvd_bundle",
      label: "Add CVD baseline bundle to Orders draft",
      onClick: () => {
        // Add CVD diagnostics to selected
        const cvdDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.category === "Cardiovascular risk");
        const updated = intakeData.suggestedDiagnostics.map((d) => ({
          ...d,
          selected: cvdDiagnostics.some((cd) => cd.id === d.id) ? true : d.selected,
        }));
        onUpdateIntakeData({ suggestedDiagnostics: updated });
      },
      variant: "secondary" as const,
    },
    {
      id: "document_symptoms",
      label: "Document symptoms",
      onClick: () => alert("Document symptoms (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    ...(hasCVDMention && cvdRisk && cvdRisk.level !== "low"
      ? [
          {
            id: "advanced_lipids",
            text: "Consider advanced lipids if early MI family clustering",
            type: "prompt" as const,
          },
        ]
      : []),
    {
      id: "bp_workflow",
      text: "Recommend 7-day home BP log",
      type: "prompt" as const,
    },
    {
      id: "missing_ages",
      text: "Heart attack age unknown (father)",
      type: "prompt" as const,
    },
  ];

  const documentationAnchors = [
    { id: "family_cvd", label: "Family CVD history + ages", status: "pending" },
    { id: "bp_plan", label: "BP plan", status: "not_started" },
    { id: "symptoms", label: "Symptoms denied/confirmed", status: "pending" },
    { id: "cvd_bundle", label: "CVD bundle selected/declined + rationale", status: "not_started" },
  ];

  const selectedDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.selected && d.category === "Cardiovascular risk");

  return (
    <RightRailTabPanel
      title="CVD intake panel"
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

