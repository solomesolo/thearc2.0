"use client";

import React, { useState } from "react";

interface MissingInfoAlert {
  id: string;
  message: string;
  dismissed: boolean;
}

interface MissingInfoAlertsProps {
  alerts?: MissingInfoAlert[];
}

const defaultAlerts: MissingInfoAlert[] = [
  { id: "family_history_ages", message: "Family history ages not documented", dismissed: false },
  { id: "baseline_labs", message: "No baseline labs on file", dismissed: false },
  { id: "medication_list", message: "No medication list confirmed", dismissed: false },
];

export default function MissingInfoAlerts({ alerts = defaultAlerts }: MissingInfoAlertsProps) {
  const [localAlerts, setLocalAlerts] = useState<MissingInfoAlert[]>(alerts);

  const dismissAlert = (id: string) => {
    setLocalAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, dismissed: true } : alert)));
  };

  const visibleAlerts = localAlerts.filter((alert) => !alert.dismissed);

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="pt-6 border-t border-gray-200">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-1">
          Missing information
        </h3>
        <p className="text-[12px] leading-[16px] text-gray-500">Helpful reminders (not required).</p>
      </div>

      {/* Alert cards */}
      <div className="space-y-2">
        {visibleAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-gray-50/50 border border-gray-200/50 rounded-[8px] text-[12px] leading-[16px] text-gray-700 flex items-start gap-2"
            style={{ padding: "10px 12px" }}
          >
            {/* Optional info icon */}
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Alert text */}
            <span className="flex-1">{alert.message}</span>

            {/* Optional dismiss (X) */}
            <button
              onClick={() => dismissAlert(alert.id)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
              aria-label="Dismiss"
              style={{ padding: "2px" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



