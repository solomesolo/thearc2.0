"use client";

import React, { RefObject } from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";
import SectionNavigatorPanel from "./SectionNavigatorPanel";
import DecisionSupportPanel from "./DecisionSupportPanel";

interface RightColumnProps {
  centerScrollContainerRef: RefObject<HTMLDivElement>;
  diagnostics: SuggestedDiagnostic[];
  onDiagnosticsChange: (diagnostics: SuggestedDiagnostic[]) => void;
}

export default function RightColumn({
  centerScrollContainerRef,
  diagnostics,
  onDiagnosticsChange,
}: RightColumnProps) {
  return (
    <div
      className="w-[320px] border-l border-gray-200 bg-white flex-shrink-0 flex flex-col"
      style={{
        minHeight: 0,
        overflow: "hidden", // Container doesn't scroll, only Decision Support panel scrolls
      }}
    >
      {/* Panel A: Section Navigator (Important Tabs) - sticky at top, doesn't scroll */}
      <div className="flex-shrink-0">
        <SectionNavigatorPanel centerScrollContainerRef={centerScrollContainerRef} />
      </div>

      {/* Panel B: Decision Support - scrolls within right column if content overflows */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          minHeight: 0, // Critical: allows scrolling
        }}
      >
        <DecisionSupportPanel
          diagnostics={diagnostics}
          onDiagnosticsChange={onDiagnosticsChange}
        />
      </div>
    </div>
  );
}

