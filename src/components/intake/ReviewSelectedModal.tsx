"use client";

import React from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";

interface ReviewSelectedModalProps {
  selectedDiagnostics: SuggestedDiagnostic[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

export default function ReviewSelectedModal({
  selectedDiagnostics,
  onRemove,
  onClose,
}: ReviewSelectedModalProps) {
  if (selectedDiagnostics.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] shadow-lg max-w-md w-full mx-4"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200" style={{ padding: "16px 20px" }}>
          <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">
            Review Selected Diagnostics
          </h3>
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
        <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 80px)", padding: "16px 20px" }}>
          <div className="space-y-3">
            {selectedDiagnostics.map((diag) => (
              <div
                key={diag.id}
                className="border border-gray-200 rounded-[10px] flex items-start justify-between"
                style={{ padding: "12px" }}
              >
                <div className="flex-1">
                  <div className="text-[13px] leading-[18px] font-medium text-gray-900 mb-1">
                    {diag.testName}
                  </div>
                  <div className="text-[12px] leading-[16px] text-gray-600">{diag.why}</div>
                </div>
                <button
                  onClick={() => onRemove(diag.id)}
                  className="ml-3 text-[12px] leading-[16px] text-red-600 hover:text-red-700 flex-shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 flex justify-end" style={{ padding: "12px 20px" }}>
          <button
            onClick={onClose}
            className="text-[13px] leading-[18px] font-medium text-gray-700 hover:text-gray-900"
            style={{ padding: "8px 16px" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

