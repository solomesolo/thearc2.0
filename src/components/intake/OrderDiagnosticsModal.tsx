"use client";

import React, { useState } from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";

interface OrderDiagnosticsModalProps {
  selectedDiagnostics: SuggestedDiagnostic[];
  allDiagnostics: SuggestedDiagnostic[];
  onClose: () => void;
  onSubmit: (finalSelected: SuggestedDiagnostic[]) => void;
}

export default function OrderDiagnosticsModal({
  selectedDiagnostics,
  allDiagnostics,
  onClose,
  onSubmit,
}: OrderDiagnosticsModalProps) {
  const [localSelected, setLocalSelected] = useState<Set<string>>(
    new Set(selectedDiagnostics.map((d) => d.id))
  );

  const toggleDiagnostic = (id: string) => {
    const newSelected = new Set(localSelected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setLocalSelected(newSelected);
  };

  const handleSubmit = () => {
    const finalSelected = allDiagnostics.filter((d) => localSelected.has(d.id));
    
    // Log audit event
    console.log("Order diagnostics - audit event:", {
      timestamp: new Date().toISOString(),
      diagnostics: finalSelected.map((d) => ({
        id: d.id,
        testName: d.testName,
        category: d.category,
        effort: d.effort,
      })),
      count: finalSelected.length,
    });

    // Submit and close
    onSubmit(finalSelected);
    onClose();
  };

  // Group diagnostics by category
  const grouped = allDiagnostics.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = [];
    acc[d.category].push(d);
    return acc;
  }, {} as Record<string, SuggestedDiagnostic[]>);

  const categoryOrder = ["Cardiovascular risk", "Cancer prevention", "Metabolic baseline", "Vascular imaging"];
  const sortedCategories = categoryOrder.filter((cat) => grouped[cat] && grouped[cat].length > 0);

  const selectedCount = localSelected.size;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[16px] shadow-lg max-w-2xl w-full mx-4"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200" style={{ padding: "20px 24px" }}>
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-gray-900 mb-1">
              Order diagnostics
            </h3>
            <p className="text-[13px] leading-[18px] text-gray-500">
              Review and modify selected diagnostics before ordering.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 140px)", padding: "20px 24px" }}>
          {/* Selected count */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] leading-[18px] text-gray-600">
              Selected: <span style={{ fontVariantNumeric: "tabular-nums" }}>{selectedCount}</span>
            </span>
          </div>

          {/* Diagnostics grouped by category */}
          <div className="space-y-4">
            {sortedCategories.map((category) => {
              const items = grouped[category];
              return (
                <div key={category} className="border border-gray-200 rounded-[10px] overflow-hidden">
                  {/* Category header */}
                  <div className="bg-gray-50 border-b border-gray-200" style={{ padding: "12px 16px" }}>
                    <h4 className="text-[13px] leading-[18px] font-medium text-gray-900">{category}</h4>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-100">
                    {items.map((diag) => {
                      const isSelected = localSelected.has(diag.id);
                      return (
                        <div
                          key={diag.id}
                          className={`flex items-start justify-between transition-colors ${
                            isSelected ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"
                          }`}
                          style={{ padding: "12px 16px" }}
                        >
                          <div className="flex-1 min-w-0 mr-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[13px] leading-[18px] font-medium text-gray-900">
                                {diag.testName}
                              </span>
                              <span
                                className="px-1.5 rounded-[9px] text-[12px] leading-[16px] font-medium border bg-gray-100 text-gray-700 border-gray-300"
                                style={{ height: "18px", display: "inline-flex", alignItems: "center" }}
                              >
                                {diag.effort === "low" ? "Low" : diag.effort === "med" ? "Med" : "High"}
                              </span>
                            </div>
                            <div className="text-[12px] leading-[16px] text-gray-600">{diag.why}</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleDiagnostic(diag.id)}
                            className="mt-1 flex-shrink-0"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 flex items-center justify-between" style={{ padding: "16px 24px" }}>
          <button
            onClick={onClose}
            className="text-[13px] leading-[18px] font-medium text-gray-700 hover:text-gray-900"
            style={{ padding: "8px 16px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedCount === 0}
            className="bg-green-600 text-white rounded-[10px] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[13px] leading-[18px] font-medium"
            style={{ padding: "8px 16px" }}
          >
            Order {selectedCount > 0 && `(${selectedCount})`}
          </button>
        </div>
      </div>
    </div>
  );
}



