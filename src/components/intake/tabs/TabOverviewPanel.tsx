"use client";

import React, { useState } from "react";
import { Visit1IntakeData, SuggestedDiagnostic } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";
import OrdersDraftMini from "../shared/OrdersDraftMini";
import ReviewSelectedModal from "../ReviewSelectedModal";

interface TabOverviewPanelProps {
  intakeData: Visit1IntakeData;
  patient: any;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onReviewOrders: () => void;
}

export default function TabOverviewPanel({
  intakeData,
  patient,
  onUpdateIntakeData,
  onReviewOrders,
}: TabOverviewPanelProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const selectedDiagnostics = intakeData.suggestedDiagnostics.filter((d) => d.selected);

  // Patient goals (top 3)
  const topGoals = intakeData.patientGoals.slice(0, 3);

  // Patient story status
  const storyStatus = intakeData.patientStory.narrative
    ? intakeData.patientStory.narrative.length > 0
      ? `Updated ${Math.floor((Date.now() - (intakeData.patientStory.lastSavedISO ? new Date(intakeData.patientStory.lastSavedISO).getTime() : Date.now())) / 1000 / 60)}m ago`
      : "Empty"
    : "Not started";

  // Baseline risk tiles mini-strip
  const riskSummary = intakeData.riskMap.map((tile) => ({
    category: tile.category,
    level: tile.level,
  }));

  // What we will decide today checklist
  const decisionChecklist = [
    { id: "diagnostics", label: "Diagnostics to order", status: selectedDiagnostics.length > 0 ? "pending" : "not_started" },
    { id: "risks", label: "Top risks identified", status: intakeData.riskMap.some((r) => r.level !== "low") ? "pending" : "not_started" },
    { id: "plan", label: "Next steps planned", status: "not_started" },
  ];

  const items = [
    { id: "goals", label: "Patient goals", value: topGoals.length > 0 ? topGoals.join(", ") : "None set" },
    { id: "story", label: "Patient story", value: storyStatus },
    {
      id: "risks",
      label: "Risk summary",
      value: riskSummary.map((r) => `${r.category}: ${r.level}`).join(", ") || "All low",
    },
  ];

  const quickActions = [
    {
      id: "add_goal",
      label: "Add goal",
      onClick: () => {
        const newGoal = prompt("Enter patient goal:");
        if (newGoal) {
          onUpdateIntakeData({ patientGoals: [...intakeData.patientGoals, newGoal] });
        }
      },
      variant: "outline" as const,
    },
    {
      id: "mark_reviewed",
      label: "Mark section reviewed",
      onClick: () => alert("Section review dropdown (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_highlight",
      label: "Add highlight",
      onClick: () => alert("Add highlight modal (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_hypothesis",
      label: "Add hypothesis",
      onClick: () => {
        const hypothesis = prompt("Enter hypothesis:");
        if (hypothesis) {
          onUpdateIntakeData({ openQuestions: intakeData.openQuestions ? `${intakeData.openQuestions}\n${hypothesis}` : hypothesis });
        }
      },
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    {
      id: "entity_extraction",
      text: "Entity extraction running...",
      type: "info" as const,
    },
    ...(intakeData.patientGoals.length === 0
      ? [{ id: "goals_missing", text: "Patient goals not captured", type: "prompt" as const }]
      : []),
    ...(intakeData.riskMap.every((r) => r.level === "low")
      ? [{ id: "risks_low", text: "No elevated risks identified yet", type: "info" as const }]
      : []),
  ];

  const documentationAnchors = [
    { id: "goals", label: "Goals", status: intakeData.patientGoals.length > 0 ? "captured" : "pending" },
    { id: "story", label: "Patient story", status: intakeData.patientStory.narrative ? "captured" : "pending" },
    { id: "risks", label: "Top risks", status: intakeData.riskMap.some((r) => r.level !== "low") ? "captured" : "pending" },
    { id: "constraints", label: "Constraints (kids/work)", status: "not_started" },
    { id: "next_steps", label: "Agreed next steps", status: "not_started" },
  ];

  return (
    <>
      <RightRailTabPanel
        title="What I should see"
        items={items}
        quickActions={quickActions}
        suggestions={suggestions}
        documentationAnchors={documentationAnchors}
      >
        {/* Decision checklist */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
            What we will decide today
          </h4>
          <div className="space-y-1.5">
            {decisionChecklist.map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-[12px] leading-[16px] text-gray-700">
                <input type="checkbox" className="w-3 h-3" disabled />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders draft mini */}
        {selectedDiagnostics.length > 0 && (
          <OrdersDraftMini
            selectedDiagnostics={selectedDiagnostics}
            onReview={() => setShowReviewModal(true)}
          />
        )}
      </RightRailTabPanel>

      {showReviewModal && (
        <ReviewSelectedModal
          selectedDiagnostics={selectedDiagnostics}
          onRemove={(id) => {
            const updated = intakeData.suggestedDiagnostics.map((d) => (d.id === id ? { ...d, selected: false } : d));
            onUpdateIntakeData({ suggestedDiagnostics: updated });
          }}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
}



