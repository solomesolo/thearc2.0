"use client";

import React from "react";

interface DocumentationAnchor {
  id: string;
  label: string;
  status?: "captured" | "pending" | "not_started";
}

interface DocumentationAnchorsProps {
  anchors: DocumentationAnchor[];
  title?: string;
}

export default function DocumentationAnchors({ anchors, title = "Must be documented here" }: DocumentationAnchorsProps) {
  if (anchors.length === 0) return null;

  const getStatusIndicator = (status?: string) => {
    switch (status) {
      case "captured":
        return <span className="text-[10px] text-green-600">✓</span>;
      case "pending":
        return <span className="text-[10px] text-yellow-600">○</span>;
      default:
        return <span className="text-[10px] text-gray-400">—</span>;
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <h4 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
        {title}
      </h4>
      <div className="space-y-1.5">
        {anchors.map((anchor) => (
          <div key={anchor.id} className="flex items-center justify-between text-[12px] leading-[16px] text-gray-700">
            <span>{anchor.label}</span>
            {getStatusIndicator(anchor.status)}
          </div>
        ))}
      </div>
    </div>
  );
}




