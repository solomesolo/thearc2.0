"use client";

import React from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";

interface OrdersDraftMiniProps {
  selectedDiagnostics: SuggestedDiagnostic[];
  onReview: () => void;
}

export default function OrdersDraftMini({ selectedDiagnostics, onReview }: OrdersDraftMiniProps) {
  const count = selectedDiagnostics.length;

  if (count === 0) return null;

  return (
    <div className="border border-gray-200 rounded-[8px] bg-gray-50/50" style={{ padding: "10px 12px" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] leading-[16px] font-medium text-gray-700">
          Orders draft: <span style={{ fontVariantNumeric: "tabular-nums" }}>{count}</span>
        </span>
        <button
          onClick={onReview}
          className="text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium"
        >
          Review selected
        </button>
      </div>
      <div className="space-y-1">
        {selectedDiagnostics.slice(0, 3).map((diag) => (
          <div key={diag.id} className="text-[11px] leading-[16px] text-gray-600">
            • {diag.testName}
          </div>
        ))}
        {count > 3 && (
          <div className="text-[11px] leading-[16px] text-gray-500">
            +{count - 3} more
          </div>
        )}
      </div>
    </div>
  );
}

