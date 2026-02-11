"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface MetabolicTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function MetabolicTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: MetabolicTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const hasDiabetes = /(diabetes|diabetic|blood sugar|glucose)/i.test(narrative);
  const hasDiet = /(diet|eating|meal|nutrition|food|eating window|meals)/i.test(narrative);
  const hasExercise = /(exercise|workout|activity|regular exercise)/i.test(narrative);
  
  let summary = "";
  if (!hasDiabetes) summary += "No metabolic risk factors identified yet. ";
  if (hasDiet) summary += "Diet appears structured. ";
  if (hasExercise) summary += "Regular exercise reported.";
  if (!hasExercise && hasDiet) summary += "Exercise patterns not fully documented.";
  
  if (!summary) summary = "Metabolic factors under review.";
  
  // Generate blocks
  const hasGDM = /(gdm|gestational diabetes)/i.test(narrative);
  const hasWeightChange = /(weight.*change|weight.*stable|weight.*gain|weight.*loss)/i.test(narrative);
  const mealsPerDay = narrative.match(/(\d+)\s*(meal|meals)/i)?.[1] || null;
  const eatingWindow = narrative.match(/(\d+\.?\d*)\s*(hour|hr|h).*window/i)?.[1] || null;
  
  const blocks = [
    {
      label: "Diabetes",
      value: hasDiabetes ? "Yes" : "No",
      status: (hasDiabetes ? "captured" : "missing") as const,
    },
    {
      label: "GDM",
      value: hasGDM ? "Yes" : "No",
      status: (hasGDM ? "captured" : "missing") as const,
    },
    {
      label: "Weight changes",
      value: hasWeightChange ? (/(stable)/i.test(narrative) ? "Stable" : "Noted") : "Unknown",
      status: (hasWeightChange ? "captured" : "missing") as const,
    },
    {
      label: "Meals/day",
      value: mealsPerDay ? `${mealsPerDay}` : "Unknown",
      status: (mealsPerDay ? "captured" : "missing") as const,
    },
    {
      label: "Eating window",
      value: eatingWindow ? `~${eatingWindow}h` : "Unknown",
      status: (eatingWindow ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const hasLean = /(lean|thin|skinny)/i.test(narrative);
  const hasSedentary = /(sedentary|sitting|inactive)/i.test(narrative);
  const hasFamilyCVD = /(father|mother|parent|family).*(heart|cardiac|mi|stroke)/i.test(narrative);
  
  const suggestions = [];
  if (hasLean && hasSedentary && hasFamilyCVD) {
    suggestions.push({
      text: "Lean phenotype + family CVD → IR screening still reasonable",
      why: "Lean but sedentary pattern with CVD risk suggests possible IR",
      action: {
        label: "Add to Orders draft",
        onClick: () => {
          const metabolicDiag = intakeData.suggestedDiagnostics.find(
            d => d.category === "Metabolic baseline"
          );
          if (metabolicDiag) {
            onUpdateIntakeData({
              suggestedDiagnostics: intakeData.suggestedDiagnostics.map(d =>
                d.id === metabolicDiag.id ? { ...d, selected: true } : d
              ),
            });
          }
        },
      },
    });
  } else {
    suggestions.push({
      text: "No immediate metabolic red flags.",
      why: "Metabolic risk factors appear manageable",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Metabolic risk reviewed",
    "Key lifestyle factors",
    "Bundle selected/declined",
  ];
  
  return (
    <div className="space-y-6">
      <AutoSummaryBlock summary={summary} hint={hint} />
      
      {/* Structured Confirmation Blocks */}
      <div>
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-3">
          Confirmation
        </h3>
        <div className="space-y-2">
          {blocks.map((block, idx) => (
            <StructuredBlock
              key={idx}
              label={block.label}
              value={block.value}
              status={block.status}
              onEdit={() => onJumpToOverview("metabolic")}
            />
          ))}
        </div>
      </div>
      
      {/* Decision Support */}
      <QuietDecisionSupport suggestions={suggestions} />
      
      {/* What Will Be Documented */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-[11px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
          What will be documented
        </h3>
        <div className="space-y-1.5">
          {documentationItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] leading-[16px] text-gray-600">
              <span className="text-gray-400 flex-shrink-0">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




