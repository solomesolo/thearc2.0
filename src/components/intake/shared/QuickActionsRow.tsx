"use client";

import React from "react";

interface QuickAction {
  id: string;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
}

interface QuickActionsRowProps {
  actions: QuickAction[];
}

export default function QuickActionsRow({ actions }: QuickActionsRowProps) {
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const baseClasses = "text-[12px] leading-[16px] font-medium rounded-[8px] transition-colors";
        const variantClasses =
          action.variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : action.variant === "secondary"
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50";

        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${baseClasses} ${variantClasses}`}
            style={{ padding: "6px 12px", height: "28px" }}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}




