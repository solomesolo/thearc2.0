"use client";

import React, { useState } from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";
import ReviewSelectedModal from "./ReviewSelectedModal";

interface SuggestedDiagnosticsPanelProps {
  diagnostics: SuggestedDiagnostic[];
  onDiagnosticsChange: (diagnostics: SuggestedDiagnostic[]) => void;
}

interface MissingInfoAlert {
  id: string;
  message: string;
  dismissed: boolean;
}

export default function SuggestedDiagnosticsPanel({
  diagnostics,
  onDiagnosticsChange,
}: SuggestedDiagnosticsPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Cardiovascular risk", "Cancer prevention", "Metabolic baseline", "Vascular imaging"])
  );
  const [showAllItems, setShowAllItems] = useState<Record<string, boolean>>({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [missingInfoAlerts, setMissingInfoAlerts] = useState<MissingInfoAlert[]>([
    { id: "family_history_ages", message: "Family history ages not documented", dismissed: false },
    { id: "baseline_labs", message: "No baseline labs on file", dismissed: false },
    { id: "medication_list", message: "No medication list confirmed", dismissed: false },
  ]);

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

  const dismissAlert = (id: string) => {
    setMissingInfoAlerts((alerts) =>
      alerts.map((alert) => (alert.id === id ? { ...alert, dismissed: true } : alert))
    );
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
    switch (effort) {
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "med":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "high":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
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

  const visibleAlerts = missingInfoAlerts.filter((alert) => !alert.dismissed);
  const selectedDiagnostics = diagnostics.filter((d) => d.selected);
  const selectedCount = selectedDiagnostics.length;

  return (
    <>
      <div
        style={{
          padding: "16px",
          backgroundColor: "#FFFFFF", // Surface (white)
        }}
      >
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
          <p className="text-[12px] leading-[16px] text-gray-500 mb-2">
            Select only what you want to order.
          </p>
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
                              <div className="text-[12px] leading-[16px] text-gray-600 mb-1">
                                {diag.why}
                              </div>
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

        {/* Missing Information Alerts (non-blocking, dismissible) */}
        {visibleAlerts.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {/* Header */}
            <div className="mb-3">
              <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-1">
                Missing information
              </h3>
              <p className="text-[12px] leading-[16px] text-gray-500">
                Helpful reminders (not required).
              </p>
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
