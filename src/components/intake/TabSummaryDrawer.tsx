"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";

interface TabSummaryDrawerProps {
  tabId: string;
  intakeData: Visit1IntakeData;
  onClose: () => void;
  onEditInOverview: (sectionId: string) => void;
}

export default function TabSummaryDrawer({
  tabId,
  intakeData,
  onClose,
  onEditInOverview,
}: TabSummaryDrawerProps) {
  const generateSummary = (): { title: string; summary: string; editSectionId?: string } => {
    const narrative = intakeData.patientStory.narrative || "";
    
    switch (tabId) {
      case "cardiovascular": {
        const hasFamily = /(father|mother|parent|family).*(heart|cardiac|mi|stroke)/i.test(narrative);
        const hasBP = /(blood pressure|bp|hypertension)/i.test(narrative);
        const hasSymptoms = /(chest pain|dyspnea|shortness of breath)/i.test(narrative);
        
        let summary = "Cardiovascular intake summary:\n\n";
        if (hasFamily) summary += "• Family history mentioned\n";
        if (hasBP) summary += "• Blood pressure history noted\n";
        if (hasSymptoms) summary += "• Symptoms documented\n";
        if (!hasFamily && !hasBP && !hasSymptoms) summary += "No cardiovascular-specific details captured yet.\n";
        
        return {
          title: "Cardiovascular Summary",
          summary,
          editSectionId: "cardiovascular",
        };
      }
      
      case "metabolic": {
        const hasLifestyle = intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed";
        const hasWeight = /(weight|obese|overweight|bmi|waist)/i.test(narrative);
        
        let summary = "Metabolic intake summary:\n\n";
        if (hasLifestyle) summary += "• Lifestyle factors reviewed\n";
        if (hasWeight) summary += "• Weight history mentioned\n";
        if (!hasLifestyle && !hasWeight) summary += "No metabolic-specific details captured yet.\n";
        
        return {
          title: "Metabolic Summary",
          summary,
          editSectionId: "metabolic",
        };
      }
      
      case "cancer": {
        const hasFamily = /(father|mother|parent|family).*(cancer|tumor|colon|breast|lung|colorectal|crc)/i.test(narrative);
        const hasScreening = /(colonoscopy|mammogram|screening|pap|psa)/i.test(narrative);
        
        let summary = "Cancer / Screening summary:\n\n";
        if (hasFamily) summary += "• Family cancer history mentioned\n";
        if (hasScreening) summary += "• Screening history documented\n";
        if (!hasFamily && !hasScreening) summary += "No cancer/screening-specific details captured yet.\n";
        
        return {
          title: "Cancer / Screening Summary",
          summary,
          editSectionId: "cancer-screening",
        };
      }
      
      case "neuro": {
        const hasStress = intakeData.guidedReview.find(s => s.id === "stress")?.status === "reviewed";
        const hasMention = /(stress|anxiety|mood|depression|cognition|brain fog)/i.test(narrative);
        
        let summary = "Neuro / Cognition summary:\n\n";
        if (hasStress) summary += "• Stress context reviewed\n";
        if (hasMention) summary += "• Cognitive/mental health factors mentioned\n";
        if (!hasStress && !hasMention) summary += "No neuro/cognition-specific details captured yet.\n";
        
        return {
          title: "Neuro Summary",
          summary,
          editSectionId: "neuro",
        };
      }
      
      case "sleep": {
        const hasLifestyle = intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed";
        const hasSleep = /(sleep|insomnia|rest|tired|fatigue|snoring)/i.test(narrative);
        
        let summary = "Sleep summary:\n\n";
        if (hasLifestyle) summary += "• Lifestyle factors reviewed (may include sleep)\n";
        if (hasSleep) summary += "• Sleep-related concerns mentioned\n";
        if (!hasLifestyle && !hasSleep) summary += "No sleep-specific details captured yet.\n";
        
        return {
          title: "Sleep Summary",
          summary,
          editSectionId: "sleep",
        };
      }
      
      case "fitness": {
        const hasLifestyle = intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed";
        const hasMovement = /(exercise|workout|running|walking|strength|cardio|movement|activity)/i.test(narrative);
        
        let summary = "Fitness summary:\n\n";
        if (hasLifestyle) summary += "• Lifestyle factors reviewed (may include movement)\n";
        if (hasMovement) summary += "• Movement/activity patterns mentioned\n";
        if (!hasLifestyle && !hasMovement) summary += "No fitness-specific details captured yet.\n";
        
        return {
          title: "Fitness Summary",
          summary,
          editSectionId: "fitness",
        };
      }
      
      case "plan": {
        const selectedDiagnostics = intakeData.suggestedDiagnostics.filter(d => d.selected);
        const hasNextSteps = intakeData.openQuestions.length > 0;
        
        let summary = "Visit 1 Next Steps Plan (Draft):\n\n";
        if (selectedDiagnostics.length > 0) {
          summary += `• Diagnostics to order: ${selectedDiagnostics.length} selected\n`;
        }
        if (hasNextSteps) {
          summary += "• Working hypotheses documented\n";
        }
        if (selectedDiagnostics.length === 0 && !hasNextSteps) {
          summary += "Plan draft is empty. Continue documenting in Overview to build next steps.\n";
        }
        
        return {
          title: "Plan Summary",
          summary,
          editSectionId: "plan",
        };
      }
      
      case "timeline": {
        return {
          title: "Timeline",
          summary: "Today's artifacts:\n\n• Intake note: Autosaved\n• Orders: Drafted\n• Follow-up: Not scheduled",
        };
      }
      
      case "documents": {
        return {
          title: "Documents",
          summary: "No documents uploaded yet.",
        };
      }
      
      default:
        return {
          title: "Summary",
          summary: "No summary available for this section.",
        };
    }
  };

  const { title, summary, editSectionId } = generateSummary();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-30 flex items-start justify-end z-50" onClick={onClose}>
      <div
        className="bg-white border-l border-gray-200 shadow-xl h-full overflow-y-auto"
        style={{ width: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Summary text */}
          <div className="text-[13px] leading-[18px] text-gray-700 whitespace-pre-line">
            {summary}
          </div>

          {/* Edit in Overview button */}
          {editSectionId && (
            <button
              onClick={() => {
                onEditInOverview(editSectionId);
                onClose();
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-[8px] hover:bg-blue-700 transition-colors text-[13px] leading-[18px] font-medium"
            >
              Edit in Overview
            </button>
          )}

          {/* Note */}
          <div className="text-[11px] leading-[16px] text-gray-500 italic">
            This summary shows only what has been captured in Overview. All editing happens in the main workspace.
          </div>
        </div>
      </div>
    </div>
  );
}


