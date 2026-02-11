"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";
import StructuredBlock from "../shared/StructuredBlock";
import QuietDecisionSupport from "../shared/QuietDecisionSupport";

interface DocumentsTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function DocumentsTabView({
  intakeData,
  hint,
  onUpdateIntakeData,
  onJumpToOverview,
}: DocumentsTabViewProps) {
  // Generate summary
  const docCount = intakeData.documents?.count || 0;
  const summary = docCount > 0 
    ? `${docCount} document${docCount > 1 ? "s" : ""} uploaded. Review status pending.`
    : "No documents uploaded yet.";
  
  // Generate blocks
  const reviewedCount = intakeData.documents?.reviewedCount || 0;
  
  const blocks = [
    {
      label: "Uploaded docs",
      value: docCount > 0 ? `${docCount} document${docCount > 1 ? "s" : ""}` : "None",
      status: (docCount > 0 ? "captured" : "missing") as const,
    },
    {
      label: "Reviewed",
      value: reviewedCount > 0 ? `${reviewedCount}/${docCount} reviewed` : "None reviewed",
      status: (reviewedCount === docCount && docCount > 0 ? "captured" : "missing") as const,
    },
  ];
  
  // Generate decision support suggestions
  const hasFamilyDoc = intakeData.openQuestions?.includes("family history") || false;
  const suggestions = [];
  
  if (docCount > 0 && hasFamilyDoc) {
    suggestions.push({
      text: "Family history document uploaded — review recommended",
      why: "Family history documents provide important context for risk assessment",
    });
  }
  
  // Generate documentation list
  const documentationItems = [
    "Uploaded documents list",
    "Review status",
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
              onEdit={() => onJumpToOverview("documents")}
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




