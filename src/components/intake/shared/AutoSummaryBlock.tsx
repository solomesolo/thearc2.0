"use client";

import React from "react";

interface AutoSummaryBlockProps {
  summary: string;
  hint?: string | null;
}

export default function AutoSummaryBlock({ summary, hint }: AutoSummaryBlockProps) {
  return (
    <div>
      <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-3">
        Summary
      </h3>
      <div className="text-[13px] leading-[18px] text-gray-700 whitespace-pre-line bg-gray-50 rounded-[8px] p-4">
        {summary}
      </div>
      {/* Optional Hint as "Observation" line */}
      {hint && (
        <div className="mt-3 text-[12px] leading-[16px] text-gray-500 italic border-l-2 border-gray-300 pl-3">
          <span className="font-medium text-gray-600">Observation: </span>
          {hint}
        </div>
      )}
    </div>
  );
}



