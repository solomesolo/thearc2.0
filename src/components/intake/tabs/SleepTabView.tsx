"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface SleepTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function SleepTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: SleepTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const sleepDuration = narrative.match(/(\d+)\s*(hour|hr|h)/i)?.[1] || null;
  const hasSnoring = /(snoring|snore)/i.test(narrative);
  const hasFatigue = /(fatigue|tired|exhausted)/i.test(narrative);
  
  let summary = "";
  if (sleepDuration) summary += `Sleep duration ~${sleepDuration} hours. `;
  else summary += "Sleep duration not documented. ";
  if (hasSnoring && hasFatigue) summary += "Snoring and fatigue reported.";
  else if (hasSnoring) summary += "Snoring reported.";
  else if (hasFatigue) summary += "Fatigue reported.";
  else summary += "No sleep red flags documented.";
  
  // Generate blocks
  const hasAwakenings = /(awake|wake.*night|interrupted)/i.test(narrative);
  
  const blocks = [
    {
      label: "Duration",
      value: sleepDuration ? `~${sleepDuration} hours` : "Unknown",
      status: (sleepDuration ? "captured" : "missing") as const,
    },
    {
      label: "Awakenings",
      value: hasAwakenings ? "Reported" : "Not reported",
      status: (hasAwakenings ? "captured" : "missing") as const,
    },
    {
      label: "Snoring",
      value: hasSnoring ? "Reported" : "Not reported",
      status: (hasSnoring ? "captured" : "missing") as const,
    },
    {
      label: "Fatigue",
      value: hasFatigue ? "Reported" : "Not reported",
      status: (hasFatigue ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const suggestions = [];
  if (hasSnoring && hasFatigue) {
    suggestions.push({
      text: "Consider evaluating if symptoms continue — not urgent.",
      why: "Snoring + fatigue may warrant sleep study discussion if persistent",
    });
  } else {
    suggestions.push({
      text: "Sleep patterns appear stable.",
      why: "No immediate sleep red flags identified",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Sleep reviewed stable/unstable",
    "Risks asked",
    "Monitor vs investigate",
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
              onEdit={() => onJumpToOverview("sleep")}
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




