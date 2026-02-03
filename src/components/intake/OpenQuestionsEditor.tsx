"use client";

import React from "react";

interface OpenQuestionsEditorProps {
  questions: string;
  onQuestionsChange: (questions: string) => void;
}

export default function OpenQuestionsEditor({
  questions,
  onQuestionsChange,
}: OpenQuestionsEditorProps) {
  return (
    <div id="plan" className="space-y-2">
      <label className="block text-[16px] leading-[24px] font-semibold text-gray-900 mb-2">
        Working hypotheses / things to clarify
      </label>
      <textarea
        value={questions}
        onChange={(e) => onQuestionsChange(e.target.value)}
        placeholder="Capture uncertainties, hypotheses, or items to follow up. No structure required."
        className="w-full bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-[15px] leading-[22px] text-gray-900"
        style={{
          minHeight: "120px",
          padding: "12px",
          fontVariantNumeric: "tabular-nums",
        }}
      />
    </div>
  );
}

