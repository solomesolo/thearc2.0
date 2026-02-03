"use client";

import React from "react";
import { TabStatus, TabHint } from "@/lib/visit1ProgressEngine";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  { id: "overview", label: "Overview", icon: <OverviewIcon /> },
  { id: "cardiovascular", label: "Cardiovascular", icon: <HeartIcon /> },
  { id: "metabolic", label: "Metabolic", icon: <MetabolicIcon /> },
  { id: "cancer", label: "Cancer / Screening", icon: <CancerIcon /> },
  { id: "neuro", label: "Neuro", icon: <NeuroIcon /> },
  { id: "sleep", label: "Sleep", icon: <SleepIcon /> },
  { id: "fitness", label: "Fitness", icon: <FitnessIcon /> },
  { id: "plan", label: "Plan", icon: <PlanIcon /> },
  { id: "timeline", label: "Timeline", icon: <TimelineIcon /> },
  { id: "documents", label: "Documents", icon: <DocumentsIcon /> },
];

interface Visit1TabsRailProps {
  tabStatuses: Record<string, { status: TabStatus; hint: TabHint }>;
  onTabClick?: (tabId: string) => void;
}

export default function Visit1TabsRail({ tabStatuses, onTabClick }: Visit1TabsRailProps) {
  const getStatusIndicator = (status: TabStatus) => {
    switch (status) {
      case "reviewed":
        return <span className="text-[10px] leading-[14px]" style={{ color: "#10B981" }}>🟢</span>; // Green circle
      case "partial":
        return <span className="text-[10px] leading-[14px]" style={{ color: "#F59E0B" }}>🟡</span>; // Yellow circle
      case "not_reviewed":
        return <span className="text-[10px] leading-[14px]" style={{ color: "#9CA3AF" }}>⬜</span>; // White square
    }
  };

  const getStatusLabel = (status: TabStatus) => {
    switch (status) {
      case "reviewed":
        return "Reviewed";
      case "partial":
        return "Partially reviewed";
      case "not_reviewed":
        return "Not reviewed";
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="mb-2">
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide">
          Visit 1 Sections
        </h3>
      </div>
      <nav className="space-y-0">
        {tabs.map((tab) => {
          const tabStatus = tabStatuses[tab.id] || { status: "not_reviewed" as TabStatus, hint: null };
          const hint = tabStatus.hint;
          const isPlan = tab.id === "plan";
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabClick?.(tab.id)}
              className="w-full flex items-center gap-2 text-left hover:bg-gray-50 transition-colors rounded-[6px] group"
              style={{
                minHeight: "32px",
                padding: "6px 8px",
              }}
              title={hint ? `${getStatusLabel(tabStatus.status)}${hint ? ` — ${hint}` : ""}` : getStatusLabel(tabStatus.status)}
            >
              {/* Icon */}
              <span className="flex-shrink-0 text-gray-600" style={{ width: "16px", height: "16px" }}>
                {tab.icon}
              </span>
              
                  {/* Label */}
                  <div className="flex-1 flex flex-col">
                    <span className="text-[13px] leading-[18px] font-normal text-gray-700">
                      {tab.label}
                    </span>
                    {/* Optional hint under tab label */}
                    {tabStatus.hint && (
                      <span className="text-[11px] leading-[16px] text-gray-500 mt-0.5">
                        {tabStatus.hint}
                      </span>
                    )}
                  </div>

                  {/* Status indicator */}
                  <span className="flex-shrink-0 flex items-center gap-1.5">
                    {getStatusIndicator(tabStatus.status)}
                    {isPlan && tabStatus.status === "partial" && (
                      <span className="text-[10px] leading-[14px] text-gray-500 font-medium">Draft</span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
    </div>
  );
}

// Icon components
function OverviewIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function MetabolicIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function CancerIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function NeuroIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function SleepIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function FitnessIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocumentsIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

