"use client";

import React, { useState } from "react";
import { QueueItem, TriggerDetails, logAuditEvent } from "@/lib/workbenchTypes";

interface DecisionContextPanelProps {
  queueItem: QueueItem;
  onWhyHereChange?: (newValue: string) => void;
}

export default function DecisionContextPanel({ queueItem, onWhyHereChange }: DecisionContextPanelProps) {
  const [whyHere, setWhyHere] = useState(queueItem.whyHere);
  const [isEditingWhyHere, setIsEditingWhyHere] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState("");

  const handleWhyHereSave = () => {
    setIsEditingWhyHere(false);
    if (whyHere !== queueItem.whyHere && onWhyHereChange) {
      onWhyHereChange(whyHere);
      logAuditEvent({
        queueItemId: queueItem.id,
        patientId: queueItem.patient.id,
        action: "edit_why_here",
        actionType: "edit",
        metadata: { newValue: whyHere },
      });
    }
  };

  const renderTriggerDetails = (trigger: TriggerDetails) => {
    switch (trigger.type) {
      case "labs":
        return (
          <div className="space-y-3">
            {trigger.abnormalValues.map((lab, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-gray-900">{lab.testName}:</span>
                  <span className="text-base font-semibold text-gray-900">{lab.value} {lab.units}</span>
                  <span className="text-sm text-red-600 font-medium">{lab.direction}</span>
                  <span className="text-xs text-gray-600">(ref {lab.referenceRange})</span>
                </div>
                {lab.delta && (
                  <div className="text-xs text-gray-600 ml-4">{lab.delta}</div>
                )}
                {lab.trend && (
                  <div className="text-xs text-gray-600 ml-4">{lab.trend}</div>
                )}
              </div>
            ))}
            <div className="bg-blue-50/60 border border-blue-100/60 p-3 rounded-lg">
              <p className="text-sm text-gray-900 leading-relaxed">{trigger.whyThisMatters}</p>
            </div>
          </div>
        );

      case "message":
        return (
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="mb-2 text-xs text-gray-600 uppercase tracking-wide font-medium">
              {trigger.channel} · {trigger.timestamp}
            </div>
            <p className="text-[15px] text-gray-900 leading-relaxed whitespace-pre-wrap mb-3">
              {trigger.messageText}
            </p>
            {trigger.extractedSymptoms && trigger.extractedSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200">
                {trigger.extractedSymptoms.map((symptom, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200/60"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "symptoms":
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">{trigger.symptomSummary}</p>
            <p className="text-xs text-gray-600">Onset: {trigger.onset}</p>
            {trigger.redFlags && trigger.redFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg mt-2">
                <p className="text-xs font-semibold text-red-800 mb-1">Red flags:</p>
                <ul className="text-xs text-red-700 space-y-0.5">
                  {trigger.redFlags.map((flag, idx) => (
                    <li key={idx}>• {flag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "follow-up":
        return (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">
              {trigger.visitType} {trigger.daysLate ? `overdue by ${trigger.daysLate} days` : "due"}
            </p>
            {trigger.lastVisitDate && (
              <p className="text-xs text-gray-600">Last visit: {trigger.lastVisitDate}</p>
            )}
            {trigger.expectedNext && (
              <p className="text-xs text-gray-600">{trigger.expectedNext}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4" style={{ minHeight: 0, flex: "1 1 auto" }}>
      <div className="space-y-6 max-w-none">
        {/* Why You're Here - Always visible at top */}
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-[10px]">
          <div className="flex items-start justify-between mb-1">
            <label className="text-xs uppercase text-gray-500 tracking-wide font-medium">
              Why You're Here
            </label>
            {!isEditingWhyHere && (
              <button
                onClick={() => setIsEditingWhyHere(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Edit"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
          </div>
          {isEditingWhyHere ? (
            <textarea
              value={whyHere}
              onChange={(e) => setWhyHere(e.target.value)}
              onBlur={handleWhyHereSave}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleWhyHereSave();
              }}
              className="w-full text-[15px] text-gray-900 bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              rows={2}
              maxLength={140}
              autoFocus
            />
          ) : (
            <p className="text-[15px] text-gray-900 leading-relaxed mt-1">{whyHere}</p>
          )}
          {whyHere !== queueItem.whyHere && !isEditingWhyHere && (
            <span className="text-xs text-gray-400 mt-1 inline-block">Edited</span>
          )}
        </div>

        {/* Trigger Details */}
        <div className="space-y-2">
          <h3 className="text-xs uppercase text-gray-500 tracking-wide font-medium">Trigger Details</h3>
          {renderTriggerDetails(queueItem.triggerDetails)}
        </div>

        {/* Relevant Context */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase text-gray-500 tracking-wide font-medium">Family History</h4>
              <a
                href="#"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  // In production, open full chart
                }}
              >
                View more
              </a>
            </div>
            <p className="text-sm text-gray-900 leading-relaxed">
              Strong family history of MI (father, age 58)
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase text-gray-500 tracking-wide font-medium mb-2">Current Plan</h4>
            <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside leading-relaxed">
              <li>Lipid management protocol</li>
              <li>Quarterly ApoB monitoring</li>
            </ul>
          </div>
        </div>

        {/* Clinical Notes */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 tracking-wide font-medium mb-2">Clinical Notes</h4>
          <textarea
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            placeholder="Optional notes..."
            className="w-full min-h-[80px] p-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />
          <button className="mt-2 h-7 px-2.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
            Voice dictation
          </button>
        </div>
      </div>
    </div>
  );
}

