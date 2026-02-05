"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import AutoSummaryBlock from "../shared/AutoSummaryBlock";

interface TimelineTabViewProps {
  intakeData: Visit1IntakeData;
  hint?: string | null;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function TimelineTabView({
  intakeData,
  hint,
}: TimelineTabViewProps) {
  // Generate summary
  const summary = "Visit timeline and key events will appear here.";
  
  // Read-only audit trail (placeholder)
  const timelineEvents = [
    { timestamp: "Started", event: "Intake started" },
    { timestamp: "In progress", event: "Cardiovascular reviewed" },
    { timestamp: "In progress", event: "Hypotheses added" },
  ];
  
  return (
    <div className="space-y-6">
      <AutoSummaryBlock summary={summary} hint={hint} />
      
      {/* Read-only Timeline */}
      <div>
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-3">
          Timeline
        </h3>
        <div className="space-y-2">
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-[12px] leading-[16px] text-gray-600 bg-gray-50 rounded-[8px] p-3"
            >
              <span className="text-[11px] text-gray-500 font-mono flex-shrink-0">
                {event.timestamp}
              </span>
              <span>{event.event}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* What Will Be Documented */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-[11px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
          What will be documented
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-[11px] leading-[16px] text-gray-600">
            <span className="text-gray-400 flex-shrink-0">•</span>
            <span>Audit trail of key events</span>
          </div>
        </div>
      </div>
    </div>
  );
}


