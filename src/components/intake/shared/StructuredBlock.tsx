"use client";

import React, { useState } from "react";

interface StructuredBlockProps {
  label: string;
  value: string;
  status: "captured" | "missing" | "partial";
  onEdit?: () => void;
  editComponent?: React.ReactNode;
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function StructuredBlock({
  label,
  value,
  status,
  onEdit,
  editComponent,
  isEditing = false,
  onSave,
  onCancel,
}: StructuredBlockProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-[8px] ${isEditing ? "p-4" : "p-3"}`}>
      {!isEditing ? (
        // Default view: Read-only display
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] leading-[16px] font-medium text-gray-700">
                {label}
              </span>
              {status === "captured" && (
                <span className="text-[10px] text-green-600">✓</span>
              )}
              {status === "missing" && (
                <span className="text-[10px] text-gray-400">—</span>
              )}
            </div>
            <span className={`text-[11px] leading-[16px] ${
              status === "missing" ? "text-gray-400 italic" : "text-gray-600"
            }`}>
              {status === "missing" ? `${value} (missing)` : value}
            </span>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[11px] leading-[16px] text-gray-600 hover:text-gray-700 font-medium flex-shrink-0 ml-2 transition-colors"
              style={{ padding: "2px 6px" }}
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        // Editing view: Inline edit form
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] leading-[16px] font-medium text-gray-700">
              {label}
            </span>
            <div className="flex items-center gap-2">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="text-[11px] leading-[16px] text-gray-600 hover:text-gray-700"
                  style={{ padding: "2px 6px" }}
                >
                  Cancel
                </button>
              )}
              {onSave && (
                <button
                  onClick={onSave}
                  className="text-[11px] leading-[16px] text-gray-900 hover:text-gray-800 font-medium transition-colors"
                  style={{ padding: "2px 6px" }}
                >
                  Done
                </button>
              )}
            </div>
          </div>
          {editComponent}
        </div>
      )}
    </div>
  );
}

