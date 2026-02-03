"use client";

import React, { useState } from "react";

interface Suggestion {
  text: string;
  why?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface QuietDecisionSupportProps {
  suggestions: Suggestion[];
}

export default function QuietDecisionSupport({ suggestions }: QuietDecisionSupportProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2 hover:text-gray-700 transition-colors"
      >
        <span>Decision Support</span>
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-[8px] p-3 border border-gray-200/50"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-[12px] leading-[16px] text-gray-700 flex-1">
                  {suggestion.text}
                </p>
                {suggestion.action && (
                  <button
                    onClick={suggestion.action.onClick}
                    className="text-[11px] leading-[16px] text-gray-700 hover:text-gray-900 font-medium flex-shrink-0 transition-colors"
                    style={{ padding: "2px 6px" }}
                  >
                    {suggestion.action.label}
                  </button>
                )}
              </div>
              {suggestion.why && (
                <p className="text-[11px] leading-[16px] text-gray-500 italic">
                  {suggestion.why}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

