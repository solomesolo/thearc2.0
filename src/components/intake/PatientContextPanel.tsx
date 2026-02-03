"use client";

import React, { useState } from "react";
import Visit1TabsRail from "./Visit1TabsRail";
import { TabStatus } from "@/lib/visit1ProgressEngine";

interface PatientContextPanelProps {
  patient: any;
  patientGoals: string[];
  knownRisks: string[];
  onGoalsChange: (goals: string[]) => void;
  tabStatuses?: Record<string, { status: TabStatus; hint: string | null }>;
  onTabClick?: (tabId: string) => void;
}

export default function PatientContextPanel({
  patient,
  patientGoals,
  knownRisks,
  onGoalsChange,
  tabStatuses = {},
  onTabClick,
}: PatientContextPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingGoals, setEditingGoals] = useState(false);
  const [goalsText, setGoalsText] = useState(patientGoals.join("\n"));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleGoalsSave = () => {
    const goals = goalsText
      .split("\n")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);
    onGoalsChange(goals);
    setEditingGoals(false);
  };

  return (
    <div className="space-y-6" style={{ padding: "16px 12px" }}>
      {/* Demographics */}
      <div>
        <button
          onClick={() => toggleSection("demographics")}
          className="w-full flex items-center justify-between text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2"
        >
          <span>Demographics</span>
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.has("demographics") ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.has("demographics") && (
          <div className="text-[13px] leading-[18px] text-gray-700 space-y-1.5">
            <div>Age: {patient.age || "Unknown"}</div>
            <div>Sex: {patient.sex}</div>
            {patient.phone && <div>Phone: {patient.phone}</div>}
            {patient.email && <div>Email: {patient.email}</div>}
          </div>
        )}
      </div>

      {/* Patient-Stated Goals */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide">
            Patient Goals
          </label>
          {!editingGoals && (
            <button
              onClick={() => setEditingGoals(true)}
              className="text-[12px] leading-[16px] text-gray-600 hover:text-gray-700 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
        {editingGoals ? (
          <div className="space-y-2">
            <textarea
              value={goalsText}
              onChange={(e) => setGoalsText(e.target.value)}
              placeholder="Enter goals (one per line)"
              className="w-full min-h-[80px] p-2 text-[13px] leading-[18px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              rows={4}
              style={{ lineHeight: "1.5" }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleGoalsSave}
                className="px-2 py-0.5 text-[12px] leading-[16px] bg-blue-600 text-white rounded hover:bg-blue-700"
                style={{ height: "24px" }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingGoals(false);
                  setGoalsText(patientGoals.join("\n"));
                }}
                className="px-2 py-0.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                style={{ height: "24px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[13px] leading-[18px] text-gray-700" style={{ lineHeight: "1.5" }}>
            {patientGoals.length > 0 ? (
              <ul className="list-disc list-inside space-y-1.5">
                {patientGoals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-400 italic">No goals entered</span>
            )}
          </div>
        )}
      </div>

      {/* Known Risks */}
      {knownRisks.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("risks")}
            className="w-full flex items-center justify-between text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2"
          >
            <span>Known Risks</span>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSections.has("risks") ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.has("risks") && (
            <div className="flex flex-wrap gap-1.5">
              {knownRisks.map((risk, idx) => (
                <div
                  key={idx}
                  className="px-2 text-[12px] leading-[16px] bg-yellow-50 border border-yellow-200 rounded-[11px] text-gray-700"
                  style={{ height: "22px", display: "inline-flex", alignItems: "center" }}
                >
                  {risk}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Visit 1 Tabs Rail */}
      <Visit1TabsRail tabStatuses={tabStatuses} onTabClick={onTabClick} />
    </div>
  );
}

