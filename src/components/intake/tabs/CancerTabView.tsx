"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface CancerTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function CancerTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: CancerTabViewProps) {
  const narrative = intakeData.patientStory.narrative || "";
  
  // Generate summary
  const hasFamilyCRC = /(father|mother|parent|family).*(colon|colorectal|crc)/i.test(narrative);
  const hasPersonalCancer = /(personal.*cancer|had cancer|diagnosed.*cancer)/i.test(narrative);
  const hasScreening = /(colonoscopy|mammogram|screening|pap|psa)/i.test(narrative);
  
  let summary = "";
  if (hasFamilyCRC) summary += "Family history of colorectal cancer reported. ";
  if (!hasPersonalCancer) summary += "No personal cancer history. ";
  if (!hasScreening) summary += "Screening status not fully documented.";
  else summary += "Screening history noted.";
  
  if (!summary) summary = "Cancer risk factors under review.";
  
  // Generate blocks
  const hasFamilyBreast = /(father|mother|parent|family).*(breast.*cancer)/i.test(narrative);
  const hasOtherCancer = /(father|mother|parent|family).*(cancer|tumor)/i.test(narrative) && !hasFamilyCRC && !hasFamilyBreast;
  const hasColonoscopy = /(colonoscopy)/i.test(narrative);
  const hasMammography = /(mammogram|mammography)/i.test(narrative);
  
  const blocks = [
    {
      label: "CRC",
      value: hasFamilyCRC ? "Yes" : "No",
      status: (hasFamilyCRC ? "captured" : "missing") as const,
    },
    {
      label: "Breast",
      value: hasFamilyBreast ? "Yes" : "No",
      status: (hasFamilyBreast ? "captured" : "missing") as const,
    },
    {
      label: "Other",
      value: hasOtherCancer ? "Yes" : "No",
      status: (hasOtherCancer ? "captured" : "missing") as const,
    },
    {
      label: "Colonoscopy",
      value: hasColonoscopy ? "Done" : "Not done / Unknown",
      status: (hasColonoscopy ? "captured" : "missing") as const,
    },
    {
      label: "Mammography",
      value: hasMammography ? "Up to date" : "Not applicable / Unknown",
      status: (hasMammography ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const cancerAge = narrative.match(/(\d+).*(colon|colorectal|crc|age)/i)?.[1] || null;
  const suggestions = [];
  
  if (hasFamilyCRC) {
    if (cancerAge && parseInt(cancerAge) < 55) {
      suggestions.push({
        text: `Given family CRC around age ~${cancerAge}, earlier screening discussion is recommended.`,
        why: "Early family history may warrant earlier baseline screening",
      });
    } else {
      suggestions.push({
        text: "Given family CRC history, screening discussion is recommended.",
        why: "Family history warrants appropriate screening timing",
      });
    }
  }
  
  suggestions.push({
    text: "No urgent red flags identified.",
    why: "Cancer risk factors appear manageable",
  });
  
  // Generate documentation list
  const documentationItems = [
    "Family cancer history + age",
    "Screening status",
    "Planned next steps + rationale",
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
              onEdit={() => onJumpToOverview("cancer-screening")}
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




