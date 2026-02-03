"use client";

import React from "react";
import { QueueItem, RiskLevel } from "@/lib/workbenchTypes";

interface WorkbenchHeaderProps {
  queueItem: QueueItem;
  onClose: () => void;
}

export default function WorkbenchHeader({ queueItem, onClose }: WorkbenchHeaderProps) {
  const getRiskBadge = () => {
    const config: Record<RiskLevel, { label: string; className: string }> = {
      high: { label: "High", className: "bg-red-50/80 text-red-800 border border-red-200/60" },
      medium: { label: "Medium", className: "bg-yellow-50/80 text-yellow-800 border border-yellow-200/60" },
      low: { label: "Low", className: "bg-green-50/80 text-green-800 border border-green-200/60" },
    };
    const cfg = config[queueItem.riskLevel];
    return (
      <span className={`h-5 px-2 rounded-full text-xs font-medium flex items-center border ${cfg.className}`}>
        {cfg.label}
      </span>
    );
  };

  const getTriggerBadge = () => {
    const config = {
      labs: { icon: "🧪", label: "New lab result" },
      message: { icon: "💬", label: "Patient message" },
      symptoms: { icon: "⚠️", label: "Symptoms" },
      "follow-up": { icon: "📅", label: "Follow-up due" },
    };
    const cfg = config[queueItem.category];
    return (
      <div className="flex items-center gap-1.5">
        <span className="h-5 px-2 rounded-full text-xs font-medium bg-blue-50/80 text-blue-800 border border-blue-200/60 flex items-center gap-1">
          <span className="text-xs">{cfg.icon}</span>
          <span>{cfg.label}</span>
        </span>
        <span className="text-xs text-gray-500">Triggered 2h ago</span>
      </div>
    );
  };

  return (
    <header className="h-[72px] py-3 px-4 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Patient Identity */}
        <div className="flex flex-col gap-0.5">
          <div className="text-lg font-semibold text-gray-900">{queueItem.patient.name}</div>
          <div className="text-xs text-gray-500">
            {queueItem.patient.age} {queueItem.patient.sex}
          </div>
        </div>
        {getRiskBadge()}
      </div>

      <div className="flex items-center gap-2">
        {/* Trigger Badge and Timestamp in single row */}
        {getTriggerBadge()}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
          aria-label="Close workbench"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
}

