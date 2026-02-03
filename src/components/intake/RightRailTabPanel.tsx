"use client";

import React from "react";
import QuietSuggestions from "./shared/QuietSuggestions";
import QuickActionsRow from "./shared/QuickActionsRow";
import DocumentationAnchors from "./shared/DocumentationAnchors";

interface TabPanelItem {
  id: string;
  label: string;
  value?: string;
  status?: "captured" | "pending" | "not_started";
}

interface QuickAction {
  id: string;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
}

interface Suggestion {
  id: string;
  text: string;
  type?: "info" | "prompt" | "checklist";
}

interface DocumentationAnchor {
  id: string;
  label: string;
  status?: "captured" | "pending" | "not_started";
}

interface RightRailTabPanelProps {
  title?: string;
  items?: TabPanelItem[];
  quickActions?: QuickAction[];
  suggestions?: Suggestion[];
  documentationAnchors?: DocumentationAnchor[];
  children?: React.ReactNode;
}

export default function RightRailTabPanel({
  title,
  items = [],
  quickActions = [],
  suggestions = [],
  documentationAnchors = [],
  children,
}: RightRailTabPanelProps) {
  return (
    <div className="space-y-4" style={{ padding: "16px 12px" }}>
      {/* What you should see (read-only snapshot) */}
      {items.length > 0 && (
        <div>
          {title && (
            <h4 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
              {title}
            </h4>
          )}
          <div className="space-y-1.5">
            {items.map((item) => (
              <div key={item.id} className="text-[12px] leading-[16px] text-gray-700">
                <span className="font-medium">{item.label}:</span>{" "}
                <span className="text-gray-600">{item.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom content */}
      {children}

      {/* Quick actions */}
      {quickActions.length > 0 && (
        <div>
          <h4 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
            What I should be able to do
          </h4>
          <QuickActionsRow actions={quickActions} />
        </div>
      )}

      {/* Quiet decision support (collapsible, default collapsed) */}
      {suggestions.length > 0 && <QuietSuggestions suggestions={suggestions} />}

      {/* Documentation anchors */}
      {documentationAnchors.length > 0 && <DocumentationAnchors anchors={documentationAnchors} />}
    </div>
  );
}

