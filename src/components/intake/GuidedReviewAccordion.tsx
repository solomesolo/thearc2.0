"use client";

import React, { useState } from "react";
import { GuidedReviewSection } from "@/lib/intakeTypes";

interface GuidedReviewAccordionProps {
  sections: GuidedReviewSection[];
  onSectionUpdate: (sections: GuidedReviewSection[]) => void;
}

export default function GuidedReviewAccordion({
  sections,
  onSectionUpdate,
}: GuidedReviewAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const markReviewed = (sectionId: string) => {
    const updated = sections.map((s) =>
      s.id === sectionId ? { ...s, status: s.status === "reviewed" ? "not_reviewed" : "reviewed" } : s
    );
    onSectionUpdate(updated);
  };

  const renderSectionContent = (section: GuidedReviewSection) => {
    switch (section.id) {
      case "lifestyle":
        return (
          <div className="space-y-3 p-3 bg-white border border-gray-200 rounded-lg">
            <div>
              <label className="block text-[12px] leading-[16px] font-medium text-gray-700 mb-2">Sleep</label>
              <div className="flex gap-2">
                {["Good", "Issues"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                    style={{ height: "32px" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] leading-[16px] font-medium text-gray-700 mb-2">Nutrition</label>
              <div className="flex gap-2">
                {["Balanced", "Concerns"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                    style={{ height: "32px" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] leading-[16px] font-medium text-gray-700 mb-2">Movement</label>
              <div className="flex gap-2 flex-wrap">
                {["Strength", "Cardio gap"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                    style={{ height: "32px" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] leading-[16px] font-medium text-gray-700 mb-2">Stress load</label>
              <div className="flex gap-2">
                {["Low", "Moderate", "High"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                    style={{ height: "32px" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">
              {section.label} review section. In production, this would contain structured inputs
              specific to this category.
            </p>
          </div>
        );
    }
  };

  // Map section IDs to scroll anchors
  const sectionIdToScrollId: Record<string, string> = {
    lifestyle: "section-sleep", // Lifestyle section contains sleep and fitness
  };

  return (
    <div className="space-y-3">
      {/* Sleep section anchor */}
      <div id="sleep" className="scroll-mt-4" style={{ marginTop: "-4px", height: "4px" }} />
      
      {/* Fitness section anchor */}
      <div id="fitness" className="scroll-mt-4" style={{ marginTop: "-4px", height: "4px" }} />
      
      <label className="block text-[16px] leading-[24px] font-semibold text-gray-900 mb-2">
        Guided Review (Optional)
      </label>
      <p className="text-[12px] leading-[16px] text-gray-500 mb-4">
        All sections collapsed by default. Open only what you want to review.
      </p>
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
              style={{ height: "40px", padding: "0 12px" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[13px] leading-[18px] font-medium text-gray-900">{section.label}</span>
                <span
                  className={`px-1.5 rounded-[9px] text-[12px] leading-[16px] font-medium border ${
                    section.status === "reviewed"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                  style={{ height: "18px", display: "inline-flex", alignItems: "center" }}
                >
                  {section.status === "reviewed" ? "Reviewed" : "Not reviewed"}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSections.has(section.id) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.has(section.id) && (
              <div className="p-3 border-t border-gray-200 space-y-3">
                {renderSectionContent(section)}
                <button
                  onClick={() => markReviewed(section.id)}
                  className="px-3 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded hover:bg-gray-50"
                  style={{ height: "32px" }}
                >
                  {section.status === "reviewed" ? "Mark as not reviewed" : "Mark reviewed"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

