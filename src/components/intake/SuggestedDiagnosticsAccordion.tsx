"use client";

import React, { useState } from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";
import ReviewSelectedModal from "./ReviewSelectedModal";

interface SuggestedDiagnosticsAccordionProps {
  diagnostics: SuggestedDiagnostic[];
  onDiagnosticsChange: (diagnostics: SuggestedDiagnostic[]) => void;
}

export default function SuggestedDiagnosticsAccordion({
  diagnostics,
  onDiagnosticsChange,
}: SuggestedDiagnosticsAccordionProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Cardiovascular risk", "Cancer prevention", "Metabolic baseline", "Vascular imaging"])
  );
  const [showAllItems, setShowAllItems] = useState<Record<string, boolean>>({});
  const [showReviewModal, setShowReviewModal] = useState(false);

  const toggleGroup = (category: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleDiagnostic = (id: string) => {
    const updated = diagnostics.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d));
    onDiagnosticsChange(updated);
  };

  const removeDiagnostic = (id: string) => {
    toggleDiagnostic(id);
  };

  const toggleShowAll = (category: string) => {
    setShowAllItems((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getEffortLabel = (effort: string) => {
    switch (effort) {
      case "low":
        return "Low";
      case "med":
        return "Med";
      case "high":
        return "High";
      default:
        return effort;
    }
  };

  // Muted colors - no bright green/red
  const getEffortColor = (effort: string) => {
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  // Group by category (order: Cardiovascular risk, Cancer prevention, Metabolic baseline, Vascular imaging)
  const categoryOrder = ["Cardiovascular risk", "Cancer prevention", "Metabolic baseline", "Vascular imaging"];
  const grouped = diagnostics.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = [];
    acc[d.category].push(d);
    return acc;
  }, {} as Record<string, SuggestedDiagnostic[]>);

  // Sort categories by specified order
  const sortedCategories = categoryOrder.filter((cat) => grouped[cat] && grouped[cat].length > 0);

  const selectedDiagnostics = diagnostics.filter((d) => d.selected);
  const selectedCount = selectedDiagnostics.length;

  return (
    <>
      <div className="mb-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide">
              Suggested Diagnostics
            </h3>
            {selectedCount > 0 && (
              <span className="text-[12px] leading-[16px] text-gray-600" style={{ fontVariantNumeric: "tabular-nums" }}>
                Selected: {selectedCount}
              </span>
            )}
          </div>
          <p className="text-[12px] leading-[16px] text-gray-500 mb-2">Select only what you want to order.</p>
          {selectedCount > 0 && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium"
            >
              Review selected
            </button>
          )}
        </div>

        {/* Groups (Accordion) */}
        {diagnostics.length === 0 ? (
          <p className="text-[12px] leading-[16px] text-gray-500">
            No suggestions yet. Continue documenting to see recommendations.
          </p>
        ) : (
          <div className="space-y-2">
            {sortedCategories.map((category) => {
              const items = grouped[category];
              const isExpanded = expandedGroups.has(category);
              const showAll = showAllItems[category] || false;
              const displayItems = showAll ? items : items.slice(0, 3);
              const hasMore = items.length > 3;

              return (
                <div key={category} className="border border-gray-200 rounded-[8px] overflow-hidden">
                  {/* Group Header (Expandable) */}
                  <button
                    onClick={() => toggleGroup(category)}
                    className="w-full flex items-center justify-between text-[13px] leading-[18px] font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{ padding: "8px 12px", height: "32px" }}
                  >
                    <span>{category}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Group Items (Compact List Rows) */}
                  {isExpanded && (
                    <div className="bg-white border-t border-gray-200">
                      <div className="divide-y divide-gray-100">
                        {displayItems.map((diag) => (
                          <div
                            key={diag.id}
                            className="flex items-start justify-between hover:bg-gray-50 transition-colors"
                            style={{ padding: "8px 12px", minHeight: "48px" }}
                          >
                            <div className="flex-1 min-w-0 mr-2">
                              {/* Test Name (medium weight) */}
                              <div className="text-[13px] leading-[18px] font-medium text-gray-900 mb-0.5">
                                {diag.testName}
                              </div>
                              {/* Why suggested (1-line) */}
                              <div className="text-[12px] leading-[16px] text-gray-600 mb-1">{diag.why}</div>
                              {/* Effort/Cost pill */}
                              <span
                                className={`inline-block px-1.5 rounded-[9px] text-[12px] leading-[16px] font-medium border ${getEffortColor(diag.effort)}`}
                                style={{ height: "18px", display: "inline-flex", alignItems: "center" }}
                              >
                                {getEffortLabel(diag.effort)}
                              </span>
                            </div>
                            {/* Selection control */}
                            <div className="flex-shrink-0">
                              {!diag.selected ? (
                                <button
                                  onClick={() => toggleDiagnostic(diag.id)}
                                  className="text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium"
                                  style={{ padding: "4px 8px" }}
                                >
                                  Add
                                </button>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={diag.selected}
                                  onChange={() => toggleDiagnostic(diag.id)}
                                  className="mt-1"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Show all link */}
                      {hasMore && !showAll && (
                        <button
                          onClick={() => toggleShowAll(category)}
                          className="w-full text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium text-center"
                          style={{ padding: "8px 12px", borderTop: "1px solid #F3F4F6" }}
                        >
                          Show all ({items.length})
                        </button>
                      )}
                      {hasMore && showAll && (
                        <button
                          onClick={() => toggleShowAll(category)}
                          className="w-full text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium text-center"
                          style={{ padding: "8px 12px", borderTop: "1px solid #F3F4F6" }}
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Selected Modal */}
      {showReviewModal && (
        <ReviewSelectedModal
          selectedDiagnostics={selectedDiagnostics}
          onRemove={removeDiagnostic}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
}

