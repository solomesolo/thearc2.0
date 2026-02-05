"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface FitnessTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function FitnessTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: FitnessTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const hasStrength = /(strength|weight.*training|resistance|lifting)/i.test(narrative);
  const hasCardio = /(cardio|running|cycling|swimming|aerobic|zone 2)/i.test(narrative);
  const hasWalking = /(walking|steps)/i.test(narrative);
  const walkingDuration = narrative.match(/(\d+)\s*(min|minute)/i)?.[1] || null;
  
  let summary = "";
  if (hasStrength) summary += "Regular strength training reported. ";
  if (!hasCardio) summary += "Cardio frequency unclear.";
  else summary += "Cardio activity noted.";
  if (hasWalking && walkingDuration) summary += ` Walking: ${walkingDuration} min.`;
  
  if (!summary) summary = "Fitness patterns under review.";
  
  // Generate blocks
  const strengthFreq = narrative.match(/(\d+)\s*(x|times).*(week|wk)/i)?.[1] || null;
  
  const blocks = [
    {
      label: "Strength",
      value: strengthFreq ? `${strengthFreq}x/week` : (hasStrength ? "Reported" : "Unknown"),
      status: (hasStrength ? "captured" : "missing") as const,
    },
    {
      label: "Cardio",
      value: hasCardio ? "Reported" : "Minimal/Unknown",
      status: (hasCardio ? "captured" : "missing") as const,
    },
    {
      label: "Walking",
      value: walkingDuration ? `${walkingDuration} min` : (hasWalking ? "Reported" : "Unknown"),
      status: (hasWalking ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const hasCVD = /(father|mother|parent|family).*(heart|cardiac|mi|stroke)/i.test(narrative);
  
  const suggestions = [];
  if (hasCVD && !hasCardio) {
    suggestions.push({
      text: "Given cardiovascular context, light Zone 2 may help.",
      why: "CVD risk + no cardio mention suggests opportunity for cardiovascular fitness",
    });
  } else {
    suggestions.push({
      text: "Fitness patterns appear adequate.",
      why: "Activity levels seem appropriate",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Fitness baseline",
    "Leverage points",
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
              onEdit={() => onJumpToOverview("fitness")}
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


