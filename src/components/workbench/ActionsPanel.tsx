"use client";

import React, { useState } from "react";
import { QueueItem, SuggestedAction } from "@/lib/workbenchTypes";

interface ActionsPanelProps {
  queueItem: QueueItem;
  onActionClick: (actionType: string, actionId?: string) => void;
}

export default function ActionsPanel({ queueItem, onActionClick }: ActionsPanelProps) {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const displayedSuggestions = showAllSuggestions
    ? queueItem.suggestedActions || []
    : (queueItem.suggestedActions || []).slice(0, 3);

  const getImpactBadgeClass = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 text-red-700 border border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getEffortBadgeClass = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-50 text-green-700 border border-green-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "high":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 border-l border-gray-200 p-4 flex flex-col h-full" style={{ minHeight: 0 }}>
      <div className="flex-1 overflow-y-auto space-y-4" style={{ minHeight: 0 }}>
        {/* Suggested Actions - Compact List */}
        {queueItem.suggestedActions && queueItem.suggestedActions.length > 0 && (
          <div>
            <h4 className="text-xs uppercase text-gray-500 tracking-wide font-medium mb-2">
              Suggested Actions
            </h4>
            <div className="space-y-2">
              {displayedSuggestions.map((action: SuggestedAction) => (
                <div
                  key={action.id}
                  className="bg-white border border-gray-200 p-2.5 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 mb-0.5">{action.title}</div>
                      <div className="text-xs text-gray-600 leading-relaxed">{action.rationale}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded border ${getImpactBadgeClass(
                        action.impactLevel
                      )}`}
                    >
                      Impact: {action.impactLevel}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded border ${getEffortBadgeClass(
                        action.effortLevel
                      )}`}
                    >
                      Effort: {action.effortLevel}
                    </span>
                  </div>
                  <button
                    onClick={() => onActionClick(action.actionType, action.id)}
                    className="w-full h-7 px-3 text-xs border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              ))}
              {queueItem.suggestedActions.length > 3 && (
                <button
                  onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline w-full text-center py-1"
                >
                  {showAllSuggestions ? "Show less" : `Show all (${queueItem.suggestedActions.length})`}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions - Main Action Area */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 tracking-wide font-medium mb-2">Quick Actions</h4>
          <div className="space-y-2">
            {[
              { icon: "📞", label: "Call patient", action: "call" },
              { icon: "💬", label: "Send message", action: "message" },
              { icon: "📅", label: "Schedule visit", action: "schedule" },
              { icon: "📋", label: "Create task", action: "task" },
              { icon: "👩‍⚕️", label: "Delegate to team", action: "delegate" },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={() => onActionClick(btn.action)}
                className="w-full h-9 flex items-center gap-2 px-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <span className="text-base">{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

