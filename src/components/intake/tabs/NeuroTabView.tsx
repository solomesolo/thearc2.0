"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface NeuroTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function NeuroTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: NeuroTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const hasCognitive = /(brain fog|memory|cognition|cognitive|forgetful)/i.test(narrative);
  const hasStress = /(stress|anxiety|mood|depression|mental health)/i.test(narrative);
  const stressLevel = /(high stress|moderate stress|low stress)/i.test(narrative) 
    ? (/(high stress)/i.test(narrative) ? "high" : /(moderate stress)/i.test(narrative) ? "moderate" : "low")
    : null;
  
  let summary = "";
  if (!hasCognitive) summary += "No cognitive or neurologic symptoms reported. ";
  if (hasStress) {
    summary += `Stress load ${stressLevel || "moderate"}.`;
  } else {
    summary += "Stress level not documented.";
  }
  
  // Generate blocks
  const hasMoodSymptoms = /(mood|depression|anxiety)/i.test(narrative);
  
  const blocks = [
    {
      label: "Brain fog/memory",
      value: hasCognitive ? "Reported" : "Not reported",
      status: (hasCognitive ? "captured" : "missing") as const,
    },
    {
      label: "Stress level",
      value: stressLevel || "Unknown",
      status: (stressLevel ? "captured" : "missing") as const,
    },
    {
      label: "Mood symptoms",
      value: hasMoodSymptoms ? "Reported" : "Not reported",
      status: (hasMoodSymptoms ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const hasHighStress = /(high stress|significant stress)/i.test(narrative);
  const hasPoorSleep = /(poor sleep|insomnia|sleep.*problem)/i.test(narrative);
  
  const suggestions = [];
  if (hasHighStress && hasPoorSleep) {
    suggestions.push({
      text: "High stress + poor sleep may affect resilience",
      why: "Stress and sleep quality impact overall health and resilience",
    });
  } else {
    suggestions.push({
      text: "No neuro red flags at intake.",
      why: "Neurocognitive factors appear stable",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Neuro/cognition baseline",
    "Stress overload acknowledged",
    "Minimal plan",
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
              onEdit={() => onJumpToOverview("neuro")}
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



