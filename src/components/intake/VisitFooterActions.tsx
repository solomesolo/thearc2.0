"use client";

import React from "react";
import { VisitStatus } from "@/lib/intakeTypes";

interface VisitFooterActionsProps {
  onSaveDraft: () => void;
  onOrderDiagnostics: () => void;
  onScheduleVisit2: () => void;
  onSendSummary: () => void;
  onCompleteVisit: () => void;
  visitStatus: VisitStatus;
}

export default function VisitFooterActions({
  onSaveDraft,
  onOrderDiagnostics,
  onScheduleVisit2,
  onSendSummary,
  onCompleteVisit,
  visitStatus,
}: VisitFooterActionsProps) {
  const isCompleted = visitStatus === "completed";

  return (
    <footer
      className="border-t border-gray-200 bg-white flex items-center justify-between flex-shrink-0"
      style={{ 
        height: "64px", 
        padding: "12px 24px",
        borderTop: "1px solid #E5E7EB", // Subtle border
        backgroundColor: "#FFFFFF", // Surface (white)
      }}
    >
      {/* Buttons left → right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSaveDraft}
          disabled={isCompleted}
          className="border border-gray-300 text-gray-700 bg-white rounded-[10px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
          style={{ height: "40px", padding: "0 16px" }}
        >
          Save draft
        </button>
        <button
          onClick={onOrderDiagnostics}
          disabled={isCompleted}
          className="border border-gray-300 text-gray-700 bg-white rounded-[10px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
          style={{ height: "40px", padding: "0 16px" }}
        >
          Order diagnostics
        </button>
        <button
          onClick={onScheduleVisit2}
          disabled={isCompleted}
          className="border border-gray-300 text-gray-700 bg-white rounded-[10px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
          style={{ height: "40px", padding: "0 16px" }}
        >
          Schedule Visit 2
        </button>
        <button
          onClick={onSendSummary}
          disabled={isCompleted}
          className="border border-gray-300 text-gray-700 bg-white rounded-[10px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
          style={{ height: "40px", padding: "0 16px" }}
        >
          Send patient summary
        </button>
      </div>
      <button
        onClick={onCompleteVisit}
        disabled={isCompleted}
        className="bg-green-600 text-white rounded-[10px] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
        style={{ height: "40px", padding: "0 16px" }}
      >
        Complete visit
      </button>
    </footer>
  );
}

