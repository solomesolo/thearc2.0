"use client";

import React, { useState } from "react";

interface QuietSuggestionsProps {
  suggestions: Array<{
    id: string;
    text: string;
    type?: "info" | "prompt" | "checklist";
  }>;
}

export default function QuietSuggestions({ suggestions }: QuietSuggestionsProps) {
  const [expanded, setExpanded] = useState(false);

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2"
      >
        <span>Quiet decision support</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="text-[12px] leading-[16px] text-gray-600 bg-gray-50/50 border border-gray-200/50 rounded-[8px]"
              style={{ padding: "8px 12px" }}
            >
              {suggestion.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


