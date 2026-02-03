"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface CardioTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function CardioTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: CardioTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const hasFamilyMI = /(father|mother|parent|family).*(mi|myocardial infarction|heart attack)/i.test(narrative);
  const hasFamilyStroke = /(father|mother|parent|family).*(stroke)/i.test(narrative);
  const hasHypertension = /(hypertension|high blood pressure|bp|blood pressure)/i.test(narrative);
  const hasSymptoms = /(chest pain|dyspnea|shortness of breath|angina)/i.test(narrative);
  
  let summary = "Patient reports ";
  if (hasFamilyMI) summary += "family history of myocardial infarction. ";
  if (hasSymptoms) summary += "Cardiovascular symptoms mentioned. ";
  if (!hasHypertension) summary += "No prior hypertension diagnosis documented.";
  else summary += "Hypertension history noted.";
  
  // Generate blocks
  const hasChestPain = /(chest pain)/i.test(narrative);
  const hasDyspnea = /(dyspnea|shortness of breath)/i.test(narrative);
  const hasExerciseTolerance = /(exercise|tolerance|exertion)/i.test(narrative);
  const hasBP = /(blood pressure|bp)/i.test(narrative);
  const hasHomeBP = /(home.*bp|bp.*log)/i.test(narrative);
  
  const blocks = [
    {
      label: "MI",
      value: hasFamilyMI ? "Yes" : "No",
      status: (hasFamilyMI ? "captured" : "missing") as const,
    },
    {
      label: "Stroke",
      value: hasFamilyStroke ? "Yes" : "No",
      status: (hasFamilyStroke ? "captured" : "missing") as const,
    },
    {
      label: "Hypertension",
      value: hasHypertension ? "Yes" : "Unknown",
      status: (hasHypertension ? "captured" : "missing") as const,
    },
    {
      label: "Chest pain",
      value: hasChestPain ? "Yes" : "No",
      status: (hasChestPain ? "captured" : "missing") as const,
    },
    {
      label: "Dyspnea on exertion",
      value: hasDyspnea ? "Reported" : "Not reported",
      status: (hasDyspnea ? "captured" : "missing") as const,
    },
    {
      label: "Exercise tolerance",
      value: hasExerciseTolerance ? "Good" : "Unknown",
      status: (hasExerciseTolerance ? "captured" : "missing") as const,
    },
    {
      label: "BP",
      value: hasBP ? "Measured" : "Not yet measured",
      status: (hasBP ? "captured" : "missing") as const,
    },
    {
      label: "Home BP log",
      value: hasHomeBP ? "Started" : "Not started",
      status: (hasHomeBP ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const hasAge = /\d+\s*(year|yr|age|old)/i.test(narrative);
  const suggestions = [];
  
  if ((hasFamilyMI || hasFamilyStroke) && !hasAge) {
    suggestions.push({
      text: "Age of MI missing → improves risk stratification",
      why: "Documenting age of onset improves risk stratification",
      action: {
        label: "Add to Orders draft",
        onClick: () => {
          // Add note to openQuestions for family history age documentation
          const note = "[Cardiovascular] Document family history ages";
          onUpdateIntakeData({
            openQuestions: intakeData.openQuestions
              ? `${intakeData.openQuestions}\n${note}`
              : note,
          });
        },
      },
    });
  }
  
  if (hasFamilyMI || hasFamilyStroke) {
    suggestions.push({
      text: "Family MI + stroke history → advanced lipid baseline reasonable",
      why: "Strong family history warrants comprehensive lipid assessment",
      action: {
        label: "Add to Orders draft",
        onClick: () => {
          const cardioDiag = intakeData.suggestedDiagnostics.find(
            d => d.category === "Cardiovascular risk"
          );
          if (cardioDiag) {
            onUpdateIntakeData({
              suggestedDiagnostics: intakeData.suggestedDiagnostics.map(d =>
                d.id === cardioDiag.id ? { ...d, selected: true } : d
              ),
            });
          }
        },
      },
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Family CVD history + ages",
    "BP plan",
    "Symptoms denied/confirmed",
    "CVD bundle selected/declined + rationale",
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
              onEdit={() => onJumpToOverview("cardiovascular")}
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

