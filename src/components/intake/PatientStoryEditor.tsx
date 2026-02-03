"use client";

import React from "react";

interface PatientStoryEditorProps {
  narrative: string;
  onNarrativeChange: (narrative: string) => void;
}

export default function PatientStoryEditor({
  narrative,
  onNarrativeChange,
}: PatientStoryEditorProps) {
  return (
    <div id="overview" className="space-y-2">
      <label className="block text-[16px] leading-[24px] font-semibold text-gray-900 mb-2">
        Patient story
      </label>
      <textarea
        value={narrative}
        onChange={(e) => onNarrativeChange(e.target.value)}
        placeholder="Capture the patient's story naturally. Type or speak as you listen. No formatting constraints."
        className="w-full bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-[15px] text-gray-900 font-normal"
        style={{
          minHeight: "240px",
          padding: "16px",
          lineHeight: "1.6",
          fontFamily: "inherit",
          fontVariantNumeric: "tabular-nums",
          maxWidth: "75ch", // 60-75 character line length target
        }}
      />
      <div className="flex items-center justify-between">
        <button
          className="px-2.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
          style={{ height: "28px" }}
        >
          Voice dictation
        </button>
        <span className="text-[12px] leading-[16px] text-gray-500" style={{ fontVariantNumeric: "tabular-nums" }}>
          {narrative.length} characters
        </span>
      </div>
    </div>
  );
}

