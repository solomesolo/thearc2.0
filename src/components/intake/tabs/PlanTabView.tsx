"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface PlanTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function PlanTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: PlanTabViewProps) {
  // Generate summary
  const selectedLabs = intakeData.suggestedDiagnostics.filter(d => d.selected);
  const hasFollowUp = intakeData.openQuestions?.includes("Visit 2") || intakeData.openQuestions?.includes("follow-up");
  
  let summary = "Visit 1 Next Steps (Draft): ";
  summary += `Labs ${selectedLabs.length > 0 ? `${selectedLabs.length} selected` : "pending selection"}. `;
  summary += "Imaging none selected. ";
  summary += hasFollowUp ? "Follow-up discussed." : "Follow-up not scheduled.";
  
  // Generate blocks
  const blocks = [
    {
      label: "Labs selected",
      value: selectedLabs.length > 0 ? `${selectedLabs.length} selected` : "None",
      status: (selectedLabs.length > 0 ? "captured" : "missing") as const,
    },
    {
      label: "Imaging selected",
      value: "None",
      status: "missing" as const,
    },
    {
      label: "Follow-up plan",
      value: hasFollowUp ? "Discussed" : "Not scheduled",
      status: (hasFollowUp ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const suggestions = [];
  if (!hasFollowUp) {
    suggestions.push({
      text: "No follow-up planned yet.",
      why: "Follow-up scheduling helps ensure continuity of care",
    });
    suggestions.push({
      text: "Visit 2 usually scheduled after results return.",
      why: "Allows time for results review and planning",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Labs selected",
    "Imaging selected",
    "Follow-up plan (Visit 2 timing)",
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
              onEdit={() => onJumpToOverview("plan")}
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




