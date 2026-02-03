"use client";

import React from "react";
import { AutosaveStatus, VisitStatus } from "@/lib/intakeTypes";

interface IntakeHeaderProps {
  patient: any;
  visit: any;
  autosaveStatus: AutosaveStatus;
  elapsedTime: number;
}

export default function IntakeHeader({
  patient,
  visit,
  autosaveStatus,
  elapsedTime,
}: IntakeHeaderProps) {
  const getStatusBadge = () => {
    const status = visit?.status || "in_progress";
    if (status === "completed") {
      return (
        <span
          className="h-5 px-2 rounded-[10px] text-[12px] leading-[16px] font-medium bg-green-50 text-green-800 border border-green-200"
        >
          Completed
        </span>
      );
    }
    return (
      <span
        className="h-5 px-2 rounded-[10px] text-[12px] leading-[16px] font-medium bg-blue-50 text-blue-800 border border-blue-200"
      >
        In progress
      </span>
    );
  };

  const getAutosaveIndicator = () => {
    switch (autosaveStatus) {
      case "saving":
        return (
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-[12px] leading-[16px] text-gray-500">Saving…</span>
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-[12px] leading-[16px] text-gray-500">All changes saved</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-[12px] leading-[16px] text-red-500">Save error</span>
          </div>
        );
    }
  };

  return (
    <header
      className="border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0"
      style={{ 
        height: "64px", 
        padding: "12px 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Left Block - Patient Identity */}
      <div className="flex flex-col gap-0.5">
        <div className="text-[18px] leading-[26px] font-semibold text-gray-900">{patient.fullName}</div>
        <div className="text-[12px] leading-[16px] text-gray-500">
          {patient.age || "Age unknown"} {patient.sex}
        </div>
      </div>

      {/* Center Block - Visit Metadata */}
      <div className="flex items-center gap-3">
        {/* Visit type pill */}
        <span
          className="h-5 px-2 rounded-[10px] text-[12px] leading-[16px] font-medium bg-blue-50 text-blue-800 border border-blue-200"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          First Visit
        </span>
        
        {/* Status pill */}
        {getStatusBadge()}
        
        {/* Timer (optional) */}
        {elapsedTime > 0 && (
          <div className="text-[12px] leading-[16px] text-gray-500" style={{ fontVariantNumeric: "tabular-nums" }}>
            {elapsedTime} min
          </div>
        )}
      </div>

      {/* Right Block - System Trust (Autosave) */}
      <div className="flex items-center gap-3">
        {getAutosaveIndicator()}
      </div>
    </header>
  );
}

