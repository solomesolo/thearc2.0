"use client";

import React from "react";

interface WorkbenchFooterProps {
  onResolve: () => void;
  onSnooze: () => void;
  onEscalate: () => void;
  statusText?: string;
}

export default function WorkbenchFooter({
  onResolve,
  onSnooze,
  onEscalate,
  statusText,
}: WorkbenchFooterProps) {
  return (
    <footer className="h-14 py-2 px-4 border-t border-gray-200 bg-white flex items-center justify-between flex-shrink-0 sticky bottom-0 z-20">
      <div className="text-xs text-gray-500">{statusText || "Draft saved"}</div>
      <div className="flex items-center gap-2">
        <button
          onClick={onResolve}
          className="h-9 px-4 bg-green-600 text-white text-sm font-medium rounded-[10px] hover:bg-green-700 transition-colors"
        >
          Resolve
        </button>
        <button
          onClick={onSnooze}
          className="h-9 px-4 border border-gray-300 text-gray-700 bg-white text-sm font-medium rounded-[10px] hover:bg-gray-50 transition-colors"
        >
          Snooze
        </button>
        <button
          onClick={onEscalate}
          className="h-9 px-4 border border-red-300 text-red-700 bg-white text-sm font-medium rounded-[10px] hover:bg-red-50 transition-colors"
        >
          Escalate
        </button>
      </div>
    </footer>
  );
}

